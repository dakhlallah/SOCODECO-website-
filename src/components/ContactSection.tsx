"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactSection() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column - Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
            {t.contact.label}
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-[var(--text)] mb-8">
            {t.contact.title1}
            <br />
            <span className="text-[var(--accent)]">{t.contact.title2}</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-12 max-w-md">
            {t.contact.description}
          </p>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h4 className="font-display text-xl text-[var(--text)] mb-2">
                {t.contact.hqTitle}
              </h4>
              <p className="font-mono text-sm text-[var(--text-muted)]">
                8225 Avenue Kabasele
                <br />
                C/Gombe, B.P 12657
                <br />
                Kinshasa, République Démocratique du Congo
              </p>
              <p className="font-mono text-sm text-[var(--text-muted)] mt-2">
                +243 820 200 003
                <br />
                +243 818 812 222
                <br />
                +243 822 666 555
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl text-[var(--text)] mb-2">
                {t.contact.regionalTitle}
              </h4>
              <p className="font-mono text-sm text-[var(--text-muted)]">
                Rue Hamra
                <br />
                Beyrouth, Liban
                <br />
                +961 1 XXX XXX
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl text-[var(--text)] mb-2">{t.contact.emailTitle}</h4>
              <a
                href="mailto:info@socodeco.org"
                className="font-mono text-sm text-[var(--accent)] hover:underline"
              >
                info@socodeco.org
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>

            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.company}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors"
                placeholder={t.contact.form.companyPlaceholder}
              />
            </div>

            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.message}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors resize-none"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-xl hover:bg-[var(--accent-dark)] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.contact.form.submit}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
