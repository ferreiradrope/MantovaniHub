import Link from "next/link";
import { Package, TrendingDown, Boxes, AlertTriangle, ShoppingBag, ArrowRight } from "lucide-react";
import { getProducaoMensal, getEstoqueAtual, getPedidos, getAlertas } from "@/lib/queries";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import { ValidadeBadge } from "@/components/ui/badge";
import { ProducaoChart } from "@/components/painel/producao-chart";
import { AlertasCard } from "@/components/painel/alertas-card";
import { formatKg } from "@/lib/utils";

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
function mesCurto(iso: string) {
  const [, m] = iso.slice(0, 7).split("-");
  return `${MESES[Number(m) - 1]}/${iso.slice(2, 4)}`;
}

export default async function PainelHome() {
  const [producao, estoque, pedidos, alertas] = await Promise.all([
    getProducaoMensal(),
    getEstoqueAtual(),
    getPedidos(),
    getAlertas(),
  ]);

  const agora = new Date();
  const mesAtual = agora.toISOString().slice(0, 7);
  const doMes = producao.filter((p) => p.mes.startsWith(mesAtual));

  const produzidoMes = doMes.reduce((s, p) => s + Number(p.total_produzido_kg ?? 0), 0);
  const perdaMes = doMes.length
    ? doMes.reduce((s, p) => s + Number(p.perda_media_pct ?? 0), 0) / doMes.length
    : 0;
  const lotesMes = doMes.reduce((s, p) => s + Number(p.num_lotes ?? 0), 0);
  const validadesCriticas = estoque.filter(
    (e) => e.status_validade === "vermelho" || e.status_validade === "vencido",
  ).length;
  const pedidosAbertos = pedidos.filter((p) =>
    ["recebido", "separacao", "pronto"].includes(p.status),
  ).length;

  const topProdutos = [...doMes]
    .sort((a, b) => Number(b.total_produzido_kg) - Number(a.total_produzido_kg))
    .slice(0, 5);

  const porMes = new Map<string, number>();
  producao.forEach((p) => {
    const k = p.mes.slice(0, 7);
    porMes.set(k, (porMes.get(k) ?? 0) + Number(p.total_produzido_kg ?? 0));
  });
  const chartData = [...porMes.entries()]
    .sort()
    .slice(-6)
    .map(([mes, kg]) => ({ mes: mesCurto(mes), produzido: Math.round(kg * 10) / 10 }));

  const proximasValidades = estoque.filter((e) => (e.dias_para_vencer ?? 99) <= 30).slice(0, 6);
  const mesNome = agora.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <PageHeader title="Resumo do mês" subtitle={`Visão geral de ${mesNome}`} />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Produzido no mês" value={formatKg(produzidoMes)} icon={Package} tone="vinho" />
        <StatCard label="Perda média" value={`${perdaMes.toFixed(1)}%`} icon={TrendingDown} tone="ambar" />
        <StatCard label="Lotes no mês" value={lotesMes} icon={Boxes} tone="oliva" />
        <StatCard label="Validades críticas" value={validadesCriticas} hint="≤ 7 dias" icon={AlertTriangle} tone="tijolo" />
        <StatCard label="Pedidos em aberto" value={pedidosAbertos} icon={ShoppingBag} tone="dourado" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gráfico */}
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-cafe">Produção dos últimos meses</h2>
          {chartData.length > 0 ? (
            <ProducaoChart data={chartData} />
          ) : (
            <p className="py-10 text-center text-sm text-cafe-claro">Sem produção registrada ainda.</p>
          )}
        </div>

        {/* Top produtos */}
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
          <h2 className="mb-4 font-display text-lg font-semibold text-cafe">Mais produzidos no mês</h2>
          {topProdutos.length === 0 ? (
            <p className="py-6 text-center text-sm text-cafe-claro">Nada produzido neste mês.</p>
          ) : (
            <ol className="space-y-3">
              {topProdutos.map((p, i) => (
                <li key={p.produto_id} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vinho-600/10 font-display text-xs font-bold text-vinho-700">
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate text-sm text-cafe">{p.produto}</span>
                  <span className="lote-codigo text-sm font-semibold text-cafe">
                    {formatKg(Number(p.total_produzido_kg))}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alertas */}
        <AlertasCard alertas={alertas} />

        {/* Validades próximas */}
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-cafe">Vencimentos próximos</h2>
            <Link href="/painel/estoque" className="flex items-center gap-1 text-sm font-medium text-vinho-600 hover:underline">
              Estoque <ArrowRight size={14} />
            </Link>
          </div>
          {proximasValidades.length === 0 ? (
            <p className="py-6 text-center text-sm text-cafe-claro">Nada vencendo nos próximos 30 dias.</p>
          ) : (
            <ul className="divide-y divide-areia-200">
              {proximasValidades.map((e) => (
                <li key={e.lote_id} className="flex items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-cafe">{e.produto}</p>
                    <p className="lote-codigo text-xs text-cafe-claro">
                      {e.codigo} · {formatKg(Number(e.peso_disponivel_kg))}
                    </p>
                  </div>
                  <ValidadeBadge dias={e.dias_para_vencer} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
