"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

function categoryPayloadFromForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  return {
    name,
    slug: slugify(name),
    description: String(formData.get("description") ?? "").trim() || null,
    display_order: Number(formData.get("display_order") ?? 0),
    is_active: formData.get("is_active") === "on",
  };
}

export async function createCategory(formData: FormData) {
  const supabase = createClient();
  const payload = categoryPayloadFromForm(formData);

  const { error } = await supabase.from("categories").insert(payload);
  if (error) {
    const message = error.code === "23505" ? "A category with that name already exists." : error.message;
    redirect(`/admin/categories/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = createClient();
  const payload = categoryPayloadFromForm(formData);

  const { error } = await supabase.from("categories").update(payload).eq("id", id);
  if (error) {
    const message = error.code === "23505" ? "A category with that name already exists." : error.message;
    redirect(`/admin/categories/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}
