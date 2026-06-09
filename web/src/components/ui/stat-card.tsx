import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "vinho",
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: LucideIcon;
  tone?: "vinho" | "dourado" | "oliva" | "ambar" | "tijolo";
  className?: string;
}) {
  const tones: Record<string, string> = {
    vinho: "text-vinho-600 bg-vinho-600/10",
    dourado: "text-dourado bg-dourado/12",
    oliva: "text-oliva bg-oliva/12",
    ambar: "text-[#8a6411] bg-ambar/15",
    tijolo: "text-tijolo bg-tijolo/12",
  };
  return (
    <div className={cn("rounded-2xl border border-areia-200 bg-white/80 p-5 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-cafe-claro">{label}</span>
        {Icon && (
          <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", tones[tone])}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold text-cafe lote-codigo sm:text-3xl">{value}</div>
      {hint && <div className="mt-1 text-xs text-cafe-claro">{hint}</div>}
    </div>
  );
}
