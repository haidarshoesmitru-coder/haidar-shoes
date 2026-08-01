# Haidar Shoes — Premium Footwear Website + Admin Panel

A premium footwear brand website built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Framer Motion — now with a production Admin
Panel backed by Supabase for managing products, categories, and store
settings without ever touching code.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The storefront works out of the box using the
built-in sample catalog (`lib/products.ts`) — **you don't need Supabase set
up just to preview the site.**

## Setting Up the Admin Panel (Supabase)

The admin panel and its database are optional until you're ready to manage
real products. Until then, the storefront quietly serves the sample catalog.
To go live with real data:

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), create a new project, and open
**Project Settings → API** to find your Project URL and anon public key.

### 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Run the database schema
Open **SQL Editor** in the Supabase dashboard, paste the entire contents of
`supabase/schema.sql`, and run it. This creates every table, Row Level
Security policy, and storage bucket the admin panel needs, and seeds the five
categories that match the current storefront.

### 4. Create your admin account
There is intentionally no public sign-up page for the admin panel. Instead:

1. In the Supabase dashboard, go to **Authentication → Users → Add User**
   and create yourself an account (email + password).
2. Copy that user's UUID.
3. In the **SQL Editor**, run:
   ```sql
   insert into admin_profiles (id, full_name) values ('<paste-uuid-here>', 'Your Name');
   ```

### 5. Log in
Restart the dev server (so it picks up `.env.local`), then visit
`/admin/login` and sign in. From here you can add products, categories, and
update store settings — everything shows up on the live storefront within a
few minutes (pages revalidate every 5 minutes, or instantly on the next
visit after an edit for most changes).

**Once Supabase is connected, the storefront automatically switches from the
sample catalog to your real data** — no code changes needed. If a Supabase
query ever fails for any reason, the storefront quietly falls back to the
sample catalog rather than showing a broken page.

## Project Structure

```
app/
  (site)/                    → Storefront route group (Navbar/Footer/WhatsApp
                                button live in its layout.tsx). Same URLs as
                                before — home, /collections, /product/[slug],
                                /about, /contact — route groups don't affect
                                the URL.
  admin/                     → Admin panel (protected by middleware.ts)
    login/                    → Sign-in page
    products/                 → Product list, add, edit (+ image manager)
    categories/                → Category list, add, edit (+ image upload)
    settings/                  → Store settings
  layout.tsx                 → True root layout — fonts, metadata, <html>/<body>
                                only. No storefront chrome (that's in
                                (site)/layout.tsx), so /admin doesn't inherit it.
middleware.ts                 → Protects every /admin/* route
components/                   → Storefront UI (Navbar, Hero, ProductCard, etc.)
components/admin/              → Admin-only UI (forms, image uploader, sidebar)
lib/
  products.ts                 → Sample catalog — the storefront's fallback
                                 when Supabase isn't configured
  storefront-data.ts           → Supabase-or-static data layer the storefront
                                 pages actually call (see "How data flows" below)
  supabase/
    client.ts / server.ts       → Cookie-aware clients (browser / server actions)
    public.ts                    → Cookie-free client for public storefront reads
    middleware.ts                 → Session refresh helper used by middleware.ts
    types.ts                      → Hand-written DB types (see note below)
    queries.ts                    → Admin-panel read queries
  actions/                      → Server Actions (auth, products, categories,
                                 images, settings) — all admin mutations
  site-config.ts                → Brand contact info, address, WhatsApp helper
  motion.ts                     → Shared Framer Motion easing curve + variants
supabase/schema.sql             → Full DB schema, RLS policies, storage buckets
```

## How Data Flows (Storefront)

Every storefront page that shows products/categories calls into
`lib/storefront-data.ts`, which:

1. Checks whether Supabase env vars are set. If not → returns the static
   sample catalog.
2. If set, queries Supabase (public, unauthenticated reads — Row Level
   Security only allows `is_active = true` rows through) and **maps the
   result into the exact same shape** the UI components already expect. This
   is why no product card, product page, or collection page needed any
   visual changes — only the data source changed underneath them.
3. If a Supabase query ever errors, falls back to the static catalog rather
   than crashing the page.

## Known Limitation — Store Settings

The admin panel's **Settings** page saves to the `store_settings` table in
Supabase, but the storefront's displayed phone number, address, and hours
still come from `lib/site-config.ts` in this release — wiring those together
touches several client components (Navbar, Hero, the floating WhatsApp
button) that currently read this data synchronously, so it was scoped out
rather than rushed. To finish this: fetch `getStoreSettings()` in
`app/(site)/layout.tsx` and pass the result down through a small context
provider, then swap each component's `siteConfig` reference for the context
value.

## Before Going Live

1. **Set up Supabase** — see above. Without it, the site runs entirely on
   sample data, which is fine for previewing but not for real orders.
2. **WhatsApp number** — set in `lib/site-config.ts` (`contact.whatsapp`) and
   used as the fallback everywhere; currently `+92 314 2965191`.
3. **Metadata** — update `metadataBase` in `app/layout.tsx` and the base URL
   in `app/sitemap.ts` once the real domain is live.
4. **Regenerate Supabase types** once your project exists, for full type
   safety: `supabase gen types typescript --project-id <ref> > lib/supabase/types.ts`
   (the current `types.ts` is hand-written to match `schema.sql`).

## Design System

- **Colors**: white (`paper`), soft warm-gray sections (`canvas`), near-black
  type (`ink`/`graphite`/`stone`), and a single restrained accent (`clay`, a
  burnished leather tone) used sparingly for sale badges and active states —
  defined in `tailwind.config.ts`.
- **Type**: Archivo (bold, modern grotesk) for headings, Inter for body/UI
  text.
- **Signature motif**: the "rule mark" (`.rule-mark` in `globals.css`) — a
  short solid black rule paired with section eyebrows.
- **Buttons**: `.btn-primary` (solid ink fill) and `.btn-secondary` (outline,
  inverts on hover).

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (Postgres, Auth, Storage, Row Level Security)
- lucide-react (icons)
