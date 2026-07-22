"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-300 ${
        scrolled ? "border-b border-line shadow-[0_1px_0_rgba(20,20,18,0.04)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-lux flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-extrabold text-xl tracking-tight text-ink uppercase">
            Haidar <span className="text-clay">Shoes</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-eyebrow !text-[0.75rem] transition-colors duration-200 ${
                  active ? "!text-ink" : "!text-graphite hover:!text-ink"
                }`}
              >
                {l.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute left-0 -bottom-1.5 h-[2px] w-full bg-ink"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                ) : (
                  <span className="absolute left-0 -bottom-1.5 h-[2px] w-full bg-ink scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={whatsappLink("Hi Haidar Shoes, I'd like to know more about your collection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-eyebrow !text-[0.7rem] !text-white px-5 py-2.5"
          >
            WhatsApp Us
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden text-ink p-2.5 -mr-2.5"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden bg-paper border-t border-line overflow-hidden"
          >
            <div className="container-lux flex flex-col py-6 gap-1">
              {links.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-base font-medium transition-colors flex items-center gap-2 py-2.5 border-b border-line last:border-b-0 ${
                      active ? "text-ink" : "text-graphite"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-clay" />}
                    {l.label}
                  </Link>
                );
              })}
              <a
                href={whatsappLink("Hi Haidar Shoes, I'd like to know more about your collection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-eyebrow !text-[0.7rem] !text-white px-5 py-3.5 text-center mt-4"
              >
                WhatsApp Us
              </a>
              <span className="text-xs text-stone mt-4">{siteConfig.address.line}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
