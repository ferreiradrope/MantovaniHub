import { cn } from "@/lib/utils";

/** Selo/monograma "M" da Charcutaria Mantovani. */
export function Monogram({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="24" r="23" fill="#8a1c24" />
      <circle cx="24" cy="24" r="19.5" fill="none" stroke="#f5ecdd" strokeOpacity="0.5" strokeWidth="1" />
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="#f5ecdd"
      >
        M
      </text>
      <circle cx="24" cy="8" r="1.1" fill="#d4a949" />
      <circle cx="24" cy="40" r="1.1" fill="#d4a949" />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-1 font-display leading-none", className)}>
      <span className={cn("font-semibold tracking-tight", tone === "light" ? "text-creme-claro" : "text-vinho-700")}>
        Mantovani
      </span>
      <span className={cn("font-light tracking-tight", tone === "light" ? "text-creme/70" : "text-cafe-claro")}>
        Hub
      </span>
    </span>
  );
}

export function Logo({
  className,
  tone = "dark",
  size = 34,
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram size={size} />
      <Wordmark tone={tone} className="text-lg" />
    </span>
  );
}
