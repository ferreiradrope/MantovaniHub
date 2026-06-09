import { CarrinhoProvider } from "@/components/cardapio/carrinho-context";
import { CardapioChrome } from "@/components/cardapio/cardapio-chrome";

export default function CardapioLayout({ children }: { children: React.ReactNode }) {
  return (
    <CarrinhoProvider>
      <CardapioChrome>{children}</CardapioChrome>
    </CarrinhoProvider>
  );
}
