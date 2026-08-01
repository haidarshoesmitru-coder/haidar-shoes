import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategoriesOrdered } from "@/lib/storefront-data";
import { collectionImages } from "@/lib/collection-images";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse the full Haidar Shoes collection — winter boots, men's, ladies', kids' shoes and sandals.",
};

export default async function CollectionsPage() {
  const categories = await getCategoriesOrdered();

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-lux">
        <div className="flex items-center gap-3 mb-4">
          <span className="rule-mark" />
          <p className="text-eyebrow">Shop By Category</p>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-ink max-w-2xl tracking-tight">
          The Full Haidar Shoes Collection
        </h1>
        <p className="mt-5 text-graphite max-w-lg text-lg">
          Genuine leather, honest construction, and a fit for every member of
          the family — shop men’s, ladies’, kids’, winter and sandal
          collections in one place.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            // Prefer the admin-uploaded category image; fall back to the
            // curated stock photography until the admin sets one.
            const fallback = collectionImages[cat.slug];
            const imageSrc = cat.imageUrl || fallback?.src;
            const imageAlt = cat.imageUrl ? cat.title : fallback?.alt ?? cat.title;
            if (!imageSrc) return null;

            return (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative block h-80 overflow-hidden bg-canvas transition-shadow duration-300 ease-out hover:shadow-raised"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="img-grade object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <p className="text-eyebrow !text-white/70 mb-2">0{i + 1}</p>
                  <h2 className="font-display font-semibold text-2xl md:text-3xl text-white transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-white/70 mt-2 max-w-xs">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
