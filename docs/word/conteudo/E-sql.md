```sql
-- =====================================================================
--  MantovaniHub — Plataforma de Gestão Integrada para Charcutaria
--  Modelo Físico do Banco de Dados (PostgreSQL / Supabase)
--  Projeto: Charcutaria Mantovani — UC Modelagem de Software 2026/1
--  Versão: 2.0
--
--  Convenções:
--   * Chaves primárias: uuid (gen_random_uuid()).
--   * Pesos em quilogramas: numeric(10,3). Preços em reais: numeric(10,2).
--   * Nomes de tabelas e colunas em português (domínio da charcutaria).
--   * Perdas calculadas por colunas GENERATED para garantir consistência.
-- =====================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- ---------------------------------------------------------------------
-- 1. TIPOS ENUMERADOS (domínio controlado)
-- ---------------------------------------------------------------------
create type papel_usuario     as enum ('admin', 'gestor', 'producao');
create type unidade_venda      as enum ('kg', '100g', '500g', 'unidade');
create type tipo_insumo        as enum ('carne', 'peixe', 'outro');
create type status_lote        as enum ('em_producao', 'pronto', 'em_estoque', 'vendido', 'descartado');
create type tipo_movimento     as enum ('entrada', 'venda', 'baixa_manual', 'descarte', 'ajuste');
create type tipo_alerta        as enum ('validade', 'producao', 'estoque_baixo', 'desvio_perda');
create type severidade_alerta  as enum ('info', 'atencao', 'critico');
create type tipo_cliente       as enum ('pf', 'pj');
create type tabela_preco       as enum ('varejo', 'atacado');
create type canal_pedido       as enum ('site', 'whatsapp', 'balcao');
create type status_pedido      as enum ('recebido', 'separacao', 'pronto', 'entregue', 'cancelado');
create type tipo_entrega       as enum ('motoboy', 'retirada');
create type forma_pagamento    as enum ('pix', 'cartao', 'dinheiro');
create type tipo_harmonizacao  as enum ('vinho', 'queijo', 'pao', 'cerveja', 'outro');

-- ---------------------------------------------------------------------
-- 2. ACESSO E USUÁRIOS  (HU015 / RF036 / RF037 / RN014)
--    Integra-se ao Supabase Auth (auth.users). Cada perfil estende um
--    usuário autenticado com seu papel no sistema.
-- ---------------------------------------------------------------------
create table perfis (
    id            uuid primary key references auth.users(id) on delete cascade,
    nome          text          not null,
    papel         papel_usuario not null default 'producao',
    telefone      text,
    ativo         boolean       not null default true,
    ultimo_acesso timestamptz,
    criado_em     timestamptz   not null default now()
);
comment on table perfis is 'Usuários administrativos (Douglas, esposa, produção) com papel de acesso.';

-- ---------------------------------------------------------------------
-- 3. CATÁLOGO DE PRODUTOS  (HU001 / HU006 / HU011 / HU021 / HU022)
-- ---------------------------------------------------------------------
create table categorias (
    id        uuid primary key default gen_random_uuid(),
    nome      text    not null unique,
    slug      text    not null unique,
    ordem     int     not null default 0,
    ativo     boolean not null default true
);
comment on table categorias is 'Categorias do cardápio: Defumados, Maturados, Curados, Linguiças, Assados, Fermentados, Tábua de frios, etc.';

create table alergenos (
    id    uuid primary key default gen_random_uuid(),
    nome  text not null unique           -- Glúten, Lactose, Pimenta, Crustáceos...
);

create table produtos (
    id                  uuid primary key default gen_random_uuid(),
    categoria_id        uuid not null references categorias(id),
    nome                text not null,
    slug                text not null unique,
    descricao           text,
    ficha_tecnica       text,                              -- modo de produção / curiosidades
    ingredientes        text[] not null default '{}',      -- lista de ingredientes
    foto_url            text,
    unidade_venda       unidade_venda not null default '100g',
    preco_varejo        numeric(10,2) not null default 0,
    preco_atacado       numeric(10,2),                     -- tabela PJ (RN012/RN016)
    tempo_producao_dias int  not null default 1,           -- HU001
    perda_media_pct     numeric(5,2) not null default 0
                        check (perda_media_pct between 0 and 100),  -- HU001
    disponivel_fora_mg  boolean not null default false,    -- RN013
    sazonal             boolean not null default false,
    ativo               boolean not null default true,     -- desativar sem excluir (HU001)
    criado_em           timestamptz not null default now()
);
comment on column produtos.perda_media_pct is 'Perda média histórica (referência, não valor fixo — RN004).';

-- N:N produto <-> alérgeno
create table produto_alergenos (
    produto_id  uuid not null references produtos(id) on delete cascade,
    alergeno_id uuid not null references alergenos(id) on delete cascade,
    primary key (produto_id, alergeno_id)
);

-- Roteiro de produção por produto: durações de cada etapa (HU016 / RF038)
create table produto_etapas (
    id           uuid primary key default gen_random_uuid(),
    produto_id   uuid not null references produtos(id) on delete cascade,
    ordem        int  not null,
    nome_etapa   text not null,            -- Limpeza, Cura, Defumação, Maturação, Embalagem
    duracao_dias int  not null default 0,
    unique (produto_id, ordem)
);

-- Sugestões de harmonização "Combina com..." (HU011 / RF029)
create table harmonizacoes (
    id            uuid primary key default gen_random_uuid(),
    produto_id    uuid not null references produtos(id) on delete cascade,
    tipo          tipo_harmonizacao not null,
    nome          text not null,           -- "Vinho Malbec", "Queijo Canastra", "Pão sourdough"
    descricao     text,
    foto_url      text
);

-- ---------------------------------------------------------------------
-- 4. SUPRIMENTOS E PRODUÇÃO  (HU002 / HU003 / RF003-RF008 / RN001-RN006)
-- ---------------------------------------------------------------------
create table fornecedores (
    id       uuid primary key default gen_random_uuid(),
    nome     text not null,
    contato  text,
    cidade   text,
    uf       char(2)
);

-- Entrada de matéria-prima → origem do lote (HU002)
create table insumos_entrada (
    id                 uuid primary key default gen_random_uuid(),
    fornecedor_id      uuid references fornecedores(id),
    produto_destino_id uuid not null references produtos(id),
    tipo_insumo        tipo_insumo not null default 'carne',
    nf_numero          text,
    lote_fornecedor    text,                       -- distinto do lote interno (RN003)
    peso_recebido_kg   numeric(10,3) not null check (peso_recebido_kg > 0),
    data_entrada       date not null default current_date,
    foto_nf_url        text,
    observacao         text,
    criado_em          timestamptz not null default now()
);

-- Lote interno (rastreabilidade AAA.NNN) — RN001/RN002
create table lotes (
    id                  uuid primary key default gen_random_uuid(),
    codigo              text,                        -- AAA.NNN, sequencial por produto/ano (RN001), ex.: 026.015
    ano                 int,
    sequencial          int,
    produto_id          uuid not null references produtos(id),
    insumo_entrada_id   uuid references insumos_entrada(id),
    peso_recebido_kg    numeric(10,3) not null check (peso_recebido_kg > 0),
    peso_apos_limpeza_kg numeric(10,3),
    peso_final_kg       numeric(10,3),
    -- Perdas calculadas automaticamente (RF007):
    perda_total_kg  numeric(10,3) generated always as
        (case when peso_final_kg is not null then peso_recebido_kg - peso_final_kg end) stored,
    perda_total_pct numeric(6,2) generated always as
        (case when peso_final_kg is not null and peso_recebido_kg > 0
              then round((peso_recebido_kg - peso_final_kg) / peso_recebido_kg * 100, 2) end) stored,
    peso_disponivel_kg  numeric(10,3) not null default 0,   -- saldo em estoque (FEFO)
    status              status_lote not null default 'em_producao',
    data_abertura       date not null default current_date,
    data_conclusao      date,                        -- validade conta a partir daqui (RN006)
    data_validade       date,
    created_by          uuid references perfis(id),
    criado_em           timestamptz not null default now(),
    unique (produto_id, ano, sequencial)
);
comment on table lotes is 'Lote interno com rastreabilidade do insumo ao produto final (RN002).';

-- Apontamento real das etapas + pesagens (HU003 / RF006) e datas previstas (HU016)
create table lote_etapas (
    id             uuid primary key default gen_random_uuid(),
    lote_id        uuid not null references lotes(id) on delete cascade,
    ordem          int  not null,
    nome_etapa     text not null,
    peso_entrada_kg numeric(10,3),
    peso_saida_kg   numeric(10,3),
    perda_kg  numeric(10,3) generated always as
        (case when peso_entrada_kg is not null and peso_saida_kg is not null
              then peso_entrada_kg - peso_saida_kg end) stored,
    perda_pct numeric(6,2) generated always as
        (case when peso_entrada_kg is not null and peso_saida_kg is not null and peso_entrada_kg > 0
              then round((peso_entrada_kg - peso_saida_kg) / peso_entrada_kg * 100, 2) end) stored,
    data_prevista  date,                 -- agenda de maturação (HU016)
    data_concluida date,
    concluida      boolean not null default false,
    observacao     text,
    unique (lote_id, ordem)
);

-- ---------------------------------------------------------------------
-- 5. ESTOQUE — livro-razão de movimentos (HU013 / RF031 / RF032)
-- ---------------------------------------------------------------------
create table estoque_movimentos (
    id           uuid primary key default gen_random_uuid(),
    lote_id      uuid not null references lotes(id),
    tipo         tipo_movimento not null,
    quantidade_kg numeric(10,3) not null,       -- positivo entrada, negativo saída
    motivo       text,
    pedido_id    uuid,                            -- FK lógica p/ pedidos (saída por venda)
    created_by   uuid references perfis(id),
    criado_em    timestamptz not null default now()
);
comment on table estoque_movimentos is 'Histórico de entradas/saídas; o saldo materializado fica em lotes.peso_disponivel_kg.';

-- ---------------------------------------------------------------------
-- 6. ALERTAS E AGENDA DE PRODUÇÃO  (HU005 / HU016 / RF011 / RF039 / RF040)
-- ---------------------------------------------------------------------
create table alertas (
    id              uuid primary key default gen_random_uuid(),
    tipo            tipo_alerta not null,
    severidade      severidade_alerta not null default 'info',
    titulo          text not null,
    mensagem        text,
    lote_id         uuid references lotes(id) on delete cascade,
    produto_id      uuid references produtos(id) on delete cascade,
    data_referencia date,
    lido            boolean not null default false,
    resolvido       boolean not null default false,
    criado_em       timestamptz not null default now()
);

-- Datas comemorativas para cálculo regressivo de início de produção (HU016 / RN015)
create table datas_alvo (
    id        uuid primary key default gen_random_uuid(),
    nome      text not null,                 -- "Natal 2026", "Dia das Mães"
    data_alvo date not null,
    descricao text
);

-- ---------------------------------------------------------------------
-- 7. CLIENTES (CRM)  (HU018 / RF042 / RN012)
-- ---------------------------------------------------------------------
create table clientes (
    id           uuid primary key default gen_random_uuid(),
    tipo         tipo_cliente not null default 'pf',
    nome         text not null,
    razao_social text,
    cnpj_cpf     text,
    telefone     text,
    email        text,
    endereco     text,
    cidade       text,
    uf           char(2),
    tabela_preco tabela_preco not null default 'varejo',   -- RN016
    observacoes  text,
    criado_em    timestamptz not null default now()
);

create table cliente_feedback (
    id         uuid primary key default gen_random_uuid(),
    cliente_id uuid not null references clientes(id) on delete cascade,
    pedido_id  uuid,
    nota       int check (nota between 1 and 5),
    comentario text,
    criado_em  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 8. PEDIDOS E VENDAS  (HU007 / HU019 / HU020 / RF016-RF020 / RF043 / RN017)
-- ---------------------------------------------------------------------
create table pedidos (
    id              uuid primary key default gen_random_uuid(),
    numero          serial unique,
    cliente_id      uuid references clientes(id),
    canal           canal_pedido not null default 'site',
    status          status_pedido not null default 'recebido',
    tipo_entrega    tipo_entrega not null default 'retirada',
    endereco_entrega text,
    valor_produtos  numeric(10,2) not null default 0,
    valor_entrega   numeric(10,2) not null default 0,
    valor_total     numeric(10,2) generated always as (valor_produtos + valor_entrega) stored,
    forma_pagamento forma_pagamento,
    pago            boolean not null default false,
    recorrente      boolean not null default false,        -- pedido recorrente PJ (HU020)
    observacao      text,
    criado_em       timestamptz not null default now()
);

create table pedido_itens (
    id            uuid primary key default gen_random_uuid(),
    pedido_id     uuid not null references pedidos(id) on delete cascade,
    produto_id    uuid not null references produtos(id),
    lote_id       uuid references lotes(id),               -- definido na separação (FEFO)
    quantidade    numeric(10,3) not null check (quantidade > 0),
    preco_unitario numeric(10,2) not null,
    subtotal      numeric(10,2) generated always as (quantidade * preco_unitario) stored
);

create table pedido_status_hist (
    id         uuid primary key default gen_random_uuid(),
    pedido_id  uuid not null references pedidos(id) on delete cascade,
    status     status_pedido not null,
    usuario_id uuid references perfis(id),
    criado_em  timestamptz not null default now()
);

-- FK lógica de estoque_movimentos.pedido_id (criada após pedidos existir)
alter table estoque_movimentos
    add constraint fk_mov_pedido foreign key (pedido_id) references pedidos(id) on delete set null;
alter table cliente_feedback
    add constraint fk_feedback_pedido foreign key (pedido_id) references pedidos(id) on delete set null;

-- ---------------------------------------------------------------------
-- 9. CLUBE DE ASSINATURA  (HU010 / RF026-RF028) — vitrine + modelo
-- ---------------------------------------------------------------------
create table planos_assinatura (
    id          uuid primary key default gen_random_uuid(),
    nome        text not null,            -- Essencial, Intermediário, Premium
    descricao   text,
    preco_mensal numeric(10,2) not null,
    beneficios  text[] not null default '{}',
    ativo       boolean not null default true
);

create table assinaturas (
    id            uuid primary key default gen_random_uuid(),
    cliente_id    uuid not null references clientes(id),
    plano_id      uuid not null references planos_assinatura(id),
    status        text not null default 'ativa',   -- ativa, pausada, cancelada
    data_inicio   date not null default current_date,
    proximo_ciclo date
);

-- ---------------------------------------------------------------------
-- 10. CONFIGURAÇÕES DO NEGÓCIO  (HU022 / RF046)
-- ---------------------------------------------------------------------
create table config_negocio (
    id                  int primary key default 1 check (id = 1),  -- singleton
    nome_empresa        text not null default 'Charcutaria Mantovani',
    whatsapp            text default '5531991057351',
    email               text default 'charcutariamantovani@gmail.com',
    instagram           text default 'charcutariamantovani',
    endereco            text default 'Bairro Prado, Belo Horizonte/MG',
    link_cardapio       text,
    alerta_validade_dias int[] not null default '{30,15,1}',
    pos_venda_dias      int not null default 5,
    canais_notificacao  jsonb not null default '{"push":true,"email":true,"whatsapp":false}'
);

-- ---------------------------------------------------------------------
-- 11. FUNÇÕES E GATILHOS
-- ---------------------------------------------------------------------
-- Geração automática do código de lote no formato AAA.NNN (RN001):
--   AAA = três últimos dígitos do ano; NNN = sequencial por produto/ano.
create or replace function fn_gerar_codigo_lote() returns trigger as $$
declare
    v_ano int := extract(year from coalesce(new.data_abertura, current_date));
    v_seq int;
begin
    if new.codigo is not null then
        return new;
    end if;
    select coalesce(max(sequencial), 0) + 1 into v_seq
      from lotes
     where produto_id = new.produto_id and ano = v_ano;
    new.ano        := v_ano;
    new.sequencial := v_seq;
    new.codigo     := lpad((v_ano % 1000)::text, 3, '0') || '.' || lpad(v_seq::text, 3, '0');
    return new;
end;
$$ language plpgsql;

create trigger trg_gerar_codigo_lote
    before insert on lotes
    for each row execute function fn_gerar_codigo_lote();

-- Ao finalizar o lote (status 'em_estoque'), inicializa o saldo disponível.
create or replace function fn_lote_para_estoque() returns trigger as $$
begin
    if new.status = 'em_estoque' and (old.status is distinct from 'em_estoque') then
        new.peso_disponivel_kg := coalesce(new.peso_final_kg, 0);
        insert into estoque_movimentos (lote_id, tipo, quantidade_kg, motivo, created_by)
        values (new.id, 'entrada', coalesce(new.peso_final_kg, 0), 'Lote concluído', new.created_by);
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_lote_para_estoque
    before update on lotes
    for each row execute function fn_lote_para_estoque();

-- ---------------------------------------------------------------------
-- 12. VISÕES (suporte a estoque em tempo real e relatórios)
-- ---------------------------------------------------------------------
-- Estoque atual por lote, com semáforo de validade (HU005 / HU013)
create view vw_estoque_atual as
select l.id as lote_id, l.codigo, p.id as produto_id, p.nome as produto,
       c.nome as categoria, l.peso_disponivel_kg, l.data_validade,
       (l.data_validade - current_date) as dias_para_vencer,
       case
           when l.data_validade is null then 'sem_validade'
           when l.data_validade < current_date then 'vencido'
           when l.data_validade - current_date <= 7  then 'vermelho'
           when l.data_validade - current_date <= 30 then 'amarelo'
           else 'verde'
       end as status_validade
from lotes l
join produtos p   on p.id = l.produto_id
join categorias c on c.id = p.categoria_id
where l.status = 'em_estoque' and l.peso_disponivel_kg > 0;

-- Produção mensal consolidada por produto (HU004 / HU017)
create view vw_producao_mensal as
select p.id as produto_id, p.nome as produto, c.nome as categoria,
       date_trunc('month', l.data_conclusao)::date as mes,
       count(*) as num_lotes,
       sum(l.peso_recebido_kg) as total_recebido_kg,
       sum(l.peso_final_kg)    as total_produzido_kg,
       sum(l.perda_total_kg)   as total_perdido_kg,
       round(avg(l.perda_total_pct), 2) as perda_media_pct
from lotes l
join produtos p   on p.id = l.produto_id
join categorias c on c.id = p.categoria_id
where l.data_conclusao is not null
group by p.id, p.nome, c.nome, date_trunc('month', l.data_conclusao);

-- ---------------------------------------------------------------------
-- 13. ÍNDICES (desempenho — RNF004)
-- ---------------------------------------------------------------------
create index idx_produtos_categoria   on produtos(categoria_id);
create index idx_produtos_ativo       on produtos(ativo);
create index idx_lotes_produto        on lotes(produto_id);
create index idx_lotes_status         on lotes(status);
create index idx_lotes_validade       on lotes(data_validade);
create index idx_lote_etapas_lote     on lote_etapas(lote_id);
create index idx_mov_lote             on estoque_movimentos(lote_id);
create index idx_alertas_resolvido    on alertas(resolvido, severidade);
create index idx_pedidos_status       on pedidos(status);
create index idx_pedido_itens_pedido  on pedido_itens(pedido_id);
create index idx_harmonizacoes_produto on harmonizacoes(produto_id);

-- =====================================================================
--  FIM DO MODELO FÍSICO
-- =====================================================================

```
