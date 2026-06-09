"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/wordmark";
import { InstalarPWA } from "@/components/instalar-pwa";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/utils";
import { UNIDADE_LABEL } from "@/lib/types";
import { whatsappLink } from "@/lib/site";
import { useCarrinho } from "./carrinho-context";
import { ProdutoFoto } from "./produto-foto";

export function CardapioChrome({ children }: { children: React.ReactNode }) {
  const { itens, count, total, alterar, remover, limpar, hydrated } = useCarrinho();
  const [aberto, setAberto] = useState(false);

  const msgWhatsapp = whatsappLink(
    `Olá! Gostaria de fazer um pedido na Charcutaria Mantovani:\n\n` +
      itens
        .map((i) => `• ${i.quantidade}x ${i.produto.nome} — ${formatBRL(i.produto.preco_varejo * i.quantidade)}`)
        .join("\n") +
      `\n\n*Total: ${formatBRL(total)}*`,
  );

  return (
    <div className="flex min-h-dvh flex-col bg-creme-claro">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-areia-200 bg-creme-claro/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/">
            <Logo />
          </Link>
          <button
            onClick={() => setAberto(true)}
            className="relative flex items-center gap-2 rounded-lg border border-areia-300 bg-white/70 px-3 py-2 text-sm font-semibold text-cafe transition-colors hover:border-vinho-600"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Carrinho</span>
            {hydrated && count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-vinho-600 px-1 text-xs font-bold text-creme-claro">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4">{children}</main>

      {/* Rodapé */}
      <footer className="border-t border-areia-200 bg-creme py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-cafe-claro">
          <Logo />
          <p>Charcutaria artesanal · Belo Horizonte / MG</p>
          <InstalarPWA className="mt-1 rounded-lg border border-areia-300 bg-white/60 px-4 py-2 text-cafe-claro hover:border-vinho-600 hover:text-vinho-600" />
          <Link href="/" className="text-vinho-600 hover:underline">
            ← Voltar ao site
          </Link>
        </div>
      </footer>

      {/* Drawer do carrinho */}
      {aberto && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-cafe/50 backdrop-blur-sm" onClick={() => setAberto(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-creme-claro shadow-2xl">
            <div className="flex items-center justify-between border-b border-areia-200 px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-cafe">Seu pedido</h2>
              <button onClick={() => setAberto(false)} className="rounded-lg p-1.5 text-cafe-claro hover:bg-creme">
                <X size={20} />
              </button>
            </div>

            {itens.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-areia-300" />
                <p className="text-cafe-claro">Seu carrinho está vazio.</p>
                <Button variant="outline" onClick={() => setAberto(false)}>
                  Ver cardápio
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {itens.map(({ produto, quantidade }) => (
                    <div key={produto.id} className="flex gap-3 rounded-xl border border-areia-200 bg-white/70 p-3">
                      <ProdutoFoto produto={produto} className="h-16 w-16 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold leading-tight text-cafe">{produto.nome}</h3>
                          <button onClick={() => remover(produto.id)} className="text-cafe-300 hover:text-tijolo">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-xs text-cafe-claro">
                          {formatBRL(produto.preco_varejo)} {UNIDADE_LABEL[produto.unidade_venda]}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-areia-300 bg-creme-claro">
                            <button onClick={() => alterar(produto.id, quantidade - 1)} className="px-2 py-1 text-cafe-claro hover:text-vinho-600">
                              <Minus size={14} />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold lote-codigo">{quantidade}</span>
                            <button onClick={() => alterar(produto.id, quantidade + 1)} className="px-2 py-1 text-cafe-claro hover:text-vinho-600">
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-display text-sm font-semibold text-vinho-700">
                            {formatBRL(produto.preco_varejo * quantidade)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={limpar} className="text-xs text-cafe-claro hover:text-tijolo">
                    Limpar carrinho
                  </button>
                </div>

                <div className="border-t border-areia-200 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-cafe-claro">Total estimado</span>
                    <span className="font-display text-2xl font-semibold text-vinho-700">{formatBRL(total)}</span>
                  </div>
                  <div className="space-y-2">
                    <Link href="/cardapio/checkout" onClick={() => setAberto(false)} className="block">
                      <Button size="lg" className="w-full">
                        Finalizar pedido <ArrowRight size={18} />
                      </Button>
                    </Link>
                    <a href={msgWhatsapp} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" size="lg" className="w-full border-oliva text-oliva hover:bg-oliva/10">
                        <MessageCircle size={18} /> Pedir pelo WhatsApp
                      </Button>
                    </a>
                  </div>
                  <p className="mt-3 text-center text-xs text-cafe-300">
                    Pagamento e entrega combinados na confirmação.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
