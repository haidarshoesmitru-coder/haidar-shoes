import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getCategoriesForAdmin, getProductById } from "@/lib/supabase/queries";
import { updateProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";
import ImageUploader from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  const [categories, { product, images }] = await Promise.all([
    getCategoriesForAdmin(),
    getProductById(params.id),
  ]);

  const boundUpdate = updateProduct.bind(null, params.id);

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink mb-4">
        <ArrowLeft size={14} aria-hidden="true" /> Back to Products
      </Link>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Edit Product</h1>
      <p className="text-sm text-graphite mb-6">{product.name}</p>

      {searchParams.saved && (
        <p className="mb-6 text-sm text-ink bg-canvas border border-line px-3 py-2 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-clay" aria-hidden="true" /> Changes saved.
        </p>
      )}

      <section className="bg-paper border border-line p-6 mb-8">
        <h2 className="text-eyebrow mb-4">Product Images</h2>
        <ImageUploader productId={product.id} images={images} />
      </section>

      <ProductForm categories={categories} product={product} action={boundUpdate} error={searchParams.error} />
    </div>
  );
}
