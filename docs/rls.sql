-- =====================================================================
--  MantovaniHub — Row Level Security (Supabase)
--  Catálogo: leitura pública (cardápio). Demais: apenas autenticados.
-- =====================================================================

-- Habilita RLS e concede acesso total a usuários autenticados (staff) em todas as tabelas
do $$
declare t text;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists auth_all on public.%I', t);
    execute format(
      'create policy auth_all on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- Leitura pública (anon) das tabelas do catálogo, usadas pelo cardápio digital
do $$
declare t text;
begin
  foreach t in array array[
    'categorias','produtos','alergenos','produto_alergenos',
    'harmonizacoes','produto_etapas','planos_assinatura','config_negocio'
  ] loop
    execute format('drop policy if exists publico_select on public.%I', t);
    execute format('create policy publico_select on public.%I for select to anon using (true)', t);
  end loop;
end $$;

-- Visões acessíveis ao painel autenticado
grant select on public.vw_estoque_atual to authenticated;
grant select on public.vw_producao_mensal to authenticated;
