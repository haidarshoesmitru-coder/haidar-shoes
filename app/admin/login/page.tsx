import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { setupIsAvailable } from "@/lib/actions/setup";

const errorMessages: Record<string, string> = {
  "not-authorized": "That account doesn't have admin access.",
  "setup-already-complete": "An admin account already exists — log in below.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string; setup?: string };
}) {
  const rawError = searchParams.error;
  const message = rawError ? errorMessages[rawError] ?? rawError : null;
  const needsSetup = await setupIsAvailable();

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm bg-paper border border-line p-8">
        <span className="font-display font-extrabold text-xl tracking-tight text-ink uppercase">
          Haidar <span className="text-clay">Shoes</span>
        </span>
        <p className="text-sm text-graphite mt-1 mb-8">Admin Panel</p>

        {searchParams.setup === "1" && (
          <p className="mb-5 text-sm text-ink bg-canvas border border-line px-3 py-2">
            Admin account created — log in below.
          </p>
        )}
        {message && (
          <p className="mb-5 text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">
            {message}
          </p>
        )}
        {needsSetup && !message && (
          <p className="mb-5 text-sm text-ink bg-canvas border border-line px-3 py-2">
            No admin account exists yet.{" "}
            <Link href="/admin/setup" className="underline font-medium">
              Create one →
            </Link>
          </p>
        )}

        <form action={login} className="space-y-4">
          <input type="hidden" name="redirectTo" value={searchParams.redirectTo ?? "/admin"} />
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-graphite mb-1.5">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className="input" />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-graphite mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input"
            />
          </div>
          <button type="submit" className="btn-primary w-full !text-white text-eyebrow px-6 py-3 mt-2">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
