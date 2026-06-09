"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Loader2, LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/painel";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setErro(
        error.message.includes("Invalid login")
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar. Tente novamente.",
      );
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="E-mail" htmlFor="email">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="voce@charcutariamantovani.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Senha" htmlFor="senha" error={erro ?? undefined}>
        <Input
          id="senha"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
        {loading ? "Entrando…" : "Entrar no painel"}
      </Button>
    </form>
  );
}
