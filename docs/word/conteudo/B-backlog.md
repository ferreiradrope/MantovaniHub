# 4. Product Backlog (Histórias de Usuário)

O Product Backlog do MantovaniHub reúne **22 Histórias de Usuário (HU)**, superando com folga o
requisito mínimo do modelo. As histórias HU001–HU014 derivam da 1ª entrevista com o cliente
(14/04/2026); as histórias **HU015–HU022** foram incorporadas na Versão 2.0 a partir do feedback do
2º encontro com o CEO Douglas Mantovani.

### HU001 – Cadastro de Produto (Ficha Técnica)

**Título:** Cadastro de produto e ficha técnica
**História:** COMO Douglas (proprietário/charcuteiro) GOSTARIA DE cadastrar cada produto da
charcutaria com nome, descrição, foto, categoria (fresco / defumado / curado / maturado), tempo
médio de produção, ingredientes, preço de venda e percentual médio de perda POIS ASSIM terei
uma base única que alimenta o cardápio digital, o controle de produção e os relatórios financeiros.

**Critérios de Aceite:**

- Deve permitir cadastrar produto com nome, categoria, descrição, ingredientes (lista) e foto.
- Deve permitir registrar o tempo médio de produção em dias (ex.: linguiça = 1 dia, pastrami = 10–15 dias, copa maturada = 120 dias, presunto cru ≥ 180 dias).
- Deve permitir registrar o percentual médio de perda estimado por experiência (entre 0% e 60%).
- Deve permitir editar e desativar produtos sem excluir o histórico.
- Deve exibir mensagem de sucesso após o cadastro.

### HU002 – Entrada de Insumo e Abertura de Lote

**Título:** Registrar recebimento de insumo e abrir lote
**História:** COMO Douglas GOSTARIA DE registrar pelo celular o recebimento da matéria-prima
(carne/peixe), informando fornecedor, peso conferido, nota fiscal e o produto-destino, gerando
automaticamente um número de lote no padrão `AAA.NNN` POIS ASSIM tenho rastreabilidade do insumo
até o produto final, atendendo inclusive à vigilância sanitária.

**Critérios de Aceite:**

- Ao registrar uma entrada, o sistema deve gerar automaticamente o lote no formato `AAA.NNN` (ex.: `026.015`), onde `AAA` são os três últimos dígitos do ano e `NNN` é sequencial.
- Deve permitir informar fornecedor, número da NF, data, peso recebido e produto-destino.
- Deve permitir anexar a foto da etiqueta/NF.
- Deve gerar etiqueta de lote para impressão ou exibição com QR Code.
- O lote deve ficar vinculado a todas as etapas seguintes (limpeza, cura, defumação, embalagem).

### HU003 – Registro das Etapas de Produção e Perdas

**Título:** Apontamento das etapas de produção
**História:** COMO Douglas GOSTARIA DE registrar as pesagens em cada etapa do processo
(limpeza, cura, defumação/maturação, embalagem) por lote POIS ASSIM o sistema calcula
automaticamente a perda absoluta (kg) e percentual (%) de cada etapa e do processo total.

**Critérios de Aceite:**

- Cada lote deve permitir registrar `peso_recebido`, `peso_após_limpeza` e `peso_final_pronto`.
- O sistema deve calcular automaticamente a perda em kg e em % por etapa e total.
- Deve permitir registrar a data em que cada etapa foi concluída.
- Deve avisar visualmente se a perda total ultrapassar a média histórica daquele produto em mais de 10 pontos percentuais.
- O lote só é considerado "pronto para estoque" depois do peso final ser registrado.

### HU004 – Relatório Mensal de Produção e Perdas

**Título:** Relatório consolidado de produção
**História:** COMO Douglas (e a esposa, gestora) GOSTARIA DE visualizar quantos quilos de
cada produto foram produzidos no mês, qual foi a perda média e o histórico mês a mês POIS ASSIM
consigo planejar a produção para datas comemorativas (Dia das Mães, Natal) e revisar preços de venda
com base na perda real.

**Critérios de Aceite:**

- O relatório deve agrupar a produção por produto e por mês.
- Deve exibir total produzido (kg), total perdido (kg), perda média (%) e número de lotes.
- Deve permitir exportar o relatório em PDF e enviar por e-mail.
- Deve permitir filtrar por intervalo de datas.
- Deve apresentar um gráfico comparativo entre meses.

