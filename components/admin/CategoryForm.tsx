import type { Category } from "@/lib/supabase/types";

export default function CategoryForm({
  category,
  action,
  error,
}: {
  category?: Category;
  action: (formData: FormData) => void;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-6 bg-paper border border-line p-6">
      {error && (
        <p className="text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">{error}</p>
      )}

      <label className="block">
        <span className="block text-xs font-medium text-graphite mb-1.5">
          Category Name <span className="text-clay">*</span>
        </span>
        <input name="name" defaultValue={category?.name} required className="input" />
      </label>

      <label className="block">
        <span className="block text-xs font-medium text-graphite mb-1.5">Description</span>
        <textarea name="description" defaultValue={category?.description ?? ""} rows={3} className="input" />
      </label>

      <label className="block max-w-[160px]">
        <span className="block text-xs font-medium text-graphite mb-1.5">Display Order</span>
        <input name="display_order" type="number" defaultValue={category?.display_order ?? 0} className="input" />
      </label>

      <label className="flex items-center gap-2.5 text-sm text-ink border border-line px-3 py-2.5 w-fit">
        <input type="checkbox" name="is_active" defaultChecked={category?.is_active ?? true} />
        Active (visible on storefront)
      </label>

      <button type="submit" className="btn-primary !text-white text-eyebrow px-8 py-3.5">
        {category ? "Save Changes" : "Create Category"}
      </button>
    </form>
  );
}
