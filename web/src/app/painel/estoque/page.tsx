import type { Metadata } from "next";
import { Boxes, AlertTriangle, PackageCheck, CalendarClock } from "lucide-react";
import { getEstoqueAtual } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { ValidadeBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { BaixaEstoque } from "@/components/painel/baixa-estoque";
import { formatKg } from "@/lib/utils";

export const metadata: Metadata = { title: "Estoque" };

export default async function EstoquePage() {
  const estoque = await getEstoqueAtual();

  const totalKg = estoque.reduce((s, e) => s + Number(e.peso_disponivel_kg), 0);
  const vencendo = estoque.filter((e) => (e.dias_para_vencer ?? 99) <= 7).length;
  const aVencer = estoque.filter((e) => {
    const d = e.dias_para_vencer ?? 99;
    return d > 7 && d <= 30;
  }).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Estoque em tempo real" subtitle="Disponibilidade por produto e lote, com semáforo de validade" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total em estoque" value={formatKg(totalKg)} icon={PackageCheck} tone="oliva" />
        <StatCard label="Lotes disponíveis" value={estoque.length} icon={Boxes} tone="vinho" />
        <StatCard label="Vencendo" value={vencendo} hint="≤ 7 dias" icon={AlertTriangle} tone="tijolo" />
        <StatCard label="A vencer" value={aVencer} hint="≤ 30 dias" icon={CalendarClock} tone="ambar" />
      </div>

      {estoque.length === 0 ? (
        <EmptyState
          icon={Boxes}
          title="Sem estoque disponível"
          description="Conclua lotes de produção para que apareçam aqui."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
          <ul className="divide-y divide-areia-200">
            {estoque.map((e) => (
              <li key={e.lote_id} className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-cafe">{e.produto}</p>
                  <p className="truncate text-xs text-cafe-claro">
                    <span className="lote-codigo">{e.codigo}</span>
                    <span className="text-cafe-300"> · {e.categoria}</span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="lote-codigo font-semibold text-cafe">
                    {formatKg(Number(e.peso_disponivel_kg))}
                  </span>
                  <ValidadeBadge dias={e.dias_para_vencer} />
                </div>
                <BaixaEstoque
                  loteId={e.lote_id}
                  codigo={e.codigo}
                  produto={e.produto}
                  max={Number(e.peso_disponivel_kg)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
