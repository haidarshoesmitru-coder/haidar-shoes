import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import StoreLocation from "@/components/StoreLocation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Haidar Shoes — visit our store, call, or order on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-lux">
        <div className="flex items-center gap-3 mb-4">
          <span className="rule-mark" />
          <p className="text-eyebrow">Get In Touch</p>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-ink max-w-2xl tracking-tight">
          We’d Love To Fit You Right
        </h1>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          <div className="bg-canvas border border-line p-8">
            <MapPin className="text-ink mb-4" size={22} aria-hidden="true" />
            <p className="text-eyebrow mb-2">Address</p>
            <p className="text-graphite text-sm leading-relaxed">{siteConfig.address.line}</p>
          </div>
          <div className="bg-canvas border border-line p-8">
            <Phone className="text-ink mb-4" size={22} aria-hidden="true" />
            <p className="text-eyebrow mb-2">Call Us</p>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-graphite text-sm hover:text-ink transition-colors">
              {siteConfig.contact.phone}
            </a>
          </div>
          <div className="bg-canvas border border-line p-8">
            <Clock className="text-ink mb-4" size={22} aria-hidden="true" />
            <p className="text-eyebrow mb-2">Business Hours</p>
            <ul className="text-graphite text-sm space-y-1">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-stone">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={whatsappLink("Hi Haidar Shoes, I have a question.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 flex sm:inline-flex items-center justify-center gap-2 !text-white text-eyebrow px-8 py-4 w-full sm:w-auto"
        >
          <MessageCircle size={18} aria-hidden="true" /> Message Us on WhatsApp
        </a>

        <div className="mt-16">
          <StoreLocation />
        </div>
      </div>
    </div>
  );
}
