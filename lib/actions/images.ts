"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface UploadResult {
  success: boolean;
  error?: string;
}

/**
 * Uploads one image file to Supabase Storage and inserts the matching
 * product_images row. Called once per file from the client uploader (so one
 * failed file doesn't block the rest of a multi-file drop).
 */
export async function uploadProductImage(productId: string, formData: FormData): Promise<UploadResult> {
  const file = formData.get("file") as File | null;
  if (!file) return { success: false, error: "No file provided." };

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { success: false, error: `${file.name}: unsupported file type. Use JPG, PNG, or WEBP.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: `${file.name}: file is too large (max 8MB).` };
  }

  const supabase = createClient();

  // Next display_order = current max + 1, so new uploads land at the end.
  const { data: existing } = await supabase
    .from("product_images")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1);
  const nextOrder = existing && existing.length > 0 ? existing[0].display_order + 1 : 0;

  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `${productId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(storagePath, file, { contentType: file.type, cacheControl: "3600" });

  if (uploadError) {
    return { success: false, error: `${file.name}: ${uploadError.message}` };
  }

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(storagePath);

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    url: publicUrl.publicUrl,
    storage_path: storagePath,
    display_order: nextOrder,
    is_featured: nextOrder === 0, // first image uploaded defaults to featured
  });

  if (insertError) {
    // Roll back the uploaded file so storage doesn't accumulate orphans.
    await supabase.storage.from("product-images").remove([storagePath]);
    return { success: false, error: insertError.message };
  }

  revalidatePath(`/admin/products/${productId}/edit`);
  return { success: true };
}

export async function deleteProductImage(imageId: string, storagePath: string, productId: string) {
  const supabase = createClient();

  await supabase.storage.from("product-images").remove([storagePath]);
  const { error } = await supabase.from("product_images").delete().eq("id", imageId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}/edit`);
}

export async function reorderProductImages(
  productId: string,
  orderedImageIds: string[]
) {
  const supabase = createClient();

  await Promise.all(
    orderedImageIds.map((id, index) =>
      supabase.from("product_images").update({ display_order: index }).eq("id", id)
    )
  );

  revalidatePath(`/admin/products/${productId}/edit`);
}

export async function setFeaturedImage(productId: string, imageId: string) {
  const supabase = createClient();

  // Unset any existing featured image first — the DB has a unique partial
  // index enforcing only one is_featured=true row per product, so a naive
  // "just set this one true" would conflict with the previous featured row.
  await supabase.from("product_images").update({ is_featured: false }).eq("product_id", productId);
  const { error } = await supabase.from("product_images").update({ is_featured: true }).eq("id", imageId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}/edit`);
}

export async function uploadCategoryImage(categoryId: string, formData: FormData): Promise<UploadResult> {
  const file = formData.get("file") as File | null;
  if (!file) return { success: false, error: "No file provided." };

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { success: false, error: `${file.name}: unsupported file type. Use JPG, PNG, or WEBP.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: `${file.name}: file is too large (max 8MB).` };
  }

  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `${categoryId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("category-images")
    .upload(storagePath, file, { contentType: file.type, cacheControl: "3600" });

  if (uploadError) {
    return { success: false, error: `${file.name}: ${uploadError.message}` };
  }

  const { data: publicUrl } = supabase.storage.from("category-images").getPublicUrl(storagePath);

  const { error: updateError } = await supabase
    .from("categories")
    .update({ image_url: publicUrl.publicUrl })
    .eq("id", categoryId);

  if (updateError) {
    await supabase.storage.from("category-images").remove([storagePath]);
    return { success: false, error: updateError.message };
  }

  revalidatePath(`/admin/categories/${categoryId}/edit`);
  revalidatePath("/admin/categories");
  return { success: true };
}
