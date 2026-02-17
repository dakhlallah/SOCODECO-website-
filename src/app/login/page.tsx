"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

export default function LoginPage() {
  const t = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

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
            {t.login.label}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.login.title1}
            <br />
            <span className="text-[var(--accent)]">{t.login.title2}</span>
          </motion.h1>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-lg mx-auto">
          <motion.p
            className="text-[var(--text-muted)] mb-12 font-mono text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.login.description}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Email Field */}
            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.login.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                required
                className="w-full bg-transparent border-b border-[var(--surface-light)] py-3 text-[var(--text)] font-mono text-sm focus:border-[var(--accent)] transition-colors duration-300 placeholder:text-[var(--text-muted)]/40"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="font-mono text-xs text-[var(--text-muted)] mb-2 block">
                {t.login.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.login.passwordPlaceholder}
                required
                className="w-full bg-transparent border-b border-[var(--surface-light)] py-3 text-[var(--text)] font-mono text-sm focus:border-[var(--accent)] transition-colors duration-300 placeholder:text-[var(--text-muted)]/40"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 border transition-colors duration-300 flex items-center justify-center ${
                    rememberMe
                      ? "bg-[var(--accent)] border-[var(--accent)]"
                      : "border-[var(--surface-light)] group-hover:border-[var(--accent)]"
                  }`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      className="text-[var(--accent-contrast)]"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {t.login.rememberMe}
                </span>
              </label>

              <button
                type="button"
                className="font-mono text-xs text-[var(--accent)] hover:underline"
              >
                {t.login.forgotPassword}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-[var(--accent)] text-[var(--accent-contrast)] py-4 font-mono text-sm tracking-wider hover:bg-[var(--accent-dark)] transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {t.login.submit}
            </motion.button>

            {/* Contact Link */}
            <p className="text-center font-mono text-xs text-[var(--text-muted)]">
              {t.login.noAccount}{" "}
              <Link
                href="/contact"
                className="text-[var(--accent)] hover:underline"
              >
                {t.login.contactUs}
              </Link>
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </>
  );
}
