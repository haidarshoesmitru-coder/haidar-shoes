"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

function parseListField(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function productPayloadFromForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  return {
    name,
    slug: slugify(name),
    article_number: String(formData.get("article_number") ?? "").trim(),
    sku: String(formData.get("sku") ?? "").trim() || null,
    category_id: String(formData.get("category_id") ?? "") || null,
    brand: String(formData.get("brand") ?? "Haidar Shoes").trim() || "Haidar Shoes",
    gender: String(formData.get("gender") ?? "") || null,
    season: String(formData.get("season") ?? "") || null,
    price: Number(formData.get("price") ?? 0),
    sale_price: formData.get("sale_price") ? Number(formData.get("sale_price")) : null,
    cost_price: formData.get("cost_price") ? Number(formData.get("cost_price")) : null,
    stock_quantity: Number(formData.get("stock_quantity") ?? 0),
    low_stock_threshold: Number(formData.get("low_stock_threshold") ?? 5),
    sizes: parseListField(formData.get("sizes")),
    colors: parseListField(formData.get("colors")),
    material: String(formData.get("material") ?? "").trim() || null,
    short_description: String(formData.get("short_description") ?? "").trim() || null,
    full_description: String(formData.get("full_description") ?? "").trim() || null,
    is_featured: formData.get("is_featured") === "on",
    is_new_arrival: formData.get("is_new_arrival") === "on",
    is_best_seller: formData.get("is_best_seller") === "on",
    is_active: formData.get("is_active") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const supabase = createClient();
  const payload = productPayloadFromForm(formData);

  const { data, error } = await supabase.from("products").insert(payload).select("id").single();

  if (error) {
    const message = error.code === "23505" ? "That article number is already in use." : error.message;
    redirect(`/admin/products/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/products");
  redirect(`/admin/products/${data!.id}/edit`);
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = createClient();
  const payload = productPayloadFromForm(formData);

  const { error } = await supabase.from("products").update(payload).eq("id", id);

  if (error) {
    const message = error.code === "23505" ? "That article number is already in use." : error.message;
    redirect(`/admin/products/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  redirect(`/admin/products/${id}/edit?saved=1`);
}

export async function deleteProduct(id: string) {
  const supabase = createClient();

  // Storage objects for this product's images are cleaned up separately —
  // see deleteProductImage in lib/actions/images.ts — but if any rows remain
  // the ON DELETE CASCADE on product_images.product_id removes them too.
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = createClient();
  const { error } = await supabase.from("products").update({ is_active: isActive }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
}
