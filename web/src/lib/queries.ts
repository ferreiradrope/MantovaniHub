import { createClient } from "@/lib/supabase/server";
import { formatBRL } from "./utils";
import type {
  Produto,
  Categoria,
  EstoqueItem,
  ProducaoMensal,
  Lote,
  Pedido,
  Cliente,
  Alerta,
  Notificacao,
} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProduto(row: any): Produto {
  return {
    ...row,
    categoria: row.categoria ?? null,
    harmonizacoes: row.harmonizacoes ?? [],
    alergenos: (row.produto_alergenos ?? [])
      .map((pa: any) => pa.alergenos?.nome)
      .filter(Boolean),
  };
}

const PRODUTO_SELECT =
  "*, categoria:categorias(*), harmonizacoes(*), produto_alergenos(alergenos(nome))";

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)
    .order("ordem");
  return data ?? [];
}

/** Produtos públicos do cardápio (ativos), com categoria, harmonizações e alérgenos. */
export async function getProdutosCardapio(): Promise<Produto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select(PRODUTO_SELECT)
    .eq("ativo", true)
    .order("nome");
  if (error) return [];
  return (data ?? []).map(mapProduto);
}

export async function getProdutoBySlug(slug: string): Promise<Produto | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select(PRODUTO_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  return data ? mapProduto(data) : null;
}

/** Todos os produtos (admin), incluindo inativos. */
export async function getProdutos(): Promise<Produto[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select(PRODUTO_SELECT)
    .order("nome");
  return (data ?? []).map(mapProduto);
}

export async function getEstoqueAtual(): Promise<EstoqueItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vw_estoque_atual")
    .select("*")
    .order("dias_para_vencer");
  return (data ?? []) as EstoqueItem[];
}

export async function getProducaoMensal(): Promise<ProducaoMensal[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vw_producao_mensal")
    .select("*")
    .order("mes");
  return (data ?? []) as ProducaoMensal[];
}

export async function getLotes(): Promise<Lote[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lotes")
    .select("*, produto:produtos(nome, slug, unidade_venda)")
    .order("data_abertura", { ascending: false });
  return (data ?? []) as Lote[];
}

export async function getAlertas(): Promise<Alerta[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("alertas")
    .select("*")
    .eq("resolvido", false)
    .order("severidade", { ascending: false })
    .order("data_referencia");
  return (data ?? []) as Alerta[];
}

export async function getClientes(): Promise<Cliente[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("clientes").select("*").order("nome");
  return (data ?? []) as Cliente[];
}

/** Notificações do painel: pedidos novos + validades críticas + alertas (HU017). */
export async function getNotificacoes(): Promise<Notificacao[]> {
  const supabase = await createClient();
  const [pedidos, alertas, estoque] = await Promise.all([
    supabase
      .from("pedidos")
      .select("id, numero, valor_total, cliente:clientes(nome)")
      .eq("status", "recebido")
      .order("criado_em", { ascending: false }),
    supabase.from("alertas").select("*").eq("resolvido", false),
    supabase.from("vw_estoque_atual").select("*").lte("dias_para_vencer", 7),
  ]);

  const notifs: Notificacao[] = [];
  for (const p of (pedidos.data ?? []) as any[]) {
    notifs.push({
      id: `pedido-${p.id}`,
      tipo: "pedido",
      titulo: `Novo pedido #${p.numero}`,
      descricao: `${p.cliente?.nome ?? "Cliente"} · ${formatBRL(p.valor_total)}`,
      href: "/painel/pedidos",
      severidade: "atencao",
    });
  }
  for (const e of (estoque.data ?? []) as any[]) {
    notifs.push({
      id: `validade-${e.lote_id}`,
      tipo: "validade",
      titulo: `${e.produto} vencendo`,
      descricao: `Lote ${e.codigo} · ${e.dias_para_vencer < 0 ? "vencido" : `vence em ${e.dias_para_vencer}d`}`,
      href: "/painel/estoque",
      severidade: (e.dias_para_vencer ?? 9) <= 3 ? "critico" : "atencao",
    });
  }
  for (const a of (alertas.data ?? []) as any[]) {
    notifs.push({
      id: `alerta-${a.id}`,
      tipo: "alerta",
      titulo: a.titulo,
      descricao: a.mensagem ?? "",
      href: a.tipo === "validade" ? "/painel/estoque" : "/painel",
      severidade: a.severidade,
    });
  }
  return notifs;
}

export async function getConfig(): Promise<any> {
  const supabase = await createClient();
  const { data } = await supabase.from("config_negocio").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getCliente(id: string): Promise<Cliente | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("clientes").select("*").eq("id", id).maybeSingle();
  return (data as Cliente) ?? null;
}

export async function getLote(id: string): Promise<Lote | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lotes")
    .select("*, produto:produtos(*)")
    .eq("id", id)
    .maybeSingle();
  return (data as Lote) ?? null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getFornecedores(): Promise<any[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("fornecedores").select("*").order("nome");
  return data ?? [];
}

export async function getAlergenos(): Promise<{ id: string; nome: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("alergenos").select("*").order("nome");
  return data ?? [];
}

export async function getProdutoEdicao(id: string): Promise<{ produto: Produto | null; alergenoIds: string[] }> {
  const supabase = await createClient();
  const [{ data: produto }, { data: pa }] = await Promise.all([
    supabase.from("produtos").select("*").eq("id", id).maybeSingle(),
    supabase.from("produto_alergenos").select("alergeno_id").eq("produto_id", id),
  ]);
  return { produto: (produto as Produto) ?? null, alergenoIds: (pa ?? []).map((x: any) => x.alergeno_id) };
}

export async function getPedidos(): Promise<Pedido[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pedidos")
    .select("*, cliente:clientes(*), itens:pedido_itens(*, produto:produtos(nome, slug, unidade_venda))")
    .order("criado_em", { ascending: false });
  return (data ?? []) as Pedido[];
}
