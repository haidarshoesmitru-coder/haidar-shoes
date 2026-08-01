import { redirect } from "next/navigation";
import { setupIsAvailable, createFirstAdmin } from "@/lib/actions/setup";
import { isServiceRoleConfigured } from "@/lib/supabase/service";

export default async function AdminSetupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (!isServiceRoleConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
        <div className="w-full max-w-md bg-paper border border-line p-8 text-center">
          <h1 className="font-display font-bold text-xl text-ink mb-3">Setup Not Available Yet</h1>
          <p className="text-sm text-graphite leading-relaxed">
            Add <code className="bg-canvas px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> to
            your <code className="bg-canvas px-1.5 py-0.5">.env.local</code> file (found in Supabase
            → Project Settings → API → service_role key), restart the server, then reload this page.
          </p>
        </div>
      </div>
    );
  }

  const available = await setupIsAvailable();
  if (!available) {
    redirect("/admin/login?error=setup-already-complete");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm bg-paper border border-line p-8">
        <span className="font-display font-extrabold text-xl tracking-tight text-ink uppercase">
          Haidar <span className="text-clay">Shoes</span>
        </span>
        <p className="text-sm text-graphite mt-1 mb-2">Admin Panel</p>
        <h1 className="font-display font-semibold text-lg text-ink mb-1">Create Your Admin Account</h1>
        <p className="text-sm text-graphite mb-6">
          This runs once. After this account is created, this page turns itself off.
        </p>

        {searchParams.error && (
          <p className="mb-5 text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">
            {searchParams.error}
          </p>
        )}

        <form action={createFirstAdmin} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-xs font-medium text-graphite mb-1.5">
              Your Name
            </label>
            <input id="full_name" name="full_name" type="text" className="input" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-graphite mb-1.5">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className="input" />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-graphite mb-1.5">
              Password <span className="text-stone">(min. 8 characters)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="input"
            />
          </div>
          <button type="submit" className="btn-primary w-full !text-white text-eyebrow px-6 py-3 mt-2">
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
}
