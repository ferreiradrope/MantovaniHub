import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategorias, getAlergenos, getProdutoEdicao } from "@/lib/queries";
import { FormProduto } from "@/components/painel/form-produto";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Editar produto" };

export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ produto, alergenoIds }, categorias, alergenos] = await Promise.all([
    getProdutoEdicao(id),
    getCategorias(),
    getAlergenos(),
  ]);
  if (!produto) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/painel/produtos" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos produtos
      </Link>
      <PageHeader title={produto.nome} subtitle="Editar ficha técnica" />
      <FormProduto produto={produto} categorias={categorias} alergenos={alergenos} alergenoIds={alergenoIds} />
    </div>
  );
}
