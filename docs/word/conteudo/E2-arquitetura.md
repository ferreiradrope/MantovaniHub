# 9. Arquitetura e Tecnologias da Solução Implementada

Esta seção documenta a solução efetivamente construída e publicada, complementando os requisitos com as decisões de arquitetura e com o mapeamento entre o que foi especificado e o que está em produção.

## 9.1 Visão Geral

O MantovaniHub foi implementado como uma aplicação web *full-stack* **mobile-first**, instalável como PWA e publicada em produção em **https://mantovanihub.vercel.app**. A solução divide-se em duas frentes que compartilham o mesmo backend: o **cardápio digital público** (vitrine, ficha técnica, harmonização, carrinho e checkout) e o **painel administrativo** protegido por autenticação (produção, estoque, pedidos, clientes, relatórios e configurações).

## 9.2 Tecnologias

| Camada | Tecnologia | Papel |
|---|---|---|
| Frontend | Next.js 16 (App Router) · React 19 · TypeScript | Renderização híbrida (Server Components + Server Actions), rotas e UI |
| Estilo | Tailwind CSS v4 | Design system da marca (bordô + creme; fontes Fraunces e Hanken Grotesk) |
| Gráficos | Recharts | Gráficos de produção do painel |
| Backend / Dados | Supabase (PostgreSQL gerenciado) | Banco de dados, autenticação, RLS e armazenamento |
| Autenticação | Supabase Auth (e-mail/senha) | Login do painel, sessão por *cookies* |
| Armazenamento | Supabase Storage (bucket `produtos`) | Fotos dos produtos (URL pública) |
| PWA | Web App Manifest + Service Worker | Instalação no celular e *cache* offline do cardápio |
| Implantação | Vercel | *Build* e *deploy* contínuo a cada *push* |

## 9.3 Decisões de Arquitetura

- **Regras de negócio no banco.** As regras críticas são materializadas no PostgreSQL (gatilhos `trg_gerar_codigo_lote` e `trg_lote_para_estoque`, colunas geradas de perda e visões `vw_estoque_atual`/`vw_producao_mensal`), garantindo consistência independentemente da aplicação cliente — ver Seção 8.
- **Server Components e Server Actions.** As leituras usam *Server Components* (consulta direta ao Supabase) e as gravações usam *Server Actions* do Next.js, com revalidação de *cache* (`revalidatePath`) após cada mutação.
- **Proteção de rotas e sessão.** O arquivo `proxy.ts` (sucessor do *middleware* no Next.js 16) protege as rotas `/painel`, renova a sessão a cada requisição e redireciona o usuário não autenticado para `/entrar`.
- **Segurança em nível de linha (RLS).** O catálogo (produtos, categorias, alérgenos e harmonizações) é de **leitura pública**; as demais operações exigem usuário autenticado.
- **Checkout com FEFO.** O fechamento do pedido roda em *Server Action* com a chave de serviço (somente servidor), aloca os lotes por validade (FEFO, RN017) e baixa o estoque.
- **Sessão por dispositivo.** O logout usa **escopo local**, encerrando apenas a sessão do aparelho atual (RN018).

## 9.4 PWA e Central de Notificações

- A aplicação é **instalável** (Web App Manifest com ícones e *theme color* da marca) e registra um *Service Worker* que mantém **cache offline do cardápio** já visitado (estratégia *network-first*), sem armazenar as rotas autenticadas (RF033–RF034).
- O painel conta com uma **central de notificações** (sino no cabeçalho) que agrega, em tempo quase real, pedidos novos, lotes com validade próxima e alertas, com contagem de não lidas e marcação de leitura (RF047).

## 9.5 Mapa Requisito → Implementação (estado da entrega)

A tabela a seguir resume o estado de implementação por história, distinguindo o **núcleo entregue e publicado** do **roadmap** previsto no backlog completo (Seção 4).

| HU | Tema | Estado |
|---|---|---|
| HU001 | Cadastro de produto + ficha técnica (com upload de foto) | Implementado |
| HU002 | Entrada de insumo e abertura de lote `AAA.NNN` | Implementado |
| HU003 | Etapas de produção e cálculo de perdas | Implementado |
| HU004 | Relatório mensal de produção | Implementado |
| HU005 | Alerta e semáforo de validade | Implementado (semáforo + central; envio push/e-mail no roadmap) |
| HU006 | Cardápio digital com fotos, ingredientes e alérgenos | Implementado |
| HU007 | Pedido pelo site (carrinho + checkout, baixa FEFO) | Implementado (gateway de pagamento no roadmap) |
| HU008 | Bot de atendimento no WhatsApp | Roadmap (há link direto pré-formatado para o WhatsApp) |
| HU009 | Pós-venda automatizado | Roadmap (modelo de dados pronto) |
| HU010 | Clube de assinatura | Roadmap (modelo de dados pronto) |
| HU011 | Harmonização ("Combina com…") | Implementado |
| HU012 | Página institucional / processo artesanal | Implementado |
| HU013 | Estoque em tempo real | Implementado |
| HU014 | Instalação como PWA | Implementado |
| HU015 | Autenticação e perfis (logout por dispositivo) | Implementado (perfis no modelo; 2FA no roadmap) |
| HU016 | Alerta de produção / agenda de maturação | Parcial (etapas e datas-alvo no modelo) |
| HU017 | Dashboard "Resumo do mês" + central de notificações | Implementado |
| HU018 | CRM de clientes (PF/PJ) | Implementado |
| HU019 | Gestão de pedidos (kanban) | Implementado |
| HU020 | Catálogo / tabela de atacado para PJ | Parcial (tabela de preço no modelo) |
| HU021 | Rastreabilidade do lote (QR Code) | Parcial (linha do tempo do lote disponível no painel) |
| HU022 | Configurações do negócio | Implementado |

> **Legenda:** *Implementado* = construído e publicado · *Parcial* = fundamentos prontos no modelo de dados, interface em evolução · *Roadmap* = previsto no backlog. O backlog completo (Seção 4) representa a **visão de produto**; a entrega da Avaliação A3 prioriza o **núcleo operacional** (produção, perdas, estoque, validade, cardápio, pedidos e gestão).
