import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategorias, getAlergenos } from "@/lib/queries";
import { FormProduto } from "@/components/painel/form-produto";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Novo produto" };

export default async function NovoProdutoPage() {
  const [categorias, alergenos] = await Promise.all([getCategorias(), getAlergenos()]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/painel/produtos" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos produtos
      </Link>
      <PageHeader title="Novo produto" subtitle="Cadastre a ficha técnica que alimenta o cardápio e a produção" />
      <FormProduto categorias={categorias} alergenos={alergenos} />
    </div>
  );
}
