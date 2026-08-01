import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoriesForAdmin } from "@/lib/supabase/queries";
import { createProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const categories = await getCategoriesForAdmin();

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink mb-4">
        <ArrowLeft size={14} aria-hidden="true" /> Back to Products
      </Link>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Add Product</h1>
      <p className="text-sm text-graphite mb-8">
        Save the product first — you’ll be able to upload images on the next screen.
      </p>

      <ProductForm categories={categories} action={createProduct} error={searchParams.error} />
    </div>
  );
}
