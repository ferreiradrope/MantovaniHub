import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com service role — APENAS no servidor (bypassa RLS).
 * Usado no checkout público, onde o cliente não está autenticado.
 */
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
