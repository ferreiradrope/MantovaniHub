import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-lg border border-areia-300 bg-creme-claro px-3.5 py-2.5 text-sm text-cafe " +
  "placeholder:text-cafe-300 transition-colors focus:outline-none focus:border-vinho-600 " +
  "focus:ring-2 focus:ring-vinho-600/15 disabled:opacity-60";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("mb-1.5 block text-sm font-semibold text-cafe", className)} {...props} />
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(base, className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(base, "min-h-[88px] resize-y", className)} {...props} />;
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(base, "cursor-pointer appearance-none pr-9", className)} {...props}>
      {children}
    </select>
  );
});

/** Agrupa Label + campo + mensagem de ajuda/erro. */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-tijolo">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-cafe-claro">{hint}</p>
      ) : null}
    </div>
  );
}
