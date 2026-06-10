// Tipos de domínio do MantovaniHub (espelham o schema PostgreSQL).

export type PapelUsuario = "admin" | "gestor" | "producao";
export type UnidadeVenda = "kg" | "100g" | "500g" | "unidade";
export type StatusLote = "em_producao" | "pronto" | "em_estoque" | "vendido" | "descartado";
export type TipoAlerta = "validade" | "producao" | "estoque_baixo" | "desvio_perda";
export type Severidade = "info" | "atencao" | "critico";
export type TipoCliente = "pf" | "pj";
export type TabelaPreco = "varejo" | "atacado";
export type CanalPedido = "site" | "whatsapp" | "balcao";
export type StatusPedido = "recebido" | "separacao" | "pronto" | "entregue" | "cancelado";
export type TipoEntrega = "motoboy" | "retirada";
export type FormaPagamento = "pix" | "cartao" | "dinheiro";
export type TipoHarmonizacao = "vinho" | "queijo" | "pao" | "cerveja" | "outro";

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
  ativo: boolean;
}

export interface Harmonizacao {
  id: string;
  produto_id: string;
  tipo: TipoHarmonizacao;
  nome: string;
  descricao: string | null;
  foto_url: string | null;
}

export interface Produto {
  id: string;
  categoria_id: string;
  nome: string;
  slug: string;
  descricao: string | null;
  ficha_tecnica: string | null;
  ingredientes: string[];
  foto_url: string | null;
  unidade_venda: UnidadeVenda;
  preco_varejo: number;
  preco_atacado: number | null;
  tempo_producao_dias: number;
  perda_media_pct: number;
  disponivel_fora_mg: boolean;
  sazonal: boolean;
  ativo: boolean;
  criado_em: string;
  // joins opcionais
  categoria?: Categoria | null;
  harmonizacoes?: Harmonizacao[];
  alergenos?: string[];
}

export interface Lote {
  id: string;
  codigo: string | null;
  ano: number | null;
  sequencial: number | null;
  produto_id: string;
  peso_recebido_kg: number;
  peso_apos_limpeza_kg: number | null;
  peso_final_kg: number | null;
  perda_total_kg: number | null;
  perda_total_pct: number | null;
  peso_disponivel_kg: number;
  status: StatusLote;
  data_abertura: string;
  data_conclusao: string | null;
  data_validade: string | null;
  produto?: Produto | null;
}

export interface EstoqueItem {
  lote_id: string;
  codigo: string;
  produto_id: string;
  produto: string;
  categoria: string;
  peso_disponivel_kg: number;
  data_validade: string | null;
  dias_para_vencer: number | null;
  status_validade: "verde" | "amarelo" | "vermelho" | "vencido" | "sem_validade";
}

export interface ProducaoMensal {
  produto_id: string;
  produto: string;
  categoria: string;
  mes: string;
  num_lotes: number;
  total_recebido_kg: number;
  total_produzido_kg: number;
  total_perdido_kg: number;
  perda_media_pct: number;
}

export interface Cliente {
  id: string;
  tipo: TipoCliente;
  nome: string;
  razao_social: string | null;
  cnpj_cpf: string | null;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  cidade: string | null;
  uf: string | null;
  tabela_preco: TabelaPreco;
  observacoes: string | null;
  criado_em: string;
}

export interface Pedido {
  id: string;
  numero: number;
  cliente_id: string | null;
  canal: CanalPedido;
  status: StatusPedido;
  tipo_entrega: TipoEntrega;
  endereco_entrega: string | null;
  valor_produtos: number;
  valor_entrega: number;
  valor_total: number;
  forma_pagamento: FormaPagamento | null;
  pago: boolean;
  recorrente: boolean;
  observacao: string | null;
  criado_em: string;
  cliente?: Cliente | null;
  itens?: PedidoItem[];
}

export interface PedidoItem {
  id: string;
  pedido_id: string;
  produto_id: string;
  lote_id: string | null;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  produto?: Produto | null;
}

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  severidade: Severidade;
  titulo: string;
  mensagem: string | null;
  lote_id: string | null;
  produto_id: string | null;
  data_referencia: string | null;
  lido: boolean;
  resolvido: boolean;
  criado_em: string;
}

export interface Notificacao {
  id: string;
  tipo: "pedido" | "alerta" | "validade";
  titulo: string;
  descricao: string;
  href: string;
  severidade: Severidade;
}

export const CATEGORIA_LABEL: Record<string, string> = {
  defumados: "Defumados",
  maturados: "Maturados",
  curados: "Curados",
  linguicas: "Linguiças",
  assados: "Assados",
  fermentados: "Fermentados",
  "tabua-de-frios": "Tábua de Frios",
  especiais: "Especiais",
  parcerias: "Parcerias",
};

export const UNIDADE_LABEL: Record<UnidadeVenda, string> = {
  kg: "/kg",
  "100g": "/100g",
  "500g": "/500g",
  unidade: "/un",
};

export const STATUS_PEDIDO_LABEL: Record<StatusPedido, string> = {
  recebido: "Recebido",
  separacao: "Em separação",
  pronto: "Pronto",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const CANAL_PEDIDO_LABEL: Record<CanalPedido, string> = {
  site: "Site",
  whatsapp: "WhatsApp",
  balcao: "Balcão",
};

export const TIPO_ENTREGA_LABEL: Record<TipoEntrega, string> = {
  motoboy: "Entrega",
  retirada: "Retirada",
};

export const FORMA_PAGAMENTO_LABEL: Record<FormaPagamento, string> = {
  pix: "Pix",
  cartao: "Cartão",
  dinheiro: "Dinheiro",
};
