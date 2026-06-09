import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Wine, Beer, Wheat, Utensils, Sparkles } from "lucide-react";
import type { TipoHarmonizacao } from "@/lib/types";
import { getProdutoBySlug } from "@/lib/queries";
import { UNIDADE_LABEL } from "@/lib/types";
import { formatBRL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProdutoFoto } from "@/components/cardapio/produto-foto";
import { ProdutoActions } from "@/components/cardapio/produto-actions";

const HARM_ICON: Record<TipoHarmonizacao, typeof Wine> = {
  vinho: Wine,
  cerveja: Beer,
  pao: Wheat,
  queijo: Utensils,
  outro: Sparkles,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProdutoBySlug(slug);
  if (!p) return { title: "Produto não encontrado" };
  return { title: p.nome, description: p.descricao ?? undefined };
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const produto = await getProdutoBySlug(slug);
  if (!produto) notFound();

  const harmonizacoes = produto.harmonizacoes ?? [];

  return (
    <div className="mx-auto max-w-5xl py-8">
      <Link
        href="/cardapio"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600"
      >
        <ArrowLeft size={16} /> Voltar ao cardápio
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Foto */}
        <div className="md:sticky md:top-24 md:self-start">
          <ProdutoFoto produto={produto} rounded="rounded-3xl" className="aspect-square" />
        </div>

        {/* Informações */}
        <div>
          <div className="flex items-center gap-2">
            {produto.categoria && <Badge tone="vinho">{produto.categoria.nome}</Badge>}
            {produto.sazonal && <Badge tone="dourado">Sazonal</Badge>}
            {produto.disponivel_fora_mg && <Badge tone="oliva">Envio p/ outros estados</Badge>}
          </div>

          <h1 className="mt-3 font-display text-4xl font-semibold text-cafe">{produto.nome}</h1>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-semibold text-vinho-700">
              {formatBRL(produto.preco_varejo)}
            </span>
            <span className="text-cafe-claro">{UNIDADE_LABEL[produto.unidade_venda]}</span>
          </div>

          {produto.descricao && (
            <p className="mt-4 leading-relaxed text-cafe-claro">{produto.descricao}</p>
          )}

          {produto.tempo_producao_dias > 1 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-areia-300 bg-creme px-3 py-2 text-sm text-cafe">
              <Clock size={16} className="text-dourado" />
              <span>
                <strong className="font-semibold">{produto.tempo_producao_dias} dias</strong> de
                cura/maturação artesanal
              </span>
            </div>
          )}

          <div className="mt-6">
            <ProdutoActions produto={produto} />
          </div>

          {/* Ingredientes */}
          {produto.ingredientes.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-cafe">Ingredientes</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {produto.ingredientes.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-areia-300 bg-white/60 px-3 py-1 text-sm text-cafe-claro"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Alérgenos */}
          {produto.alergenos && produto.alergenos.length > 0 && (
            <div className="mt-6 rounded-xl border border-tijolo/20 bg-tijolo/5 p-4">
              <h2 className="text-sm font-semibold text-tijolo">Atenção a alérgenos</h2>
              <p className="mt-1 text-sm text-cafe-claro">
                Este produto contém: {produto.alergenos.join(", ")}.
              </p>
            </div>
          )}

          {/* Ficha técnica */}
          {produto.ficha_tecnica && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-cafe">Como é feito</h2>
              <p className="mt-2 leading-relaxed text-cafe-claro">{produto.ficha_tecnica}</p>
            </div>
          )}
        </div>
      </div>

      {/* Harmonizações */}
      {harmonizacoes.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-center gap-4">
            <h2 className="font-display text-2xl font-semibold text-cafe">Combina com…</h2>
            <div className="rule-vinho h-px flex-1" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {harmonizacoes.map((h) => {
              const Icon = HARM_ICON[h.tipo] ?? Sparkles;
              return (
                <div
                  key={h.id}
                  className="flex items-start gap-3 rounded-2xl border border-areia-200 bg-white/70 p-4 shadow-soft"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dourado/12 text-dourado">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-cafe-300">{h.tipo}</div>
                    <h3 className="font-display font-semibold text-cafe">{h.nome}</h3>
                    {h.descricao && <p className="mt-0.5 text-sm text-cafe-claro">{h.descricao}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
