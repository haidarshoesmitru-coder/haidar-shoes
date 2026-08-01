# Changelog

All notable changes to this project are documented here.

## [1.3.3] — Full Error Diagnostics + Schema Cache Fix (Patch)

Follow-up to a report that `/admin/setup` still failed with "Could not check
setup status" even after confirming schema.sql ran, all tables exist, and
Vercel env vars were set and redeployed.

### What was actually wrong in the code (confirmed)
`getSetupStatus()` only captured `error.message` from the Supabase query and
discarded `error.code`, `error.details`, and `error.hint` — the fields that
actually distinguish "table doesn't exist" from "no permission" from
"PostgREST's schema cache hasn't caught up yet" from each other. With only a
generic message, there was no way to tell which of those was happening.

### What was checked and ruled out
- `lib/supabase/service.ts` — confirmed it reads `SUPABASE_SERVICE_ROLE_KEY`
  (not the anon key) and the correct URL var. No mismatch found.
- The query targets `public.admin_profiles` correctly — `.from("admin_profiles")`
  defaults to the `public` schema in supabase-js; no schema-qualification bug.

### Fixed
- `getSetupStatus()`'s error variant now carries `code`, `message`, `details`,
  and `hint` — the full Postgrest error object, not just one field.
- `/admin/setup` now prints all four fields directly on the page when
  something fails, so the exact cause is visible without needing server logs.
- Added targeted guidance that triggers automatically based on the error
  code: a `PGRST205` (or any "schema cache" message) shows a specific fix for
  a real, well-documented Supabase gotcha — see below. A `42501`/`PGRST301`
  shows permission-key guidance instead.

### Leading hypothesis for your specific case
Everything you verified (schema ran, tables exist, env vars correct,
redeployed) is consistent with one specific, well-documented Supabase
behavior: **PostgREST caches the database schema separately from Postgres
itself.** Running SQL directly in the SQL Editor creates tables immediately,
but the API layer that `supabase-js` actually talks to over HTTP doesn't
always notice right away — queries against tables that genuinely exist fail
with error code `PGRST205` ("Could not find the table ... in the schema
cache") until the cache reloads. This matches every fact you reported.

**Fix**: in the Supabase Dashboard, go to **Settings → API → click "Reload
schema cache"** — or run the one-liner in the new
`supabase/reload-schema-cache.sql`. No redeploy needed; this isn't a code or
environment variable problem.

- `supabase/schema.sql` now ends with `notify pgrst, 'reload schema';`, so
  anyone running it fresh from now on won't hit this at all.
- Added `supabase/reload-schema-cache.sql` — a standalone one-line fix for
  anyone (like this specific case) who already ran schema.sql before this
  version added that line.

**If the error code you see is something other than `PGRST205`** — the page
will now show exactly which one, and that code is the fastest path to the
real cause from here.

## [1.3.2] — Setup Status Bug Fix (Patch)

Real bug, reported by the store owner: `/admin/setup` said "an admin account
already exists" on a fresh project where no admin had ever been created.

### Root cause
`setupIsAvailable()` treated *any* Supabase query error the same as "an
admin already exists" (`if (error) return false`) — so if `schema.sql` hadn't
been run yet, or the service role key/URL were mismatched, the resulting
database error was silently swallowed and reported as the wrong thing
entirely. No default/seed admin account was ever created — there was never
one to find; the check itself was just misreporting failures.

### Fixed
- Replaced the boolean `setupIsAvailable()` with `getSetupStatus()`, which
  returns one of four distinct states: `available`, `already-configured`,
  `not-configured` (no service role key set), or `error` (with the actual
  Postgres/Supabase error message attached).
- `/admin/setup` now shows the *real* diagnostic — including the literal
  error text from Supabase — instead of a misleading "already exists"
  message, with guidance pointing at the most likely causes (schema not run
  yet, or mismatched env vars).
- The "already exists" screen now also tells you exactly where to verify
  that for yourself (Supabase → Authentication → Users, and the
  `admin_profiles` table in the Table Editor) and how to reopen setup if the
  row shouldn't be there.
- Login page's "Create one →" link now only appears when setup is genuinely
  available, not silently on error.

## [1.3.1] — Admin Setup Wizard (Patch)

v1.3.0 shipped an admin panel with no way to actually create the first admin
account short of manually running SQL in the Supabase dashboard — a real gap
for a non-technical store owner. This patch fixes that.

### Added
- **`/admin/setup`** — a self-service page for creating your first admin
  account (name, email, password — no SQL required). It only works while no
  admin account exists yet; once used, it permanently redirects to the login
  page instead, so it can't be reused as a backdoor later.
- The login page now detects when no admin exists yet and shows a "Create
  one →" link to `/admin/setup`, so first-time visitors aren't stuck at a
  login form with no way forward.
- `lib/supabase/service.ts` — a service-role Supabase client, used
  exclusively by the setup flow (bypasses RLS to create the very first
  account, which is otherwise impossible under RLS since no admin exists yet
  to authorize it). Never used anywhere else in the codebase.
- If creating the `admin_profiles` row fails after the auth account was
  already created, the action rolls back by deleting the auth user — so a
  failed setup attempt doesn't leave an orphaned login with no admin access
  and no way to retry.

### Changed
- `middleware.ts` now allows `/admin/setup` through without requiring a
  session, matching how `/admin/login` was already handled.
- `.env.example` and the README's setup instructions updated — creating your
  first admin account is now the setup-wizard flow by default. The manual
  SQL method from v1.3.0 is still documented, now specifically as how to add
  a *second* admin later (the wizard is intentionally one-time-only).

## [1.3.0] — Production Product Management System

A major backend addition: a full, RLS-secured Admin Panel backed by
Supabase, so real products can be added, edited, and managed without ever
touching code again. No storefront redesign — the same UI now runs on a
swappable data layer.

### 1. Product Image Management
- Drag & drop multi-image upload straight to Supabase Storage
  (`components/admin/ImageUploader.tsx`)
- Live preview grid, per-image delete, drag-to-reorder, and a "set as
  featured" toggle (enforced as exactly one featured image per product via a
  unique partial index in the schema)
