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
    const isSchemaCacheIssue = check.code === "PGRST205" || check.message.toLowerCase().includes("schema cache");
    const isPermissionIssue = check.code === "42501" || check.code === "PGRST301";

    return (
      <DiagnosticScreen title="Could Not Check Setup Status" isError>
        <>
          Supabase returned an error while checking the{" "}
          <code className="bg-canvas px-1.5 py-0.5">admin_profiles</code> table:
        </>

        <div className="mt-3 font-mono text-xs bg-canvas border border-line px-3 py-3 text-ink space-y-1">
          <div><span className="text-stone">code:</span> {check.code}</div>
          <div><span className="text-stone">message:</span> {check.message}</div>
          <div><span className="text-stone">details:</span> {check.details || "(none)"}</div>
          <div><span className="text-stone">hint:</span> {check.hint || "(none)"}</div>
        </div>

        {isSchemaCacheIssue && (
          <div className="mt-4 border-l-2 border-clay pl-4">
            <p className="font-medium text-ink">This is almost certainly it: PostgREST&rsquo;s schema cache is stale.</p>
            <p className="mt-1">
              Running SQL directly in the SQL Editor creates the tables in Postgres immediately, but
              Supabase&rsquo;s API layer (PostgREST) caches the schema separately and doesn&rsquo;t always
              notice right away. Fix: <strong>Supabase Dashboard → Settings → API → click &ldquo;Reload schema
              cache&rdquo;</strong> (or run <code className="bg-canvas px-1.5 py-0.5">NOTIFY pgrst, &apos;reload schema&apos;;</code>{" "}
              in the SQL Editor), wait about 10 seconds, then reload this page. No redeploy needed —
              this isn&rsquo;t a code or env var problem.
            </p>
          </div>
        )}

        {isPermissionIssue && (
          <div className="mt-4 border-l-2 border-clay pl-4">
            <p className="font-medium text-ink">This looks like a permissions/key problem.</p>
            <p className="mt-1">
              Double-check that <code className="bg-canvas px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> in
              Vercel is the <strong>service_role</strong> key (starts with a JWT that decodes to{" "}
              <code className="bg-canvas px-1.5 py-0.5">&quot;role&quot;:&quot;service_role&quot;</code>) and not
              the anon key by mistake, and that it belongs to the same project as{" "}
              <code className="bg-canvas px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>.
            </p>
          </div>
        )}

        {!isSchemaCacheIssue && !isPermissionIssue && (
          <p className="mt-4">
            The <code className="bg-canvas px-1.5 py-0.5">code</code> above is the specific Postgres/PostgREST
            error code — searching for it (e.g. &ldquo;PGRST100&rdquo;, &ldquo;42P01&rdquo;) usually points
            straight at the cause. Common ones: <code className="bg-canvas px-1.5 py-0.5">42P01</code> = table
            doesn&rsquo;t actually exist in this project, <code className="bg-canvas px-1.5 py-0.5">PGRST205</code> =
            schema cache is stale (see above).
          </p>
        )}
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
