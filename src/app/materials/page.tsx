"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const materialImages = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
  "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
];

export default function MaterialsPage() {
  const t = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.materials.label}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.materials.title1}
            <br />
            <span className="text-[var(--accent)]">{t.materials.title2}</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.materials.description}
          </motion.p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.materials.items.map((material, index) => (
            <motion.div
              key={material.name}
              className="group bg-[var(--surface)] border border-[var(--surface-light)] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={materialImages[index]}
                  alt={material.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--text)] mb-2">
                  {material.name}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  {material.description}
                </p>
                <ul className="space-y-1">
                  {material.specs.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-xs text-[var(--accent)]"
                    >
                      → {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
            {t.materials.ctaTitle}
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            {t.materials.ctaDescription}
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-xl hover:bg-[var(--accent-dark)] transition-colors"
          >
            {t.materials.ctaButton}
          </a>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
