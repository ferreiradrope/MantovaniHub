import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Beef, Scale, Percent, CalendarClock } from "lucide-react";
import { getLote } from "@/lib/queries";
import type { StatusLote } from "@/lib/types";
import { UNIDADE_LABEL } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { FormProducao } from "@/components/painel/form-producao";
import { formatKg, formatDate, formatBRL } from "@/lib/utils";

export const metadata: Metadata = { title: "Lote" };

const STATUS: Record<StatusLote, { label: string; tone: "ambar" | "dourado" | "oliva" | "neutro" | "tijolo" }> = {
  em_producao: { label: "Em produção", tone: "ambar" },
  pronto: { label: "Pronto", tone: "dourado" },
  em_estoque: { label: "Em estoque", tone: "oliva" },
  vendido: { label: "Vendido", tone: "neutro" },
  descartado: { label: "Descartado", tone: "tijolo" },
};

export default async function LoteDetalhe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lote = await getLote(id);
  if (!lote) notFound();

  const etapas = [
    { nome: "Matéria-prima recebida", peso: lote.peso_recebido_kg, feito: true },
    { nome: "Após limpeza", peso: lote.peso_apos_limpeza_kg, feito: lote.peso_apos_limpeza_kg != null },
    { nome: "Produto final", peso: lote.peso_final_kg, feito: lote.peso_final_kg != null },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/painel/lotes" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar aos lotes
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="lote-codigo font-display text-3xl font-semibold text-vinho-700">{lote.codigo}</h1>
            <Badge tone={STATUS[lote.status].tone}>{STATUS[lote.status].label}</Badge>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-cafe-claro">
            <Beef size={16} /> {lote.produto?.nome}
            {lote.produto && (
              <span className="text-cafe-300">
                · {formatBRL(lote.produto.preco_varejo)} {UNIDADE_LABEL[lote.produto.unidade_venda]}
              </span>
            )}
          </p>
        </div>
        <div className="text-right text-sm text-cafe-claro">
          <div>Aberto em {formatDate(lote.data_abertura)}</div>
          {lote.data_validade && <div>Validade: {formatDate(lote.data_validade)}</div>}
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-4 shadow-soft">
          <Scale size={18} className="text-vinho-600" />
          <div className="mt-2 font-display text-2xl font-semibold text-cafe">{formatKg(lote.peso_recebido_kg)}</div>
          <div className="text-xs text-cafe-claro">Recebido</div>
        </div>
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-4 shadow-soft">
          <PackageIcon />
          <div className="mt-2 font-display text-2xl font-semibold text-cafe">
            {lote.peso_final_kg ? formatKg(lote.peso_final_kg) : "—"}
          </div>
          <div className="text-xs text-cafe-claro">Produto final</div>
        </div>
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-4 shadow-soft">
          <Percent size={18} className="text-tijolo" />
          <div className="mt-2 font-display text-2xl font-semibold text-cafe">
            {lote.perda_total_pct != null ? `${lote.perda_total_pct}%` : "—"}
          </div>
          <div className="text-xs text-cafe-claro">
            Perda {lote.perda_total_kg != null ? `(${formatKg(lote.perda_total_kg)})` : ""}
          </div>
        </div>
      </div>

      {/* Linha do tempo */}
      <div className="rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
        <h2 className="mb-4 font-display text-lg font-semibold text-cafe">Etapas do processo</h2>
        <ol className="space-y-4">
          {etapas.map((et, i) => (
            <li key={i} className="flex items-center gap-4">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  et.feito ? "bg-vinho-600 text-creme-claro" : "border border-areia-300 text-cafe-300"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium text-cafe">{et.nome}</div>
              </div>
              <div className="lote-codigo text-sm font-semibold text-cafe">
                {et.peso != null ? formatKg(et.peso) : "—"}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <FormProducao lote={lote} />
    </div>
  );
}

function PackageIcon() {
  return <CalendarClock size={18} className="text-oliva" />;
}
