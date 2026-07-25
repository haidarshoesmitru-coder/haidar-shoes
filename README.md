# Haidar Shoes — Premium Footwear Website

A luxury footwear brand website built with Next.js 14 (App Router), TypeScript,
Tailwind CSS and Framer Motion.

## Production Readiness

This project has been audited for deployment:

- No stray/duplicate folders, dead code, or unused imports.
- Every route (`/`, `/collections`, `/collections/[category]` × 5,
  `/product/[slug]` × 14, `/about`, `/contact`) resolves against real data —
  verified via `generateStaticParams` and category/slug cross-checks.
- No unused dependencies (`clsx` was removed — never imported).
- `.gitignore`, `.eslintrc.json`, `next.config.js` images config, and a
  favicon are all in place for a clean deploy (e.g. to Vercel).
- Passed a full TypeScript syntax check with zero parse errors.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before Going Live

1. **WhatsApp number** — currently set to the real business number
   (`+92 314 2965191`) in `lib/site-config.ts` (`contact.whatsapp`). Update
   this if the number ever changes.
2. **Product photography** — every product currently uses real footwear
   photography sourced from Unsplash (see `lib/products.ts` and
   `lib/collection-images.ts`), standing in for actual Haidar Shoes product
   shoots. Replace the `images` arrays with real photography, or wire it up
   to a CMS / database (see "Scaling Up" below), once available.
3. **Address & map** — `lib/site-config.ts` holds the store address and the
   Google Maps link/embed. Update if the pin needs adjusting.
4. **Metadata** — update `metadataBase` in `app/layout.tsx` and the URLs in
   `app/sitemap.ts` once the real domain is live.

## Project Structure

```
app/
  page.tsx                  → Home
  collections/page.tsx      → Collections index
  collections/[category]/   → Category listing (winter, men, ladies, kids, sandals)
  product/[slug]/           → Product detail page
  about/page.tsx            → About
  contact/page.tsx          → Contact
components/                 → Reusable UI (Navbar, Hero, ProductCard, etc.)
lib/
  products.ts                → Product catalog + reviews (sample data)
  site-config.ts              → Brand contact info, address, WhatsApp helper
  types.ts                    → Shared TypeScript types
  motion.ts                   → Shared Framer Motion easing curve + variants
                                 (import EASE / fadeUp / viewportOnce here
                                 instead of redeclaring per component)
```

## Design System

- **Colors**: white (`paper`), soft warm-gray sections (`canvas`), near-black
  type (`ink`/`graphite`/`stone`), and a single restrained accent (`clay`, a
  burnished leather tone) used sparingly for sale badges and active states —
  defined in `tailwind.config.ts`.
- **Type**: Archivo (bold, modern grotesk) for headings, Inter for body/UI
  text — no italic serif, no gradient text.
- **Signature motif**: the "rule mark" (`.rule-mark` in `globals.css`) — a
  short solid black rule paired with section eyebrows, a quiet nod to a
  shoemaker's measuring line rather than decorative flourish.
- **Buttons**: `.btn-primary` (solid ink fill) and `.btn-secondary` (outline,
  inverts on hover) — no shine-sweep animation, no heavy shadows.

## Scaling Up (Roadmap)

The product catalog currently lives in `lib/products.ts` as static data,
intentionally structured so it can be swapped for a real backend without
touching the UI:

- **Admin panel**: build routes under `app/admin/*` and gate them with
  middleware/auth; forms can write to the same `Product` shape defined in
  `lib/types.ts`.
- **Database**: replace the static array in `lib/products.ts` with calls to
  Prisma/PostgreSQL (or any DB) — keep the function signatures
  (`getProductBySlug`, `getProductsByCategory`, etc.) so pages don't need to
  change.
- **Inventory integration**: add a `stock` field to `Product` and surface a
  "low stock" / "out of stock" badge on `ProductCard` and `ProductDetail`.
- **Online ordering**: the WhatsApp order flow in `ProductDetail.tsx` can be
  extended into a full cart + checkout by introducing a cart context and a
  `/checkout` route, while keeping WhatsApp as a fallback channel.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react (icons)
