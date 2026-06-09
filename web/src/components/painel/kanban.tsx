"use client";

import { useTransition } from "react";
import { Truck, Store, User } from "lucide-react";
import type { Pedido, StatusPedido } from "@/lib/types";
import { STATUS_PEDIDO_LABEL } from "@/lib/types";
import { avancarPedido } from "@/lib/actions/pedidos";
import { formatBRL } from "@/lib/utils";

const COLUNAS: StatusPedido[] = ["recebido", "separacao", "pronto", "entregue"];
const TODOS: StatusPedido[] = ["recebido", "separacao", "pronto", "entregue", "cancelado"];

export function Kanban({ pedidos }: { pedidos: Pedido[] }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUNAS.map((col) => {
        const itens = pedidos.filter((p) => p.status === col);
        return (
          <div key={col} className="rounded-2xl border border-areia-200 bg-creme/40 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-cafe">{STATUS_PEDIDO_LABEL[col]}</h3>
              <span className="rounded-full bg-white/70 px-2 text-xs font-semibold text-cafe-claro">{itens.length}</span>
            </div>
            <div className="space-y-2.5">
              {itens.length === 0 && <p className="px-1 py-4 text-center text-xs text-cafe-300">Nenhum pedido</p>}
              {itens.map((p) => (
                <div key={p.id} className="rounded-xl border border-areia-200 bg-white/90 p-3 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="lote-codigo text-sm font-bold text-vinho-700">#{p.numero}</span>
                    <span className="font-display text-sm font-semibold text-cafe">{formatBRL(p.valor_total)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-cafe">
                    <User size={13} className="text-cafe-300" />
                    {p.cliente?.nome ?? "Cliente avulso"}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-cafe-claro">
                    {p.tipo_entrega === "motoboy" ? <Truck size={12} /> : <Store size={12} />}
                    {p.tipo_entrega === "motoboy" ? "Entrega" : "Retirada"}
                    <span>· {p.itens?.length ?? 0} itens</span>
                  </div>
                  <select
                    defaultValue={p.status}
                    disabled={pending}
                    onChange={(e) =>
                      startTransition(() => {
                        avancarPedido(p.id, e.target.value as StatusPedido);
                      })
                    }
                    className="mt-2.5 w-full rounded-lg border border-areia-300 bg-creme-claro px-2 py-1.5 text-xs font-medium text-cafe focus:border-vinho-600 focus:outline-none"
                  >
                    {TODOS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_PEDIDO_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
