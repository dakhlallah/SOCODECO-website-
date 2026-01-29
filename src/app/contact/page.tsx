"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
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
            CONTACT US
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            CONTACT
            <br />
            <span className="text-[var(--accent)]">US</span>
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
            OUR LOCATIONS
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
              PRINCIPAL OFFICE
            </span>
            <h3 className="font-display text-3xl text-[var(--text)] mb-4">
              KINSHASA, DRC
            </h3>
            <div className="space-y-4 font-mono text-sm text-[var(--text-muted)]">
              <p>
                123 Avenue du Commerce
                <br />
                Gombe District
                <br />
                Kinshasa, Democratic Republic of Congo
              </p>
              <p>
                <span className="text-[var(--accent)]">Tel:</span> +243 820 200 003
              </p>
              <p>
                <span className="text-[var(--accent)]">Tel:</span> +243 818 812 222
              </p>
              <p>
                <span className="text-[var(--accent)]">Tel:</span> +243 822 666 555
              </p>
              <p>
                <span className="text-[var(--accent)]">Operating Hours:</span> Mon-Fri
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
              REGIONAL HEADQUARTERS
            </span>
            <h3 className="font-display text-3xl text-[var(--text)] mb-4">
              BEIRUT, LEBANON
            </h3>
            <div className="space-y-4 font-mono text-sm text-[var(--text-muted)]">
              <p>
                456 Rue Hamra
                <br />
                Hamra District
                <br />
                Beirut, Lebanon
              </p>
              <p>
                <span className="text-[var(--accent)]">Tel:</span> +961 X XXX
                XXX
              </p>
              <p>
                <span className="text-[var(--accent)]">Operating Hours:</span> Mon-Fri
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
