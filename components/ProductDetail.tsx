"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/site-config";
import { EASE } from "@/lib/motion";
import StockBadge from "./StockBadge";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [color, setColor] = useState(product.colors[0]);

  const orderMessage = `${DEFAULT_WHATSAPP_MESSAGE}\n\n${product.name} (Art. ${product.article})\nSize: ${size}\nColor: ${color}\nPrice: Rs. ${product.price.toLocaleString()}`;

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              className={`relative aspect-square overflow-hidden border transition-all duration-200 ease-out ${
                activeImage === i
                  ? "border-ink"
                  : "border-line opacity-70 hover:opacity-100 hover:border-stone"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" fill sizes="150px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="text-eyebrow mb-3">Art. {product.article}</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">{product.name}</h1>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="text-2xl text-ink font-semibold">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && (
            <span className="text-stone line-through">
              Rs. {product.compareAtPrice.toLocaleString()}
            </span>
          )}
          <StockBadge status={product.stockStatus} />
        </div>

        <p className="mt-6 text-graphite leading-relaxed">{product.description}</p>

        <div className="border-t border-line my-8" />

        {/* Color */}
        <div>
          <p className="text-eyebrow mb-3">Color — {color}</p>
          <div className="flex gap-3">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                  color === c
                    ? "border-ink text-ink font-medium"
                    : "border-line text-graphite hover:border-stone"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-8">
          <p className="text-eyebrow mb-3">Size (EU) — {size}</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-11 w-11 flex items-center justify-center text-sm border transition-colors duration-200 ${
                  size === s
                    ? "border-ink text-ink font-medium"
                    : "border-line text-graphite hover:border-stone"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {product.stockStatus === "out-of-stock" ? (
          <p className="mt-10 text-sm text-stone border border-line px-6 py-4 w-full sm:w-auto">
            This item is currently out of stock. Message us on WhatsApp and we’ll let you know as soon as it’s back.
          </p>
        ) : (
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 flex items-center justify-center gap-2 !text-white text-eyebrow px-8 py-4 w-full sm:w-auto"
          >
            <MessageCircle size={18} aria-hidden="true" /> Order on WhatsApp
          </a>
        )}

        <div className="mt-10">
          <p className="text-eyebrow mb-3">Specifications</p>
          <ul className="space-y-2">
            <li className="text-sm text-graphite flex gap-2">
              <span className="text-ink">—</span> Brand: {product.brand}
            </li>
            <li className="text-sm text-graphite flex gap-2">
              <span className="text-ink">—</span> Article Number: {product.article}
            </li>
            {product.details.map((d) => (
              <li key={d} className="text-sm text-graphite flex gap-2">
                <span className="text-ink">—</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-eyebrow mb-3">Delivery Information</p>
            <p className="text-sm text-graphite leading-relaxed">
              Delivered within 3–5 business days across Pakistan. Cash on
              Delivery available nationwide; pay when your order arrives.
            </p>
          </div>
          <div>
            <p className="text-eyebrow mb-3">Exchange Policy</p>
            <p className="text-sm text-graphite leading-relaxed">
              Easy 7-day exchange on unworn pairs in original packaging.
              Message us on WhatsApp with your order details to start an
              exchange.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
