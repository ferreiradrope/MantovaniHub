"use client";

import { useRef, useState } from "react";
import { ImagePlus, RefreshCw } from "lucide-react";

export function UploadFoto({ fotoAtual }: { fotoAtual?: string | null }) {
  const [preview, setPreview] = useState<string | null>(fotoAtual ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex items-center gap-4">
      <input ref={inputRef} type="file" name="foto" accept="image/*" onChange={onChange} className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-areia-300 bg-creme"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Pré-visualização" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-1 text-cafe-300">
            <ImagePlus size={22} />
            <span className="text-[10px]">Adicionar</span>
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-vinho-950/0 text-creme-claro opacity-0 transition-all group-hover:bg-vinho-950/40 group-hover:opacity-100">
          <RefreshCw size={18} />
        </span>
      </button>
      <div className="text-sm text-cafe-claro">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-semibold text-vinho-600 hover:underline"
        >
          {preview ? "Trocar foto" : "Enviar foto"}
        </button>
        <p className="mt-0.5 text-xs text-cafe-300">JPG ou PNG. Aparece no cardápio.</p>
      </div>
    </div>
  );
}
