import Link from "next/link";
import { salvarCliente } from "@/lib/actions/clientes";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import type { Cliente } from "@/lib/types";

export function FormCliente({ cliente }: { cliente?: Cliente | null }) {
  return (
    <form action={salvarCliente} className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
      {cliente && <input type="hidden" name="id" value={cliente.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo">
          <Select name="tipo" defaultValue={cliente?.tipo ?? "pf"}>
            <option value="pf">Pessoa física</option>
            <option value="pj">Pessoa jurídica</option>
          </Select>
        </Field>
        <Field label="Tabela de preço">
          <Select name="tabela_preco" defaultValue={cliente?.tabela_preco ?? "varejo"}>
            <option value="varejo">Varejo</option>
            <option value="atacado">Atacado (PJ)</option>
          </Select>
        </Field>
      </div>

      <Field label="Nome / Nome fantasia">
        <Input name="nome" required defaultValue={cliente?.nome ?? ""} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Razão social" hint="PJ">
          <Input name="razao_social" defaultValue={cliente?.razao_social ?? ""} />
        </Field>
        <Field label="CNPJ / CPF">
          <Input name="cnpj_cpf" defaultValue={cliente?.cnpj_cpf ?? ""} />
        </Field>
        <Field label="Telefone / WhatsApp">
          <Input name="telefone" defaultValue={cliente?.telefone ?? ""} />
        </Field>
        <Field label="E-mail">
          <Input name="email" type="email" defaultValue={cliente?.email ?? ""} />
        </Field>
      </div>

      <Field label="Endereço">
        <Input name="endereco" defaultValue={cliente?.endereco ?? ""} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <Field label="Cidade">
          <Input name="cidade" defaultValue={cliente?.cidade ?? ""} />
        </Field>
        <Field label="UF">
          <Input name="uf" maxLength={2} defaultValue={cliente?.uf ?? ""} placeholder="MG" />
        </Field>
      </div>

      <Field label="Observações">
        <Textarea name="observacoes" defaultValue={cliente?.observacoes ?? ""} placeholder="Preferências, restrições, histórico…" />
      </Field>

      <div className="flex justify-end gap-2">
        <Link href="/painel/clientes">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
        </Link>
        <Button type="submit">{cliente ? "Salvar" : "Cadastrar cliente"}</Button>
      </div>
    </form>
  );
}
