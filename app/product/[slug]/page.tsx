import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Haidar Shoes`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-lux">
        <ProductDetail product={product} />
      </div>

      {related.length > 0 && (
        <div className="container-lux mt-24">
          <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
