"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Colors flip once we scroll past the dark hero
  const textColor = pastHero ? "#1A1A1A" : "#F5F2EA";
  const logoColor = pastHero ? "#1A1A1A" : "#C8A96B";
  const bgColor = scrolled
    ? pastHero
      ? "rgba(255,255,255,0.85)"
      : "rgba(10,10,10,0.72)"
    : "transparent";

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 flex items-center justify-between"
        style={{
          background: bgColor,
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            color: logoColor,
            fontWeight: 600,
            letterSpacing: "0.15em",
            fontSize: "1rem",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.5s",
          }}
        >
          SOCODECO
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: textColor,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.3s, color 0.5s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </a>
          ))}

          {/* CTA Button */}
          <a
            href="#contact"
            style={{
              color: pastHero ? "#1A1A1A" : "#F5F2EA",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: pastHero
                ? "1px solid rgba(0,0,0,0.15)"
                : "1px solid rgba(200,169,107,0.3)",
              padding: "0.55rem 1.4rem",
              transition: "all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B8964E";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "#B8964E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = pastHero ? "#1A1A1A" : "#F5F2EA";
              e.currentTarget.style.borderColor = pastHero
                ? "rgba(0,0,0,0.15)"
                : "rgba(200,169,107,0.3)";
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: textColor,
                transition: "background 0.5s",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center"
            style={{ background: "#FFFFFF" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-6"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1A1A1A",
                fontSize: "1.5rem",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "#1A1A1A",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + navLinks.length * 0.06,
                  duration: 0.4,
                }}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  background: "#B8964E",
                  padding: "0.65rem 1.6rem",
                  marginTop: "1rem",
                }}
              >
                Start a Project
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