- Basic upload validation (JPG/PNG/WEBP only, 8MB max) — full server-side
  image resizing wasn't feasible without a runtime this project can verify,
  so display-side optimization continues to rely on next/image, same as the
  rest of the site
- Same drag & drop pattern reused for a single category image
  (`components/admin/CategoryImageUploader.tsx`)

### 2. Product Management
- Add/Edit form covering every required field: name, article number (unique,
  DB-enforced), SKU, category, brand, gender, season, price, sale price, cost
  price (admin-only), stock quantity, low stock threshold, sizes, colors,
  material, short/full description, and the Featured / New Arrival / Best
  Seller / Active flags
- Product list with a quick Active/Inactive toggle that doesn't require
  opening the full edit form

### 3. Category Management
- Add, edit, delete, upload image, and set display order — the storefront's
  Collections page now renders in admin-controlled order and prefers the
  admin-uploaded image, falling back to the existing curated photography
  until one is set

### 4. Dashboard
- Total products, active products, low stock, featured products, categories,
  and a recent-products table — all live-queried from Supabase

### 5. Search & Filter
- Admin product list is searchable by name or article number, filterable by
  category, stock level, featured, best seller, and active status — all
  driven by URL search params, so filtered views are shareable/bookmarkable

### 6. Settings
- Store name, WhatsApp number, address, business hours, and social links,
  editable from `/admin/settings`. **Known limitation:** the storefront's
  displayed contact info still reads from `lib/site-config.ts` rather than
  these saved settings — see the README's "Known Limitation" section for
  why, and the specific next step to close that gap.

### 7. Security
- Every `/admin/*` route is protected by `middleware.ts`, which checks for a
  valid Supabase session *and* membership in an `admin_profiles` table —
  being logged in isn't enough on its own, you have to be an admin.
- No public sign-up page exists for admin access; accounts are created
  directly in the Supabase dashboard and explicitly granted access via SQL
  (documented step-by-step in the README).
- Every table has Row Level Security enabled — the public can only ever read
  `is_active = true` rows; all writes require an authenticated admin.

