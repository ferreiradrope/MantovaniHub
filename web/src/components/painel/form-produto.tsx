import Link from "next/link";
import { salvarProduto } from "@/lib/actions/produtos";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { UploadFoto } from "@/components/painel/upload-foto";
import type { Produto, Categoria } from "@/lib/types";

export function FormProduto({
  produto,
  categorias,
  alergenos,
  alergenoIds = [],
}: {
  produto?: Produto | null;
  categorias: Categoria[];
  alergenos: { id: string; nome: string }[];
  alergenoIds?: string[];
}) {
  return (
    <form action={salvarProduto} className="space-y-5">
      {produto && <input type="hidden" name="id" value={produto.id} />}

      {/* Dados principais */}
      <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-cafe">Dados do produto</h2>
        <UploadFoto fotoAtual={produto?.foto_url} />
        <Field label="Nome">
          <Input name="nome" required defaultValue={produto?.nome ?? ""} placeholder="Ex.: Coppa" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Categoria">
            <Select name="categoria_id" required defaultValue={produto?.categoria_id ?? ""}>
              <option value="" disabled>
                Selecione…
              </option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Unidade de venda">
            <Select name="unidade_venda" defaultValue={produto?.unidade_venda ?? "100g"}>
              <option value="100g">por 100g</option>
              <option value="500g">por 500g</option>
              <option value="kg">por kg</option>
              <option value="unidade">por unidade</option>
            </Select>
          </Field>
          <Field label="Preço varejo (R$)">
            <Input name="preco_varejo" type="number" step="0.01" min="0" required defaultValue={produto?.preco_varejo ?? ""} />
          </Field>
          <Field label="Preço atacado (R$)" hint="Tabela PJ — opcional">
            <Input name="preco_atacado" type="number" step="0.01" min="0" defaultValue={produto?.preco_atacado ?? ""} />
          </Field>
          <Field label="Tempo de produção (dias)">
            <Input name="tempo_producao_dias" type="number" min="0" defaultValue={produto?.tempo_producao_dias ?? 1} />
          </Field>
          <Field label="Perda média (%)" hint="Referência (RN004)">
            <Input name="perda_media_pct" type="number" step="0.1" min="0" max="100" defaultValue={produto?.perda_media_pct ?? 0} />
          </Field>
        </div>
      </div>

      {/* Ficha técnica */}
      <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-cafe">Ficha técnica</h2>
        <Field label="Descrição" hint="Aparece no cardápio">
          <Textarea name="descricao" defaultValue={produto?.descricao ?? ""} placeholder="Descrição curta e apetitosa…" />
        </Field>
        <Field label="Como é feito" hint="Processo artesanal (opcional)">
          <Textarea name="ficha_tecnica" defaultValue={produto?.ficha_tecnica ?? ""} />
        </Field>
        <Field label="Ingredientes" hint="Separe por vírgula">
          <Textarea name="ingredientes" defaultValue={produto?.ingredientes?.join(", ") ?? ""} placeholder="Carne suína, Sal, Pimenta…" />
        </Field>
      </div>

      {/* Alérgenos e disponibilidade */}
      <div className="space-y-4 rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-cafe">Alérgenos e disponibilidade</h2>
        <div>
          <p className="mb-2 text-sm font-semibold text-cafe">Contém alérgenos</p>
          <div className="flex flex-wrap gap-2">
            {alergenos.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-areia-300 bg-creme-claro px-3 py-1.5 text-sm has-checked:border-tijolo has-checked:bg-tijolo/10 has-checked:text-tijolo"
              >
                <input type="checkbox" name="alergenos" value={a.id} defaultChecked={alergenoIds.includes(a.id)} className="accent-tijolo" />
                {a.nome}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
            <input type="checkbox" name="ativo" defaultChecked={produto ? produto.ativo : true} className="accent-vinho-600" /> Ativo
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
            <input type="checkbox" name="sazonal" defaultChecked={produto?.sazonal ?? false} className="accent-dourado" /> Sazonal
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-cafe">
            <input type="checkbox" name="disponivel_fora_mg" defaultChecked={produto?.disponivel_fora_mg ?? false} className="accent-oliva" /> Envio para fora de MG
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Link href="/painel/produtos">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
        </Link>
        <Button type="submit">{produto ? "Salvar alterações" : "Cadastrar produto"}</Button>
      </div>
    </form>
  );
}
