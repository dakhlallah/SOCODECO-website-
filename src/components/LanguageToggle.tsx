"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  className?: string;
  variant?: "header" | "menu";
}

export default function LanguageToggle({ className = "", variant = "header" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  if (variant === "menu") {
    return (
      <motion.button
        onClick={toggleLanguage}
        className={`flex items-center gap-3 font-mono text-sm ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`transition-colors ${language === "fr" ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
          FR
        </span>
        <span className="text-[var(--text-muted)]">/</span>
        <span className={`transition-colors ${language === "en" ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
          EN
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`relative z-50 flex items-center gap-1 font-mono text-xs text-white px-2 py-1 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === "fr" ? "English" : "French"}`}
    >
      <span className={`transition-all duration-300 ${language === "fr" ? "opacity-100" : "opacity-40"}`}>
        FR
      </span>
      <motion.span
        className="w-8 h-5 bg-white/20 rounded-full relative mx-1"
        initial={false}
      >
        <motion.span
          className="absolute top-0.5 w-4 h-4 bg-[var(--accent)] rounded-full"
          animate={{ left: language === "fr" ? "2px" : "14px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.span>
      <span className={`transition-all duration-300 ${language === "en" ? "opacity-100" : "opacity-40"}`}>
        EN
      </span>
    </motion.button>
  );
}
