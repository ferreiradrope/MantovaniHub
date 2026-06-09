import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProdutos, getFornecedores } from "@/lib/queries";
import { criarLote } from "@/lib/actions/lotes";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";

export const metadata: Metadata = { title: "Novo lote" };

export default async function NovoLotePage() {
  const [produtos, fornecedores] = await Promise.all([getProdutos(), getFornecedores()]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Link href="/painel/lotes" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos lotes
      </Link>
      <PageHeader title="Entrada de insumo" subtitle="Registre a matéria-prima recebida — o lote AAA.NNN é gerado automaticamente" />

      <form action={criarLote} className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
        <Field label="Produto-destino" htmlFor="produto_id">
          <Select id="produto_id" name="produto_id" required defaultValue="">
            <option value="" disabled>
              Selecione o produto…
            </option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Fornecedor" htmlFor="fornecedor_id" hint="Opcional">
          <Select id="fornecedor_id" name="fornecedor_id" defaultValue="">
            <option value="">— Sem fornecedor —</option>
            {fornecedores.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Peso recebido (kg)" htmlFor="peso">
            <Input id="peso" name="peso_recebido_kg" type="number" step="0.001" min="0.001" required placeholder="10.000" />
          </Field>
          <Field label="Nota fiscal" htmlFor="nf" hint="Opcional">
            <Input id="nf" name="nf_numero" placeholder="Nº da NF" />
          </Field>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Link href="/painel/lotes">
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </Link>
          <Button type="submit">Abrir lote</Button>
        </div>
      </form>
    </div>
  );
}
