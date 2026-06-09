"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Entrada de insumo + abertura de lote (HU002). O código AAA.NNN é gerado por gatilho. */
export async function criarLote(formData: FormData) {
  const supabase = await createClient();
  const produto_id = String(formData.get("produto_id"));
  const peso = Number(formData.get("peso_recebido_kg"));
  const fornecedorRaw = formData.get("fornecedor_id");
  const fornecedor_id = fornecedorRaw ? String(fornecedorRaw) : null;
  const nf_numero = String(formData.get("nf_numero") || "");

  if (!produto_id || !peso || peso <= 0) return;

  const { data: insumo } = await supabase
    .from("insumos_entrada")
    .insert({ produto_destino_id: produto_id, fornecedor_id, nf_numero, peso_recebido_kg: peso })
    .select("id")
    .single();

  const { data: lote } = await supabase
    .from("lotes")
    .insert({
      produto_id,
      insumo_entrada_id: insumo?.id,
      peso_recebido_kg: peso,
      status: "em_producao",
    })
    .select("id")
    .single();

  revalidatePath("/painel/lotes");
  if (lote?.id) redirect(`/painel/lotes/${lote.id}`);
}

/** Apontamento das etapas / pesagens (HU003). As perdas são recalculadas por colunas geradas. */
export async function registrarProducao(formData: FormData) {
  const supabase = await createClient();
  const loteId = String(formData.get("loteId"));
  const aposLimpeza = formData.get("peso_apos_limpeza_kg");
  const pesoFinal = formData.get("peso_final_kg");
  const validade = formData.get("data_validade");
  const finalizar = formData.get("finalizar") === "1";

  const update: Record<string, unknown> = {};
  if (aposLimpeza) update.peso_apos_limpeza_kg = Number(aposLimpeza);
  if (pesoFinal) update.peso_final_kg = Number(pesoFinal);

  if (finalizar && pesoFinal) {
    update.status = "em_estoque";
    update.data_conclusao = new Date().toISOString().slice(0, 10);
    if (validade) update.data_validade = String(validade);
  }

  await supabase.from("lotes").update(update).eq("id", loteId);

  revalidatePath(`/painel/lotes/${loteId}`);
  revalidatePath("/painel/lotes");
  revalidatePath("/painel/estoque");
  revalidatePath("/painel");
  return { ok: true };
}
