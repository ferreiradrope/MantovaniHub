"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UnidadeVenda, TipoEntrega } from "@/lib/types";

const UNIDADE_KG: Record<UnidadeVenda, number> = { "100g": 0.1, "500g": 0.5, kg: 1, unidade: 1 };

export interface CheckoutInput {
  cliente: { nome: string; telefone: string; email?: string; endereco?: string; cidade?: string };
  entrega: TipoEntrega;
  observacao?: string;
  itens: { produtoId: string; quantidade: number; preco: number; unidade: UnidadeVenda }[];
}

/**
 * Cria o pedido a partir do carrinho, baixando o estoque pela regra FEFO (RN017 / RF020).
 * Pagamento e gateway são simulados (sem cobrança real).
 */
export async function criarPedido(input: CheckoutInput) {
  const db = createAdminClient();

  // 1. Cliente (cria um registro PF para o pedido)
  const { data: cli } = await db
    .from("clientes")
    .insert({
      tipo: "pf",
      nome: input.cliente.nome,
      telefone: input.cliente.telefone || null,
      email: input.cliente.email || null,
      endereco: input.cliente.endereco || null,
      cidade: input.cliente.cidade || null,
      tabela_preco: "varejo",
    })
    .select("id")
    .single();

  // 2. Pedido
  const valor_produtos = input.itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const valor_entrega = input.entrega === "motoboy" ? 15 : 0;
  const { data: ped, error } = await db
    .from("pedidos")
    .insert({
      cliente_id: cli?.id,
      canal: "site",
      status: "recebido",
      tipo_entrega: input.entrega,
      endereco_entrega: input.cliente.endereco || null,
      valor_produtos,
      valor_entrega,
      forma_pagamento: "pix",
      pago: false,
    })
    .select("id, numero")
    .single();

  if (error || !ped) return { error: "Não foi possível registrar o pedido." };

  // 3. Itens + baixa de estoque FEFO
  for (const item of input.itens) {
    let loteId: string | null = null;
    let restanteKg = item.quantidade * (UNIDADE_KG[item.unidade] ?? 1);

    const { data: lotes } = await db
      .from("lotes")
      .select("id, peso_disponivel_kg")
      .eq("produto_id", item.produtoId)
      .eq("status", "em_estoque")
      .gt("peso_disponivel_kg", 0)
      .order("data_validade", { ascending: true });

    for (const lote of lotes ?? []) {
      if (restanteKg <= 0) break;
      const baixa = Math.min(restanteKg, Number(lote.peso_disponivel_kg));
      const novoSaldo = Number(lote.peso_disponivel_kg) - baixa;
      await db
        .from("lotes")
        .update({ peso_disponivel_kg: novoSaldo, ...(novoSaldo <= 0.0001 ? { status: "vendido" } : {}) })
        .eq("id", lote.id);
      await db.from("estoque_movimentos").insert({
        lote_id: lote.id,
        tipo: "venda",
        quantidade_kg: -baixa,
        pedido_id: ped.id,
        motivo: `Venda · pedido #${ped.numero}`,
      });
      if (!loteId) loteId = lote.id;
      restanteKg -= baixa;
    }

    await db.from("pedido_itens").insert({
      pedido_id: ped.id,
      produto_id: item.produtoId,
      lote_id: loteId,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
    });
  }

  await db.from("pedido_status_hist").insert({ pedido_id: ped.id, status: "recebido" });

  revalidatePath("/painel/pedidos");
  revalidatePath("/painel/estoque");
  revalidatePath("/painel");
  return { numero: ped.numero as number };
}
