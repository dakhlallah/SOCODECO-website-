"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { EASE } from "./motion";

const LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-10 md:pt-7"
      >
        <nav
          className={`liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-700 md:px-7 ${
            scrolled ? "md:py-3" : "md:py-4"
          }`}
        >
          <a
            href="#hero"
            className="nova-display text-base tracking-tight text-white md:text-lg"
          >
            ATELIER&nbsp;NOVA
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[0.82rem] font-light tracking-wide text-[var(--nova-gray)] transition-colors duration-300 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--nova-beige)] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-white/15 px-5 py-2.5 text-[0.78rem] font-light tracking-wide text-white transition-all duration-500 hover:border-[var(--nova-beige)] hover:bg-white/[0.04] md:inline-block"
            >
              Prendre rendez-vous
            </a>
            <button
              type="button"
              aria-label="Recherche"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-[var(--nova-beige)] hover:text-white md:flex"
            >
              <Search size={16} strokeWidth={1.4} />
            </button>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            >
              <Menu size={18} strokeWidth={1.4} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--nova-bg-0)]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-7">
              <span className="nova-display text-base text-white">
                ATELIER&nbsp;NOVA
              </span>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
                  className="nova-display text-5xl text-white/90 transition-colors hover:text-[var(--nova-beige)]"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-8 inline-block w-fit rounded-full border border-[var(--nova-beige)]/50 px-7 py-3 text-sm tracking-wide text-[var(--nova-beige)]"
              >
                Prendre rendez-vous
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
