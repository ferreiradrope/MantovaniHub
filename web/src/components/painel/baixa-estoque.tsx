"use client";

import { useState, useTransition } from "react";
import { MinusCircle, X } from "lucide-react";
import { baixaManual } from "@/lib/actions/estoque";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";

export function BaixaEstoque({
  loteId,
  codigo,
  produto,
  max,
}: {
  loteId: string;
  codigo: string;
  produto: string;
  max: number;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(fd: FormData) {
    fd.set("loteId", loteId);
    startTransition(async () => {
      await baixaManual(fd);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Dar baixa"
        className="rounded-lg p-1.5 text-cafe-claro transition-colors hover:bg-tijolo/10 hover:text-tijolo"
      >
        <MinusCircle size={17} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cafe/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-areia-200 bg-creme-claro p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-cafe">Baixa de estoque</h3>
                <p className="text-sm text-cafe-claro">
                  {produto} · <span className="lote-codigo">{codigo}</span>
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-cafe-claro hover:text-cafe">
                <X size={20} />
              </button>
            </div>
            <form action={onSubmit} className="space-y-3">
              <Field label="Quantidade (kg)" hint={`Disponível: ${max} kg`}>
                <Input name="quantidade" type="number" step="0.001" min="0.001" max={max} required autoFocus />
              </Field>
              <Field label="Motivo">
                <Select name="motivo" defaultValue="Descarte (vencido)">
                  <option>Descarte (vencido)</option>
                  <option>Consumo interno</option>
                  <option>Perda/avaria</option>
                  <option>Ajuste de inventário</option>
                </Select>
              </Field>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="danger" disabled={pending}>
                  {pending ? "Registrando…" : "Confirmar baixa"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
