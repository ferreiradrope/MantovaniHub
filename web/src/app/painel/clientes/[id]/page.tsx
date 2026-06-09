import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCliente } from "@/lib/queries";
import { FormCliente } from "@/components/painel/form-cliente";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Editar cliente" };

export default async function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cliente = await getCliente(id);
  if (!cliente) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/painel/clientes" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos clientes
      </Link>
      <PageHeader title={cliente.nome} subtitle="Editar cliente" />
      <FormCliente cliente={cliente} />
    </div>
  );
}
