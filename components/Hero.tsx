"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

const MotionLink = motion(Link);

const trustMarkers = ["Genuine Leather", "Easy Exchange", "Cash on Delivery"];

export default function Hero() {
  return (
    <section className="bg-paper pt-[72px]">
      <div className="container-lux grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 md:py-20 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-eyebrow mb-5"
          >
            Premium Footwear · Est. Punjab
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink"
          >
            Haidar <span className="text-clay">Shoes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mt-5 max-w-md text-lg text-graphite"
          >
            Step into style and comfort — footwear built with genuine
            materials, honest craftsmanship, and a fit that lasts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <MotionLink
              href="/collections"
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-eyebrow !text-white px-7 py-4 text-center"
            >
              Explore Collection
            </MotionLink>
            <motion.a
              href={whatsappLink("Hi Haidar Shoes, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-eyebrow px-7 py-4 text-center"
            >
              Order on WhatsApp
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {trustMarkers.map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                <span className="text-sm text-graphite">{t}</span>
                {i < trustMarkers.length - 1 && (
                  <span className="hidden sm:block h-3 w-px bg-line" aria-hidden="true" />
                )}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative aspect-[4/5] bg-canvas overflow-hidden"
        >
          <Image
            src="https://picsum.photos/seed/haidar-hero/1200/1500"
            alt="Haidar Shoes — premium leather footwear"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
