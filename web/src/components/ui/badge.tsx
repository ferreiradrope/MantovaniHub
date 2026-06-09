import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "vinho" | "dourado" | "oliva" | "ambar" | "tijolo" | "areia" | "neutro";

const tones: Record<Tone, string> = {
  vinho: "bg-vinho-600/10 text-vinho-700 border-vinho-600/20",
  dourado: "bg-dourado/12 text-dourado border-dourado/25",
  oliva: "bg-oliva/12 text-oliva border-oliva/25",
  ambar: "bg-ambar/15 text-[#8a6411] border-ambar/30",
  tijolo: "bg-tijolo/12 text-tijolo border-tijolo/25",
  areia: "bg-areia/40 text-cafe-claro border-areia-300",
  neutro: "bg-cafe/5 text-cafe-claro border-cafe/10",
};

export function Badge({
  className,
  tone = "areia",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Semáforo de validade (verde/amarelo/vermelho/vencido) — alinhado à view vw_estoque_atual. */
export function ValidadeBadge({ dias }: { dias: number | null }) {
  if (dias == null) return <Badge tone="neutro">Sem validade</Badge>;
  if (dias < 0) return <Badge tone="tijolo">Vencido</Badge>;
  if (dias <= 7) return <Badge tone="tijolo">Vence em {dias}d</Badge>;
  if (dias <= 30) return <Badge tone="ambar">Vence em {dias}d</Badge>;
  return <Badge tone="oliva">{dias}d de validade</Badge>;
}
