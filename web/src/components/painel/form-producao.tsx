"use client";

import { useState, useTransition } from "react";
import { Save, PackageCheck } from "lucide-react";
import { registrarProducao } from "@/lib/actions/lotes";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { Lote } from "@/lib/types";

export function FormProducao({ lote }: { lote: Lote }) {
  const [aposLimpeza, setAposLimpeza] = useState(lote.peso_apos_limpeza_kg?.toString() ?? "");
  const [pesoFinal, setPesoFinal] = useState(lote.peso_final_kg?.toString() ?? "");
  const [validade, setValidade] = useState(lote.data_validade ?? "");
  const [pending, startTransition] = useTransition();

  const finalizado = lote.status === "em_estoque" || lote.status === "vendido" || lote.status === "descartado";
  const perdaPct =
    pesoFinal && lote.peso_recebido_kg
      ? ((lote.peso_recebido_kg - Number(pesoFinal)) / lote.peso_recebido_kg) * 100
      : null;
  const perdaKg = pesoFinal ? lote.peso_recebido_kg - Number(pesoFinal) : null;
  const desvio = perdaPct != null && lote.produto ? perdaPct - lote.produto.perda_media_pct : null;

  function submit(finalizar: boolean) {
    const fd = new FormData();
    fd.set("loteId", lote.id);
    if (aposLimpeza) fd.set("peso_apos_limpeza_kg", aposLimpeza);
    if (pesoFinal) fd.set("peso_final_kg", pesoFinal);
    if (validade) fd.set("data_validade", validade);
    if (finalizar) fd.set("finalizar", "1");
    startTransition(() => {
      registrarProducao(fd);
    });
  }

  return (
    <div className="rounded-2xl border border-areia-200 bg-white/80 p-6 shadow-soft">
      <h2 className="mb-4 font-display text-lg font-semibold text-cafe">Apontamento de produção</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Peso após limpeza (kg)">
          <Input
            type="number"
            step="0.001"
            value={aposLimpeza}
            onChange={(e) => setAposLimpeza(e.target.value)}
            disabled={finalizado}
            placeholder="—"
          />
        </Field>
        <Field label="Peso final pronto (kg)">
          <Input
            type="number"
            step="0.001"
            value={pesoFinal}
            onChange={(e) => setPesoFinal(e.target.value)}
            disabled={finalizado}
            placeholder="—"
          />
        </Field>
        <Field label="Validade" hint="Conta a partir da finalização (RN006)">
          <Input
            type="date"
            value={validade ?? ""}
            onChange={(e) => setValidade(e.target.value)}
            disabled={finalizado}
          />
        </Field>
        <div className="flex items-end">
          {perdaPct != null && (
            <div className="w-full rounded-xl border border-areia-300 bg-creme px-4 py-2.5">
              <div className="text-xs text-cafe-claro">Perda calculada</div>
              <div className="font-display text-xl font-semibold text-vinho-700">
                {perdaKg?.toFixed(3)} kg · {perdaPct.toFixed(1)}%
              </div>
              {desvio != null && Math.abs(desvio) > 10 && (
                <div className="mt-0.5 text-xs font-medium text-tijolo">
                  ⚠ {desvio > 0 ? "+" : ""}
                  {desvio.toFixed(0)} pts vs. média ({lote.produto?.perda_media_pct}%)
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!finalizado && (
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={() => submit(false)} disabled={pending}>
            <Save size={17} /> Salvar pesagem
          </Button>
          <Button onClick={() => submit(true)} disabled={pending || !pesoFinal || !validade}>
            <PackageCheck size={17} /> Finalizar e enviar ao estoque
          </Button>
        </div>
      )}
      {finalizado && (
        <p className="mt-4 rounded-lg bg-oliva/10 px-4 py-2.5 text-sm font-medium text-oliva">
          ✓ Lote concluído e disponível no estoque.
        </p>
      )}
    </div>
  );
}