### HU005 – Alerta de Validade

**Título:** Alerta de validade próxima
**História:** COMO Douglas GOSTARIA DE receber notificações quando um lote em estoque
estiver a 30, 15 e 1 dia(s) de vencer POIS ASSIM consigo priorizar a venda, criar promoções para
o consumidor final e evitar descarte de produto.

**Critérios de Aceite:**

- O sistema deve disparar notificação no celular (push e/ou e-mail) nos marcos de 30, 15 e 1 dia(s) antes do vencimento.
- A tela de estoque deve sinalizar em amarelo (≤ 30 dias) e vermelho (≤ 7 dias).
- Deve permitir gerar uma "lista de promoção" com lotes próximos do vencimento.
- Deve permitir registrar descarte com motivo, alimentando o histórico de perdas.

### HU006 – Cardápio Digital com Fotos e Ingredientes

**Título:** Cardápio digital interativo
**História:** COMO consumidor final (cliente pessoa física) GOSTARIA DE consultar o cardápio
da Charcutaria com fotos, descrição, ingredientes e preço, separado por categoria POIS ASSIM
entendo o que é cada produto (coppa, pastrami, salame), evito ingredientes aos quais sou alérgico e
decido a compra com segurança.

**Critérios de Aceite:**

- O cardápio deve ser acessível por link único (compartilhável no WhatsApp e no Instagram, inclusive em destaques/Stories).
- Cada item deve exibir foto, nome, descrição, lista de ingredientes, alérgenos destacados (pimenta, glúten, lactose etc.) e preço.
- Deve permitir filtrar por categoria (Frescos, Defumados, Maturados) e por alérgeno (excluir).
- Deve ser responsivo / mobile-first.
- Deve permitir clicar em "Pedir pelo WhatsApp" com mensagem pré-formatada do produto.

### HU007 – Pedido pelo Site (Marketplace)

**Título:** Compra pelo site institucional
**História:** COMO consumidor final GOSTARIA DE montar um pedido no site da Charcutaria
Mantovani, escolher a forma de entrega e pagar via Pix ou cartão POIS ASSIM compro com
autonomia, sem depender de horário de atendimento humano no WhatsApp.

**Critérios de Aceite:**

- Deve permitir adicionar produtos ao carrinho a partir do cardápio digital.
- Deve permitir escolher entrega por motoboy (cobrada por região) ou retirada na loja.
- Deve aceitar pagamento via Pix (cobrança gerada antes do envio) e cartão de crédito.
- Deve emitir confirmação de pedido por e-mail e WhatsApp.
- Deve gerar pedido no painel administrativo do MantovaniHub, baixando estoque automaticamente.

### HU008 – Atendimento Automatizado (FAQ) via WhatsApp

**Título:** Bot de qualificação de atendimento
**História:** COMO Douglas GOSTARIA DE que perguntas frequentes (preço, prazo, entrega,
ingredientes, formas de pagamento) sejam respondidas automaticamente no WhatsApp, com transferência
para uma pessoa humana no momento do fechamento POIS ASSIM consigo focar na produção e responder
pessoalmente apenas as conversas que precisam do meu olhar — sem perder o tom humano da marca.

**Critérios de Aceite:**

- O bot deve identificar a intenção da mensagem (preço, ingredientes, entrega, horário, pagamento) e responder com base no cardápio cadastrado.
- Deve transferir a conversa para um humano assim que o cliente sinalizar intenção de fechar a compra ou enviar uma mensagem fora do escopo do FAQ.
- Deve registrar as conversas atendidas e gerar relatório de perguntas mais frequentes.
- Deve permitir ao Douglas pausar o bot a qualquer momento.
- Deve sempre se identificar de forma transparente como atendimento automático na primeira mensagem.

### HU009 – Pós-venda e Coleta de Feedback

**Título:** Pós-venda automatizado com toque humano
**História:** COMO Douglas GOSTARIA DE que o sistema dispare uma mensagem alguns dias após a
entrega perguntando se o cliente experimentou e o que achou, com texto personalizado POIS ASSIM
mantenho o relacionamento sem precisar lembrar manualmente de cada cliente, e ainda colho feedback
sobre os produtos.

**Critérios de Aceite:**

