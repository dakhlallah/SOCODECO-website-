"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations, Translations } from "@/translations";

export function useTranslation(): Translations {
  const { language } = useLanguage();
  return translations[language];
}
