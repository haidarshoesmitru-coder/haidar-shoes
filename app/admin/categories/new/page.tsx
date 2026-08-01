import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCategory } from "@/lib/actions/categories";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <Link href="/admin/categories" className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink mb-4">
        <ArrowLeft size={14} aria-hidden="true" /> Back to Categories
      </Link>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Add Category</h1>
      <p className="text-sm text-graphite mb-8">
        Save the category first — you’ll be able to upload its image on the next screen.
      </p>

      <CategoryForm action={createCategory} error={searchParams.error} />
    </div>
  );
}
