"use client";

import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Produto } from "@/lib/types";
import { UNIDADE_LABEL } from "@/lib/types";
import { formatBRL, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProdutoFoto } from "./produto-foto";
import { useCarrinho } from "./carrinho-context";

export function ProdutoCard({ produto }: { produto: Produto }) {
  const { adicionar } = useCarrinho();
  const [added, setAdded] = useState(false);

  function onAdd() {
    adicionar(produto, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft transition-all hover:-translate-y-0.5 hover:border-vinho-600/30">
      <Link href={`/cardapio/${produto.slug}`} className="block">
        <ProdutoFoto produto={produto} rounded="rounded-none" className="aspect-[4/3]" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/cardapio/${produto.slug}`}>
            <h3 className="font-display text-base font-semibold leading-tight text-cafe hover:text-vinho-600">
              {produto.nome}
            </h3>
          </Link>
          {produto.sazonal && <Badge tone="dourado">Sazonal</Badge>}
        </div>

        {produto.descricao && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-cafe-claro">
            {produto.descricao}
          </p>
        )}

        {produto.alergenos && produto.alergenos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {produto.alergenos.map((a) => (
              <Badge key={a} tone="tijolo" className="text-[10px]">
                contém {a.toLowerCase()}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <span className="font-display text-lg font-semibold text-vinho-700">
              {formatBRL(produto.preco_varejo)}
            </span>
            <span className="text-xs text-cafe-claro">{UNIDADE_LABEL[produto.unidade_venda]}</span>
          </div>
          <button
            onClick={onAdd}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-all active:scale-95",
              added
                ? "bg-oliva text-white"
                : "bg-vinho-600 text-creme-claro hover:bg-vinho-700",
            )}
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
            {added ? "Adicionado" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
