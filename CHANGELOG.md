# Changelog

All notable changes to this project are documented here.

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
