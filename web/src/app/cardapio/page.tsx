import type { Metadata } from "next";
import { getProdutosCardapio, getCategorias } from "@/lib/queries";
import { CardapioView } from "@/components/cardapio/cardapio-view";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Conheça os defumados, curados e maturados artesanais da Charcutaria Mantovani: ficha técnica, ingredientes e harmonização.",
};

export default async function CardapioPage() {
  const [produtos, categorias] = await Promise.all([getProdutosCardapio(), getCategorias()]);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="py-10 text-center sm:py-14">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-vinho-600">
          Charcutaria Mantovani
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cafe sm:text-5xl">
          Cardápio Digital
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cafe-claro">
          Cada peça com sua ficha técnica, ingredientes e sugestões de harmonização. Filtre por
          categoria ou esconda os alérgenos que você evita.
        </p>
      </section>

      <CardapioView produtos={produtos} categorias={categorias} />
    </div>
  );
}
