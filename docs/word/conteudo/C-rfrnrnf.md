# 5. Requisitos Funcionais (derivados das histórias)

Os requisitos RF001–RF035 derivam das histórias originais; **RF036–RF046** foram adicionados na
Versão 2.0 (HU015–HU022).

| ID | Descrição | Origem |
|:------|:-----------------------------------------------------------------------------------------------------|:----------|
| RF001 | Permitir o cadastro de produtos com nome, descrição, foto, categoria, ingredientes, tempo médio de produção, perda média e preço. | HU001 |
| RF002 | Permitir editar e desativar produtos preservando o histórico. | HU001 |
| RF003 | Permitir registrar a entrada de insumos (matéria-prima) com fornecedor, NF, peso e produto-destino. | HU002 |
| RF004 | Gerar automaticamente o número de lote no formato `AAA.NNN` (ano + sequencial). | HU002 |
| RF005 | Gerar etiqueta de lote (com QR Code) para impressão. | HU002 |
| RF006 | Permitir registrar pesagens em cada etapa da produção (limpeza, cura, defumação/maturação, embalagem). | HU003 |
| RF007 | Calcular automaticamente a perda absoluta (kg) e percentual (%) por etapa e total. | HU003 |
| RF008 | Emitir alerta visual quando a perda real divergir significativamente da perda média histórica. | HU003 |
| RF009 | Gerar relatórios mensais de produção por produto, com totais, perdas e número de lotes. | HU004 |
| RF010 | Permitir exportar relatórios em PDF e enviá-los por e-mail. | HU004 |
| RF011 | Disparar notificação push e/ou e-mail nos marcos de 30, 15 e 1 dia(s) antes do vencimento de cada lote. | HU005 |
| RF012 | Permitir gerar uma "lista de promoção" com lotes próximos do vencimento. | HU005 |
| RF013 | Permitir registrar descarte de produto vencido com motivo. | HU005 |
| RF014 | Disponibilizar um cardápio digital público com fotos, ingredientes, alérgenos e preço, com link compartilhável. | HU006 |
| RF015 | Permitir filtros por categoria e exclusão por alérgeno no cardápio. | HU006 |
| RF016 | Permitir adicionar produtos ao carrinho e fechar pedido pelo site. | HU007 |
| RF017 | Aceitar pagamento via Pix e cartão de crédito. | HU007 |
| RF018 | Oferecer entrega por motoboy (com cálculo por região) ou retirada na loja. | HU007 |
| RF019 | Enviar confirmação automática do pedido por e-mail e WhatsApp. | HU007 |
| RF020 | Baixar o estoque automaticamente ao confirmar o pedido. | HU007, HU013 |
| RF021 | Oferecer um bot de WhatsApp capaz de responder FAQ (preço, prazo, ingredientes, entrega, pagamento) com base no cardápio. | HU008 |
| RF022 | O bot deve transferir a conversa para um atendente humano ao sinalizar fechamento ou sair do escopo do FAQ. | HU008 |
| RF023 | Registrar conversas atendidas e gerar relatório de perguntas mais frequentes. | HU008 |
| RF024 | Disparar mensagem automática de pós-venda X dias após a entrega (X configurável). | HU009 |
| RF025 | Permitir registrar o feedback do cliente no perfil dele. | HU009 |
| RF026 | Oferecer planos de assinatura mensal (Essencial, Intermediário, Premium). | HU010 |
| RF027 | Realizar cobrança recorrente mensal por cartão de crédito. | HU010 |
| RF028 | Permitir ao assinante pausar, alterar ou cancelar a assinatura pelo painel do cliente. | HU010 |
| RF029 | Permitir cadastrar e exibir sugestões de harmonização por produto. | HU011 |
| RF030 | O site institucional deve apresentar páginas de história e processo, com texto, fotos e vídeos. | HU012 |
| RF031 | Exibir o estoque atual em tempo real, agrupado por produto e detalhado por lote. | HU013 |
| RF032 | Permitir lançamento manual de baixa de estoque (descarte, consumo interno). | HU013 |
| RF033 | Ser disponibilizado como PWA, com manifest, service worker, ícone e splash screen. | HU014 |
| RF034 | Manter cache offline do cardápio digital já visitado, permitindo consulta sem conexão. | HU014 |
| RF035 | Suportar notificações push via Web Push para usuários que concederem autorização. | HU014, HU005 |
| RF036 | Permitir autenticação por e-mail/senha, com sessão persistente e recuperação de senha. | HU015 |
| RF037 | Implementar perfis de acesso (Administrador, Gestor, Produção) com permissões distintas. | HU015 |
| RF038 | Permitir definir a duração de cada etapa por produto e calcular a data prevista de conclusão do lote. | HU016 |
| RF039 | Gerar alerta de produção quando um lote atingir a data prevista de mudança de etapa ou estiver atrasado. | HU016 |
| RF040 | Manter agenda de maturação e calcular regressivamente a data-limite de início a partir de datas-alvo. | HU016 |
| RF041 | Apresentar dashboard-resumo do mês com indicadores de produção, perdas, lotes, validades e pedidos. | HU017 |
| RF042 | Permitir o cadastro e a gestão de clientes PF/PJ, com histórico de pedidos e feedback. | HU018 |
| RF043 | Gerenciar pedidos em quadro kanban por status, registrando o histórico de transições. | HU019 |
| RF044 | Oferecer catálogo com tabela de preços de atacado e disponibilidade para clientes PJ autenticados. | HU020 |
| RF045 | Disponibilizar página de rastreabilidade de lote por QR Code, com linha do tempo e exportação em PDF. | HU021 |
| RF046 | Oferecer tela de configurações do negócio (empresa, categorias, alérgenos, alertas, canais), restrita ao Administrador. | HU022 |

