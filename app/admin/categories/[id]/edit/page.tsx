import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryById } from "@/lib/supabase/queries";
import { updateCategory } from "@/lib/actions/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import CategoryImageUploader from "@/components/admin/CategoryImageUploader";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const category = await getCategoryById(params.id);
  const boundUpdate = updateCategory.bind(null, params.id);

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <Link href="/admin/categories" className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink mb-4">
        <ArrowLeft size={14} aria-hidden="true" /> Back to Categories
      </Link>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Edit Category</h1>
      <p className="text-sm text-graphite mb-6">{category.name}</p>

      <section className="bg-paper border border-line p-6 mb-8">
        <h2 className="text-eyebrow mb-4">Category Image</h2>
        <CategoryImageUploader categoryId={category.id} imageUrl={category.image_url} />
      </section>

      <CategoryForm category={category} action={boundUpdate} error={searchParams.error} />
    </div>
  );
}
