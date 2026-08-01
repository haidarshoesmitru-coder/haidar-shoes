import type { MetadataRoute } from "next";
import { getAllProducts, getCategoryMeta } from "@/lib/storefront-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://haidarshoes.com";
  const [products, categoryMeta] = await Promise.all([getAllProducts(), getCategoryMeta()]);

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
