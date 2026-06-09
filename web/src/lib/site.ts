import type { Produto } from "./types";
import { formatBRL } from "./utils";
import { UNIDADE_LABEL } from "./types";

export const SITE = {
  nome: "Charcutaria Mantovani",
  whatsapp: "5531991057351",
  instagram: "charcutariamantovani",
  email: "charcutariamantovani@gmail.com",
  cidade: "Belo Horizonte / MG",
};

/** Monta um link wa.me com mensagem pré-formatada. */
export function whatsappLink(mensagem: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem de pedido de um produto pelo WhatsApp (HU006). */
export function pedidoProdutoWhatsapp(p: Produto) {
  return whatsappLink(
    `Olá! Tenho interesse no produto *${p.nome}* (${precoLabel(p)}) do cardápio da Charcutaria Mantovani. Pode me ajudar?`,
  );
}

export function precoLabel(p: Produto) {
  return `${formatBRL(p.preco_varejo)} ${UNIDADE_LABEL[p.unidade_venda]}`;
}
