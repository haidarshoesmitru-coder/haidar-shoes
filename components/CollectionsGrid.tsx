"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { collectionImages } from "@/lib/collection-images";

const tiles = [
  { slug: "winter", label: "Winter Collection 2026", span: "md:col-span-2 md:row-span-2" },
  { slug: "men", label: "Men’s Collection", span: "" },
  { slug: "ladies", label: "Ladies Collection", span: "" },
  { slug: "kids", label: "Kids Collection", span: "" },
];

export default function CollectionsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[180px]">
      {tiles.map((t, i) => {
        const image = collectionImages[t.slug];
        return (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className={`relative col-span-2 md:col-span-1 ${t.span}`}
          >
            <Link href={`/collections/${t.slug}`} className="group block h-full w-full relative overflow-hidden bg-canvas">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="img-grade object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span className="rule-mark mb-3 bg-white" />
                <h3 className="font-display font-semibold text-lg md:text-xl text-white">
                  {t.label}
                </h3>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
