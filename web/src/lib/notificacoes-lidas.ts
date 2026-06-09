"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado de "notificações lidas" persistido no navegador.
 *
 * As notificações do painel são derivadas (pedidos novos, validades e alertas),
 * então não há um campo "lido" único no banco. Guardamos os ids já vistos no
 * localStorage e expomos um conjunto reativo, compartilhado entre o sininho do
 * cabeçalho e o card de alertas do Resumo do mês — clicar numa notificação
 * decrementa a contagem em ambos, na mesma aba e entre abas.
 */

const KEY = "mh:notif-lidas";

let lidas: Set<string> | null = null;
const subscribers = new Set<() => void>();

function carregar(): Set<string> {
  if (lidas) return lidas;
  if (typeof window === "undefined") {
    lidas = new Set();
    return lidas;
  }
  try {
    lidas = new Set<string>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  } catch {
    lidas = new Set();
  }
  return lidas;
}

function persistir(s: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...s]));
  } catch {
    /* ignora cota cheia / modo privado */
  }
}

/** Marca um ou mais ids como lidos (idempotente, dispara re-render). */
export function marcarLidas(ids: string[]) {
  const proximo = new Set(carregar());
  let mudou = false;
  for (const id of ids) {
    if (!proximo.has(id)) {
      proximo.add(id);
      mudou = true;
    }
  }
  if (!mudou) return;
  lidas = proximo; // nova referência → snapshot muda → re-render
  persistir(proximo);
  subscribers.forEach((cb) => cb());
}

function subscribe(cb: () => void): () => void {
  subscribers.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      lidas = null; // força releitura do que outra aba gravou
      carregar();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subscribers.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const VAZIO: Set<string> = new Set();

/** Conjunto reativo de ids de notificações já lidas. */
export function useLidas(): Set<string> {
  return useSyncExternalStore(
    subscribe,
    () => carregar(),
    () => VAZIO,
  );
}
