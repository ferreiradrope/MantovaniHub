"use client";

import { Bell, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Alerta } from "@/lib/types";
import { useLidas, marcarLidas } from "@/lib/notificacoes-lidas";

/** Card de alertas do Resumo do mês, com leitura sincronizada ao sininho. */
export function AlertasCard({ alertas }: { alertas: Alerta[] }) {
  const lidas = useLidas();
  const idDe = (a: Alerta) => `alerta-${a.id}`;
  const naoLidas = alertas.filter((a) => !lidas.has(idDe(a)));

  return (
    <div className="rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-cafe">
          <Bell size={18} className="text-vinho-600" /> Alertas
        </h2>
        <div className="flex items-center gap-3">
          {naoLidas.length > 0 && (
            <button
              onClick={() => marcarLidas(alertas.map(idDe))}
              className="text-xs font-medium text-vinho-600 hover:underline"
            >
              Marcar todas como lidas
            </button>
          )}
          <Badge tone="tijolo">{naoLidas.length}</Badge>
        </div>
      </div>

      {alertas.length === 0 ? (
        <p className="py-6 text-center text-sm text-cafe-claro">Nenhum alerta no momento. 🎉</p>
      ) : (
        <ul className="space-y-2.5">
          {alertas.slice(0, 5).map((a) => {
            const lida = lidas.has(idDe(a));
            return (
              <li key={a.id}>
                <button
                  onClick={() => marcarLidas([idDe(a)])}
                  className={cn(
                    "flex w-full gap-3 rounded-xl border border-areia-200 bg-creme/40 p-3 text-left transition-colors hover:bg-creme",
                    lida && "opacity-45",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                      a.severidade === "critico"
                        ? "bg-tijolo"
                        : a.severidade === "atencao"
                          ? "bg-ambar"
                          : "bg-oliva",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-cafe">{a.titulo}</p>
                    {a.mensagem && <p className="text-xs text-cafe-claro">{a.mensagem}</p>}
                  </div>
                  {lida && <Check size={15} className="mt-0.5 shrink-0 text-oliva" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
