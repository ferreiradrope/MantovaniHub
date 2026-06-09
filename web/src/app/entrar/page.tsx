import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Logo, Monogram } from "@/components/brand/wordmark";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      {/* Branding (desktop) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-vinho-800 p-12 text-creme-claro md:flex">
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #d4a949 0%, transparent 70%)" }}
        />
        <Link href="/" className="relative">
          <Logo tone="light" />
        </Link>
        <div className="relative">
          <Monogram size={56} className="mb-6" />
          <p className="max-w-md font-display text-3xl font-medium italic leading-snug text-creme/90">
            &ldquo;Cada lote tem um número, uma data e uma história. Aqui, nada se perde.&rdquo;
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-dourado-claro/80">
            Painel de gestão · Charcutaria Mantovani
          </p>
        </div>
        <p className="relative text-xs text-creme/40">© 2026 Charcutaria Mantovani</p>
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 md:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-3xl font-semibold text-cafe">Bem-vindo de volta</h1>
          <p className="mt-2 text-cafe-claro">
            Acesse o painel para gerir produção, estoque e pedidos.
          </p>

          <div className="mt-8">
            <Suspense fallback={<div className="h-64" />}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="mt-6 text-center text-sm text-cafe-claro">
            Esqueceu a senha?{" "}
            <Link href="/cardapio" className="font-semibold text-vinho-600 hover:underline">
              Fale com o administrador
            </Link>
          </p>
          <p className="mt-8 text-center text-xs text-cafe-300">
            <Link href="/" className="hover:text-vinho-600">
              ← Voltar ao site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
