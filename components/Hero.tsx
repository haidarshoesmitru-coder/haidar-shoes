"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { heroImage } from "@/lib/collection-images";
import { EASE } from "@/lib/motion";

const MotionLink = motion(Link);

const trustMarkers = ["Genuine Leather", "Easy Exchange", "Cash on Delivery"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle, restrained parallax only — the image should feel steady.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Dark gradient — supports legible white typography over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 h-full container-lux flex flex-col justify-end pb-24 md:pb-28 pt-[72px]"
      >
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-eyebrow !text-white/70 mb-5"
          >
            Premium Footwear · Est. Punjab
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-white max-w-3xl"
          >
            Crafted For Every Step.
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="max-w-md text-lg text-white/75"
          >
            <span className="text-white font-medium">Haidar Shoes</span> —
            genuine leather, honest craftsmanship, and a fit built to last.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <MotionLink
            href="/collections"
            whileTap={{ scale: 0.98 }}
            className="bg-white text-ink text-eyebrow px-7 py-4 text-center transition-colors duration-200 hover:bg-white/90"
          >
            Explore Collection
          </MotionLink>
          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="border border-white/50 text-white text-eyebrow px-7 py-4 text-center transition-colors duration-200 hover:bg-white/10"
          >
            Order on WhatsApp
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.56 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {trustMarkers.map((t, i) => (
            <span key={t} className="flex items-center gap-6">
              <span className="text-sm text-white/70">{t}</span>
              {i < trustMarkers.length - 1 && (
                <span className="hidden sm:block h-3 w-px bg-white/25" aria-hidden="true" />
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 right-6 md:right-16 z-10 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="relative h-12 w-px bg-white/20 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white/80"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
