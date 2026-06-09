"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Truck, Store, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useCarrinho } from "@/components/cardapio/carrinho-context";
import { criarPedido } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { formatBRL } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import type { TipoEntrega } from "@/lib/types";

export default function CheckoutPage() {
  const { itens, total, limpar } = useCarrinho();
  const [entrega, setEntrega] = useState<TipoEntrega>("retirada");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<number | null>(null);

  const frete = entrega === "motoboy" ? 15 : 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    const fd = new FormData(e.currentTarget);
    const res = await criarPedido({
      cliente: {
        nome: String(fd.get("nome")),
        telefone: String(fd.get("telefone")),
        email: String(fd.get("email") || ""),
        endereco: String(fd.get("endereco") || ""),
        cidade: String(fd.get("cidade") || ""),
      },
      entrega,
      itens: itens.map((i) => ({
        produtoId: i.produto.id,
        quantidade: i.quantidade,
        preco: i.produto.preco_varejo,
        unidade: i.produto.unidade_venda,
      })),
    });
    setEnviando(false);
    if ("error" in res) {
      setErro(res.error ?? "Erro ao enviar o pedido.");
      return;
    }
    setSucesso(res.numero);
    limpar();
  }

  if (sucesso != null) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <CheckCircle2 size={56} className="mx-auto text-oliva" />
        <h1 className="mt-5 font-display text-3xl font-semibold text-cafe">Pedido recebido!</h1>
        <p className="mt-2 text-cafe-claro">
          Seu pedido <strong className="lote-codigo text-vinho-700">#{sucesso}</strong> foi registrado. Em breve
          confirmaremos o pagamento (Pix) e a entrega.
        </p>
        <div className="mt-8 space-y-2">
          <a
            href={whatsappLink(`Olá! Acabei de fazer o pedido #${sucesso} pelo site. 😊`)}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="dourado" size="lg" className="w-full">
              <MessageCircle size={18} /> Confirmar pelo WhatsApp
            </Button>
          </a>
          <Link href="/cardapio" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Voltar ao cardápio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-cafe">Seu carrinho está vazio</h1>
        <Link href="/cardapio" className="mt-4 inline-block">
          <Button>Ver cardápio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Link href="/cardapio" className="inline-flex items-center gap-1.5 text-sm font-medium text-cafe-claro hover:text-vinho-600">
        <ArrowLeft size={16} /> Voltar ao cardápio
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-cafe">Finalizar pedido</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        {/* Resumo */}
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
          <h2 className="mb-3 font-display text-lg font-semibold text-cafe">Seu pedido</h2>
          <ul className="space-y-2">
            {itens.map((i) => (
              <li key={i.produto.id} className="flex justify-between text-sm">
                <span className="text-cafe">
                  {i.quantidade}× {i.produto.nome}
                </span>
                <span className="font-medium text-cafe">{formatBRL(i.produto.preco_varejo * i.quantidade)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 border-t border-areia-200 pt-3 text-sm">
            <div className="flex justify-between text-cafe-claro">
              <span>Subtotal</span>
              <span>{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between text-cafe-claro">
              <span>Entrega</span>
              <span>{frete ? formatBRL(frete) : "Grátis (retirada)"}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-semibold text-vinho-700">
              <span>Total</span>
              <span>{formatBRL(total + frete)}</span>
            </div>
          </div>
        </div>

        {/* Entrega */}
        <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
          <h2 className="mb-3 font-display text-lg font-semibold text-cafe">Entrega</h2>
          <div className="grid grid-cols-2 gap-3">
            {(["retirada", "motoboy"] as TipoEntrega[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setEntrega(opt)}
                className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors ${
                  entrega === opt ? "border-vinho-600 bg-vinho-600/5 text-vinho-700" : "border-areia-300 text-cafe-claro"
                }`}
              >
                {opt === "retirada" ? <Store size={18} /> : <Truck size={18} />}
                {opt === "retirada" ? "Retirar na loja" : "Motoboy (+R$15)"}
              </button>
            ))}
          </div>
        </div>

        {/* Dados */}
        <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
          <h2 className="font-display text-lg font-semibold text-cafe">Seus dados</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome">
              <Input name="nome" required />
            </Field>
            <Field label="WhatsApp">
              <Input name="telefone" required placeholder="(31) 9...." />
            </Field>
          </div>
          <Field label="E-mail" hint="Para a confirmação">
            <Input name="email" type="email" />
          </Field>
          {entrega === "motoboy" && (
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
              <Field label="Endereço">
                <Input name="endereco" required />
              </Field>
              <Field label="Cidade">
                <Input name="cidade" defaultValue="Belo Horizonte" />
              </Field>
            </div>
          )}
        </div>

        {erro && <p className="text-sm font-medium text-tijolo">{erro}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={enviando}>
          {enviando ? <Loader2 size={18} className="animate-spin" /> : null}
          {enviando ? "Enviando…" : `Confirmar pedido · ${formatBRL(total + frete)}`}
        </Button>
        <p className="text-center text-xs text-cafe-300">
          Pagamento via Pix combinado na confirmação. Esta é uma demonstração — nenhuma cobrança é feita.
        </p>
      </form>
    </div>
  );
}
