import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageSearch, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categoryMeta, getProductsByCategory } from "@/lib/products";
import { whatsappLink } from "@/lib/site-config";

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const meta = categoryMeta[params.category];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/collections/${params.category}` },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const meta = categoryMeta[params.category];
  if (!meta) notFound();

  const items = getProductsByCategory(params.category);

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-lux">
        <div className="flex items-center gap-3 mb-4">
          <span className="rule-mark" />
          <p className="text-eyebrow">Collection</p>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight">{meta.title}</h1>
        <p className="mt-4 text-graphite max-w-lg">{meta.description}</p>

        {items.length === 0 ? (
          <div className="mt-14 flex flex-col items-center text-center border border-line bg-canvas py-20 px-6">
            <PackageSearch className="text-stone mb-5" size={40} strokeWidth={1.4} aria-hidden="true" />
            <h2 className="font-display font-semibold text-xl text-ink mb-2">
              This collection is being restocked
            </h2>
            <p className="text-graphite max-w-sm">
              New pairs are on the way. Message us on WhatsApp and we’ll let
              you know the moment they arrive.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 flex items-center justify-center gap-2 !text-white text-eyebrow px-7 py-3.5"
            >
              <MessageCircle size={16} aria-hidden="true" /> Notify Me on WhatsApp
            </a>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamicParams = false;