- A mensagem de pós-venda deve ser disparada automaticamente após X dias da entrega (configurável; padrão = 5 dias).
- O texto deve ser personalizado com nome do cliente e produto comprado.
- A resposta do cliente deve cair direto para Douglas (não para o bot).
- Deve permitir registrar o feedback no perfil do cliente.
- Deve permitir desativar o pós-venda para clientes específicos.

### HU010 – Clube de Assinatura

**Título:** Clube de assinatura com harmonização
**História:** COMO consumidor final GOSTARIA DE assinar um clube mensal da Charcutaria
Mantovani com diferentes níveis (Premium, Intermediário, Essencial) que combinam charcutaria com
queijos e vinhos parceiros POIS ASSIM recebo uma curadoria de produtos artesanais todo mês, sem
precisar escolher item a item.

**Critérios de Aceite:**

- Deve permitir oferecer pelo menos 3 planos (Essencial – só charcutaria; Intermediário – charcutaria + queijo; Premium – charcutaria + queijo + vinho).
- Deve permitir cobrança recorrente mensal (cartão de crédito).
- Deve permitir ao Douglas montar a "caixa do mês" com produtos diferentes a cada ciclo.
- Deve permitir ao assinante pausar, alterar ou cancelar a assinatura pelo painel.
- Deve gerar lista de envio mensal para a logística.

### HU011 – Sugestão de Harmonização

**Título:** Sistema de recomendação de harmonização
**História:** COMO consumidor final GOSTARIA DE ver sugestões de harmonização (vinhos,
queijos, pães) ao escolher um produto de charcutaria no cardápio digital POIS ASSIM componho uma
experiência completa e a Mantovani aumenta o ticket médio do pedido.

**Critérios de Aceite:**

- Cada produto deve poder ser cadastrado com pelo menos 2 sugestões de harmonização.
- A página do produto deve exibir o bloco "Combina com…" com fotos das sugestões.
- A sugestão deve poder ser adicionada ao carrinho com um clique.
- Deve permitir a Douglas atualizar as sugestões a qualquer momento.

### HU012 – Página Institucional e Conteúdo do Processo Artesanal

**Título:** Site institucional contando o processo
**História:** COMO consumidor final GOSTARIA DE ler/assistir como cada produto é feito, em
quanto tempo, com quais ingredientes e por que ele é artesanal POIS ASSIM compreendo o valor do
produto e o porquê do preço, deixando de questionar "por que é caro".

**Critérios de Aceite:**

- O site deve ter uma página "Nossa História" e uma página "Como Fazemos" com texto, fotos e vídeos.
- Deve apresentar tempos de produção e processos (cura, defumação, maturação) de forma didática.
- Deve ter botões para WhatsApp, Instagram e cardápio em todas as páginas.
- Deve ser responsivo / mobile-first.

### HU013 – Painel de Estoque em Tempo Real

**Título:** Visualização do estoque por produto e lote
**História:** COMO esposa do Douglas (gestora) GOSTARIA DE consultar do celular o estoque
atual da loja, agrupado por produto e detalhado por lote (com peso e validade) POIS ASSIM
respondo rapidamente clientes que pedem pronta-entrega e tomo decisões de venda informadas.

**Critérios de Aceite:**

- Deve exibir total em kg por produto e quantidade por lote.
- Deve permitir filtrar por categoria, validade próxima e disponibilidade.
- Deve atualizar em tempo real quando uma venda for registrada ou um lote for finalizado.
- Deve permitir lançar baixa manual de estoque (ex.: descarte, consumo interno).

### HU014 – Instalação como Aplicativo (PWA)

**Título:** Instalação da plataforma como aplicativo no celular
**História:** COMO consumidor final e Douglas (proprietário) GOSTARIA DE instalar o
MantovaniHub na tela inicial do meu celular, com ícone próprio e funcionamento parecido com um app
nativo, sem precisar baixar nada da loja de aplicativos POIS ASSIM acesso o cardápio e o painel
mais rapidamente, recebo notificações push e tenho uma experiência mais próxima de um app.

**Critérios de Aceite:**

- O site deve oferecer instrução/botão de "Instalar app" nos navegadores compatíveis (Chrome, Edge, Safari).
- Após a instalação, o sistema deve apresentar ícone próprio na tela inicial e splash screen ao abrir.
- A plataforma deve manter cache offline para o cardápio digital já visitado, permitindo consulta sem conexão.
- A sessão do usuário deve ser mantida ao reabrir o app instalado.
- Deve suportar notificações push nativas do celular para alertas de validade (Douglas) e confirmações de pedido (cliente).

