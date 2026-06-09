"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag, MessageCircle, Check } from "lucide-react";
import type { Produto } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { pedidoProdutoWhatsapp } from "@/lib/site";
import { useCarrinho } from "./carrinho-context";

export function ProdutoActions({ produto }: { produto: Produto }) {
  const { adicionar } = useCarrinho();
  const [qtd, setQtd] = useState(1);
  const [added, setAdded] = useState(false);

  function onAdd() {
    adicionar(produto, qtd);
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-areia-300 bg-white/70">
          <button onClick={() => setQtd((q) => Math.max(1, q - 1))} className="px-3 py-2.5 text-cafe-claro hover:text-vinho-600">
            <Minus size={16} />
          </button>
          <span className="min-w-8 text-center font-semibold lote-codigo">{qtd}</span>
          <button onClick={() => setQtd((q) => q + 1)} className="px-3 py-2.5 text-cafe-claro hover:text-vinho-600">
            <Plus size={16} />
          </button>
        </div>
        <Button onClick={onAdd} size="lg" className="flex-1">
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
        </Button>
      </div>
      <a href={pedidoProdutoWhatsapp(produto)} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant="outline" size="lg" className="w-full border-oliva text-oliva hover:bg-oliva/10">
          <MessageCircle size={18} /> Pedir pelo WhatsApp
        </Button>
      </a>
    </div>
  );
}
