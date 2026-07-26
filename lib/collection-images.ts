/**
 * Real footwear photography for the Collections page and homepage collection
 * grid, sourced from Unsplash (free, royalty-free, no attribution required
 * under the Unsplash License: https://unsplash.com/license).
 *
 * Each entry includes the photographer credit for reference — not rendered
 * on-site, since Unsplash doesn't require attribution, but kept here so the
 * source of every image is traceable if it ever needs replacing with real
 * Haidar Shoes product photography.
 */

export interface CollectionImage {
  src: string;
  alt: string;
  credit: string;
}

// A shared, moderate query string keeps crop/quality/format consistent
// across every photo regardless of its original source dimensions —
// this is what gives the otherwise-unrelated source photos a unified,
// consistent look on the page.
const params = "auto=format&fit=crop&q=80&w=1200";

export const collectionImages: Record<string, CollectionImage> = {
  winter: {
    src: `https://images.unsplash.com/photo-1616244916660-d135a013d1f8?${params}`,
    alt: "Premium leather winter boots",
    credit: "Photo by Clem Onojeghuo on Unsplash",
  },
  men: {
    src: `https://images.unsplash.com/photo-1472591651607-70e2d88ae3c4?${params}`,
    alt: "Men's brown leather formal shoes",
    credit: "Photo by Clem Onojeghuo on Unsplash",
  },
  ladies: {
    src: `https://images.unsplash.com/photo-1670938258821-2956d4ce9c9b?${params}`,
    alt: "Ladies' white heeled shoes",
    credit: "Photo by Jean Jacobs on Unsplash",
  },
  kids: {
    src: `https://images.unsplash.com/photo-1637230870581-b70067e5ecd0?${params}`,
    alt: "Kids' pink shoes",
    credit: "Photo by Shalom Melaku on Unsplash",
  },
  sandals: {
    src: `https://images.unsplash.com/photo-1594520770886-6910adf052c6?${params}`,
    alt: "Leather sandals",
    credit: "Photo by Stephanie Hau on Unsplash",
  },
};

/** Full-bleed hero image — a warmly-lit editorial shot of leather wingtip
 * Oxfords, chosen for luxury lighting and modern composition. */
export const heroImage: CollectionImage = {
  src: `https://images.unsplash.com/photo-1777987601431-8d27d2039cc4?${params}&w=1600`,
  alt: "Premium brown leather wingtip Oxford shoes",
  credit: "Photo by Husien Bisky on Unsplash",
};

/** About page storefront/craftsmanship image — soft leather loafer shot,
 * chosen to support the "genuine materials, honest craftsmanship" copy. */
export const aboutImage: CollectionImage = {
  src: `https://images.unsplash.com/photo-1616406432452-07bc5938759d?${params}&w=1000`,
  alt: "Handcrafted leather footwear at Haidar Shoes",
  credit: "Photo by Noah Smith on Unsplash",
};

/** Homepage closing CTA banner image — black leather dress shoes, dark and
 * moody to support white overlay text. */
export const ctaBannerImage: CollectionImage = {
  src: `https://images.unsplash.com/photo-1777987601426-c05a82045862?${params}&w=1600`,
  alt: "Premium black leather dress shoes",
  credit: "Photo by Husien Bisky on Unsplash",
};
