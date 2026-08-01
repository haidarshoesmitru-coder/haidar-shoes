import { CheckCircle2 } from "lucide-react";
import { getStoreSettings } from "@/lib/supabase/queries";
import { updateStoreSettings } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: { saved?: string; error?: string };
}) {
  const settings = await getStoreSettings();
  const weekday = settings.business_hours?.[0];
  const sunday = settings.business_hours?.[1];

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Store Settings</h1>
      <p className="text-sm text-graphite mb-8">
        Powers the address, hours, and contact details shown across the storefront.
      </p>

      {searchParams.saved && (
        <p className="mb-6 text-sm text-ink bg-canvas border border-line px-3 py-2 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-clay" aria-hidden="true" /> Settings saved.
        </p>
      )}
      {searchParams.error && (
        <p className="mb-6 text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">
          {searchParams.error}
        </p>
      )}

      <form action={updateStoreSettings} className="space-y-8">
        <section className="bg-paper border border-line p-6 space-y-4">
          <h2 className="text-eyebrow mb-2">Store Identity</h2>
          <label className="block">
            <span className="block text-xs font-medium text-graphite mb-1.5">Store Name</span>
            <input name="store_name" defaultValue={settings.store_name} required className="input" />
          </label>
        </section>

        <section className="bg-paper border border-line p-6 space-y-4">
          <h2 className="text-eyebrow mb-2">Contact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">
                WhatsApp Number <span className="text-stone">(digits only, country code first)</span>
              </span>
              <input name="whatsapp_number" defaultValue={settings.whatsapp_number} required className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Displayed Phone Number</span>
              <input name="phone_display" defaultValue={settings.phone_display} className="input" />
            </label>
          </div>
        </section>

        <section className="bg-paper border border-line p-6 space-y-4">
          <h2 className="text-eyebrow mb-2">Store Address</h2>
          <label className="block">
            <span className="block text-xs font-medium text-graphite mb-1.5">Address</span>
            <textarea name="address" defaultValue={settings.address ?? ""} rows={2} className="input" />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-graphite mb-1.5">Google Maps URL</span>
            <input name="maps_url" defaultValue={settings.maps_url ?? ""} className="input" />
          </label>
        </section>

        <section className="bg-paper border border-line p-6 space-y-4">
          <h2 className="text-eyebrow mb-2">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Weekday Label</span>
              <input name="hours_weekday_label" defaultValue={weekday?.day ?? "Monday – Saturday"} className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Weekday Hours</span>
              <input name="hours_weekday_time" defaultValue={weekday?.time ?? "10:00 AM – 10:00 PM"} className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Sunday Label</span>
              <input name="hours_sunday_label" defaultValue={sunday?.day ?? "Sunday"} className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Sunday Hours</span>
              <input name="hours_sunday_time" defaultValue={sunday?.time ?? "2:00 PM – 10:00 PM"} className="input" />
            </label>
          </div>
        </section>

        <section className="bg-paper border border-line p-6 space-y-4">
          <h2 className="text-eyebrow mb-2">Social Links</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Instagram</span>
              <input name="instagram" defaultValue={settings.social_links?.instagram ?? ""} className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">Facebook</span>
              <input name="facebook" defaultValue={settings.social_links?.facebook ?? ""} className="input" />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-graphite mb-1.5">TikTok</span>
              <input name="tiktok" defaultValue={settings.social_links?.tiktok ?? ""} className="input" />
            </label>
          </div>
        </section>

        <button type="submit" className="btn-primary !text-white text-eyebrow px-8 py-3.5">
          Save Settings
        </button>
      </form>
    </div>
  );
}
