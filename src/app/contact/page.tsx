"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactPage() {
  const t = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.contact.pageLabel}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.contact.pageTitle1}
            <br />
            <span className="text-[var(--accent)]">{t.contact.pageTitle2}</span>
          </motion.h1>
        </div>
      </section>

      <ContactSection />

      {/* Map Section */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            {t.contact.offices}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* DRC Office */}
          <motion.div
            className="bg-[var(--background)] p-8 border border-[var(--surface-light)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[var(--accent)] text-xs mb-4 block">
              {t.contact.hq}
            </span>
            <h3 className="font-display text-3xl text-[var(--text)] mb-4">
              KINSHASA, RDC
            </h3>
            <div className="space-y-4 font-mono text-sm text-[var(--text-muted)]">
              <p>
                8225 Avenue Kabasele
                <br />
                Commune de la Gombe
                <br />
                Kinshasa, République Démocratique du Congo
              </p>
              <p>
                <span className="text-[var(--accent)]">Tél:</span> +243 820 200 003
              </p>
              <p>
                <span className="text-[var(--accent)]">Tél:</span> +243 818 812 222
              </p>
              <p>
                <span className="text-[var(--accent)]">Tél:</span> +243 822 666 555
              </p>
              <p>
                <span className="text-[var(--accent)]">{t.contact.hours}:</span> Lun-Ven
                08:00 - 17:00
              </p>
            </div>
          </motion.div>

          {/* Lebanon Office */}
          <motion.div
            className="bg-[var(--background)] p-8 border border-[var(--surface-light)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="font-mono text-[var(--accent)] text-xs mb-4 block">
              {t.contact.regional}
            </span>
            <h3 className="font-display text-3xl text-[var(--text)] mb-4">
              BEYROUTH, LIBAN
            </h3>
            <div className="space-y-4 font-mono text-sm text-[var(--text-muted)]">
              <p>
                Rue Hamra
                <br />
                Quartier Hamra
                <br />
                Beyrouth, Liban
              </p>
              <p>
                <span className="text-[var(--accent)]">Tél:</span> +961 1 XXX XXX
              </p>
              <p>
                <span className="text-[var(--accent)]">{t.contact.hours}:</span> Lun-Ven
                09:00 - 18:00
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
