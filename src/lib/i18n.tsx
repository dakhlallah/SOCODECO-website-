import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Site-wide FR/EN language system.
 * — French is the default language.
 * — The choice persists in localStorage and survives refresh.
 * — Switching fades the whole page out, swaps every string, fades back in,
 *   then refreshes ScrollTrigger so pinned/scrubbed sections keep their
 *   measurements with the new text lengths.
 */

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'socodeco-lang';
const FADE_MS = 280;

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* private mode / storage disabled — fall through to default */
  }
  return 'fr';
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'fr',
  setLang: () => {},
});

export function LanguageProvider({
  children,
  title,
}: {
  children: ReactNode;
  /** per-page document titles, applied on load and on every switch */
  title?: { fr: string; en: string };
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (title) document.title = title[lang];
  }, [lang, title?.fr, title?.en]);

  const setLang = (next: Lang) => {
    if (next === lang) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* non-fatal */
    }

    const body = document.body;
    body.style.transition = `opacity ${FADE_MS}ms ease`;
    body.style.opacity = '0';

    window.setTimeout(() => {
      setLangState(next);
      /* wait two frames so React has painted the new language before fading in */
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          body.style.opacity = '1';
          window.setTimeout(() => {
            body.style.transition = '';
            /* text lengths changed — re-measure pinned & scrubbed sections */
            ScrollTrigger.refresh();
          }, FADE_MS + 40);
        }),
      );
    }, FADE_MS);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
