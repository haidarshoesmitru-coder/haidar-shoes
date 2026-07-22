"use client";

import { motion } from "framer-motion";
import { Gem, Wallet, ShieldCheck, HeartHandshake } from "lucide-react";
import { EASE } from "@/lib/motion";

const points = [
  {
    icon: Gem,
    title: "Quality Footwear",
    text: "Genuine leather, reinforced soles and hand-finished stitching in every pair.",
  },
  {
    icon: Wallet,
    title: "Affordable Prices",
    text: "Premium craftsmanship priced fairly, without the designer markup.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Local Brand",
    text: "A name families across Punjab have relied on for reliable, honest service.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    text: "Real fitting advice and after-sale support — we stand behind every pair.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
      {points.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          className="bg-paper p-8 md:p-10"
        >
          <p.icon className="text-ink mb-6" size={26} strokeWidth={1.6} aria-hidden="true" />
          <h3 className="font-display font-semibold text-lg text-ink mb-2">{p.title}</h3>
          <p className="text-sm text-graphite leading-relaxed">{p.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
