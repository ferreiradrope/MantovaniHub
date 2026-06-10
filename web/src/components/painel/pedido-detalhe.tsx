"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  Store,
  Package,
  CreditCard,
  StickyNote,
} from "lucide-react";
import type { Pedido } from "@/lib/types";
import {
  STATUS_PEDIDO_LABEL,
  CANAL_PEDIDO_LABEL,
  TIPO_ENTREGA_LABEL,
  FORMA_PAGAMENTO_LABEL,
} from "@/lib/types";
import { formatBRL, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type BadgeTone = "vinho" | "ambar" | "oliva" | "tijolo" | "areia";

const STATUS_TONE: Record<string, BadgeTone> = {
  recebido: "vinho",
  separacao: "ambar",
  pronto: "oliva",
  entregue: "oliva",
  cancelado: "tijolo",
};

/**
 * Botão/gatilho que abre um modal com os detalhes completos de um pedido:
 * cliente, endereço de entrega, itens, totais, pagamento e observação.
 * `children` é o conteúdo clicável (card do kanban, linha do relatório, etc.).
 */
export function PedidoDetalhe({
  pedido,
  children,
  className,
  title = "Ver detalhes do pedido",
}: {
  pedido: Pedido;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title={title} className={className}>
        {children}
      </button>
      {open && <PedidoModal pedido={pedido} onClose={() => setOpen(false)} />}
    </>
  );
}

function Linha({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm text-cafe">
      <Icon size={15} className="mt-0.5 shrink-0 text-cafe-300" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function PedidoModal({ pedido, onClose }: { pedido: Pedido; onClose: () => void }) {
  // Fecha com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const itens = pedido.itens ?? [];
  const cliente = pedido.cliente;
  const endereco = pedido.endereco_entrega || cliente?.endereco || null;
  const localidade = [cliente?.cidade, cliente?.uf].filter(Boolean).join(" / ");
  const EntregaIcon = pedido.tipo_entrega === "motoboy" ? Truck : Store;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cafe/50 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Pedido número ${pedido.numero}`}
        className="relative flex max-h-[88vh] w-full max-w-lg flex-col rounded-2xl border border-areia-200 bg-creme-claro shadow-2xl"
      >
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4 border-b border-areia-200 p-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-cafe">
                Pedido <span className="lote-codigo text-vinho-700">#{pedido.numero}</span>
              </h3>
              <Badge tone={STATUS_TONE[pedido.status] ?? "areia"}>{STATUS_PEDIDO_LABEL[pedido.status]}</Badge>
            </div>
            <p className="mt-1 text-xs text-cafe-claro">
              {formatDateTime(pedido.criado_em)} · {CANAL_PEDIDO_LABEL[pedido.canal] ?? pedido.canal}
            </p>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="text-cafe-claro transition-colors hover:text-cafe">
            <X size={20} />
          </button>
        </div>

        {/* Corpo rolável */}
        <div className="space-y-5 overflow-y-auto p-5">
          {/* Cliente */}
          <section className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-cafe-300">Cliente</h4>
            <Linha icon={User}>{cliente?.nome ?? "Cliente avulso"}</Linha>
            {cliente?.telefone && <Linha icon={Phone}>{cliente.telefone}</Linha>}
            {cliente?.email && <Linha icon={Mail}>{cliente.email}</Linha>}
          </section>

          {/* Entrega */}
          <section className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-cafe-300">Entrega</h4>
            <Linha icon={EntregaIcon}>{TIPO_ENTREGA_LABEL[pedido.tipo_entrega]}</Linha>
            {pedido.tipo_entrega === "motoboy" ? (
              <Linha icon={MapPin}>
                {endereco ? (
                  <>
                    {endereco}
                    {localidade && <span className="text-cafe-claro"> — {localidade}</span>}
                  </>
                ) : (
                  <span className="text-cafe-claro">Endereço não informado</span>
                )}
              </Linha>
            ) : (
              <Linha icon={MapPin}>Retirada na loja</Linha>
            )}
          </section>

          {/* Itens */}
          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-cafe-300">
              Itens ({itens.length})
            </h4>
            <ul className="divide-y divide-areia-200 overflow-hidden rounded-xl border border-areia-200 bg-white/70">
              {itens.length === 0 && (
                <li className="px-3 py-3 text-sm text-cafe-claro">Sem itens registrados.</li>
              )}
              {itens.map((it) => {
                const subtotal = it.subtotal ?? it.preco_unitario * it.quantidade;
                return (
                  <li key={it.id} className="flex items-center gap-3 px-3 py-2.5">
                    <Package size={15} className="shrink-0 text-cafe-300" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-cafe">{it.produto?.nome ?? "Produto"}</p>
                      <p className="text-xs text-cafe-claro">
                        {it.quantidade} × {formatBRL(it.preco_unitario)}
                      </p>
                    </div>
                    <span className="lote-codigo shrink-0 text-sm font-semibold text-cafe">{formatBRL(subtotal)}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Totais + pagamento */}
          <section className="space-y-2 rounded-xl border border-areia-200 bg-white/70 p-4">
            <div className="flex justify-between text-sm text-cafe-claro">
              <span>Produtos</span>
              <span className="lote-codigo text-cafe">{formatBRL(pedido.valor_produtos)}</span>
            </div>
            <div className="flex justify-between text-sm text-cafe-claro">
              <span>Entrega</span>
              <span className="lote-codigo text-cafe">
                {pedido.valor_entrega ? formatBRL(pedido.valor_entrega) : "Grátis"}
              </span>
            </div>
            <div className="flex justify-between border-t border-areia-200 pt-2 text-base font-semibold text-cafe">
              <span>Total</span>
              <span className="lote-codigo text-vinho-700">{formatBRL(pedido.valor_total)}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 text-sm text-cafe">
              <CreditCard size={15} className="text-cafe-300" />
              {pedido.forma_pagamento ? FORMA_PAGAMENTO_LABEL[pedido.forma_pagamento] : "—"}
              <Badge tone={pedido.pago ? "oliva" : "ambar"} className="ml-auto">
                {pedido.pago ? "Pago" : "Pagamento pendente"}
              </Badge>
            </div>
          </section>

          {/* Observação */}
          {pedido.observacao && (
            <section className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-cafe-300">Observação</h4>
              <Linha icon={StickyNote}>{pedido.observacao}</Linha>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
