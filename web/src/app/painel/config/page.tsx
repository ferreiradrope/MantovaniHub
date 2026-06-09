import type { Metadata } from "next";
import { getConfig } from "@/lib/queries";
import { salvarConfig } from "@/lib/actions/config";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export const metadata: Metadata = { title: "Configurações" };

export default async function ConfigPage() {
  const config = await getConfig();
  const canais = config?.canais_notificacao ?? { push: true, email: true, whatsapp: false };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Configurações" subtitle="Parâmetros do negócio e preferências de alerta" />

      <form action={salvarConfig} className="space-y-5">
        <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold text-cafe">Dados da empresa</h2>
          <Field label="Nome">
            <Input name="nome_empresa" defaultValue={config?.nome_empresa ?? ""} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="WhatsApp" hint="Apenas números, com DDI">
              <Input name="whatsapp" defaultValue={config?.whatsapp ?? ""} />
            </Field>
            <Field label="Instagram" hint="@usuário">
              <Input name="instagram" defaultValue={config?.instagram ?? ""} />
            </Field>
            <Field label="E-mail">
              <Input name="email" type="email" defaultValue={config?.email ?? ""} />
            </Field>
            <Field label="Endereço">
              <Input name="endereco" defaultValue={config?.endereco ?? ""} />
            </Field>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold text-cafe">Alertas e notificações</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Alertas de validade (dias)" hint="Separe por vírgula">
              <Input name="alerta_validade_dias" defaultValue={(config?.alerta_validade_dias ?? [30, 15, 1]).join(", ")} />
            </Field>
            <Field label="Pós-venda (dias após entrega)">
              <Input name="pos_venda_dias" type="number" min="0" defaultValue={config?.pos_venda_dias ?? 5} />
            </Field>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-cafe">Canais de notificação</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
                <input type="checkbox" name="push" defaultChecked={canais.push} className="accent-vinho-600" /> Push
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
                <input type="checkbox" name="canal_email" defaultChecked={canais.email} className="accent-vinho-600" /> E-mail
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
                <input type="checkbox" name="canal_whatsapp" defaultChecked={canais.whatsapp} className="accent-vinho-600" /> WhatsApp
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar configurações</Button>
        </div>
      </form>
    </div>
  );
}
