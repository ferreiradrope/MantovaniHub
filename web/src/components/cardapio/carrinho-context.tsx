"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Produto } from "@/lib/types";

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface CarrinhoCtx {
  itens: ItemCarrinho[];
  adicionar: (p: Produto, q?: number) => void;
  remover: (produtoId: string) => void;
  alterar: (produtoId: string, q: number) => void;
  limpar: () => void;
  total: number;
  count: number;
  hydrated: boolean;
}

const Ctx = createContext<CarrinhoCtx | null>(null);
const KEY = "mantovani-carrinho";

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItens(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(itens));
  }, [itens, hydrated]);

  const adicionar = useCallback((p: Produto, q = 1) => {
    setItens((prev) => {
      const ex = prev.find((i) => i.produto.id === p.id);
      if (ex)
        return prev.map((i) =>
          i.produto.id === p.id ? { ...i, quantidade: i.quantidade + q } : i,
        );
      return [...prev, { produto: p, quantidade: q }];
    });
  }, []);

  const remover = useCallback((id: string) => {
    setItens((prev) => prev.filter((i) => i.produto.id !== id));
  }, []);

  const alterar = useCallback((id: string, q: number) => {
    setItens((prev) =>
      q <= 0
        ? prev.filter((i) => i.produto.id !== id)
        : prev.map((i) => (i.produto.id === id ? { ...i, quantidade: q } : i)),
    );
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  const total = itens.reduce((s, i) => s + i.produto.preco_varejo * i.quantidade, 0);
  const count = itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <Ctx.Provider value={{ itens, adicionar, remover, alterar, limpar, total, count, hydrated }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCarrinho() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return c;
}
