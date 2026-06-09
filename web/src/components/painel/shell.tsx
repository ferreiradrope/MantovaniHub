"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Monogram, Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils";
import type { Notificacao } from "@/lib/types";
import { InstalarPWA } from "@/components/instalar-pwa";
import { useLidas, marcarLidas } from "@/lib/notificacoes-lidas";
import {
  LayoutDashboard,
  Beef,
  ClipboardList,
  Boxes,
  ShoppingBag,
  Users,
  LineChart,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  AlertTriangle,
  BellRing,
} from "lucide-react";

const NAV = [
  { href: "/painel", label: "Resumo do mês", icon: LayoutDashboard },
  { href: "/painel/produtos", label: "Produtos", icon: Beef },
  { href: "/painel/lotes", label: "Lotes & Produção", icon: ClipboardList },
  { href: "/painel/estoque", label: "Estoque", icon: Boxes },
  { href: "/painel/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/painel/clientes", label: "Clientes", icon: Users },
  { href: "/painel/relatorios", label: "Relatórios", icon: LineChart },
  { href: "/painel/config", label: "Configurações", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/painel" ? pathname === href : pathname.startsWith(href);
}

const TIPO_ICON = { pedido: ShoppingBag, validade: AlertTriangle, alerta: BellRing } as const;
const SEVERIDADE_COR = { critico: "bg-tijolo", atencao: "bg-ambar", info: "bg-oliva" } as const;

export function PainelShell({
  user,
  notificacoes = [],
  children,
}: {
  user: { nome: string; papel: string } | null;
  notificacoes?: Notificacao[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Atualiza as notificações periodicamente (pedidos novos aparecem sem recarregar).
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 45000);
    return () => clearInterval(id);
  }, [router]);

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/entrar");
    router.refresh();
  }

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-vinho-700 text-creme-claro shadow-inner"
                : "text-creme/70 hover:bg-white/5 hover:text-creme-claro",
            )}
          >
            <Icon size={18} className={active ? "text-dourado-claro" : ""} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const UserBox = () => (
    <div className="border-t border-white/10 p-3">
      <InstalarPWA className="mb-2 w-full justify-center rounded-xl border border-white/15 px-3 py-2.5 text-creme/75 hover:bg-white/5 hover:text-creme-claro" />
      <div className="flex items-center gap-3 rounded-xl px-3 py-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dourado/20 font-display text-sm font-semibold text-dourado-claro">
          {(user?.nome ?? "?").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-creme-claro">{user?.nome ?? "Usuário"}</div>
          <div className="text-xs capitalize text-creme/50">{user?.papel ?? ""}</div>
        </div>
        <button
          onClick={sair}
          title="Sair"
          className="rounded-lg p-2 text-creme/60 transition-colors hover:bg-white/10 hover:text-creme-claro"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );

  const lidas = useLidas();
  const total = notificacoes.filter((n) => !lidas.has(n.id)).length;

  return (
    <div className="flex min-h-dvh bg-creme-claro">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-vinho-900 md:flex">
        <Link href="/painel" className="flex items-center gap-2.5 px-5 py-5">
          <Monogram size={34} />
          <Wordmark tone="light" className="text-lg" />
        </Link>
        <NavLinks />
        <UserBox />
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-cafe/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-vinho-900">
            <div className="flex items-center justify-between px-5 py-5">
              <Link href="/painel" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <Monogram size={32} />
                <Wordmark tone="light" className="text-base" />
              </Link>
              <button onClick={() => setOpen(false)} className="text-creme/70 hover:text-creme-claro">
                <X size={22} />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
            <UserBox />
          </aside>
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-areia-200 bg-creme-claro/85 px-4 py-3 backdrop-blur md:px-8">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-cafe hover:bg-creme md:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
          <div className="md:hidden">
            <Wordmark className="text-base" />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {/* Notificações */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative rounded-lg p-2 text-cafe-claro transition-colors hover:bg-creme hover:text-vinho-600"
                aria-label="Notificações"
              >
                <Bell size={20} />
                {total > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tijolo px-1 text-[10px] font-bold text-white">
                    {total > 9 ? "9+" : total}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-areia-200 bg-creme-claro shadow-2xl">
                    <div className="flex items-center justify-between border-b border-areia-200 px-4 py-3">
                      <h3 className="font-display font-semibold text-cafe">Notificações</h3>
                      <div className="flex items-center gap-3">
                        {total > 0 && (
                          <button
                            onClick={() => marcarLidas(notificacoes.map((n) => n.id))}
                            className="text-xs font-medium text-vinho-600 hover:underline"
                          >
                            Marcar todas como lidas
                          </button>
                        )}
                        {total > 0 && (
                          <span className="rounded-full bg-vinho-600/10 px-2 text-xs font-semibold text-vinho-700">
                            {total}
                          </span>
                        )}
                      </div>
                    </div>
                    {total === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-cafe-claro">
                        Tudo em dia. Nenhuma notificação. 🎉
                      </div>
                    ) : (
                      <ul className="max-h-[60vh] divide-y divide-areia-200 overflow-y-auto">
                        {notificacoes.map((n) => {
                          const Icon = TIPO_ICON[n.tipo];
                          const lida = lidas.has(n.id);
                          return (
                            <li key={n.id}>
                              <Link
                                href={n.href}
                                onClick={() => {
                                  marcarLidas([n.id]);
                                  setNotifOpen(false);
                                }}
                                className={cn(
                                  "flex gap-3 px-4 py-3 transition-colors hover:bg-creme/60",
                                  lida && "opacity-45",
                                )}
                              >
                                <span className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-vinho-600/10 text-vinho-600">
                                  <Icon size={16} />
                                  <span
                                    className={cn(
                                      "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-creme-claro",
                                      SEVERIDADE_COR[n.severidade],
                                    )}
                                  />
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-cafe">{n.titulo}</p>
                                  <p className="truncate text-xs text-cafe-claro">{n.descricao}</p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/cardapio"
              className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-cafe-claro hover:bg-creme hover:text-vinho-600 sm:block"
            >
              Ver cardápio
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
