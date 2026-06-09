import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getNotificacoes } from "@/lib/queries";
import { PainelShell } from "@/components/painel/shell";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/entrar");

  const [{ data: perfil }, notificacoes] = await Promise.all([
    supabase.from("perfis").select("nome, papel").eq("id", user.id).maybeSingle(),
    getNotificacoes(),
  ]);

  return (
    <PainelShell
      user={{
        nome: perfil?.nome ?? user.email ?? "Usuário",
        papel: perfil?.papel ?? "",
      }}
      notificacoes={notificacoes}
    >
      {children}
    </PainelShell>
  );
}
