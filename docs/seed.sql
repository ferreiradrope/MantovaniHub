-- =====================================================================
--  MantovaniHub — Seed (dados iniciais)
--  Produtos reais do Cardápio Mantovani 2025 + dados de demonstração
--  (lotes, estoque, clientes, pedidos) com datas relativas a CURRENT_DATE.
-- =====================================================================

-- ---------- Categorias ----------
insert into categorias (nome, slug, ordem) values
  ('Defumados', 'defumados', 1),
  ('Maturados', 'maturados', 2),
  ('Curados', 'curados', 3),
  ('Linguiças', 'linguicas', 4),
  ('Assados', 'assados', 5),
  ('Fermentados', 'fermentados', 6),
  ('Tábua de Frios', 'tabua-de-frios', 7),
  ('Especiais', 'especiais', 8),
  ('Parcerias', 'parcerias', 9);

-- ---------- Alérgenos ----------
insert into alergenos (nome) values
  ('Glúten'), ('Lactose'), ('Pimenta'), ('Peixe'), ('Crustáceos'), ('Soja'), ('Sulfitos');

-- ---------- Configuração do negócio ----------
insert into config_negocio (id, link_cardapio) values (1, '/cardapio');

-- ---------- Datas-alvo (agenda de produção) ----------
insert into datas_alvo (nome, data_alvo, descricao) values
  ('Natal 2026', '2026-12-24', 'Pico de vendas de tábuas e maturados.'),
  ('Dia das Mães 2027', '2027-05-09', 'Kits e tábuas de frios.');

-- ---------- Planos de assinatura ----------
insert into planos_assinatura (nome, descricao, preco_mensal, beneficios) values
  ('Essencial', 'Curadoria mensal só de charcutaria artesanal.', 119.00,
    array['3 a 4 cortes do mês', 'Frete em BH incluso', 'Ficha de harmonização']),
  ('Intermediário', 'Charcutaria + queijos selecionados.', 189.00,
    array['Charcutaria do mês', 'Queijos parceiros', 'Sugestão de harmonização']),
  ('Premium', 'Charcutaria + queijos + vinho harmonizado.', 289.00,
    array['Seleção premium do mês', 'Queijos + vinho parceiro', 'Curadoria do Douglas']);

-- ---------- Fornecedores ----------
insert into fornecedores (nome, contato, cidade, uf) values
  ('Frigorífico Serra Azul', '(31) 3333-1010', 'Pará de Minas', 'MG'),
  ('Pescados do Atlântico', '(27) 3222-4040', 'Vitória', 'ES'),
  ('Suínos Premium Ltda', '(31) 3555-7070', 'Betim', 'MG');

-- =====================================================================
--  PRODUTOS (Cardápio Mantovani 2025)
-- =====================================================================
-- Defumados
insert into produtos (categoria_id, nome, slug, unidade_venda, preco_varejo, preco_atacado) values
  ((select id from categorias where slug='defumados'), 'Pastrami', 'pastrami', '100g', 25.60, 21.80),
  ((select id from categorias where slug='defumados'), 'Língua Defumada', 'lingua-defumada', 'kg', 90.00, 78.00),
  ((select id from categorias where slug='defumados'), 'Calabresa', 'calabresa', 'kg', 93.90, 80.00),
  ((select id from categorias where slug='defumados'), 'Coppa Defumada', 'coppa-defumada', '100g', 19.00, 16.20),
  ((select id from categorias where slug='defumados'), 'Lombo Defumado', 'lombo-defumado', '100g', 19.00, 16.20),
  ((select id from categorias where slug='defumados'), 'Bacon Artesanal', 'bacon', '100g', 9.90, 8.40),
  ((select id from categorias where slug='defumados'), 'Lombo Defumado com Crosta de Pimenta', 'lombo-crosta-pimenta', '100g', 19.50, 16.60),
  ((select id from categorias where slug='defumados'), 'Lombo Defumado com Crosta de Ervas', 'lombo-crosta-ervas', '100g', 19.50, 16.60),
  ((select id from categorias where slug='defumados'), 'Linguiça Caipira Defumada', 'linguica-caipira-defumada', '500g', 28.00, 24.00),
  ((select id from categorias where slug='defumados'), 'Frango Defumado', 'frango-defumado', 'unidade', 13.00, 11.00),
  ((select id from categorias where slug='defumados'), 'Joelho de Porco Defumado', 'joelho-porco', 'unidade', 50.00, 44.00),
  ((select id from categorias where slug='defumados'), 'Torresmo de Rolo', 'torresmo-de-rolo', 'kg', 130.00, 112.00);
