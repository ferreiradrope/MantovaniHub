import type { Metadata } from "next";
import { getPedidos } from "@/lib/queries";
import { Kanban } from "@/components/painel/kanban";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = { title: "Pedidos" };

export default async function PedidosPage() {
  const pedidos = await getPedidos();

  return (
    <div className="space-y-6">
      <PageHeader title="Pedidos" subtitle="Mova os pedidos pelo fluxo de separação e entrega" />
      {pedidos.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Nenhum pedido ainda" description="Os pedidos do cardápio aparecerão aqui." />
      ) : (
        <Kanban pedidos={pedidos} />
      )}
    </div>
  );
}
