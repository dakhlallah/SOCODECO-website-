"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const defaultContext: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  toggleLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("socodeco-language") as Language;
    if (stored && (stored === "fr" || stored === "en")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("socodeco-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo({ top: window.scrollY, behavior: "smooth" });
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={defaultContext}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
