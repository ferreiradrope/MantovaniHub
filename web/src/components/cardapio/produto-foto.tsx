import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Produto } from "@/lib/types";

/** Foto do produto ou placeholder "etiqueta de charcutaria" (bordô + inicial serifada). */
export function ProdutoFoto({
  produto,
  className,
  rounded = "rounded-xl",
}: {
  produto: Pick<Produto, "nome" | "foto_url" | "categoria">;
  className?: string;
  rounded?: string;
}) {
  if (produto.foto_url) {
    return (
      <div className={cn("relative overflow-hidden bg-vinho-900", rounded, className)}>
        <Image
          src={produto.foto_url}
          alt={produto.nome}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-vinho-800",
        rounded,
        className,
      )}
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(circle at 70% 20%, #b8862e33, transparent 60%)" }}
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-6xl font-semibold text-creme/15">
        {produto.nome.charAt(0)}
      </span>
      <div className="relative z-10 px-4 text-center">
        <div className="font-display text-sm italic text-dourado-claro/70">Mantovani</div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-creme/40">
          {produto.categoria?.nome ?? "Artesanal"}
        </div>
      </div>
    </div>
  );
}