# 6. Regras de Negócio (RN)

As regras RN001–RN013 são do levantamento original; **RN014–RN017** foram adicionadas na Versão 2.0.

| ID | Descrição | Relacionado a |
|:------|:------------------------------------------------------------------------------------------------------|:---------------|
| RN001 | A numeração de lote segue o formato `AAA.NNN`, onde `AAA` são os três últimos dígitos do ano corrente e `NNN` é sequencial e único por produto. | HU002 |
| RN002 | Cada lote pertence a um único produto-destino e mantém o mesmo número da entrada da matéria-prima até a embalagem final. | HU002, HU003 |
| RN003 | O lote do fornecedor é distinto do lote interno da Mantovani, mas deve ser registrado para fins de rastreabilidade sanitária. | HU002 |
| RN004 | O percentual de perda real é específico de cada lote e não deve ser usado como valor fixo — a perda média do produto serve apenas como referência. | HU003 |
| RN005 | Um produto só fica disponível para venda no cardápio e no site após o registro do peso final do lote (etapa "embalagem concluída"). | HU003, HU006, HU013 |
| RN006 | A validade do produto começa a contar a partir da data de finalização do lote, não da data de entrada da matéria-prima. | HU005 |
| RN007 | Lotes com validade vencida são automaticamente removidos do estoque vendável e marcados para descarte. | HU005, HU013 |
| RN008 | O pagamento das vendas a clientes pessoa física com entrega é antecipado (Pix antes do envio do motoboy). | HU007 |
| RN009 | O bot de atendimento deve sempre se identificar como atendimento automatizado na primeira mensagem da conversa. | HU008 |
| RN010 | Conversas com intenção de fechamento de compra devem obrigatoriamente ser transferidas para atendente humano antes da confirmação do pagamento. | HU008 |
| RN011 | Os planos do clube de assinatura devem respeitar o tempo de produção dos produtos: itens de produção longa só entram em ciclos planejados com antecedência. | HU010 |
| RN012 | Clientes pessoa jurídica podem ter tabela de preços diferenciada (volume) em relação a clientes pessoa física. | HU007 |
| RN013 | Vendas para outros estados dependem de autorização sanitária — o sistema deve permitir marcar quais produtos podem ser comercializados fora de MG e bloquear os demais nesses pedidos. | HU007 |
| RN014 | Cada usuário possui um único perfil de acesso; operações sensíveis (exclusão, configurações e preços de custo) são restritas ao perfil Administrador. | HU015 |
| RN015 | A data-limite para iniciar a produção de um item é calculada como (data-alvo − soma das durações das etapas − margem de segurança), específica por produto. | HU016 |
| RN016 | Clientes PJ visualizam a tabela de preços de atacado; clientes PF visualizam a tabela de varejo (reforça a RN012). | HU020 |
| RN017 | A baixa de estoque na confirmação de um pedido segue a regra **FEFO** (*First Expired, First Out*) entre os lotes disponíveis do produto. | HU019, HU007, HU013 |

# 7. Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição | Métrica |
|:-------|:--------------|:------------------------------------------------------------|:-----------------------------------|
| RNF001 | Usabilidade | A interface deve ser mobile-first, otimizada para smartphone. | Telas operacionais funcionam a partir de 360 px de largura. |
| RNF002 | Usabilidade | Cadastros operacionais devem ser concluídos com poucos toques. | Cada apontamento exige ≤ 5 interações. |
| RNF003 | Desempenho | O cardápio e o site devem carregar rapidamente no celular, mesmo em 3G/4G. | Primeira página ≤ 3 s em 4G. |
| RNF004 | Desempenho | Operações administrativas devem ter resposta praticamente instantânea. | Tempo de resposta ≤ 2 s. |
| RNF005 | Disponibilidade | O sistema deve estar disponível 24×7 para clientes finais. | Disponibilidade ≥ 99% ao mês. |
| RNF006 | Segurança | Pagamentos online por gateway certificado, sem armazenar dados de cartão. | Conformidade PCI-DSS via gateway (Stone, Pagar.me, Mercado Pago). |
| RNF007 | Segurança | Acesso ao painel deve exigir senha forte e suportar 2FA. | Senha ≥ 8 caracteres (letras, números, símbolos); 2FA opcional. |
| RNF008 | Segurança | Dados pessoais devem ser tratados conforme a LGPD. | Conformidade com a LGPD (Lei 13.709/2018). |
| RNF009 | Confiabilidade | Backups diários da base de dados, mantidos por ≥ 30 dias. | Backup automático diário; retenção ≥ 30 dias. |
| RNF010 | Compatibilidade | Funcionar nos principais navegadores em desktop e mobile. | Versões dos últimos 24 meses (Chrome, Safari, Firefox, Edge). |
| RNF011 | Manutenibilidade | Código modular, evoluindo cada frente sem regressões. | Arquitetura modular; cobertura de testes ≥ 70% em produção/estoque. |
| RNF012 | Integração | Integração com a API do WhatsApp Business para bot e pós-venda. | Uso oficial da WhatsApp Business API (Meta). |
| RNF013 | Integração | Integração futura com o Bling para sincronização fiscal/administrativa. | Conector/exportação compatível com a API do Bling. |
| RNF014 | Notificação | Notificações por push, e-mail e WhatsApp, conforme preferência do usuário. | Múltiplos canais configuráveis por usuário. |
| RNF015 | Acessibilidade | Cardápio e site devem seguir boas práticas de acessibilidade. | Conformidade WCAG 2.1 nível AA. |
| RNF016 | PWA | Entregue como PWA instalável, com uso offline parcial e push. | Manifest válido, service worker e Lighthouse PWA ≥ 90. |
