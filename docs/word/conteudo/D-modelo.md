# 8. Modelo de Banco de Dados

O banco de dados do MantovaniHub foi implementado em PostgreSQL (compatível com a plataforma Supabase, usada no deploy). Esta seção apresenta o modelo lógico (entidades e relacionamentos), o diagrama entidade-relacionamento e o modelo físico (script SQL de criação das tabelas). O modelo não apenas armazena os dados, mas materializa as regras de negócio do domínio: a geração do código de lote `AAA.NNN` (RN001), o cálculo automático de perdas (RF007), o semáforo de validade (HU005) e a regra FEFO de baixa de estoque (RN017).

## 8.1 Visão Geral e Domínios

O modelo é composto por 22 tabelas, 2 visões e 2 funções/gatilhos, organizados em sete domínios funcionais:

| Domínio | Tabelas | Histórias atendidas |
|---|---|---|
| Acesso e usuários | `perfis` | HU015 |
| Catálogo de produtos | `categorias`, `alergenos`, `produtos`, `produto_alergenos`, `produto_etapas`, `harmonizacoes` | HU001, HU006, HU011, HU022 |
| Suprimentos e produção | `fornecedores`, `insumos_entrada`, `lotes`, `lote_etapas` | HU002, HU003, HU016, HU021 |
| Estoque e alertas | `estoque_movimentos`, `alertas`, `datas_alvo` | HU005, HU013, HU016 |
| Clientes e vendas | `clientes`, `cliente_feedback`, `pedidos`, `pedido_itens`, `pedido_status_hist` | HU007, HU009, HU018, HU019, HU020 |
| Clube de assinatura | `planos_assinatura`, `assinaturas` | HU010 |
| Configuração | `config_negocio` | HU022 |

## 8.2 Modelo Lógico — Principais Relacionamentos

- Cada **produto** pertence a uma **categoria** e pode estar associado a vários **alérgenos** (relação N:N via `produto_alergenos`), a um **roteiro de etapas** (`produto_etapas`, que define as durações para a agenda de maturação) e a várias **harmonizações** ("Combina com…").
- A **entrada de insumo** (`insumos_entrada`) registra a matéria-prima recebida de um **fornecedor** e dá origem a um **lote** interno. Cada **lote** referencia um único produto-destino (RN002) e desdobra-se em várias **etapas de produção** (`lote_etapas`), nas quais as pesagens são registradas e as perdas calculadas.
- O **estoque** é um livro-razão de **movimentos** (`estoque_movimentos`) vinculados ao lote; o saldo disponível é materializado em `lotes.peso_disponivel_kg`. Os **alertas** (validade, produção, desvio de perda) referenciam o lote ou o produto de origem.
- Um **cliente** (PF ou PJ) faz vários **pedidos**, cada um com vários **itens** (`pedido_itens`); cada item pode ser separado de um **lote** específico (FEFO). As transições de status do pedido são registradas em `pedido_status_hist`, e os **feedbacks** ficam vinculados ao cliente e ao pedido.
- Os **planos de assinatura** podem ser contratados por clientes em **assinaturas**. A tabela `config_negocio` (registro único) centraliza os parâmetros do sistema (HU022).

## 8.3 Dicionário de Dados (resumo das entidades)

| Entidade | Propósito |
|---|---|
| `perfis` | Usuários administrativos com papel de acesso (admin/gestor/produção). |
| `categorias` | Categorias do cardápio (Defumados, Maturados, Curados, Linguiças…). |
| `alergenos` | Alérgenos cadastráveis (glúten, lactose, pimenta…). |
| `produtos` | Ficha técnica: nome, ingredientes, foto, unidade, preços varejo/atacado, perda média. |
| `produto_etapas` | Roteiro de produção por produto (etapas e durações). |
| `harmonizacoes` | Sugestões de harmonização (vinho, queijo, pão, cerveja). |
| `fornecedores` | Fornecedores de matéria-prima. |
| `insumos_entrada` | Recebimento de matéria-prima; origem do lote. |
| `lotes` | Lote interno `AAA.NNN`, com pesos, perdas calculadas, validade e status. |
| `lote_etapas` | Pesagens por etapa, com perda kg/% e datas prevista/concluída. |
| `estoque_movimentos` | Livro-razão de entradas e saídas de estoque. |
| `alertas` | Alertas de validade, produção e desvio de perda. |
| `datas_alvo` | Datas comemorativas para o cálculo regressivo de produção. |
| `clientes` | Clientes PF/PJ, com tabela de preço aplicável. |
| `pedidos` / `pedido_itens` | Pedidos e seus itens; baixa de estoque por FEFO. |
| `pedido_status_hist` | Histórico de transições de status (kanban). |
| `planos_assinatura` / `assinaturas` | Clube de assinatura e contratos. |
| `config_negocio` | Parâmetros do negócio e preferências de alerta. |

## 8.4 Regras de Negócio Materializadas no Banco

- **Geração do código de lote (RN001):** o gatilho `trg_gerar_codigo_lote` executa a função `fn_gerar_codigo_lote()`, que monta `AAA.NNN` a partir dos três últimos dígitos do ano e de um sequencial único por produto/ano.
- **Cálculo de perdas (RF007):** as colunas `perda_total_kg`, `perda_total_pct` (em `lotes`) e `perda_kg`, `perda_pct` (em `lote_etapas`) são colunas geradas (`GENERATED ALWAYS AS … STORED`), garantindo consistência sem código de aplicação.
- **Lote → estoque (RN005):** ao mudar o status do lote para `em_estoque`, o gatilho `trg_lote_para_estoque` inicializa o saldo disponível e registra o movimento de entrada.
- **Estoque em tempo real e semáforo de validade (HU005/HU013):** a visão `vw_estoque_atual` classifica cada lote em verde / amarelo (≤ 30 dias) / vermelho (≤ 7 dias) / vencido.
- **Produção mensal (HU004/HU017):** a visão `vw_producao_mensal` consolida, por produto e mês, o total produzido, o total perdido, a perda média e o número de lotes.

## 8.5 Modelo Lógico — Diagrama Entidade-Relacionamento

A figura a seguir apresenta o modelo entidade-relacionamento completo, com as chaves primárias (PK), estrangeiras (FK) e os principais atributos de cada entidade.

<div class="figura figura-landscape"><img src="assets/er-diagram.png" alt="Diagrama Entidade-Relacionamento do MantovaniHub"><div class="legenda">Figura 1. Diagrama Entidade-Relacionamento do MantovaniHub (PostgreSQL).</div></div>

## 8.6 Modelo Físico — Script SQL de Criação das Tabelas

O script a seguir cria todo o modelo no PostgreSQL (validado em ambiente PostgreSQL real). Inclui extensões, tipos enumerados, tabelas, restrições de integridade, funções, gatilhos, visões e índices.
