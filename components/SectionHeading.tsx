"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}
    >
      <div className={`flex items-center gap-3 mb-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="rule-mark" />
        <p className="text-eyebrow">{eyebrow}</p>
      </div>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-graphite text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
