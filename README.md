# 🥓 MantovaniHub

**Plataforma de gestão integrada + cardápio digital da Charcutaria Mantovani** — produção
artesanal por lote, com controle de perdas, validade, estoque, pedidos e relacionamento com o cliente.

🔗 **No ar:** https://mantovanihub.vercel.app · 📍 Charcutaria artesanal — Belo Horizonte / MG

> Projeto da UC **Modelagem de Software — 2026/1** · Centro Universitário Una · Profa. Erica R. de Oliveira.
> Conduzido em **Scrum** com histórias de usuário (HUs), do levantamento de requisitos ao produto implantado.

---

## 📌 O problema

A Charcutaria Mantovani é uma produção artesanal de embutidos e curados (salames, copas, presuntos,
linguiças, defumados…). A gestão vinha sendo feita em planilhas soltas: sem rastreabilidade de lote,
sem controle das perdas do processo (uma peça de 10 kg pode render só ~6 kg depois de cura, defumação
e maturação), sem alerta de validade e sem um canal digital de vendas. O **MantovaniHub** centraliza
tudo isso num só fluxo — da chegada da matéria-prima ao pedido do cliente.

## ✨ Funcionalidades

### Cardápio público (PWA instalável)
- Catálogo por categoria com **fotos reais**, ficha técnica, ingredientes, alérgenos e harmonização
- Carrinho e checkout que **gera o pedido e dá baixa no estoque por FEFO** (primeiro a vencer, primeiro a sair)
- Pedido também pelo **WhatsApp**
- Instalável como **app (PWA)** com ícone próprio

### Painel administrativo
- **Resumo do mês** — produção, perda média, lotes, validades críticas, pedidos e alertas
- **Produtos** — ficha técnica, foto, preços varejo/atacado e alérgenos
- **Lotes & Produção** — rastreabilidade `AAA.NNN`, pesagem por etapa e **cálculo automático de perdas**
- **Estoque** em tempo real com semáforo de validade
- **Pedidos** (recebido → separação → pronto → entregue)
- **Clientes** — CRM (PF/PJ)
- **Relatórios** de produção mensal
- **Notificações** de pedidos novos, validades e alertas (com marcação de lidas)
- **Configurações** do negócio

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Frontend | **Next.js 16** (App Router) · **React 19** · **TypeScript** |
| Estilo | **Tailwind CSS v4** · design system próprio (bordô + creme; fontes Fraunces + Hanken Grotesk) |
| Backend | **Supabase** — PostgreSQL + Auth + Row Level Security + Storage |
| Gráficos | Recharts |
| PWA | manifest + service worker (cache offline do cardápio) |
| Deploy | **Vercel** |

## 📁 Estrutura

```
MantovaniHub/
├── docs/
│   ├── Documento_Requisitos_Charcutaria_Mantovani_v1.pdf   # Requisitos — Entrega 1 (14 HUs)
│   ├── Documento_Requisitos_Charcutaria_Mantovani_v2.pdf   # Requisitos — v2.0 (20+ HUs)
│   ├── Apresentacao_Prototipo_Baixa_Fidelidade.pdf         # Apresentação do protótipo de baixa fidelidade
│   ├── schema.sql        # Modelo físico (22 tabelas, views, gatilhos)
│   ├── seed.sql          # Cardápio real + dados de demonstração
│   ├── rls.sql           # Políticas de segurança (RLS)
│   └── er-diagram.mmd    # Diagrama entidade-relacionamento (Mermaid)
└── web/
    ├── src/app/          # Rotas: landing, /cardapio, /painel (admin)
    ├── src/components/    # UI, painel, cardápio, identidade visual
    └── src/lib/          # Supabase, queries, server actions, tipos
```

## 📄 Documentação do projeto

| Documento | Descrição |
|---|---|
| [📘 Requisitos v1](docs/Documento_Requisitos_Charcutaria_Mantovani_v1.pdf) | Levantamento inicial (Scrum + HUs) — Entrega 1 / A3 |
| [📗 Requisitos v2](docs/Documento_Requisitos_Charcutaria_Mantovani_v2.pdf) | Versão revisada com o feedback do cliente — 20+ HUs, regras de negócio, modelo de dados e script SQL |
| [🎞️ Protótipo de baixa fidelidade](docs/Apresentacao_Prototipo_Baixa_Fidelidade.pdf) | Apresentação técnica com os wireframes das telas |

## 🗄️ Banco de dados

Modelo físico em `docs/schema.sql` (22 tabelas), dados em `docs/seed.sql` (cardápio real +
demonstração) e segurança em `docs/rls.sql` (RLS). Destaques:
- Código de lote `AAA.NNN` gerado por **gatilho** (sequência por produto)
- **Perdas** por colunas geradas (cura, defumação, maturação)
- **Views** de estoque atual e produção mensal
- Baixa de estoque por **FEFO** no checkout

## 🚀 Rodando localmente

```bash
cd web
npm install
cp .env.example .env.local   # preencha com as credenciais do seu Supabase
npm run dev                  # http://localhost:3000
```

Variáveis de ambiente (ver `web/.env.example`):

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de service role — **somente servidor, nunca exponha no client** |

> Para subir um banco do zero, rode `docs/schema.sql`, `docs/seed.sql` e `docs/rls.sql` no projeto Supabase.

## 🔑 Acesso de demonstração

O painel administrativo é restrito por autenticação, com perfis de **administrador** e **gestora**.
As **credenciais de demonstração** podem ser solicitadas à equipe para fins de avaliação.

## 👥 Integrantes (Nome - RA)

1 . Breno Gabriel da Silva - 942523034

2 . Bruno Henrique Silva dos Santos - 825166491

3 . Caio Rafael da Encarnação Freitas - 12724239863

4 . Enzo Marinho Machado Vieira - 12625125047

5 . Felipe Barbosa da Silva - 824226505

6 . Gabriel Correia Proença - 823154480

7 . Gabriel Maciel Cavalcante - 82523117

8 . Isaías Gomes Dally Junior - 12725138051

9 . Mariana Albuquerque da Cruz - 942519415

10 . Naegeli Raiane Guerra - 942515910

11 . Pedro Henrique Esgote Santana - 324271342

12 . Pedro Henrique Ferreira da Silva - 1262510629

13 . Tino Marcos Santos da Paz - 12724136840

14 . Vinícius Anselmo - 10722129086

---

<p align="center"><em>“Charcutaria é paciência que vira sabor.”</em><br>
© 2026 Charcutaria Mantovani · Projeto acadêmico — Centro Universitário Una</p>
