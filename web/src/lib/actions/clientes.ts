"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Cria ou atualiza um cliente PF/PJ (HU018). */
export async function salvarCliente(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") ? String(formData.get("id")) : null;

  const payload = {
    tipo: String(formData.get("tipo") || "pf"),
    nome: String(formData.get("nome")),
    razao_social: String(formData.get("razao_social") || "") || null,
    cnpj_cpf: String(formData.get("cnpj_cpf") || "") || null,
    telefone: String(formData.get("telefone") || "") || null,
    email: String(formData.get("email") || "") || null,
    endereco: String(formData.get("endereco") || "") || null,
    cidade: String(formData.get("cidade") || "") || null,
    uf: String(formData.get("uf") || "") || null,
    tabela_preco: String(formData.get("tabela_preco") || "varejo"),
    observacoes: String(formData.get("observacoes") || "") || null,
  };

  if (id) {
    await supabase.from("clientes").update(payload).eq("id", id);
  } else {
    await supabase.from("clientes").insert(payload);
  }

  revalidatePath("/painel/clientes");
  redirect("/painel/clientes");
}
