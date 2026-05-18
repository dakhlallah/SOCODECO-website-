"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const FIELDS = [
  { name: "name", label: "Nom complet", type: "text", required: true },
  { name: "email", label: "Adresse e-mail", type: "email", required: true },
  { name: "studio", label: "Société / Studio", type: "text", required: false },
] as const;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    studio: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.message.trim()) {
      setStatus("error");
      setError("Merci de renseigner votre nom et votre message.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setStatus("error");
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setStatus("sending");
    try {
      if (!CONTACT_ENDPOINT) throw new Error("Endpoint non configuré");
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Échec : ${res.status}`);
      setStatus("success");
      setForm({ name: "", email: "", studio: "", message: "" });
    } catch {
      setStatus("error");
      setError(
        "Envoi impossible pour le moment. Écrivez-nous à contact@ateliernova.fr.",
      );
    }
  };

  const sending = status === "sending";

  return (
    <section
      id="contact"
      className="relative bg-[var(--nova-bg-1)] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-5"
        >
          <motion.p variants={fadeUp} className="nova-eyebrow mb-7">
            Contact
          </motion.p>
          <motion.h2
            variants={blurFadeUp}
            className="nova-display text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Parlons de votre projet.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-sm text-base font-light leading-relaxed text-[var(--nova-gray)]"
          >
            Décrivez-nous votre intention. Nous revenons vers vous sous 48
            heures pour esquisser ensemble les premières lignes.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-12 space-y-5">
            <a
              href="mailto:contact@ateliernova.fr"
              className="block text-sm font-light text-white transition-colors hover:text-[var(--nova-beige)]"
            >
              contact@ateliernova.fr
            </a>
            <a
              href="tel:+33100000000"
              className="block text-sm font-light text-[var(--nova-gray)] transition-colors hover:text-white"
            >
              +33 1 00 00 00 00
            </a>
            <p className="text-sm font-light text-[var(--nova-gray)]">
              Paris — Genève
            </p>
          </motion.div>
        </motion.div>

        <motion.form
          variants={blurFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={onSubmit}
          noValidate
          className="liquid-glass rounded-3xl p-8 md:p-10 lg:col-span-7"
        >
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div
                key={f.name}
                className={f.name === "studio" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={`nova-${f.name}`}
                  className="mb-3 block text-xs font-light uppercase tracking-[0.2em] text-[var(--nova-gray)]"
                >
                  {f.label}
                  {f.required ? " *" : ""}
                </label>
                <input
                  id={`nova-${f.name}`}
                  type={f.type}
                  required={f.required}
                  disabled={sending}
                  value={form[f.name as keyof typeof form]}
                  onChange={(e) => update(f.name, e.target.value)}
                  className="w-full border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[var(--nova-beige)] disabled:opacity-50"
                  placeholder={f.label}
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label
                htmlFor="nova-message"
                className="mb-3 block text-xs font-light uppercase tracking-[0.2em] text-[var(--nova-gray)]"
              >
                Votre projet *
              </label>
              <textarea
                id="nova-message"
                required
                rows={4}
                disabled={sending}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[var(--nova-beige)] disabled:opacity-50"
                placeholder="Nature, lieu, surface, échéance…"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nova-beige)] px-9 py-4 text-sm font-medium tracking-wide text-[#0a0a0a] transition-all duration-500 hover:bg-[var(--nova-champagne)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Envoi en cours…" : "Envoyer la demande"}
              {!sending && (
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              )}
            </button>

            <div role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === "success" && (
                <p className="font-light text-[var(--nova-beige)]">
                  Merci — votre demande a bien été envoyée.
                </p>
              )}
              {status === "error" && error && (
                <p className="font-light text-red-300/90">{error}</p>
              )}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
