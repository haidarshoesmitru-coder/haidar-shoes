"use server";

import { redirect } from "next/navigation";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/service";

export type SetupStatus =
  | { status: "available" }
  | { status: "already-configured" }
  | { status: "not-configured" }
  | { status: "error"; code: string; message: string; details: string; hint: string };

/**
 * Checks whether the setup flow should be open. Deliberately does NOT
 * collapse "the check failed" and "an admin already exists" into the same
 * false/true result — those are very different situations and the UI needs
 * to tell them apart, or a misconfigured project (e.g. schema.sql not run
 * yet) looks identical to "setup already done," which is misleading.
 */
export async function getSetupStatus(): Promise<SetupStatus> {
  if (!isServiceRoleConfigured()) {
    return { status: "not-configured" };
  }

  const supabase = createServiceRoleClient();
  const { count, error } = await supabase
    .from("admin_profiles")
    .select("*", { count: "exact", head: true });

  if (error) {
    // Surface the full Postgrest/Supabase error object rather than just
    // `.message` — `.code` in particular (e.g. PGRST205, 42501, PGRST301)
    // is what actually distinguishes "table doesn't exist," "no
    // permission," and "PostgREST's schema cache is stale" from each other.
    return {
      status: "error",
      code: error.code || "unknown",
      message: error.message || "No message returned.",
      details: error.details || "",
      hint: error.hint || "",
    };
  }

  return (count ?? 0) === 0 ? { status: "available" } : { status: "already-configured" };
}

export async function createFirstAdmin(formData: FormData) {
  const check = await getSetupStatus();
  if (check.status === "already-configured") {
    redirect("/admin/login?error=setup-already-complete");
  }
  if (check.status !== "available") {
    const message = check.status === "error" ? check.message : "Service role key is not configured.";
    redirect(`/admin/setup?error=${encodeURIComponent(message)}`);
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
