import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * True once Supabase env vars are actually set. The storefront falls back to
 * the static catalog in lib/products.ts when this is false, so the site
 * keeps working out of the box before a Supabase project is connected.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Plain Supabase client with no cookie/session handling — used only for
 * public, RLS-gated reads (active products/categories/settings). Safe to
 * call from generateStaticParams/generateMetadata at build time, which the
 * cookie-based client in server.ts is not (it depends on next/headers'
 * request-scoped cookies()).
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
