"use client";

import { useEffect, useState } from "react";
import { Download, X, Share, SquarePlus, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstalarPWA({ className }: { className?: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(true); // não exibe até confirmar que NÃO está instalado
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  async function instalar() {
    if (deferred) {
      deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferred(null);
    } else {
      setShowHelp(true);
    }
  }

  const isIOS = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <>
      <button
        onClick={instalar}
        className={cn("inline-flex items-center gap-2 text-sm font-semibold transition-colors", className)}
      >
        <Download size={16} /> Instalar app
      </button>

      {showHelp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cafe/50 backdrop-blur-sm" onClick={() => setShowHelp(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-areia-200 bg-creme-claro p-6 shadow-2xl">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute right-4 top-4 text-cafe-claro hover:text-cafe"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-lg font-semibold text-cafe">Instalar o MantovaniHub</h3>
            <p className="mt-1 text-sm text-cafe-claro">
              Tenha o app na tela inicial, com ícone próprio e acesso rápido.
            </p>
            <ol className="mt-4 space-y-3 text-sm text-cafe">
              {isIOS ? (
                <>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vinho-600/10 text-vinho-600">
                      <Share size={15} />
                    </span>
                    Toque em <strong>Compartilhar</strong> no Safari
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vinho-600/10 text-vinho-600">
                      <SquarePlus size={15} />
                    </span>
                    Escolha <strong>Adicionar à Tela de Início</strong>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vinho-600/10 text-vinho-600">
                      <MoreVertical size={15} />
                    </span>
                    Abra o menu do navegador
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vinho-600/10 text-vinho-600">
                      <Download size={15} />
                    </span>
                    Toque em <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>
                  </li>
                </>
              )}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