### 8. Database
- `supabase/schema.sql` — the complete schema: `categories`, `products`,
  `product_images`, `store_settings`, `admin_profiles`, all RLS policies, and
  two storage buckets (`product-images`, `category-images`), written to be
  safe to re-run.

### Storefront data layer (the part that makes this actually useful)
Building an admin panel that writes to a database nobody reads from would
defeat the point, so this release also:
- Added `lib/storefront-data.ts` — reads from Supabase when configured, maps
  results into the *exact* shape the existing UI components already expect,
  and transparently falls back to the static sample catalog if Supabase
  isn't configured yet or a query fails. **Zero changes to any
  customer-facing component or markup** — only the data source underneath
  changed.
- Restructured `app/` using a `(site)` route group so `/admin` doesn't
  inherit the storefront's Navbar/Footer — this is a folder reorganization
  only; every existing URL is unchanged.
- Fixed `dynamicParams = false` on the category route, which would have
  404'd any category created after the last build — categories and products
  added via the admin panel now render on demand, no rebuild required.
- Sitemap now reflects live Supabase data too.

### Dependencies
- Added `@supabase/supabase-js` and `@supabase/ssr`.

## [1.2.1] — Brand Identity & Premium UX Patch

### Hero Section (Priority #1)
- Removed the placeholder hero image (`picsum.photos` — a random-image
  service that could render anything, including the mountains/rocks the
  brief flagged) entirely.
- Replaced it with a real, verified Unsplash photograph of leather wingtip
  Oxfords in warm, dramatic lighting — footwear only, luxury lighting,
  modern composition.
- Rebuilt as a genuine full-screen hero (`h-[100svh]`) with a dark gradient
  overlay for legible white typography, a strengthened headline, and
  professional CTA buttons styled for the dark image background (solid
  white primary, outlined white secondary).
- Added subtle, restrained scroll parallax (no excessive movement).

### Brand Identity (Priority #2)
- Introduced a new premium tagline — **"Crafted For Every Step."** —
  replacing the generic "Step Into Style & Comfort."
- `siteConfig.tagline` is now the single source of truth; the Hero, the new
  Premium CTA banner, the Footer, page metadata, and the OG/Twitter card
  images all derive from it instead of hardcoding the old copy separately.
- Footer now surfaces the tagline directly under the wordmark for
  consistent brand voice.

### Homepage Bug Fix (Priority #3)
- Root-caused and fixed the broken/cropped image strip under "Winter
  Collection 2026 & More": the feature tile had two conflicting Tailwind
  classes (`md:col-span-1` *and* `md:col-span-2`) applied to the same
  element at the same breakpoint — a genuine authoring bug, not a design
  choice.
- Rebuilt `CollectionsGrid` so each tile owns exactly one unambiguous class
  per breakpoint. Also fixed the mobile grid math, which previously would
  have left an orphaned tile with empty space next to it on small screens;
  mobile now shows a clean, equal 2×2 grid, with the asymmetric "feature
  tile" layout only appearing at `md` and above.

### Footwear-First Imagery (Priority #4)
- Audited every image on the site, not just collections/products as in the
  prior release — found the About page was still using a random
  `picsum.photos` placeholder and replaced it with real footwear
  photography.
- `picsum.photos` is now removed from the codebase entirely and from
  `next.config.js`'s allowed image domains — every image site-wide is real,
  verified footwear photography from Unsplash.

### Homepage Improvements (Priority #5)
- Added a new **Premium CTA** banner section (dark image, centered
  headline, dual CTAs) between Reviews and Store Location — a closing
  conversion moment that was missing before.
- Left every existing homepage section (Featured Collection, New Arrivals,
  Best Sellers, Why Choose Us, Reviews) in place rather than adding more —
  the brief was explicit about not overcrowding the page.

### Product Cards (Priority #6)
- Added a soft shadow + whole-card lift on hover (previously image-only
  zoom with no shadow).
- Bolder, larger price typography; product name now tints to the brand
  accent color on hover.
- Slightly more breathing room between the image and the text block.

### Product Page (Priority #7)
- Added a soft shadow to the product gallery for more premium presentation.
- Verified size selection, color selection, delivery information, exchange
  policy, and related products were all already solid from v1.2.0 — no
  regressions.

