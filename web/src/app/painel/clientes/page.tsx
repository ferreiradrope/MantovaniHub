import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users, Building2, Pencil } from "lucide-react";
import { getClientes } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Clientes" };

export default async function ClientesPage() {
  const clientes = await getClientes();
  const pj = clientes.filter((c) => c.tipo === "pj").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Clientes" subtitle="Cadastro e relacionamento — pessoa física e jurídica">
        <Link href="/painel/clientes/novo">
          <Button>
            <Plus size={18} /> Novo cliente
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total de clientes" value={clientes.length} icon={Users} tone="vinho" />
        <StatCard label="Pessoa jurídica" value={pj} hint="atacado" icon={Building2} tone="dourado" />
      </div>

      {clientes.length === 0 ? (
        <EmptyState icon={Users} title="Nenhum cliente cadastrado" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-areia-200 bg-white/80 shadow-soft">
          <ul className="divide-y divide-areia-200">
            {clientes.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vinho-600/10 font-display font-semibold text-vinho-700">
                  {c.nome.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-cafe">{c.nome}</p>
                    <Badge tone={c.tipo === "pj" ? "dourado" : "areia"} className="shrink-0">
                      {c.tipo.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="truncate text-xs text-cafe-claro">
                    {[
                      c.telefone,
                      c.cidade && `${c.cidade}/${c.uf ?? ""}`,
                      c.tabela_preco === "atacado" && "atacado",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <Link
                  href={`/painel/clientes/${c.id}`}
                  aria-label={`Editar ${c.nome}`}
                  className="shrink-0 rounded-lg p-2 text-cafe-claro hover:bg-creme hover:text-vinho-600"
                >
                  <Pencil size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
