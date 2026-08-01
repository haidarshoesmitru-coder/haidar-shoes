import { login } from "@/lib/actions/auth";

const errorMessages: Record<string, string> = {
  "not-authorized": "That account doesn't have admin access.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string };
}) {
  const rawError = searchParams.error;
  const message = rawError ? errorMessages[rawError] ?? rawError : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm bg-paper border border-line p-8">
        <span className="font-display font-extrabold text-xl tracking-tight text-ink uppercase">
          Haidar <span className="text-clay">Shoes</span>
        </span>
        <p className="text-sm text-graphite mt-1 mb-8">Admin Panel</p>

        {message && (
          <p className="mb-5 text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">
            {message}
          </p>
        )}

        <form action={login} className="space-y-4">
          <input type="hidden" name="redirectTo" value={searchParams.redirectTo ?? "/admin"} />
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-graphite mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-ink"
            />
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
              className="w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-ink"
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
