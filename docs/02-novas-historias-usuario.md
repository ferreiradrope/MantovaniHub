# Novas Histórias de Usuário (HU015–HU022) — Atualização v2.0

> Estas 8 histórias complementam as 14 originais (HU001–HU014), elevando o
> Product Backlog para **22 Histórias de Usuário**. Foram derivadas do **2º
> encontro com o CEO Douglas Mantovani** e do feedback recebido na
> apresentação intermediária (alerta de produção, resumo do mês, cadastro
> gerando estoque, cardápio com ficha técnica e harmonização, paleta da marca).

---

## HU015 – Autenticação e Controle de Acesso

**Título:** Login seguro e perfis de acesso
**História:** COMO Douglas (proprietário) e a esposa (gestora)
GOSTARIA DE acessar o painel administrativo com login protegido por senha e perfis de acesso distintos (administrador, gestor e produção)
POIS ASSIM protejo os dados sensíveis do negócio (custos, clientes, faturamento) e cada pessoa vê apenas o que é pertinente à sua função

**Critérios de Aceite:**
- Deve permitir login com e-mail e senha, com sessão persistente no celular.
- Deve oferecer recuperação de senha por e-mail.
- Deve suportar pelo menos três perfis: **Administrador** (acesso total), **Gestor** (produção, estoque, relatórios, clientes e pedidos) e **Produção** (apenas apontamento de lotes/etapas).
- Deve registrar data e hora do último acesso de cada usuário.
- Deve encerrar a sessão automaticamente após período de inatividade e suportar 2FA opcional (alinhado ao RNF007).

---

## HU016 – Alerta de Produção e Agenda de Maturação

**Título:** Alertas de produção e agenda de maturação
**História:** COMO Douglas (charcuteiro)
GOSTARIA DE receber alertas quando um lote precisar avançar para a próxima etapa (virar a peça na cura, iniciar a defumação, embalar) e quando eu precisar INICIAR a produção de um item de ciclo longo (copa maturada ≈ 120 dias, presunto cru ≥ 180 dias) para chegar a tempo de uma data comemorativa
POIS ASSIM nenhum lote "passa do ponto" nem falta produto nas datas de maior venda (Dia das Mães, Natal), mesmo com a produção dependendo da memória

**Critérios de Aceite:**
- Deve permitir definir, por produto, a duração de cada etapa e calcular a data prevista de conclusão do lote.
- Deve gerar alerta (push e/ou painel) quando um lote atingir a data prevista de mudança de etapa.
- Deve permitir cadastrar **datas-alvo** (ex.: Natal) e calcular regressivamente a **data-limite para iniciar** a produção de cada produto de ciclo longo.
- Deve exibir uma **"agenda de maturação"** com os lotes em andamento e suas próximas ações organizadas por data.
- Deve sinalizar visualmente os lotes **atrasados** em relação à etapa prevista.

---

## HU017 – Dashboard "Resumo do Mês"

**Título:** Painel-resumo do mês (visão executiva)
**História:** COMO Douglas e a esposa (gestora)
GOSTARIA DE abrir o sistema e ver, numa única tela, o resumo do mês — total produzido (kg), perda média (%), número de lotes, produtos a vencer, pedidos em aberto e os produtos mais produzidos
POIS ASSIM tenho a saúde do negócio em segundos, sem precisar gerar relatórios, e decido onde agir primeiro

**Critérios de Aceite:**
- A tela inicial deve exibir cartões-resumo do mês corrente: produção total (kg), perda média (%), nº de lotes, validades próximas e pedidos em aberto.
- Deve exibir um ranking dos **produtos mais produzidos** no mês (top 5).
- Deve exibir um mini-gráfico de produção dos **últimos 6 meses**.
- Deve destacar **alertas críticos** (validade ≤ 7 dias e lotes atrasados).
- Deve permitir alternar o mês de referência.

---

## HU018 – Cadastro e Gestão de Clientes (CRM)

**Título:** Cadastro e histórico de clientes (PF e PJ)
**História:** COMO a esposa de Douglas (gestora)
GOSTARIA DE cadastrar clientes pessoa física e jurídica com dados de contato, endereço e tipo, e visualizar o histórico de pedidos e feedbacks de cada um
POIS ASSIM personalizo o atendimento, identifico os melhores clientes (PJ recorrentes) e mantenho o relacionamento humano que diferencia a marca

**Critérios de Aceite:**
- Deve permitir cadastrar cliente com nome, tipo (PF/PJ), telefone/WhatsApp, e-mail, endereço e observações.
- Para PJ, deve permitir registrar CNPJ, razão social e a **tabela de preços aplicável (atacado)**.
- Deve exibir o **histórico de pedidos** e o total comprado por cliente.
- Deve permitir registrar feedback/pós-venda no perfil do cliente.
- Deve permitir buscar clientes por nome, telefone ou tipo.

---

## HU019 – Gestão de Pedidos no Painel (Kanban)

**Título:** Acompanhamento de pedidos em quadro
**História:** COMO a esposa de Douglas (gestora)
GOSTARIA DE visualizar e gerenciar os pedidos num quadro por status (Recebido → Em separação → Pronto → Entregue/Retirado), movendo o pedido conforme ele avança
POIS ASSIM nenhum pedido é esquecido, a separação é organizada e o cliente recebe no prazo

**Critérios de Aceite:**
- Deve exibir os pedidos em colunas por status (Recebido, Em separação, Pronto, Entregue, Cancelado).
- Deve permitir mover o pedido entre status e registrar data/hora de cada mudança.
- Deve exibir, em cada pedido, o cliente, os itens, o valor total e a forma de entrega.
- Ao confirmar um pedido, deve **baixar o estoque** dos lotes correspondentes (regra FEFO).
- Deve permitir filtrar por período, status e cliente.

