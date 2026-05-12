"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export default function ContactSection() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!EMAIL_REGEX.test(formData.email)) {
      setStatus("error");
      setErrorMessage(t.contact.form.invalidEmail);
      return;
    }

    setStatus("sending");

    try {
      if (!CONTACT_ENDPOINT) {
        throw new Error("Contact endpoint not configured");
      }
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.form.error);
    }
  };

  const isSending = status === "sending";

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
                <a href="tel:+243820200003" className="hover:text-[var(--accent)] transition-colors">+243 820 200 003</a>
                <br />
                <a href="tel:+243818812222" className="hover:text-[var(--accent)] transition-colors">+243 818 812 222</a>
                <br />
                <a href="tel:+243822666555" className="hover:text-[var(--accent)] transition-colors">+243 822 666 555</a>
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="contact-name" className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.name}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                disabled={isSending}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors disabled:opacity-60"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.email}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                disabled={isSending}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors disabled:opacity-60"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.company}
              </label>
              <input
                id="contact-company"
                type="text"
                disabled={isSending}
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors disabled:opacity-60"
                placeholder={t.contact.form.companyPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSending}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-[var(--surface-light)] focus:border-[var(--accent)] py-3 text-[var(--text)] outline-none transition-colors resize-none disabled:opacity-60"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              className="w-full md:w-auto px-12 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-xl hover:bg-[var(--accent-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={isSending ? undefined : { scale: 1.02 }}
              whileTap={isSending ? undefined : { scale: 0.98 }}
            >
              {isSending ? t.contact.form.sending : t.contact.form.submit}
            </motion.button>

            <div role="status" aria-live="polite" className="min-h-6">
              {status === "success" && (
                <p className="font-mono text-sm text-[var(--accent)]">
                  {t.contact.form.success}
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="font-mono text-sm text-red-400">{errorMessage}</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
