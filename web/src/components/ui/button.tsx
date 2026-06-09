import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dourado" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary: "bg-vinho-600 text-creme-claro hover:bg-vinho-700 shadow-soft",
  secondary: "bg-areia text-cafe hover:bg-areia-200",
  outline: "border border-areia-300 text-cafe hover:bg-creme hover:border-vinho-600",
  ghost: "text-cafe hover:bg-creme",
  dourado: "bg-dourado text-white hover:bg-dourado-claro shadow-soft",
  danger: "bg-tijolo text-creme-claro hover:bg-vinho-700",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinho-600/40 focus-visible:ring-offset-1 focus-visible:ring-offset-creme-claro",
        "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
