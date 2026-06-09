import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ClipboardList, FlaskConical, PackageCheck } from "lucide-react";
import { getLotes } from "@/lib/queries";
import type { StatusLote } from "@/lib/types";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatKg } from "@/lib/utils";

export const metadata: Metadata = { title: "Lotes & Produção" };

const STATUS: Record<StatusLote, { label: string; tone: "ambar" | "dourado" | "oliva" | "neutro" | "tijolo" }> = {
  em_producao: { label: "Em produção", tone: "ambar" },
  pronto: { label: "Pronto", tone: "dourado" },
  em_estoque: { label: "Em estoque", tone: "oliva" },
  vendido: { label: "Vendido", tone: "neutro" },
  descartado: { label: "Descartado", tone: "tijolo" },
};

export default async function LotesPage() {
  const lotes = await getLotes();
  const emProducao = lotes.filter((l) => l.status === "em_producao").length;
  const emEstoque = lotes.filter((l) => l.status === "em_estoque").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Lotes & Produção" subtitle="Rastreabilidade AAA.NNN e cálculo de perdas">
        <Link href="/painel/lotes/novo">
          <Button>
            <Plus size={18} /> Novo lote
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total de lotes" value={lotes.length} icon={ClipboardList} tone="vinho" />
        <StatCard label="Em produção" value={emProducao} icon={FlaskConical} tone="ambar" />
        <StatCard label="Em estoque" value={emEstoque} icon={PackageCheck} tone="oliva" />
      </div>

      {lotes.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Nenhum lote ainda"
          description="Registre a entrada de matéria-prima para abrir o primeiro lote."
          action={
            <Link href="/painel/lotes/novo">
              <Button>
                <Plus size={18} /> Novo lote
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
          <ul className="divide-y divide-areia-200">
            {lotes.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/painel/lotes/${l.id}`}
                  className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-creme/50 sm:gap-4 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="lote-codigo font-semibold text-vinho-700">{l.codigo ?? "—"}</span>
                      <Badge tone={STATUS[l.status].tone}>{STATUS[l.status].label}</Badge>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-cafe">{l.produto?.nome ?? "—"}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-base font-semibold text-cafe">
                      {l.perda_total_pct != null ? `${l.perda_total_pct}%` : "—"}
                    </div>
                    <div className="lote-codigo text-xs text-cafe-claro">
                      {formatKg(l.peso_recebido_kg)}
                      {l.peso_final_kg ? ` → ${formatKg(l.peso_final_kg)}` : ""}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
