"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Produto, Categoria } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/field";
import { ProdutoCard } from "./produto-card";

export function CardapioView({
  produtos,
  categorias,
}: {
  produtos: Produto[];
  categorias: Categoria[];
}) {
  const [cat, setCat] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [excluir, setExcluir] = useState<Set<string>>(new Set());

  const alergenosDisponiveis = useMemo(() => {
    const s = new Set<string>();
    produtos.forEach((p) => p.alergenos?.forEach((a) => s.add(a)));
    return [...s].sort();
  }, [produtos]);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      if (cat !== "todos" && p.categoria?.slug !== cat) return false;
      if (q && !p.nome.toLowerCase().includes(q) && !(p.descricao ?? "").toLowerCase().includes(q))
        return false;
      if (excluir.size && p.alergenos?.some((a) => excluir.has(a))) return false;
      return true;
    });
  }, [produtos, cat, busca, excluir]);

  const grupos = useMemo(() => {
    const cats = cat === "todos" ? categorias : categorias.filter((c) => c.slug === cat);
    return cats
      .map((c) => ({ categoria: c, itens: filtrados.filter((p) => p.categoria?.slug === c.slug) }))
      .filter((g) => g.itens.length > 0);
  }, [categorias, cat, filtrados]);

  function toggleAlergeno(a: string) {
    setExcluir((prev) => {
      const n = new Set(prev);
      n.has(a) ? n.delete(a) : n.add(a);
      return n;
    });
  }

  return (
    <div>
      {/* Filtros */}
      <div className="sticky top-[57px] z-20 -mx-4 border-b border-areia-200 bg-creme-claro/90 px-4 py-3 backdrop-blur md:top-[65px]">
        <div className="mx-auto max-w-6xl space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-300" />
            <Input
              placeholder="Buscar produto…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={cat === "todos"} onClick={() => setCat("todos")}>
              Tudo
            </Chip>
            {categorias.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.nome}
              </Chip>
            ))}
          </div>
          {alergenosDisponiveis.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-cafe-claro">
                <SlidersHorizontal size={13} /> Sem:
              </span>
              {alergenosDisponiveis.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAlergeno(a)}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                    excluir.has(a)
                      ? "border-tijolo bg-tijolo text-white"
                      : "border-areia-300 text-cafe-claro hover:border-tijolo",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grade */}
      <div className="mx-auto max-w-6xl py-8">
        {grupos.length === 0 ? (
          <p className="py-16 text-center text-cafe-claro">Nenhum produto encontrado com esses filtros.</p>
        ) : (
          <div className="space-y-12">
            {grupos.map(({ categoria, itens }) => (
              <section key={categoria.slug}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="font-display text-2xl font-semibold text-cafe">{categoria.nome}</h2>
                  <div className="rule-vinho h-px flex-1" />
                  <span className="text-sm text-cafe-claro">{itens.length}</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {itens.map((p) => (
                    <ProdutoCard key={p.id} produto={p} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-vinho-600 bg-vinho-600 text-creme-claro"
          : "border-areia-300 bg-white/60 text-cafe-claro hover:border-vinho-600",
      )}
    >
      {children}
    </button>
  );
}
