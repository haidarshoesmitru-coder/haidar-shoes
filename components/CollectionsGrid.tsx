"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { collectionImages } from "@/lib/collection-images";

// Each tile owns its complete, non-overlapping className fragment — no tile
// receives two conflicting span values at the same breakpoint (the previous
// bug: every tile got both "md:col-span-1" AND the feature tile also got
// "md:col-span-2", stacked on the same element).
const tiles = [
  {
    slug: "winter",
    label: "Winter Collection 2026",
    wrapperClass: "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  },
  {
    slug: "men",
    label: "Men’s Collection",
    wrapperClass: "col-span-1 row-span-1",
  },
  {
    slug: "ladies",
    label: "Ladies Collection",
    wrapperClass: "col-span-1 row-span-1",
  },
  {
    slug: "kids",
    label: "Kids Collection",
    wrapperClass: "col-span-1 row-span-1",
  },
];

export default function CollectionsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[190px] gap-3 md:gap-4">
      {tiles.map((t, i) => {
        const image = collectionImages[t.slug];
        return (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className={`relative ${t.wrapperClass}`}
          >
            <Link
              href={`/collections/${t.slug}`}
              className="group block h-full w-full relative overflow-hidden bg-canvas"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="img-grade object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <span className="rule-mark mb-2 sm:mb-3 bg-white" />
                <h3 className="font-display font-semibold text-base sm:text-lg md:text-xl text-white">
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
