"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Cria ou atualiza um produto + ficha técnica + alérgenos (HU001). */
export async function salvarProduto(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") ? String(formData.get("id")) : null;
  const nome = String(formData.get("nome"));

  const payload = {
    nome,
    slug: id ? undefined : slugify(nome) + "-" + Math.random().toString(36).slice(2, 6),
    categoria_id: String(formData.get("categoria_id")),
    descricao: String(formData.get("descricao") || "") || null,
    ficha_tecnica: String(formData.get("ficha_tecnica") || "") || null,
    ingredientes: String(formData.get("ingredientes") || "")
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean),
    unidade_venda: String(formData.get("unidade_venda")),
    preco_varejo: Number(formData.get("preco_varejo") || 0),
    preco_atacado: formData.get("preco_atacado") ? Number(formData.get("preco_atacado")) : null,
    tempo_producao_dias: Number(formData.get("tempo_producao_dias") || 1),
    perda_media_pct: Number(formData.get("perda_media_pct") || 0),
    sazonal: formData.get("sazonal") === "on",
    disponivel_fora_mg: formData.get("disponivel_fora_mg") === "on",
    ativo: formData.get("ativo") === "on",
  };

  let produtoId = id;
  if (id) {
    const { slug, ...rest } = payload;
    void slug;
    await supabase.from("produtos").update(rest).eq("id", id);
  } else {
    const { data } = await supabase.from("produtos").insert(payload).select("id").single();
    produtoId = data?.id ?? null;
  }

  // Alérgenos (N:N)
  if (produtoId) {
    const alergenos = formData.getAll("alergenos").map(String);
    await supabase.from("produto_alergenos").delete().eq("produto_id", produtoId);
    if (alergenos.length) {
      await supabase
        .from("produto_alergenos")
        .insert(alergenos.map((alergeno_id) => ({ produto_id: produtoId, alergeno_id })));
    }
  }

  // Upload da foto para o Supabase Storage (se enviada)
  const foto = formData.get("foto") as File | null;
  if (produtoId && foto && foto.size > 0) {
    const ext = (foto.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${produtoId}-${Date.now()}.${ext}`;
    const admin = createAdminClient();
    const buffer = Buffer.from(await foto.arrayBuffer());
    const { error: upErr } = await admin.storage
      .from("produtos")
      .upload(path, buffer, { contentType: foto.type || "image/jpeg", upsert: true });
    if (!upErr) {
      const { data: pub } = admin.storage.from("produtos").getPublicUrl(path);
      await supabase.from("produtos").update({ foto_url: pub.publicUrl }).eq("id", produtoId);
    }
  }

  revalidatePath("/painel/produtos");
  revalidatePath("/cardapio");
  redirect("/painel/produtos");
}

export async function alternarAtivo(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id"));
  const ativo = formData.get("ativo") === "1";
  await supabase.from("produtos").update({ ativo: !ativo }).eq("id", id);
  revalidatePath("/painel/produtos");
  revalidatePath("/cardapio");
}
