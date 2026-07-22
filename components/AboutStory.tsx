"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

export default function AboutStory() {
  return (
    <div className="container-lux mt-16 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative aspect-[4/5] overflow-hidden bg-canvas shadow-card"
      >
        <Image
          src="https://picsum.photos/seed/haidar-about/1000/1200"
          alt="Inside the Haidar Shoes store"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <p className="text-graphite leading-relaxed text-lg">
          Haidar Shoes began with a simple belief: that a good pair of shoes should
          never force a choice between how they look and how they feel. What started
          as a single counter of carefully selected footwear has grown into a
          destination trusted by families across Punjab for formal wear, everyday
          comfort, and everything the season demands.
        </p>
        <p className="mt-6 text-graphite leading-relaxed text-lg">
          Every pair on our shelves is chosen for the same reasons — genuine
          materials, honest construction, and comfort that holds up long after the
          first wear. We fit each customer personally, because the right shoe is
          never just a size on a box.
        </p>
        <p className="mt-6 text-graphite leading-relaxed text-lg">
          Today, Haidar Shoes serves men, women and children with collections built
          for Punjab’s seasons — from insulated winter boots to breathable summer
          sandals — without ever losing sight of the store’s original promise:
          style and comfort, together, at a fair price.
        </p>
      </motion.div>
    </div>
  );
}
