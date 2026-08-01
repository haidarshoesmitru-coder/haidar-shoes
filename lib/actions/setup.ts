"use server";

import { redirect } from "next/navigation";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/service";

/**
 * True only while no admin account exists yet. Checked by both the setup
 * page (to decide whether to render the form or redirect away) and this
 * action (so the flow can't be reused even if someone bookmarks the URL).
 */
export async function setupIsAvailable(): Promise<boolean> {
  if (!isServiceRoleConfigured()) return false;

  const supabase = createServiceRoleClient();
  const { count, error } = await supabase
    .from("admin_profiles")
    .select("*", { count: "exact", head: true });

  if (error) return false;
  return (count ?? 0) === 0;
}

export async function createFirstAdmin(formData: FormData) {
  const available = await setupIsAvailable();
  if (!available) {
    redirect("/admin/login?error=setup-already-complete");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || password.length < 8) {
    redirect(`/admin/setup?error=${encodeURIComponent("Enter a valid email and a password of at least 8 characters.")}`);
  }

  const supabase = createServiceRoleClient();

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // trusted, one-time bootstrap — no confirmation email needed
  });

  if (createError || !created.user) {
    redirect(`/admin/setup?error=${encodeURIComponent(createError?.message ?? "Could not create the account.")}`);
  }

  const { error: profileError } = await supabase
    .from("admin_profiles")
    .insert({ id: created.user.id, full_name: fullName || null, role: "owner" });

  if (profileError) {
    // Roll back the auth user so a failed setup doesn't leave an orphaned
    // login with no admin access and no way to retry setup.
    await supabase.auth.admin.deleteUser(created.user.id);
    redirect(`/admin/setup?error=${encodeURIComponent(profileError.message)}`);
  }

  redirect("/admin/login?setup=1");
}
