import type { Metadata } from "next";
import { Package, TrendingDown, Boxes } from "lucide-react";
import { getProducaoMensal } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProducaoChart } from "@/components/painel/producao-chart";
import { formatKg } from "@/lib/utils";

export const metadata: Metadata = { title: "Relatórios" };

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
function mesLabel(iso: string) {
  const [a, m] = iso.slice(0, 7).split("-");
  return `${MESES[Number(m) - 1]}/${a.slice(2)}`;
}

export default async function RelatoriosPage() {
  const producao = await getProducaoMensal();

  const totalProduzido = producao.reduce((s, p) => s + Number(p.total_produzido_kg ?? 0), 0);
  const totalPerdido = producao.reduce((s, p) => s + Number(p.total_perdido_kg ?? 0), 0);
  const totalLotes = producao.reduce((s, p) => s + Number(p.num_lotes ?? 0), 0);
  const perdaGeral = totalProduzido + totalPerdido > 0 ? (totalPerdido / (totalProduzido + totalPerdido)) * 100 : 0;

  const porMes = new Map<string, number>();
  producao.forEach((p) => {
    const k = p.mes.slice(0, 7);
    porMes.set(k, (porMes.get(k) ?? 0) + Number(p.total_produzido_kg ?? 0));
  });
  const chartData = [...porMes.entries()].sort().map(([mes, kg]) => ({ mes: mesLabel(mes), produzido: Math.round(kg * 10) / 10 }));

  const linhas = [...producao].sort((a, b) => (a.mes < b.mes ? 1 : -1));

  return (
    <div className="space-y-6">
      <PageHeader title="Relatórios de produção" subtitle="Produção e perdas consolidadas por produto e mês" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Produzido (total)" value={formatKg(totalProduzido)} icon={Package} tone="vinho" />
        <StatCard label="Perda geral" value={`${perdaGeral.toFixed(1)}%`} hint={formatKg(totalPerdido)} icon={TrendingDown} tone="ambar" />
        <StatCard label="Lotes concluídos" value={totalLotes} icon={Boxes} tone="oliva" />
      </div>

      {producao.length === 0 ? (
        <EmptyState icon={Package} title="Sem produção registrada" description="Finalize lotes para gerar o relatório." />
      ) : (
        <>
          <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
            <h2 className="mb-4 font-display text-lg font-semibold text-cafe">Produção por mês</h2>
            <ProducaoChart data={chartData} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
            <ul className="divide-y divide-areia-200">
              {linhas.map((p, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-cafe">{p.produto}</p>
                    <p className="truncate text-xs text-cafe-claro">
                      {mesLabel(p.mes)} · {p.num_lotes} {p.num_lotes === 1 ? "lote" : "lotes"} · perdido{" "}
                      {formatKg(Number(p.total_perdido_kg))}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="lote-codigo font-semibold text-cafe">
                      {formatKg(Number(p.total_produzido_kg))}
                    </div>
                    <div className="text-xs font-semibold text-tijolo">perda {p.perda_media_pct}%</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