**Histórias incorporadas na Versão 2.0 (feedback do 2º encontro com o CEO).** As oito histórias a seguir endereçam diretamente os pontos levantados por Douglas: alerta de produção (HU016), resumo do mês (HU017), cadastro que gera estoque (HU001 + HU009/HU019) e cardápio com ficha técnica e harmonização (HU006/HU011), além de fundamentos de segurança, relacionamento e configuração que sustentam a operação real.

### HU015 – Autenticação e Controle de Acesso

**Título:** Login seguro e perfis de acesso
**História:** COMO Douglas (proprietário) e a esposa (gestora) GOSTARIA DE acessar o painel
administrativo com login protegido por senha e perfis de acesso distintos (administrador, gestor e
produção) POIS ASSIM protejo os dados sensíveis do negócio (custos, clientes, faturamento) e cada
pessoa vê apenas o que é pertinente à sua função.

**Critérios de Aceite:**

- Deve permitir login com e-mail e senha, com sessão persistente no celular.
- Deve oferecer recuperação de senha por e-mail.
- Deve suportar pelo menos três perfis: **Administrador** (acesso total), **Gestor** (produção, estoque, relatórios, clientes e pedidos) e **Produção** (apenas apontamento de lotes/etapas).
- Deve registrar data e hora do último acesso de cada usuário.
- Deve encerrar a sessão automaticamente após período de inatividade e suportar 2FA opcional (alinhado ao RNF007).

### HU016 – Alerta de Produção e Agenda de Maturação

**Título:** Alertas de produção e agenda de maturação
**História:** COMO Douglas (charcuteiro) GOSTARIA DE receber alertas quando um lote precisar
avançar para a próxima etapa (virar a peça na cura, iniciar a defumação, embalar) e quando eu
precisar iniciar a produção de um item de ciclo longo (copa maturada ≈ 120 dias, presunto cru ≥ 180
dias) para chegar a tempo de uma data comemorativa POIS ASSIM nenhum lote "passa do ponto" nem
falta produto nas datas de maior venda (Dia das Mães, Natal), mesmo com a produção dependendo da
memória.

**Critérios de Aceite:**

- Deve permitir definir, por produto, a duração de cada etapa e calcular a data prevista de conclusão do lote.
- Deve gerar alerta (push e/ou painel) quando um lote atingir a data prevista de mudança de etapa.
- Deve permitir cadastrar **datas-alvo** (ex.: Natal) e calcular regressivamente a **data-limite para iniciar** a produção de cada produto de ciclo longo.
- Deve exibir uma **"agenda de maturação"** com os lotes em andamento e suas próximas ações organizadas por data.
- Deve sinalizar visualmente os lotes **atrasados** em relação à etapa prevista.

### HU017 – Dashboard "Resumo do Mês"

**Título:** Painel-resumo do mês (visão executiva)
**História:** COMO Douglas e a esposa (gestora) GOSTARIA DE abrir o sistema e ver, numa única
tela, o resumo do mês — total produzido (kg), perda média (%), número de lotes, produtos a vencer,
pedidos em aberto e os produtos mais produzidos POIS ASSIM tenho a saúde do negócio em segundos,
sem precisar gerar relatórios, e decido onde agir primeiro.

**Critérios de Aceite:**

- A tela inicial deve exibir cartões-resumo do mês corrente: produção total (kg), perda média (%), nº de lotes, validades próximas e pedidos em aberto.
- Deve exibir um ranking dos **produtos mais produzidos** no mês (top 5).
- Deve exibir um mini-gráfico de produção dos **últimos 6 meses**.
- Deve destacar **alertas críticos** (validade ≤ 7 dias e lotes atrasados).
- Deve permitir alternar o mês de referência.

### HU018 – Cadastro e Gestão de Clientes (CRM)

**Título:** Cadastro e histórico de clientes (PF e PJ)
**História:** COMO a esposa de Douglas (gestora) GOSTARIA DE cadastrar clientes pessoa física
e jurídica com dados de contato, endereço e tipo, e visualizar o histórico de pedidos e feedbacks de
cada um POIS ASSIM personalizo o atendimento, identifico os melhores clientes (PJ recorrentes) e
mantenho o relacionamento humano que diferencia a marca.

**Critérios de Aceite:**

