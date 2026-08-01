import { createPublicClient, isSupabaseConfigured } from "./supabase/public";
import type { Product, StockStatus } from "./types";
import * as staticData from "./products";

type DbProductRow = {
  id: string;
  slug: string;
  name: string;
  article_number: string;
  brand: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  sizes: string[];
  colors: string[];
  material: string | null;
  gender: string | null;
  season: string | null;
  short_description: string | null;
  full_description: string | null;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  categories: { slug: string } | { slug: string }[] | null;
  product_images: { url: string; display_order: number }[] | null;
};

function stockStatusOf(quantity: number, threshold: number): StockStatus {
  if (quantity <= 0) return "out-of-stock";
  if (quantity <= threshold) return "low-stock";
  return "in-stock";
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Maps a Supabase product row (joined with images + category) into the
 * exact `Product` shape the existing UI components already render. */
function mapDbProductToLegacy(row: DbProductRow): Product {
  const categorySlug = Array.isArray(row.categories)
    ? row.categories[0]?.slug
    : row.categories?.slug;

  const images = (row.product_images ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map((img) => img.url);

  const details = [
    row.material ? `Material: ${row.material}` : null,
    row.gender ? `Gender: ${capitalize(row.gender)}` : null,
    row.season ? `Season: ${capitalize(row.season.replace("-", " "))}` : null,
  ].filter((d): d is string => Boolean(d));

  const tags: Array<"new" | "bestseller" | "winter"> = [];
  if (row.is_new_arrival) tags.push("new");
  if (row.is_best_seller) tags.push("bestseller");
  if (categorySlug === "winter") tags.push("winter");

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    article: row.article_number,
    brand: row.brand,
    category: (categorySlug ?? "men") as Product["category"],
    price: row.price,
    compareAtPrice: row.sale_price ?? undefined,
    stockStatus: stockStatusOf(row.stock_quantity, row.low_stock_threshold),
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    description: row.full_description || row.short_description || "",
    details,
    images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=900&h=1100"],
    tags,
  };
}

const PRODUCT_SELECT = "*, categories(slug), product_images(url, display_order)";

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return staticData.products;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true);
    if (error || !data) return staticData.products;
    return (data as unknown as DbProductRow[]).map(mapDbProductToLegacy);
  } catch {
    return staticData.products;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) return staticData.getProductBySlug(slug);

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error || !data) return staticData.getProductBySlug(slug);
    return mapDbProductToLegacy(data as unknown as DbProductRow);
  } catch {
    return staticData.getProductBySlug(slug);
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) return staticData.getProductsByCategory(categorySlug);

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .eq("categories.slug", categorySlug);
    if (error || !data) return staticData.getProductsByCategory(categorySlug);

    // PostgREST can't filter on a joined column directly in all setups, so
    // filter defensively here too in case the query above returns everything.
    return (data as unknown as DbProductRow[])
      .map(mapDbProductToLegacy)
      .filter((p) => p.category === categorySlug);
  } catch {
    return staticData.getProductsByCategory(categorySlug);
  }
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  if (!isSupabaseConfigured()) return staticData.getRelatedProducts(product, count);

  try {
    const all = await getProductsByCategory(product.category);
    return all.filter((p) => p.id !== product.id).slice(0, count);
  } catch {
    return staticData.getRelatedProducts(product, count);
  }
}

export async function getCategoryMeta(): Promise<Record<string, { title: string; description: string }>> {
  if (!isSupabaseConfigured()) return staticData.categoryMeta;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select("slug, name, description")
      .eq("is_active", true);
    if (error || !data || data.length === 0) return staticData.categoryMeta;

    const meta: Record<string, { title: string; description: string }> = {};
    for (const c of data) {
      meta[c.slug] = {
        title: c.name,
        description: c.description || staticData.categoryMeta[c.slug]?.description || "",
      };
    }
    return meta;
  } catch {
    return staticData.categoryMeta;
  }
}

export interface StorefrontCategory {
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

/** Full category list for the Collections page, ordered by admin-set
 * display_order, including any admin-uploaded category image. */
export async function getCategoriesOrdered(): Promise<StorefrontCategory[]> {
  const fallbackOrder = ["winter", "men", "ladies", "kids", "sandals"];

  if (!isSupabaseConfigured()) {
    return fallbackOrder.map((slug) => ({
      slug,
      title: staticData.categoryMeta[slug].title,
      description: staticData.categoryMeta[slug].description,
      imageUrl: null,
    }));
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select("slug, name, description, image_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) {
      return fallbackOrder.map((slug) => ({
        slug,
        title: staticData.categoryMeta[slug].title,
        description: staticData.categoryMeta[slug].description,
        imageUrl: null,
      }));
    }
    return data.map((c) => ({
      slug: c.slug,
      title: c.name,
      description: c.description || staticData.categoryMeta[c.slug]?.description || "",
      imageUrl: c.image_url,
    }));
  } catch {
    return fallbackOrder.map((slug) => ({
      slug,
      title: staticData.categoryMeta[slug].title,
      description: staticData.categoryMeta[slug].description,
      imageUrl: null,
    }));
  }
}
