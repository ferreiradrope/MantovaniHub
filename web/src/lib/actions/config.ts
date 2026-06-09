"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Salva parâmetros do negócio e preferências de alerta (HU022, restrito ao admin via RLS). */
export async function salvarConfig(formData: FormData) {
  const supabase = await createClient();

  const dias = String(formData.get("alerta_validade_dias") || "30,15,1")
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));

  await supabase
    .from("config_negocio")
    .update({
      nome_empresa: String(formData.get("nome_empresa") || "Charcutaria Mantovani"),
      whatsapp: String(formData.get("whatsapp") || ""),
      email: String(formData.get("email") || ""),
      instagram: String(formData.get("instagram") || ""),
      endereco: String(formData.get("endereco") || ""),
      alerta_validade_dias: dias,
      pos_venda_dias: Number(formData.get("pos_venda_dias") || 5),
      canais_notificacao: {
        push: formData.get("push") === "on",
        email: formData.get("canal_email") === "on",
        whatsapp: formData.get("canal_whatsapp") === "on",
      },
    })
    .eq("id", 1);

  revalidatePath("/painel/config");
}
