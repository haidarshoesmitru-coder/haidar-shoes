"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

export default function StoreLocation() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-stretch">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="bg-canvas border border-line p-8 md:p-12 flex flex-col justify-center"
      >
        <p className="text-eyebrow mb-4">Visit The Store</p>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mb-4">Haidar Shoes</h3>
        <p className="flex items-start gap-2 text-graphite mb-8">
          <MapPin size={18} aria-hidden="true" className="text-ink shrink-0 mt-1" />
          {siteConfig.address.line}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={siteConfig.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-eyebrow !text-white px-6 py-3.5 text-center flex items-center justify-center gap-2"
          >
            <MapPin size={16} aria-hidden="true" /> Google Maps
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-eyebrow px-6 py-3.5 text-center flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="btn-secondary text-eyebrow px-6 py-3.5 text-center flex items-center justify-center gap-2"
          >
            <Phone size={16} aria-hidden="true" /> Call Now
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-[320px] border border-line overflow-hidden"
      >
        <iframe
          title="Haidar Shoes location map"
          className="h-full w-full"
          style={{ minHeight: 320, border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=X35C%2B5CG+Dokota+Road+Mitro+Punjab+Pakistan&output=embed"
        />
      </motion.div>
    </div>
  );
}
