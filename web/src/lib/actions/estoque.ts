"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Baixa manual de estoque (descarte, consumo interno) — RF032. */
export async function baixaManual(formData: FormData) {
  const loteId = String(formData.get("loteId"));
  const quantidade = Number(formData.get("quantidade"));
  const motivo = String(formData.get("motivo") || "Baixa manual");

  if (!loteId || !quantidade || quantidade <= 0) {
    return { error: "Quantidade inválida." };
  }

  const supabase = await createClient();
  const { data: lote } = await supabase
    .from("lotes")
    .select("peso_disponivel_kg")
    .eq("id", loteId)
    .single();

  if (!lote) return { error: "Lote não encontrado." };

  const novoSaldo = Math.max(0, Number(lote.peso_disponivel_kg) - quantidade);

  await supabase.from("estoque_movimentos").insert({
    lote_id: loteId,
    tipo: motivo.toLowerCase().includes("descart") ? "descarte" : "baixa_manual",
    quantidade_kg: -Math.abs(quantidade),
    motivo,
  });

  await supabase
    .from("lotes")
    .update({ peso_disponivel_kg: novoSaldo, ...(novoSaldo === 0 ? { status: "vendido" } : {}) })
    .eq("id", loteId);

  revalidatePath("/painel/estoque");
  revalidatePath("/painel");
  return { ok: true };
}
