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
