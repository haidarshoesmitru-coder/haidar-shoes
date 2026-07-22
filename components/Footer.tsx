import Link from "next/link";
import { Instagram, Facebook, Music2, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-lux py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display font-extrabold text-xl tracking-tight text-ink uppercase">
            Haidar <span className="text-clay">Shoes</span>
          </span>
          <p className="mt-4 max-w-sm text-sm text-graphite leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 flex items-center justify-center bg-paper border border-line text-graphite hover:text-ink hover:border-ink transition-colors duration-200">
              <Instagram size={16} aria-hidden="true" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 flex items-center justify-center bg-paper border border-line text-graphite hover:text-ink hover:border-ink transition-colors duration-200">
              <Facebook size={16} aria-hidden="true" />
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="h-10 w-10 flex items-center justify-center bg-paper border border-line text-graphite hover:text-ink hover:border-ink transition-colors duration-200">
              <Music2 size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-graphite">
            <li><Link href="/collections/men" className="hover:text-ink transition-colors">Men’s Collection</Link></li>
            <li><Link href="/collections/ladies" className="hover:text-ink transition-colors">Ladies Collection</Link></li>
            <li><Link href="/collections/kids" className="hover:text-ink transition-colors">Kids Collection</Link></li>
            <li><Link href="/collections/winter" className="hover:text-ink transition-colors">Winter Collection</Link></li>
            <li><Link href="/collections/sandals" className="hover:text-ink transition-colors">Sandals &amp; Slippers</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-eyebrow mb-5">Visit Us</p>
          <ul className="space-y-4 text-sm text-graphite">
            <li className="flex gap-2">
              <MapPin size={16} aria-hidden="true" className="text-ink shrink-0 mt-0.5" />
              <span>{siteConfig.address.line}</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} aria-hidden="true" className="text-ink shrink-0 mt-0.5" />
              <span>{siteConfig.contact.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line" />

      <div className="container-lux py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone">
        <span>© {new Date().getFullYear()} Haidar Shoes. All rights reserved.</span>
        <span>Crafted with care in Punjab, Pakistan.</span>
      </div>
    </footer>
  );
}
