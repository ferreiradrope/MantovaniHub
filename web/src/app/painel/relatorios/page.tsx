import type { Metadata } from "next";
import { Package, TrendingDown, Boxes, Wallet, ChevronRight } from "lucide-react";
import { getProducaoMensal, getPedidos } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProducaoChart } from "@/components/painel/producao-chart";
import { PedidoDetalhe } from "@/components/painel/pedido-detalhe";
import { formatBRL, formatKg, formatDate, cn } from "@/lib/utils";
import { STATUS_PEDIDO_LABEL } from "@/lib/types";

export const metadata: Metadata = { title: "Relatórios" };

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
function mesLabel(iso: string) {
  const [a, m] = iso.slice(0, 7).split("-");
  return `${MESES[Number(m) - 1]}/${a.slice(2)}`;
}

const STATUS_TONE: Record<string, string> = {
  recebido: "bg-vinho-600/10 text-vinho-700",
  separacao: "bg-ambar/15 text-[#8a6411]",
  pronto: "bg-oliva/15 text-oliva",
  entregue: "bg-oliva/15 text-oliva",
  cancelado: "bg-tijolo/12 text-tijolo",
};

export default async function RelatoriosPage() {
  const [producao, pedidos] = await Promise.all([getProducaoMensal(), getPedidos()]);

  // --- Produção ---
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

  // --- Financeiro ---
  const vendas = pedidos.filter((p) => p.status !== "cancelado");
  const faturamentoTotal = vendas.reduce((s, p) => s + Number(p.valor_total ?? 0), 0);
  const fatPorMes = new Map<string, number>();
  vendas.forEach((p) => {
    const k = (p.criado_em ?? "").slice(0, 7);
    if (k) fatPorMes.set(k, (fatPorMes.get(k) ?? 0) + Number(p.valor_total ?? 0));
  });
  const fatChartData = [...fatPorMes.entries()].sort().slice(-12).map(([mes, v]) => ({ mes: mesLabel(mes), faturamento: Math.round(v) }));
  const pedidosOrdenados = [...pedidos].sort((a, b) => ((a.criado_em ?? "") < (b.criado_em ?? "") ? 1 : -1));

  return (
    <div className="space-y-8">
      <PageHeader title="Relatórios" subtitle="Produção, perdas e faturamento consolidados" />

      {/* ===== Produção ===== */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-cafe">Produção</h2>
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
              <h3 className="mb-4 font-display text-base font-semibold text-cafe">Produção por mês</h3>
              <ProducaoChart data={chartData} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
              <ul className="divide-y divide-areia-200">
                {linhas.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-cafe">{p.produto}</p>
                      <p className="truncate text-xs text-cafe-claro">
                        {mesLabel(p.mes)} · {p.num_lotes} {p.num_lotes === 1 ? "lote" : "lotes"} · perdido {formatKg(Number(p.total_perdido_kg))}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="lote-codigo font-semibold text-cafe">{formatKg(Number(p.total_produzido_kg))}</div>
                      <div className="text-xs font-semibold text-tijolo">perda {p.perda_media_pct}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>

      {/* ===== Financeiro ===== */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold text-cafe">Financeiro</h2>
          <span className="text-sm text-cafe-claro">
            Faturamento total <strong className="text-cafe">{formatBRL(faturamentoTotal)}</strong> · {vendas.length}{" "}
            {vendas.length === 1 ? "pedido" : "pedidos"}
          </span>
        </div>

        {pedidos.length === 0 ? (
          <EmptyState icon={Wallet} title="Sem pedidos ainda" description="Os pedidos aparecem aqui assim que forem recebidos." />
        ) : (
          <>
            <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
              <h3 className="mb-4 font-display text-base font-semibold text-cafe">Faturamento por mês</h3>
              <ProducaoChart data={fatChartData} dataKey="faturamento" label="Faturamento" color="#5b6b3a" moeda />
            </div>

            <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
              <div className="flex items-center justify-between border-b border-areia-200 px-4 py-3 sm:px-5">
                <h3 className="font-display text-base font-semibold text-cafe">Pedidos</h3>
                <span className="text-xs text-cafe-claro">
                  {pedidos.length} {pedidos.length === 1 ? "registro" : "registros"}
                </span>
              </div>
              <ul className="divide-y divide-areia-200">
                {pedidosOrdenados.map((p) => (
                  <li key={p.id}>
                    <PedidoDetalhe
                      pedido={p}
                      title={`Ver detalhes do pedido #${p.numero}`}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-creme/60 sm:px-5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-cafe">
                          Pedido #{p.numero} · {p.cliente?.nome ?? "Cliente"}
                        </p>
                        <p className="text-xs text-cafe-claro">{formatDate(p.criado_em)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            STATUS_TONE[p.status] ?? "bg-areia-200 text-cafe-claro",
                          )}
                        >
                          {STATUS_PEDIDO_LABEL[p.status]}
                        </span>
                        <span className="lote-codigo w-24 text-right font-semibold text-cafe">{formatBRL(Number(p.valor_total))}</span>
                        <ChevronRight size={16} className="text-cafe-300" />
                      </div>
                    </PedidoDetalhe>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
