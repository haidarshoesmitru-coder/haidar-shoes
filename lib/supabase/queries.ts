import { createClient } from "./server";
import type { Category, Product, ProductImage, StoreSettings } from "./types";

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  stock?: "all" | "in-stock" | "low-stock" | "out-of-stock";
  featured?: boolean;
  bestSeller?: boolean;
  active?: "all" | "active" | "inactive";
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  featuredProducts: number;
  totalCategories: number;
  recentProducts: Product[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();

  const [
    { count: totalProducts },
    { count: activeProducts },
    { count: featuredProducts },
    { count: totalCategories },
    { data: recentProducts },
    { data: allForLowStock },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_featured", true),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("products").select("id, stock_quantity, low_stock_threshold"),
  ]);

  const lowStockProducts =
    allForLowStock?.filter((p) => p.stock_quantity <= p.low_stock_threshold).length ?? 0;

  return {
    totalProducts: totalProducts ?? 0,
    activeProducts: activeProducts ?? 0,
    lowStockProducts,
    featuredProducts: featuredProducts ?? 0,
    totalCategories: totalCategories ?? 0,
    recentProducts: (recentProducts as Product[]) ?? [],
  };
}

export async function getProductsForAdmin(filters: ProductFilters = {}) {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .order("created_at", { ascending: false });

  if (filters.search) {
    const term = filters.search.trim();
    query = query.or(`name.ilike.%${term}%,article_number.ilike.%${term}%`);
  }
  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }
  if (filters.featured) {
    query = query.eq("is_featured", true);
  }
  if (filters.bestSeller) {
    query = query.eq("is_best_seller", true);
  }
  if (filters.active === "active") {
    query = query.eq("is_active", true);
  } else if (filters.active === "inactive") {
    query = query.eq("is_active", false);
  }

  const { data, error } = await query;
  if (error) throw error;

  let rows = data ?? [];

  // Stock filtering happens in-memory since it depends on comparing two
  // columns (stock_quantity vs low_stock_threshold), which PostgREST's
  // query builder can't express directly.
  if (filters.stock === "out-of-stock") {
    rows = rows.filter((p) => p.stock_quantity === 0);
  } else if (filters.stock === "low-stock") {
    rows = rows.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold);
  } else if (filters.stock === "in-stock") {
    rows = rows.filter((p) => p.stock_quantity > p.low_stock_threshold);
  }

  return rows;
}

export async function getProductById(id: string) {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;

  const { data: images } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", id)
    .order("display_order", { ascending: true });

  return { product: product as Product, images: (images as ProductImage[]) ?? [] };
}

export async function getCategoriesForAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data as Category[]) ?? [];
}

export async function getCategoryById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Category;
}

export async function getStoreSettings() {
  const supabase = createClient();
  const { data, error } = await supabase.from("store_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as StoreSettings;
}
