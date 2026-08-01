"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateStoreSettings(formData: FormData) {
  const supabase = createClient();

  const businessHours = [
    { day: String(formData.get("hours_weekday_label") ?? ""), time: String(formData.get("hours_weekday_time") ?? "") },
    { day: String(formData.get("hours_sunday_label") ?? "Sunday"), time: String(formData.get("hours_sunday_time") ?? "") },
  ].filter((h) => h.day && h.time);

  const payload = {
    store_name: String(formData.get("store_name") ?? "Haidar Shoes").trim() || "Haidar Shoes",
    whatsapp_number: String(formData.get("whatsapp_number") ?? "").replace(/\D/g, ""),
    phone_display: String(formData.get("phone_display") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim() || null,
    maps_url: String(formData.get("maps_url") ?? "").trim() || null,
    business_hours: businessHours,
    social_links: {
      instagram: String(formData.get("instagram") ?? "").trim() || undefined,
      facebook: String(formData.get("facebook") ?? "").trim() || undefined,
      tiktok: String(formData.get("tiktok") ?? "").trim() || undefined,
    },
  };

  const { error } = await supabase.from("store_settings").update(payload).eq("id", 1);
  if (error) {
    redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
