"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const t = useTranslation();

  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
          {t.services.label}
        </span>
        <h2 className="font-display text-5xl md:text-7xl text-[var(--text)]">
          {t.services.title}
        </h2>
      </motion.div>

      {/* Services List */}
      <div className="space-y-0">
        {t.services.items.map((service, index) => (
          <motion.div
            key={service.id}
            className="border-t border-[var(--surface-light)] last:border-b"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="py-8 cursor-pointer group"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Number */}
                <span className="font-mono text-[var(--accent)] text-sm w-12">
                  {service.id}
                </span>

                {/* Title */}
                <h3
                  className={`font-display text-3xl md:text-5xl flex-1 transition-colors duration-300 ${
                    activeService === service.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text)]"
                  }`}
                >
                  {service.title}
                </h3>

                {/* Arrow */}
                <motion.div
                  className="hidden md:block"
                  animate={{
                    x: activeService === service.id ? 10 : 0,
                    opacity: activeService === service.id ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-colors duration-300 ${
                      activeService === service.id
                        ? "text-[var(--accent)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Expandable Content */}
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeService === service.id ? "auto" : 0,
                  opacity: activeService === service.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="pt-6 pl-0 md:pl-20 grid md:grid-cols-2 gap-8">
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-mono text-xs px-3 py-1.5 border border-[var(--surface-light)] text-[var(--text-muted)]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href="/services"
          className="inline-flex items-center gap-3 font-display text-xl text-white hover:text-[var(--accent)] transition-colors group"
        >
          {t.services.cta}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-2 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
