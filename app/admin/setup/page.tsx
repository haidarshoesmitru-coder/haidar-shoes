import { getSetupStatus, createFirstAdmin } from "@/lib/actions/setup";

export default async function AdminSetupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const check = await getSetupStatus();

  if (check.status === "not-configured") {
    return (
      <DiagnosticScreen title="Setup Not Available Yet">
        Add <code className="bg-canvas px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> to
        your <code className="bg-canvas px-1.5 py-0.5">.env.local</code> file (found in Supabase
        → Project Settings → API → service_role key), restart the server, then reload this page.
      </DiagnosticScreen>
    );
  }

  if (check.status === "error") {
    return (
      <DiagnosticScreen title="Could Not Check Setup Status" isError>
        <>
          Supabase returned an error while checking the{" "}
          <code className="bg-canvas px-1.5 py-0.5">admin_profiles</code> table:
        </>
        <span className="block mt-3 font-mono text-xs bg-canvas border border-line px-3 py-2 text-clay">
          {check.message}
        </span>
        <span className="block mt-4">
          This usually means <code className="bg-canvas px-1.5 py-0.5">supabase/schema.sql</code> hasn’t
          been run yet in your Supabase project’s SQL Editor, or your{" "}
          <code className="bg-canvas px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> /{" "}
          <code className="bg-canvas px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> don’t match
          your project. Fix that, restart the dev server, and reload this page.
        </span>
      </DiagnosticScreen>
    );
  }

  if (check.status === "already-configured") {
    return (
      <DiagnosticScreen title="An Admin Account Already Exists">
        <>
          There’s already a row in <code className="bg-canvas px-1.5 py-0.5">admin_profiles</code> for
          this project, so this one-time setup flow is closed. If you don’t recognize this account,
          check <strong>Supabase Dashboard → Authentication → Users</strong> and{" "}
          <strong>Table Editor → admin_profiles</strong> to see who it is — nothing here is created
          without that table having a real row in your own database. If you’re sure it shouldn’t be
          there, delete that row in the Table Editor and reload this page to reopen setup.
        </>
      </DiagnosticScreen>
    );
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

function DiagnosticScreen({
  title,
  isError,
  children,
}: {
  title: string;
  isError?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-lg bg-paper border border-line p-8">
        <h1 className={`font-display font-bold text-xl mb-3 ${isError ? "text-clay" : "text-ink"}`}>
          {title}
        </h1>
        <div className="text-sm text-graphite leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
