"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { EASE, fadeUp, viewportOnce, staggerDelay } from "@/lib/motion";
import StockBadge from "./StockBadge";

const tagLabel: Record<string, string> = {
  new: "New",
  bestseller: "Best Seller",
  winter: "Winter",
};

function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: staggerDelay(index, 0.06), ease: EASE }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.tags && product.tags.length > 0 && (
              <span className="bg-paper text-ink text-[10px] tracking-widest2 uppercase px-2.5 py-1 font-semibold">
                {tagLabel[product.tags[0]]}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="bg-clay text-white text-[10px] tracking-widest2 uppercase px-2.5 py-1 font-semibold">
                Sale
              </span>
            )}
          </div>
        </div>

        <div className="pt-3.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-[15px] text-ink truncate">
              {product.name}
            </h3>
            <p className="text-xs text-stone mt-0.5">Art. {product.article}</p>
            {product.stockStatus !== "in-stock" && (
              <div className="mt-1">
                <StockBadge status={product.stockStatus} />
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-ink font-semibold whitespace-nowrap">
              Rs. {product.price.toLocaleString()}
            </p>
            {product.compareAtPrice && (
              <p className="text-xs text-stone line-through whitespace-nowrap">
                Rs. {product.compareAtPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Product objects and index are stable across parent re-renders on category/home
// pages, so memoizing keeps large grids from re-rendering unnecessarily.
export default memo(ProductCard);