---

## HU020 – Catálogo e Tabela de Preços para Comprador PJ

**Título:** Catálogo de atacado para clientes pessoa jurídica
**História:** COMO chef/comprador (cliente pessoa jurídica)
GOSTARIA DE consultar uma tabela de produtos com preço de atacado, disponibilidade atual e ficha de ingredientes, e montar um pedido (inclusive recorrente)
POIS ASSIM faço minhas compras com autonomia, sem depender do horário de atendimento humano, e componho meu próprio cardápio com os produtos da Mantovani

**Critérios de Aceite:**
- Deve exibir, para o cliente PJ autenticado, a **tabela de preços de atacado** (distinta do varejo).
- Deve exibir a disponibilidade (em estoque / sob encomenda) de cada produto.
- Deve permitir montar um pedido e marcá-lo como **recorrente**.
- Deve respeitar o bloqueio de produtos não autorizados para venda fora de MG (RN013).
- Deve permitir visualizar/baixar a ficha técnica de cada item.

---

## HU021 – Rastreabilidade de Lote por QR Code

**Título:** Consulta de rastreabilidade do lote via QR Code
**História:** COMO Douglas (e, indiretamente, a vigilância sanitária)
GOSTARIA DE escanear o QR Code da etiqueta de um lote e ver toda a sua linha do tempo (insumo de origem, fornecedor, NF, etapas, pesagens, perdas, validade e destino de venda)
POIS ASSIM atendo às exigências sanitárias e identifico rapidamente a origem de qualquer produto em caso de necessidade

**Critérios de Aceite:**
- Cada lote deve ter uma **página de rastreabilidade** acessível por QR Code.
- A página deve exibir a linha do tempo completa: entrada do insumo, fornecedor, NF, etapas com datas e pesos, perdas e validade.
- Deve indicar o **status atual** do lote (em produção, em estoque, vendido, descartado).
- Deve permitir exportar a rastreabilidade em PDF.
- O acesso à rastreabilidade interna completa deve exigir autenticação (dados sensíveis).

---

## HU022 – Configurações do Negócio e dos Alertas

**Título:** Parametrização do sistema e preferências de alerta
**História:** COMO Douglas (administrador)
GOSTARIA DE configurar os parâmetros do negócio (dados da loja, categorias, alérgenos, prazos dos alertas de validade, canais de notificação e dias para pós-venda) num único lugar
POIS ASSIM adapto o sistema à rotina da Mantovani sem depender de programador e mantenho regras consistentes em toda a plataforma

**Critérios de Aceite:**
- Deve permitir editar dados da empresa (nome, contato, endereço, redes sociais e link do cardápio).
- Deve permitir gerenciar as **categorias** de produto e a lista de **alérgenos**.
- Deve permitir configurar os marcos de alerta de validade (padrão 30/15/1 dia) e o prazo de pós-venda (padrão 5 dias).
- Deve permitir escolher os **canais de notificação** (push, e-mail, WhatsApp) por tipo de evento.
- Deve restringir essas configurações ao perfil **Administrador**.

---

# Requisitos Funcionais adicionais (derivados das HU015–HU022)

| ID    | Descrição                                                                                                  | Origem (US) |
|-------|------------------------------------------------------------------------------------------------------------|-------------|
| RF036 | O sistema deve permitir autenticação por e-mail/senha, com sessão persistente e recuperação de senha.      | HU015       |
| RF037 | O sistema deve implementar perfis de acesso (Administrador, Gestor, Produção) com permissões distintas.     | HU015       |
| RF038 | O sistema deve permitir definir a duração de cada etapa por produto e calcular a data prevista de conclusão do lote. | HU016 |
| RF039 | O sistema deve gerar alerta de produção quando um lote atingir a data prevista de mudança de etapa ou estiver atrasado. | HU016 |
| RF040 | O sistema deve manter uma agenda de maturação e calcular regressivamente a data-limite de início a partir de datas-alvo. | HU016 |
| RF041 | O sistema deve apresentar um dashboard-resumo do mês com indicadores de produção, perdas, lotes, validades e pedidos. | HU017 |
| RF042 | O sistema deve permitir o cadastro e a gestão de clientes PF/PJ, com histórico de pedidos e feedback.       | HU018       |
| RF043 | O sistema deve gerenciar pedidos em quadro kanban por status, registrando o histórico de transições.       | HU019       |
| RF044 | O sistema deve oferecer catálogo com tabela de preços de atacado e disponibilidade para clientes PJ autenticados. | HU020 |
| RF045 | O sistema deve disponibilizar página de rastreabilidade de lote por QR Code, com linha do tempo e exportação em PDF. | HU021 |
| RF046 | O sistema deve oferecer tela de configurações do negócio (empresa, categorias, alérgenos, alertas, canais), restrita ao Administrador. | HU022 |

# Regras de Negócio adicionais (RN014–RN017)

| ID    | Descrição                                                                                                   | Relacionado a |
|-------|-------------------------------------------------------------------------------------------------------------|---------------|
| RN014 | Cada usuário possui um único perfil de acesso; operações sensíveis (exclusão, configurações e preços de custo) são restritas ao perfil Administrador. | HU015 |
| RN015 | A data-limite para iniciar a produção de um item é calculada como (data-alvo − soma das durações das etapas − margem de segurança), específica por produto. | HU016 |
| RN016 | Clientes PJ visualizam a tabela de preços de atacado; clientes PF visualizam a tabela de varejo (reforça a RN012). | HU020 |
| RN017 | A baixa de estoque na confirmação de um pedido segue a regra **FEFO** (*First Expired, First Out* — primeiro a vencer, primeiro a sair) entre os lotes disponíveis do produto. | HU019, HU007, HU013 |
