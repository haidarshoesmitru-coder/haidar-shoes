import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * True once SUPABASE_SERVICE_ROLE_KEY is set. Only needed for the one-time
 * /admin/setup flow (creating the very first admin account) — normal
 * day-to-day admin operations use the authenticated user's own session
 * instead, so this is optional until you actually need first-run setup.
 */
export function isServiceRoleConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Bypasses Row Level Security entirely — never import this into any file
 * that could run in or be bundled for the browser. Used only by
 * lib/actions/setup.ts.
 */
export function createServiceRoleClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
