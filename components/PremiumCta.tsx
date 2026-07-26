"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { ctaBannerImage } from "@/lib/collection-images";
import { EASE, viewportOnce } from "@/lib/motion";

export default function PremiumCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[420px] flex items-center">
        <Image
          src={ctaBannerImage.src}
          alt={ctaBannerImage.alt}
          fill
          sizes="100vw"
          className="img-grade object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 container-lux text-center py-20"
        >
          <p className="text-eyebrow !text-white/70 mb-4">Haidar Shoes</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight max-w-2xl mx-auto">
            Crafted For Every Step.
          </h2>
          <p className="mt-4 text-white/75 max-w-lg mx-auto">
            Genuine leather, honest craftsmanship, and a fit that lasts —
            explore the full collection or order directly on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/collections"
              className="bg-white text-ink text-eyebrow px-7 py-4 text-center transition-colors duration-200 hover:bg-white/90"
            >
              Explore Collection
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/50 text-white text-eyebrow px-7 py-4 text-center transition-colors duration-200 hover:bg-white/10"
            >
              Order on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