-- Maturados
insert into produtos (categoria_id, nome, slug, unidade_venda, preco_varejo, preco_atacado) values
  ((select id from categorias where slug='maturados'), 'Lonza', 'lonza', '100g', 21.00, 18.00),
  ((select id from categorias where slug='maturados'), 'Salame Tipo Italiano', 'salame-italiano', '100g', 21.00, 18.00),
  ((select id from categorias where slug='maturados'), 'Guanciale', 'guanciale', '100g', 21.00, 18.00),
  ((select id from categorias where slug='maturados'), 'Culatello', 'culatello', '100g', 30.00, 26.00),
  ((select id from categorias where slug='maturados'), 'Panceta Arrotolata', 'panceta-arrotolata', '100g', 22.50, 19.20),
  ((select id from categorias where slug='maturados'), 'Bresaola', 'bresaola', '100g', 27.70, 23.70),
  ((select id from categorias where slug='maturados'), 'Coppa', 'coppa', '100g', 24.50, 21.00),
  ((select id from categorias where slug='maturados'), 'Filetto', 'filetto', '100g', 19.50, 16.60),
  ((select id from categorias where slug='maturados'), 'Presunto Speck', 'presunto-speck', '100g', 31.20, 26.70),
  ((select id from categorias where slug='maturados'), 'Mini Salaminho', 'mini-salaminho', '100g', 19.00, 16.20),
  ((select id from categorias where slug='maturados'), 'Linguiça Seca', 'linguica-seca', 'kg', 196.90, 170.00),
  ((select id from categorias where slug='maturados'), 'Chouriço Espanhol', 'chourico-espanhol', 'kg', 190.00, 165.00),
  ((select id from categorias where slug='maturados'), 'Panceta Tesa', 'panceta-tesa', '100g', 19.00, 16.20),
  ((select id from categorias where slug='maturados'), 'Lardo', 'lardo', '100g', 20.10, 17.10);
-- Curados
insert into produtos (categoria_id, nome, slug, unidade_venda, preco_varejo, preco_atacado, disponivel_fora_mg) values
  ((select id from categorias where slug='curados'), 'Gravlax', 'gravlax', '100g', 29.90, 25.50, true),
  ((select id from categorias where slug='curados'), 'Linguiça Curada', 'linguica-curada', '100g', 16.50, 14.00, true),
  ((select id from categorias where slug='curados'), 'Linguiça Curada de Cordeiro', 'linguica-curada-cordeiro', '100g', 21.00, 18.00, true),
  ((select id from categorias where slug='curados'), 'Salmão Curado e Defumado', 'salmao-curado-defumado', '100g', 21.00, 18.00, true);
