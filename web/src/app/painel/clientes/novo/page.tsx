import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormCliente } from "@/components/painel/form-cliente";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Novo cliente" };

export default function NovoClientePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/painel/clientes" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos clientes
      </Link>
      <PageHeader title="Novo cliente" />
      <FormCliente />
    </div>
  );
}
