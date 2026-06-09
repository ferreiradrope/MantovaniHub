import Link from "next/link";
import Image from "next/image";
import { Logo, Monogram } from "@/components/brand/wordmark";
import { VideoProcesso } from "@/components/video-processo";
import { InstalarPWA } from "@/components/instalar-pwa";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  Flame,
  QrCode,
  BellRing,
  LineChart,
} from "lucide-react";

const categorias = [
  "Defumados",
  "Maturados",
  "Curados",
  "Linguiças",
  "Assados",
  "Fermentados",
];

const recursos = [
  { icon: ClipboardList, titulo: "Produção por lote", texto: "Rastreabilidade AAA.NNN do insumo à embalagem, com cálculo automático de quebra." },
  { icon: Flame, titulo: "Controle de perdas", texto: "Pesagem por etapa (cura, defumação, maturação) e perda real de cada lote." },
  { icon: BellRing, titulo: "Alertas de validade e produção", texto: "Avisos de vencimento (30/15/1 dia) e agenda de maturação para datas comemorativas." },
  { icon: Boxes, titulo: "Estoque em tempo real", texto: "Disponibilidade por produto e lote, com baixa automática a cada venda (FEFO)." },
  { icon: LineChart, titulo: "Resumo do mês", texto: "Produção, perdas e pedidos num só painel — a saúde do negócio em segundos." },
  { icon: QrCode, titulo: "Cardápio digital", texto: "Ficha técnica, ingredientes, alérgenos e harmonização, com pedido pelo WhatsApp." },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* ===== Topo ===== */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:px-6 sm:py-5">
          <Logo tone="light" />
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/cardapio">
              <Button variant="ghost" size="sm" className="text-creme-claro hover:bg-white/10">
                Cardápio
              </Button>
            </Link>
            <Link href="/entrar">
              <Button variant="dourado" size="sm" className="whitespace-nowrap">
                <span className="sm:hidden">Entrar</span>
                <span className="hidden sm:inline">Entrar no painel</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-vinho-800 text-creme-claro">
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #d4a949 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-24 lg:pt-40">
          <div>
            <span className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-dourado-claro">
              Charcutaria artesanal · Belo Horizonte / MG
            </span>
            <h1
              className="animate-rise mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Do lote à tábua,
              <br />
              <span className="italic text-dourado-claro">cada peça</span> tem história.
            </h1>
            <p
              className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-creme/80"
              style={{ animationDelay: "160ms" }}
            >
              O MantovaniHub é a plataforma de gestão integrada da Charcutaria Mantovani: produção por
              lote, controle de perdas, validade, estoque e um cardápio digital que conta a história
              de cada curado, defumado e maturado.
            </p>
            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Link href="/cardapio">
                <Button variant="dourado" size="lg">
                  Ver o cardápio <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/entrar">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-creme/30 bg-transparent text-creme-claro hover:border-dourado hover:bg-white/5"
                >
                  Acessar o painel
                </Button>
              </Link>
            </div>
            <InstalarPWA className="animate-rise mt-5 text-sm text-creme/70 hover:text-dourado-claro" />
          </div>

          {/* Foto do mestre charcuteiro */}
          <div
            className="animate-rise relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:ml-auto"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-dourado/25 shadow-2xl ring-1 ring-white/10">
              <Image
                src="/douglas-hero.jpg"
                alt="Douglas, mestre charcuteiro da Charcutaria Mantovani, preparando linguiça artesanal"
                width={639}
                height={818}
                priority
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vinho-950/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-full border border-dourado/30 bg-vinho-950/90 px-4 py-2 shadow-lg backdrop-blur sm:flex">
              <Monogram size={26} />
              <span className="font-display text-sm text-creme-claro">Feito à mão, desde sempre</span>
            </div>
          </div>
        </div>

        {/* faixa de categorias */}
        <div className="relative border-t border-white/10 bg-vinho-900/40">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-sm">
            <span className="font-semibold uppercase tracking-widest text-dourado-claro/80">No cardápio</span>
            {categorias.map((c) => (
              <span key={c} className="text-creme/70">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recursos ===== */}
      <section className="bg-creme-claro py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-vinho-600">
              A plataforma
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cafe sm:text-4xl">
              Tudo o que a produção artesanal precisa, no celular.
            </h2>
            <p className="mt-4 text-cafe-claro">
              Substitui as planilhas soltas por um fluxo único — da chegada da matéria-prima ao
              pedido do cliente — sem perder o toque humano da marca.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recursos.map(({ icon: Icon, titulo, texto }) => (
              <div
                key={titulo}
                className="group rounded-2xl border border-areia-200 bg-white/70 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-vinho-600/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vinho-600/10 text-vinho-600 transition-colors group-hover:bg-vinho-600 group-hover:text-creme-claro">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-cafe">{titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cafe-claro">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Processo ===== */}
      <section className="border-t border-areia-200 bg-creme py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-vinho-600">
              O processo
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cafe sm:text-4xl">
              Tempo é ingrediente.
            </h2>
            <p className="mt-4 leading-relaxed text-cafe-claro">
              Uma copa maturada leva cerca de 120 dias; um presunto cru, mais de 180. Entre a cura, a
              defumação e a maturação, uma peça de 10&nbsp;kg pode render apenas 6. O MantovaniHub
              registra cada etapa e cada grama — para que o preço justo conte toda essa história.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["120", "dias de maturação (copa)"],
                ["30–50%", "de quebra no processo"],
                ["AAA.NNN", "rastreabilidade por lote"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-areia-300 bg-creme-claro px-4 py-3">
                  <div className="lote-codigo font-display text-2xl font-semibold text-vinho-700">{n}</div>
                  <div className="text-xs text-cafe-claro">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <VideoProcesso />
          </div>
        </div>
      </section>

      {/* ===== Rodapé ===== */}
      <footer className="mt-auto bg-vinho-950 py-12 text-creme/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo tone="light" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/cardapio" className="hover:text-dourado-claro">Cardápio</Link>
            <Link href="/entrar" className="hover:text-dourado-claro">Painel de gestão</Link>
            <a href="https://www.instagram.com/charcutariamantovani/" className="hover:text-dourado-claro">Instagram</a>
            <InstalarPWA className="text-creme/80 hover:text-dourado-claro" />
          </div>
          <p className="text-xs text-creme/40">© 2026 Charcutaria Mantovani</p>
        </div>
      </footer>
    </div>
  );
}