- Deve permitir cadastrar cliente com nome, tipo (PF/PJ), telefone/WhatsApp, e-mail, endereço e observações.
- Para PJ, deve permitir registrar CNPJ, razão social e a **tabela de preços aplicável (atacado)**.
- Deve exibir o **histórico de pedidos** e o total comprado por cliente.
- Deve permitir registrar feedback/pós-venda no perfil do cliente.
- Deve permitir buscar clientes por nome, telefone ou tipo.

### HU019 – Gestão de Pedidos no Painel (Kanban)

**Título:** Acompanhamento de pedidos em quadro
**História:** COMO a esposa de Douglas (gestora) GOSTARIA DE visualizar e gerenciar os
pedidos num quadro por status (Recebido → Em separação → Pronto → Entregue/Retirado), movendo o
pedido conforme ele avança POIS ASSIM nenhum pedido é esquecido, a separação é organizada e o
cliente recebe no prazo.

**Critérios de Aceite:**

- Deve exibir os pedidos em colunas por status (Recebido, Em separação, Pronto, Entregue, Cancelado).
- Deve permitir mover o pedido entre status e registrar data/hora de cada mudança.
- Deve exibir, em cada pedido, o cliente, os itens, o valor total e a forma de entrega.
- Ao confirmar um pedido, deve **baixar o estoque** dos lotes correspondentes (regra FEFO).
- Deve permitir filtrar por período, status e cliente.

### HU020 – Catálogo e Tabela de Preços para Comprador PJ

**Título:** Catálogo de atacado para clientes pessoa jurídica
**História:** COMO chef/comprador (cliente pessoa jurídica) GOSTARIA DE consultar uma tabela
de produtos com preço de atacado, disponibilidade atual e ficha de ingredientes, e montar um pedido
(inclusive recorrente) POIS ASSIM faço minhas compras com autonomia, sem depender do horário de
atendimento humano, e componho meu próprio cardápio com os produtos da Mantovani.

**Critérios de Aceite:**

- Deve exibir, para o cliente PJ autenticado, a **tabela de preços de atacado** (distinta do varejo).
- Deve exibir a disponibilidade (em estoque / sob encomenda) de cada produto.
- Deve permitir montar um pedido e marcá-lo como **recorrente**.
- Deve respeitar o bloqueio de produtos não autorizados para venda fora de MG (RN013).
- Deve permitir visualizar/baixar a ficha técnica de cada item.

### HU021 – Rastreabilidade de Lote por QR Code

**Título:** Consulta de rastreabilidade do lote via QR Code
**História:** COMO Douglas (e, indiretamente, a vigilância sanitária) GOSTARIA DE escanear o
QR Code da etiqueta de um lote e ver toda a sua linha do tempo (insumo de origem, fornecedor, NF,
etapas, pesagens, perdas, validade e destino de venda) POIS ASSIM atendo às exigências sanitárias
e identifico rapidamente a origem de qualquer produto em caso de necessidade.

**Critérios de Aceite:**

- Cada lote deve ter uma **página de rastreabilidade** acessível por QR Code.
- A página deve exibir a linha do tempo completa: entrada do insumo, fornecedor, NF, etapas com datas e pesos, perdas e validade.
- Deve indicar o **status atual** do lote (em produção, em estoque, vendido, descartado).
- Deve permitir exportar a rastreabilidade em PDF.
- O acesso à rastreabilidade interna completa deve exigir autenticação (dados sensíveis).

### HU022 – Configurações do Negócio e dos Alertas

**Título:** Parametrização do sistema e preferências de alerta
**História:** COMO Douglas (administrador) GOSTARIA DE configurar os parâmetros do negócio
(dados da loja, categorias, alérgenos, prazos dos alertas de validade, canais de notificação e dias
para pós-venda) num único lugar POIS ASSIM adapto o sistema à rotina da Mantovani sem depender de
programador e mantenho regras consistentes em toda a plataforma.

**Critérios de Aceite:**

- Deve permitir editar dados da empresa (nome, contato, endereço, redes sociais e link do cardápio).
- Deve permitir gerenciar as **categorias** de produto e a lista de **alérgenos**.
- Deve permitir configurar os marcos de alerta de validade (padrão 30/15/1 dia) e o prazo de pós-venda (padrão 5 dias).
- Deve permitir escolher os **canais de notificação** (push, e-mail, WhatsApp) por tipo de evento.
- Deve restringir essas configurações ao perfil **Administrador**.