-- Linguiças (frescas)
insert into produtos (categoria_id, nome, slug, unidade_venda, preco_varejo, preco_atacado, tempo_producao_dias) values
  ((select id from categorias where slug='linguicas'), 'Linguiça Toscana', 'linguica-toscana', '500g', 23.90, 20.40, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça Apimentada', 'linguica-apimentada', '500g', 23.90, 20.40, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça com Orégano', 'linguica-oregano', '500g', 23.90, 20.40, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça com Ervas Finas', 'linguica-ervas-finas', '500g', 23.90, 20.40, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça Caipira', 'linguica-caipira', '500g', 23.90, 20.40, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça de Alho Poró', 'linguica-alho-poro', '500g', 27.00, 23.00, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça com Azeitona', 'linguica-azeitona', '500g', 24.50, 21.00, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça com Pimenta Biquinho', 'linguica-pimenta-biquinho', '500g', 24.50, 21.00, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça Espanhola', 'linguica-espanhola', '500g', 24.50, 21.00, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça com Queijo Coalho', 'linguica-queijo-coalho', '500g', 27.00, 23.00, 1),
  ((select id from categorias where slug='linguicas'), 'Linguiça ao Vinho', 'linguica-vinho', '500g', 27.00, 23.00, 1);
-- Assados / Fermentados / Especiais / Parcerias
insert into produtos (categoria_id, nome, slug, unidade_venda, preco_varejo, preco_atacado, sazonal) values
  ((select id from categorias where slug='assados'), 'Porchetta sem Pele', 'porchetta', 'kg', 120.00, 104.00, false),
  ((select id from categorias where slug='fermentados'), 'Alho Negro', 'alho-negro', '100g', 29.00, 25.00, false),
  ((select id from categorias where slug='tabua-de-frios'), 'Tábua de Frios (sob demanda)', 'tabua-de-frios-demanda', 'unidade', 150.00, 135.00, false),
  ((select id from categorias where slug='especiais'), 'Bottarga', 'bottarga', 'kg', 599.90, 540.00, true),
  ((select id from categorias where slug='parcerias'), 'Black Ham (parceria Krug Bier)', 'black-ham', 'kg', 209.00, 185.00, false);

-- ---------- Ficha técnica dos produtos destacados ----------
update produtos set
  descricao = 'Peito bovino salgado em salmoura, temperado com mostarda e pimentas e defumado lentamente. Macio e levemente picante.',
  ingredientes = array['Peito bovino', 'Sal', 'Açúcar', 'Mostarda', 'Pimenta-do-reino', 'Coentro', 'Alho'],
  ficha_tecnica = 'Cura úmida por 7 dias, cobertura de especiarias e defumação a frio. Fatiar bem fino.',
  tempo_producao_dias = 10, perda_media_pct = 38
  where slug = 'pastrami';
update produtos set
  descricao = 'Corte nobre da paleta suína, maturado lentamente com vinho e especiarias. Doce, marmoreado e aveludado.',
  ingredientes = array['Pernil/sobrepaleta suína', 'Sal', 'Vinho tinto', 'Pimenta-do-reino', 'Noz-moscada'],
  ficha_tecnica = 'Salga seca, embuchamento e maturação de até 120 dias em câmara climatizada.',
  tempo_producao_dias = 120, perda_media_pct = 42
  where slug = 'coppa';
update produtos set
  descricao = 'Lagarto bovino curado e maturado, magro e intenso. Clássico italiano para fatiar fino com azeite e limão.',
  ingredientes = array['Lagarto bovino', 'Sal', 'Alecrim', 'Zimbro', 'Pimenta-do-reino'],
  ficha_tecnica = 'Cura seca e maturação de ~90 dias. Servir em lâminas finíssimas.',
  tempo_producao_dias = 90, perda_media_pct = 45
  where slug = 'bresaola';
update produtos set
  descricao = 'Papada suína curada e maturada, base da autêntica carbonara. Untuosa e perfumada.',
  ingredientes = array['Papada suína', 'Sal', 'Pimenta-do-reino', 'Alho', 'Alecrim'],
  ficha_tecnica = 'Salga seca e maturação de ~60 dias. Ideal para risotos e massas.',
  tempo_producao_dias = 60, perda_media_pct = 35
  where slug = 'guanciale';
update produtos set
  descricao = 'O rei dos curados de Parma: filé suíno maturado por meses, doce e delicado.',
  ingredientes = array['Filé suíno (fesa)', 'Sal', 'Vinho branco', 'Alho', 'Pimenta'],
  ficha_tecnica = 'Maturação longa em bexiga natural por até 150 dias.',
  tempo_producao_dias = 150, perda_media_pct = 48
  where slug = 'culatello';
update produtos set
  descricao = 'Salame artesanal de fermentação natural, equilibrado e levemente picante.',
  ingredientes = array['Carne suína', 'Toucinho', 'Sal', 'Alho', 'Vinho', 'Pimenta-do-reino'],
  ficha_tecnica = 'Fermentação e maturação de ~45 dias.',
  tempo_producao_dias = 45, perda_media_pct = 33
  where slug = 'salame-italiano';
update produtos set
  descricao = 'Barriga suína curada e defumada artesanalmente. Crocante quando grelhada, perfeito para qualquer hora.',
  ingredientes = array['Barriga suína', 'Sal', 'Açúcar mascavo', 'Pimenta-do-reino'],
  ficha_tecnica = 'Cura de 5 dias e defumação a frio com madeira nobre.',
  tempo_producao_dias = 7, perda_media_pct = 28
  where slug = 'bacon';
update produtos set
  descricao = 'Salmão curado no sal, açúcar e endro, finalizado com leve defumação. Sofisticado e fresco.',
  ingredientes = array['Salmão', 'Sal', 'Açúcar', 'Endro (dill)', 'Pimenta'],
  ficha_tecnica = 'Cura de 48h. Fatiar fino. Mantém perfil escandinavo.',
  tempo_producao_dias = 3, perda_media_pct = 22
  where slug = 'gravlax';

-- ---------- Alérgenos dos destacados ----------
insert into produto_alergenos (produto_id, alergeno_id)
select p.id, a.id from produtos p, alergenos a
where (p.slug, a.nome) in (
  ('pastrami','Pimenta'), ('coppa','Pimenta'), ('bresaola','Pimenta'),
  ('guanciale','Pimenta'), ('gravlax','Peixe'), ('salmao-curado-defumado','Peixe'),
  ('linguica-apimentada','Pimenta'), ('linguica-pimenta-biquinho','Pimenta'),
  ('linguica-queijo-coalho','Lactose'), ('coppa','Sulfitos'), ('culatello','Sulfitos')
);

-- ---------- Harmonizações ----------
insert into harmonizacoes (produto_id, tipo, nome, descricao)
select p.id, h.tipo::tipo_harmonizacao, h.nome, h.descricao
from produtos p
join (values
  ('coppa','vinho','Lambrusco','O frisante corta a untuosidade da coppa.'),
  ('coppa','queijo','Parmigiano 24 meses','Salgado e cristalino, contrasta com o doce.'),
  ('bresaola','vinho','Chianti','Taninos equilibram a carne magra curada.'),
  ('bresaola','pao','Focaccia de alecrim','Base perfeita com azeite e limão.'),
  ('guanciale','vinho','Frascati','Branco romano para a carbonara clássica.'),
  ('pastrami','cerveja','IPA Krug Bier','O amargor limpa o paladar do defumado.'),
  ('pastrami','pao','Pão de centeio','Sanduíche nova-iorquino na veia.'),
  ('gravlax','vinho','Espumante Brut','Acidez e bolhas com o salmão curado.'),
  ('salame-italiano','vinho','Sangiovese','Clássico italiano com o salame.'),
  ('bacon','cerveja','Weiss Krug Bier','Trigo e defumado se completam.')
) as h(slug, tipo, nome, descricao) on h.slug = p.slug;

-- ---------- Roteiro de etapas (agenda de maturação) ----------
insert into produto_etapas (produto_id, ordem, nome_etapa, duracao_dias)
select p.id, e.ordem, e.nome, e.dias
from produtos p
join (values
  ('coppa',1,'Salga',7), ('coppa',2,'Embuchamento',2), ('coppa',3,'Maturação',111),
  ('bresaola',1,'Salga',5), ('bresaola',2,'Cura',10), ('bresaola',3,'Maturação',75),
  ('pastrami',1,'Salmoura',7), ('pastrami',2,'Tempero',1), ('pastrami',3,'Defumação',2),
  ('culatello',1,'Salga',10), ('culatello',2,'Embuchamento',5), ('culatello',3,'Maturação',135)
) as e(slug, ordem, nome, dias) on e.slug = p.slug;

-- ---------- Clientes ----------
insert into clientes (tipo, nome, razao_social, cnpj_cpf, telefone, email, cidade, uf, tabela_preco, observacoes) values
  ('pj', 'Cantina do Porto', 'Cantina do Porto Restaurante Ltda', '12.345.678/0001-90', '(31) 99888-1010', 'compras@cantinadoporto.com.br', 'Belo Horizonte', 'MG', 'atacado', 'Pedido recorrente quinzenal de coppa e bresaola.'),
  ('pj', 'Empório Bom Gosto', 'Empório Bom Gosto Eireli', '98.765.432/0001-10', '(31) 99777-2020', 'pedidos@bomgosto.com', 'Nova Lima', 'MG', 'atacado', 'Vende fatiado no balcão.'),
  ('pf', 'Marina Alves', null, '123.456.789-00', '(31) 99666-3030', 'marina.alves@email.com', 'Belo Horizonte', 'MG', 'varejo', 'Alérgica a frutos do mar.'),
  ('pf', 'Carlos Drummond', null, '987.654.321-00', '(31) 99555-4040', 'carlos.d@email.com', 'Contagem', 'MG', 'varejo', 'Cliente do clube (Premium).');

-- =====================================================================
--  LOTES DE DEMONSTRAÇÃO (datas relativas a hoje)
--  status em_estoque já com peso_disponivel; perdas calculadas pelas
--  GENERATED columns; código AAA.NNN gerado pelo gatilho.
-- =====================================================================
-- INSERTs individuais: o gatilho de código de lote numera por produto/ano corretamente.
-- Em estoque, validade variada (alimenta semáforo e alertas)
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='coppa'), 12.000, 10.500, 6.900, 3.200, 'em_estoque', current_date-130, current_date-12, current_date+4);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='bresaola'), 9.000, 8.100, 4.950, 2.100, 'em_estoque', current_date-100, current_date-9, current_date+6);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='pastrami'), 8.000, 7.200, 4.960, 2.500, 'em_estoque', current_date-30, current_date-6, current_date+20);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='guanciale'), 6.000, 5.400, 3.900, 3.900, 'em_estoque', current_date-70, current_date-5, current_date+45);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='salame-italiano'), 5.000, 4.500, 3.350, 1.250, 'em_estoque', current_date-50, current_date-4, current_date+90);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='bacon'), 15.000, 13.500, 10.800, 6.400, 'em_estoque', current_date-12, current_date-3, current_date+25);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='lonza'), 7.000, 6.300, 4.480, 4.480, 'em_estoque', current_date-60, current_date-2, current_date+120);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='gravlax'), 4.000, 3.600, 3.100, 0.900, 'em_estoque', current_date-6, current_date-2, current_date+8);
-- Produção histórica (alimenta relatório mensal) — já vendidos
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='coppa'), 11.000, 9.600, 6.300, 0.000, 'vendido', current_date-160, current_date-44, current_date-2);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='pastrami'), 9.500, 8.500, 5.900, 0.000, 'vendido', current_date-80, current_date-58, current_date-1);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='salame-italiano'), 6.000, 5.400, 4.020, 0.000, 'vendido', current_date-95, current_date-75, current_date-5);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='bacon'), 14.000, 12.600, 9.800, 0.000, 'vendido', current_date-110, current_date-100, current_date-40);
-- Em produção (alimenta agenda de maturação)
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='culatello'), 10.000, 9.000, null, 0.000, 'em_producao', current_date-20, null, null);
insert into lotes (produto_id, peso_recebido_kg, peso_apos_limpeza_kg, peso_final_kg, peso_disponivel_kg, status, data_abertura, data_conclusao, data_validade)
  values ((select id from produtos where slug='coppa'), 13.000, 11.400, null, 0.000, 'em_producao', current_date-15, null, null);

