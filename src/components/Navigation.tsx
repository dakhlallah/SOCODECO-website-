"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "./LanguageToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslation();

  const menuItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.materials, href: "/materials" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.apartments, href: "/apartments" },
    { name: t.nav.architecture, href: "/architecture" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const linkVariants = {
    closed: {
      y: 50,
      opacity: 0,
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="relative z-50">
          <motion.span
            className="font-display text-3xl text-white tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SOCODECO
          </motion.span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LanguageToggle variant="header" />
          </motion.div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-8 h-0.5 bg-white block origin-center"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 4 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-8 h-0.5 bg-white block"
              animate={{
                opacity: isOpen ? 0 : 1,
                x: isOpen ? 20 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-8 h-0.5 bg-white block origin-center"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-0 bg-[var(--background)] z-40 flex items-center justify-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-white/20"
                    style={{
                      top: `${10 + i * 10}%`,
                      left: 0,
                      right: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 block py-2"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Language Toggle in Menu */}
              <motion.div
                custom={menuItems.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8"
              >
                <LanguageToggle variant="menu" />
              </motion.div>
            </div>

            {/* Footer Info */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-sm text-[var(--text-muted)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="font-mono">
                <p>{t.nav.drc}</p>
                <p>{t.nav.lebanon}</p>
              </div>
              <div className="font-mono text-right">
                <p>info@socodeco.org</p>
                <p>+243 820 200 003</p>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
