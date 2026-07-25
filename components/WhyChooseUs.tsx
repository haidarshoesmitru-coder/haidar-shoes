"use client";

import { motion } from "framer-motion";
import { Gem, Leaf, RefreshCw, Banknote, MessageCircle } from "lucide-react";
import { EASE } from "@/lib/motion";

const points = [
  {
    icon: Gem,
    title: "Premium Quality",
    text: "Reinforced soles and hand-finished stitching in every pair we sell.",
  },
  {
    icon: Leaf,
    title: "Genuine Materials",
    text: "Real leather and durable fabrics — never synthetic shortcuts.",
  },
  {
    icon: RefreshCw,
    title: "Easy Exchange",
    text: "7-day exchange on unworn pairs, no complicated paperwork.",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    text: "Pay when your order arrives, available nationwide.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Ordering",
    text: "Order directly on WhatsApp — no account or app required.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line">
      {points.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          className="bg-paper p-8 md:p-7"
        >
          <p.icon className="text-ink mb-6" size={24} strokeWidth={1.6} aria-hidden="true" />
          <h3 className="font-display font-semibold text-base text-ink mb-2">{p.title}</h3>
          <p className="text-sm text-graphite leading-relaxed">{p.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
