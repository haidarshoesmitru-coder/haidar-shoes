-- Run this in the Supabase SQL Editor if /admin/setup reports:
--   code: PGRST205
--   message: Could not find the table 'public.admin_profiles' in the schema cache
--
-- This happens when schema.sql was run before v1.3.3 added the reload
-- below to the end of that file. Tables exist in Postgres already — this
-- just tells PostgREST (Supabase's API layer) to notice them.

notify pgrst, 'reload schema';
