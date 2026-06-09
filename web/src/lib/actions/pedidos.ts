"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { StatusPedido } from "@/lib/types";

/** Move um pedido entre status no kanban e registra o histórico (HU019). */
export async function avancarPedido(pedidoId: string, status: StatusPedido) {
  const supabase = await createClient();
  await supabase.from("pedidos").update({ status }).eq("id", pedidoId);
  await supabase.from("pedido_status_hist").insert({ pedido_id: pedidoId, status });
  revalidatePath("/painel/pedidos");
  revalidatePath("/painel");
  return { ok: true };
}
