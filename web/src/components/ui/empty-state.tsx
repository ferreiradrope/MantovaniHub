import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-areia-300 bg-creme/40 px-6 py-14 text-center",
        className,
      )}
    >
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-vinho-600/10 text-vinho-600">
          <Icon size={24} />
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-cafe">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-cafe-claro">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
