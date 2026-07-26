import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import CollectionsGrid from "@/components/CollectionsGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import PremiumCta from "@/components/PremiumCta";
import StoreLocation from "@/components/StoreLocation";
import { products } from "@/lib/products";
import Link from "next/link";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 4);
  const bestSellers = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Winter Collection 2026 + category grid */}
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Curated By Category"
            title="Winter Collection 2026 & More"
            description="From insulated winter boots to everyday formals — shop by the collection built for your season."
          />
          <div className="mt-12">
            <CollectionsGrid />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-canvas border-y border-line">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading eyebrow="Just Landed" title="New Arrivals" />
            <Link href="/collections" className="link-underline text-eyebrow !text-ink">
              View All Collections →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Customer Favourites" title="Best Sellers" align="center" />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-canvas border-y border-line">
        <div className="container-lux">
          <SectionHeading eyebrow="The Haidar Standard" title="Why Choose Haidar Shoes" align="center" />
          <div className="mt-12 border border-line">
            <WhyChooseUs />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="From Our Customers" title="Customer Reviews" align="center" />
          <div className="mt-12">
            <Reviews />
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <PremiumCta />

      {/* Store Location */}
      <section className="py-16 md:py-24 bg-canvas border-t border-line">
        <div className="container-lux">
          <SectionHeading eyebrow="Find Us" title="Store Location" />
          <div className="mt-12">
            <StoreLocation />
          </div>
        </div>
      </section>
    </>
  );
}
