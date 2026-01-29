"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useTranslation } from "@/hooks/useTranslation";

const serviceImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
];

export default function ServicesPage() {
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
            {t.services.title}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.services.pageTitle1}
            <br />
            <span className="text-[var(--accent)]">{t.services.pageTitle2}</span>
          </motion.h1>
        </div>
      </section>

      {/* Services Detail */}
      {t.servicesPage.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 px-4 md:px-8 overflow-hidden ${
            index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface)]"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className={index % 2 === 1 ? "lg:order-2" : ""}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
                {service.title}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--text)]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={serviceImages[index]}
                alt={service.title}
                fill
                className="object-cover hover:scale-105 transition-all duration-700"
              />
              <div
                className={`absolute inset-0 border-2 border-[var(--accent)] -z-10 hidden md:block ${
                  index % 2 === 0
                    ? "translate-x-4 translate-y-4"
                    : "-translate-x-4 translate-y-4"
                }`}
              />
            </motion.div>
          </div>
        </section>
      ))}

      <ContactSection />
      <Footer />
    </>
  );
}