### Mobile Experience (Priority #8)
- Audited the codebase for common overflow patterns (fixed pixel widths,
  negative margins, unresponsive oversized text) — found none beyond the
  grid bug above, which is now fixed.
- Added a defensive `overflow-x: hidden` on `<body>` as a safety net.

### Performance (Priority #9)
- Verified `priority` is set on exactly the two LCP-relevant images (Hero,
  product gallery) and nowhere else.
- Verified every `fill`-mode image across the site has an appropriate
  `sizes` attribute (prevents over-fetching and layout shift).
- `scroll-behavior: smooth` confirmed already in place globally.

---

## [1.2.0] — Minor Update

### Product Catalog
- Replaced the previous 14-item placeholder catalog with a realistic,
  cleanly-numbered mock catalog (`HS-101`–`HS-107`) covering all five
  categories: Men's, Ladies', Kids', Winter, and Sandals.
- Added `brand` and `stockStatus` fields to the `Product` type
  (`in-stock` / `low-stock` / `out-of-stock`), surfaced via a new shared
  `StockBadge` component on both product cards and the product detail page.
- Every product now includes: article number, category, brand, price,
  optional old price, short description, sizes, colors, and stock status.

### Product & Collection Imagery
- Replaced every collection banner and product photo with real footwear
  photography sourced from Unsplash (free, royalty-free, no attribution
  required under the Unsplash License) — no more unrelated
  landscape/building/lifestyle placeholders.
  - Winter Collection → leather boots
  - Men's Collection → formal Oxfords, loafers, sneakers
  - Ladies Collection → heeled pumps
  - Kids Collection → kids' shoes
  - Sandals & Slippers → leather sandals
- Added a shared `.img-grade` CSS filter (`lib/collection-images.ts` +
  `globals.css`) so photography sourced from different photographers reads
  as one consistent, unified look rather than a mismatched stock-photo grab
  bag.
- `next.config.js` updated to allow `images.unsplash.com` alongside the
  existing placeholder domain.

### Product Detail Page
- Added **Specifications** section (brand, article number, and product
  details in one place).
- Added **Delivery Information** and **Exchange Policy** sections.
- Stock status now shown next to price; the WhatsApp order button is
  replaced with a "notify me" message for out-of-stock items instead of
  letting customers order something unavailable.

### Collections Page
- Added a proper banner subtitle beneath the page heading so the intro reads
  as a hero banner rather than a bare title.
- Rebuilt the empty state (shown when a category has no products) from a
  single line of text into a full empty-state block: icon, message, and a
  WhatsApp "Notify Me" call to action.
- Tightened and rebalanced section spacing.

### Trust Section
- Replaced the previous four value props with the required five trust
  badges: Premium Quality, Genuine Materials, Easy Exchange, Cash on
  Delivery, and WhatsApp Ordering.

### WhatsApp Integration
- Replaced the placeholder phone number everywhere with the real number:
  **+92 314 2965191** (`lib/site-config.ts` is the single source of truth —
  every WhatsApp button and the displayed contact number derive from it).
- Standardized the prefill message across every general WhatsApp button to:
  `Hello Haidar Shoes!` / `I'm interested in this product.`
- The product-detail order button leads with that same standard message,
  followed by the specific product, size, color, and price — so orders stay
  useful to fulfill without breaking the required prefill text.

### Known Follow-ups (out of scope for this release)
- The homepage hero image and the About page storefront image are still
  placeholder photography (`picsum.photos`) — this release's scope was
  limited to collection and product imagery specifically.
- Product images are stock photography standing in for real Haidar Shoes
  product shoots; swap the `images` arrays in `lib/products.ts` once real
  photography is available.

---

## [1.1.0]
- Production-readiness audit: removed a stray routing artifact, dead code,
  and unused dependency; added missing ESLint config, favicon, and OG/Twitter
  images; fixed a hero image missing `sizes`; accessibility pass (contrast,
  `aria-hidden` on decorative icons, screen-reader label for star ratings).

## [1.0.0]
- Initial premium footwear brand website: home, collections, product detail,
  about, and contact pages built on Next.js App Router, TypeScript, Tailwind
  CSS, and Framer Motion.
