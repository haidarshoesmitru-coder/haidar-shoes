import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // middleware.ts already redirects unauthenticated/non-admin requests, but
  // the login page itself renders through this same layout, so we only
  // enforce again here for defense-in-depth on direct/edge-cache scenarios.
  if (user) {
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
      redirect("/admin/login?error=not-authorized");
    }
  }

  return (
    <div className="min-h-screen bg-canvas font-body">
      <div className="flex flex-col md:flex-row">
        {user && <AdminSidebar />}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