-- Movimentos de entrada para os lotes em estoque (livro-razão)
insert into estoque_movimentos (lote_id, tipo, quantidade_kg, motivo)
select id, 'entrada', peso_final_kg, 'Lote concluído (seed)' from lotes where status='em_estoque';

-- ---------- Alertas de produção (exemplos) ----------
insert into alertas (tipo, severidade, titulo, mensagem, produto_id, data_referencia)
select 'producao', 'atencao', 'Iniciar produção de Coppa para o Natal',
       'Para entregar no Natal 2026, a coppa (≈120 dias) deve iniciar até a data-limite.',
       id, current_date+10 from produtos where slug='coppa';
insert into alertas (tipo, severidade, titulo, mensagem, lote_id, data_referencia)
select 'producao', 'info', 'Culatello: próxima etapa (Embuchamento)',
       'O lote em maturação deve avançar de etapa conforme o roteiro.',
       id, current_date+1 from lotes where status='em_producao' and produto_id=(select id from produtos where slug='culatello') limit 1;

-- =====================================================================
--  PEDIDOS DE DEMONSTRAÇÃO
-- =====================================================================
insert into pedidos (cliente_id, canal, status, tipo_entrega, valor_produtos, valor_entrega, forma_pagamento, pago) values
  ((select id from clientes where nome='Cantina do Porto'), 'site', 'separacao', 'motoboy', 540.00, 25.00, 'pix', true),
  ((select id from clientes where nome='Marina Alves'),     'whatsapp', 'recebido', 'retirada', 96.40, 0, 'pix', false),
  ((select id from clientes where nome='Empório Bom Gosto'),'site', 'pronto', 'motoboy', 812.00, 35.00, 'cartao', true),
  ((select id from clientes where nome='Carlos Drummond'),  'site', 'entregue', 'motoboy', 134.50, 20.00, 'pix', true);

insert into pedido_itens (pedido_id, produto_id, quantidade, preco_unitario)
select pe.id, pr.id, i.qtd, i.preco
from (values
  ('Cantina do Porto','coppa', 10.0, 21.00),
  ('Cantina do Porto','bresaola', 12.0, 23.70),
  ('Marina Alves','pastrami', 2.0, 25.60),
  ('Marina Alves','bacon', 4.0, 9.90),
  ('Empório Bom Gosto','salame-italiano', 20.0, 18.00),
  ('Empório Bom Gosto','guanciale', 8.0, 18.00),
  ('Carlos Drummond','coppa', 3.0, 24.50),
  ('Carlos Drummond','gravlax', 2.0, 29.90)
) as i(cliente, slug, qtd, preco)
join clientes c on c.nome = i.cliente
join pedidos pe on pe.cliente_id = c.id
join produtos pr on pr.slug = i.slug;

-- Histórico de status dos pedidos
insert into pedido_status_hist (pedido_id, status)
select id, status from pedidos;
