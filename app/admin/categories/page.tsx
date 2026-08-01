import Link from "next/link";
import { Plus, CheckCircle2 } from "lucide-react";
import { getCategoriesForAdmin } from "@/lib/supabase/queries";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const categories = await getCategoriesForAdmin();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display font-bold text-2xl text-ink">Categories</h1>
        <Link href="/admin/categories/new" className="btn-primary !text-white text-eyebrow px-5 py-2.5 flex items-center gap-2">
          <Plus size={16} aria-hidden="true" /> Add Category
        </Link>
      </div>
      <p className="text-sm text-graphite mb-6">{categories.length} categor{categories.length === 1 ? "y" : "ies"}</p>

      {searchParams.saved && (
        <p className="mb-6 text-sm text-ink bg-canvas border border-line px-3 py-2 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-clay" aria-hidden="true" /> Changes saved.
        </p>
      )}

      <div className="bg-paper border border-line overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-stone uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-graphite">
                  No categories yet.{" "}
                  <Link href="/admin/categories/new" className="text-ink underline">
                    Add your first category
                  </Link>
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3 text-graphite">{c.display_order}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/categories/${c.id}/edit`} className="text-ink hover:text-clay transition-colors font-medium">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-graphite">{c.slug}</td>
                  <td className="px-4 py-3">
                    <span className={c.is_active ? "text-graphite" : "text-stone"}>
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/categories/${c.id}/edit`} className="text-sm text-graphite hover:text-ink underline">
                        Edit
                      </Link>
                      <DeleteCategoryButton categoryId={c.id} categoryName={c.name} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
