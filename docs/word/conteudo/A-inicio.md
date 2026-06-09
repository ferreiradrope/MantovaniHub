# 1. Identificação

- **Projeto:** Charcutaria Mantovani
- **Produto:** MantovaniHub – Plataforma de Gestão Integrada para Charcutaria Artesanal (gestão de produção/lotes, estoque, validade, cardápio digital, e relacionamento com cliente)
- **Product Owner:** Breno Gabriel da Silva
- **Scrum Master:** Naegeli Raiane Guerra
- **Time de Desenvolvimento:** Breno Gabriel da Silva; Bruno Henrique Silva dos Santos; Caio Rafael da Encarnação Freitas; Enzo Marinho Machado Vieira; Felipe Barbosa da Silva; Gabriel Correia Proença; Gabriel Maciel Cavalcante; Isaías Gomes Dally Junior; Mariana Albuquerque da Cruz; Naegeli Raiane Guerra; Pedro Henrique Esgote Santana; Pedro Henrique Ferreira da Silva; Tino Marcos Santos da Paz; Vinícius Anselmo
- **Versão do Documento:** 2.0
- **Data:** Junho de 2026

# 2. Visão do Produto

## 2.1 Objetivo

A Charcutaria Mantovani é uma microempresa artesanal localizada no bairro Prado, em Belo Horizonte/MG, formada por apenas duas pessoas (o proprietário Douglas, formado em gastronomia, e sua esposa). A empresa produz embutidos, defumados, curados e maturados (linguiças, bacons, salames, pastrami, salmão defumado, copa maturada, presunto cru, entre outros) e atende tanto pessoa jurídica (restaurantes, padarias, empórios e casas de eventos) quanto pessoa física (cliente final na loja, via WhatsApp e redes sociais).

A pequena equipe acumula múltiplos papéis (produção, atendimento, marketing, financeiro e logística) e enfrenta dificuldades específicas que sistemas genéricos de gestão (como o Bling, hoje utilizado apenas para emissão de nota fiscal e controle administrativo) não conseguem resolver:

- Controle de produção artesanal com rastreabilidade por lote (numeração no padrão `AAA.NNN`, ex.: `026.015`).
- Cálculo de perda de matéria-prima ao longo do processo (limpeza, cura, defumação, cozimento, maturação) — uma carne pode chegar com 10 kg e resultar em apenas 6 kg de produto final, com perdas que variam de 30% a 50% de produto para produto e até de lote para lote.
- Mensuração mensal do que foi produzido por categoria de produto.
- Controle e alerta de validade (produtos vencendo na geladeira por falta de aviso).
- Atendimento ao cliente (sobrecarga de WhatsApp paralela à produção, sem perder o caráter humanizado, que é diferencial da marca).
- Cardápio digital com fotos e ingredientes (hoje só com nome e preço, dificultando a venda de produtos cujo nome é desconhecido pelo público — coppa, pastrami — e prejudicando clientes alérgicos).
- Reativação do site com vitrine institucional, marketplace e clube de assinatura (com harmonização charcutaria + queijo + vinho).

O sistema deve ser mobile-first, pois Douglas e sua esposa operam predominantemente pelo celular durante a produção e o atendimento.

## 2.2 Declaração de Visão (Product Vision)

> Para Douglas e a equipe da Charcutaria Mantovani, que precisam controlar a produção artesanal por lote, mensurar perdas, monitorar validades, agilizar o atendimento e ampliar a divulgação dos produtos sem perder o toque humano da marca, o MantovaniHub é uma plataforma digital de gestão integrada e relacionamento com o cliente que automatiza o registro de lotes e perdas, alerta vencimentos, oferece cardápio digital com fotos e ingredientes, integra um marketplace ao site institucional e qualifica o atendimento via WhatsApp — preservando o caráter artesanal e personalizado que diferencia a Mantovani no mercado.

# 3. Personas

| Persona | Descrição | Objetivos | Dores |
|---|---|---|---|
| **Douglas (Mestre Charcuteiro / Proprietário)** | Formado em gastronomia, é o responsável pela produção, criação de receitas, compras de insumos e parte do atendimento ao cliente. Trabalha predominantemente no celular, com as mãos na massa (literalmente). | Registrar a produção e as perdas de forma rápida, do próprio celular, sem interromper o fluxo de produção; ter histórico mensal por produto; ser avisado quando um lote estiver perto de vencer; reduzir o tempo gasto respondendo dúvidas repetidas no WhatsApp. | Hoje o controle é visual e em planilhas Excel separadas (ficha técnica em uma, produção em outra); o Bling é genérico demais e exige login no desktop; não consegue medir quanto produz de cada item por mês; produtos vencem na geladeira sem aviso; o telefone toca no meio da produção e ele precisa parar para responder. |
| **Esposa de Douglas (Gestora / Administradora)** | Cuida do administrativo, financeiro, emissão de nota fiscal e ajuda no atendimento. Tem apoio da cunhada para o Instagram. | Centralizar dados em um único lugar; emitir relatórios de faturamento e produção; acompanhar estoque em tempo real; gerenciar o clube de assinatura quando ele entrar no ar. | Múltiplas planilhas desconectadas; precisa do desktop para o Bling enquanto o restante da operação acontece no celular; falta de visão consolidada entre produção, vendas e estoque. |
| **Chef / Comprador (Cliente Pessoa Jurídica)** | Chef de restaurante, padaria, empório ou casa de eventos. Compra em maior volume e com maior recorrência; representa o canal de maior faturamento da Mantovani. Pode ser de MG ou de outros estados (ES, SP etc.). | Consultar rapidamente a tabela de produtos com ingredientes e disponibilidade; fazer pedidos recorrentes de forma ágil; negociar amostras e novos produtos; compor o próprio cardápio com os produtos da Mantovani. | Precisa esperar resposta do WhatsApp (que pode demorar quando Douglas está produzindo); não tem como consultar a ficha de ingredientes por conta própria; depende de catálogo PDF e de boca a boca para conhecer novidades. |
| **Consumidor Final (Cliente Pessoa Física)** | Apreciador de charcutaria, normalmente atraído por Instagram, indicação ou pela loja física. Compra ticket menor, mas com margem maior. Pode ser alérgico a algum ingrediente ou ter restrição (pimenta, glúten etc.). | Conhecer o que é cada produto (foto, descrição e ingredientes antes de comprar); comprar pelo site/WhatsApp e receber em casa; receber sugestões de harmonização (queijos, vinhos); confiar na qualidade e no caráter artesanal do produto. | O cardápio atual só tem nome e preço — não sabe o que é uma "coppa"; precisa perguntar ingrediente a ingrediente quando tem alergia; não tem opção de comprar pelo site (atualmente desativado); demora para receber resposta do WhatsApp. |
