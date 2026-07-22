"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/lib/products";
import { EASE } from "@/lib/motion";

export default function Reviews() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {reviews.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          className="bg-canvas border border-line p-8"
        >
          <div className="flex gap-1 mb-4" role="img" aria-label={`Rated ${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                size={15}
                aria-hidden="true"
                className={idx < r.rating ? "fill-clay text-clay" : "text-line"}
              />
            ))}
          </div>
          <p className="text-ink leading-relaxed text-[15px]">
            “{r.text}”
          </p>
          <p className="mt-5 text-eyebrow !text-stone !tracking-widest">
            {r.name} — {r.location}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
