"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

export default function WhatsAppFloatButton() {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8, ease: EASE }}
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-ink text-white px-4 py-3.5 shadow-raised rounded-full transition-colors duration-200 hover:bg-graphite"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-medium">Order on WhatsApp</span>
    </motion.a>
  );
}
