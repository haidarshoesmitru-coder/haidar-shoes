# Changelog

All notable changes to this project are documented here.

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
