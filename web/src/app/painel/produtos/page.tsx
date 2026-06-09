import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Beef, Pencil } from "lucide-react";
import { getProdutos } from "@/lib/queries";
import { ProdutoFoto } from "@/components/cardapio/produto-foto";
import { UNIDADE_LABEL } from "@/lib/types";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = { title: "Produtos" };

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="space-y-6">
      <PageHeader title="Produtos" subtitle="Ficha técnica que alimenta o cardápio, a produção e o estoque">
        <Link href="/painel/produtos/novo">
          <Button>
            <Plus size={18} /> Novo produto
          </Button>
        </Link>
      </PageHeader>

      {produtos.length === 0 ? (
        <EmptyState icon={Beef} title="Nenhum produto cadastrado" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
          <ul className="divide-y divide-areia-200">
            {produtos.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                <ProdutoFoto produto={p} rounded="rounded-xl" className="h-12 w-12 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-cafe">{p.nome}</p>
                    {!p.ativo && (
                      <Badge tone="neutro" className="shrink-0">
                        Inativo
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-xs text-cafe-claro">
                    {p.categoria?.nome ?? "—"} ·{" "}
                    <span className="font-semibold text-cafe">{formatBRL(p.preco_varejo)}</span>
                    <span className="text-cafe-300">{UNIDADE_LABEL[p.unidade_venda]}</span>
                  </p>
                </div>
                <Link
                  href={`/painel/produtos/${p.id}`}
                  aria-label={`Editar ${p.nome}`}
                  className="shrink-0 rounded-lg p-2 text-cafe-claro transition-colors hover:bg-creme hover:text-vinho-600"
                >
                  <Pencil size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
