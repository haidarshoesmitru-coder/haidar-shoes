import type { MetadataRoute } from "next";
import { products, categoryMeta } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://haidarshoes.com";

  const staticRoutes = ["", "/collections", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = Object.keys(categoryMeta).map((slug) => ({
    url: `${base}/collections/${slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
