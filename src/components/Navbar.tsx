import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_PIN_LENGTH } from './Hero';
import { useLang, type Lang } from '../lib/i18n';

const T = {
  fr: {
    links: [
      { label: 'Accueil', href: '/#hero' },
      { label: 'À propos', href: '/about.html' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Projets', href: '/#projects' },
      { label: 'Location', href: '/location.html' },
      { label: 'Construire', href: '/construire.html' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Démarrer un projet',
    home: 'SOCODECO — accueil',
    menu: 'Ouvrir le menu',
  },
  en: {
    links: [
      { label: 'Home', href: '/#hero' },
      { label: 'About', href: '/about.html' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Rentals', href: '/location.html' },
      { label: 'Build', href: '/construire.html' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Start a Project',
    home: 'SOCODECO — home',
    menu: 'Toggle menu',
  },
};

/** Clean FR | EN switcher — active language in gold, works on light & dark. */
function LangSwitch({ onDark, size = 'sm' }: { onDark: boolean; size?: 'sm' | 'lg' }) {
  const { lang, setLang } = useLang();
  const base =
    size === 'lg'
      ? 'px-2 py-1 text-[15px] font-semibold tracking-[0.08em]'
      : 'px-1.5 py-1 text-[12.5px] font-semibold tracking-[0.08em]';
  const cls = (l: Lang) =>
    `${base} transition-colors duration-300 ${
      lang === l
        ? onDark
          ? 'text-rouge'
          : 'text-rougedeep'
        : onDark
          ? 'text-white/50 hover:text-white'
          : 'text-ink/40 hover:text-ink'
    }`;
  return (
    <div className="flex items-center" role="group" aria-label="Language">
      <button aria-label="Français" aria-pressed={lang === 'fr'} onClick={() => setLang('fr')} className={cls('fr')}>
        FR
      </button>
      <span className={onDark ? 'text-white/25' : 'text-ink/20'}>|</span>
      <button aria-label="English" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={cls('en')}>
        EN
      </button>
    </div>
  );
}

/** Marks the menu item of the page currently open (path-based pages only). */
function isActiveLink(href: string): boolean {
  const current = window.location.pathname;
  if (href === '/#hero') return current === '/' || current === '/index.html';
  const base = href.split('#')[0];
  return base !== '' && base !== '/' && current === base;
}

export default function Navbar({ variant = 'journey' }: { variant?: 'journey' | 'page' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const t = T[lang];

  useEffect(() => {
    /* on the homepage, stay cinematic (dark, transparent) for the whole
       pinned journey; on inner pages flip as soon as the hero is left */
    const threshold = variant === 'journey' ? HERO_PIN_LENGTH - 120 : window.innerHeight * 0.7;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const onDark = !scrolled && !open; // floating over the hero photograph

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-white/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md'
          : 'bg-gradient-to-b from-navydeep/40 to-transparent backdrop-blur-[2px]'
      }`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        {/* wordmark — always returns to the landing page */}
        <a href="/#hero" aria-label={t.home} className="flex items-center gap-3">
          <img
            src={onDark ? '/logo-light.png' : '/logo-dark.png'}
            alt="SDC — SOCODECO"
            className="h-8 w-auto transition-opacity duration-500 sm:h-9"
          />
          <span
            className={`hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 min-[1400px]:inline ${
              onDark ? 'text-white/45' : 'text-ink/40'
            }`}
          >
            Construction · Développement
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {t.links.map((l, i) => {
            const active = isActiveLink(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`group relative whitespace-nowrap px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                  active ? 'font-semibold' : 'font-medium'
                } ${onDark ? 'text-white/80 hover:text-white' : 'text-ink/70 hover:text-ink'}`}
              >
                {/* elegant section number — warm gold, pops up on hover */}
                <span
                  className={`mr-1.5 inline-block -translate-y-[3px] text-[9px] font-semibold tracking-[0.1em] transition-all duration-300 group-hover:-translate-y-[6px] ${
                    active ? 'text-gold' : onDark ? 'text-gold/65 group-hover:text-gold' : 'text-golddeep/65 group-hover:text-golddeep'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* label slides 4px right on hover */}
                <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">
                  {l.label}
                </span>
                {/* thin gold underline, left → right */}
                <span
                  className={`absolute inset-x-3.5 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LangSwitch onDark={onDark} />
          </div>
          <a
            href="#contact"
            className={`hidden items-center whitespace-nowrap rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 lg:inline-flex ${
              onDark ? 'bg-rouge text-white hover:bg-white hover:text-ink' : 'bg-ink text-white hover:bg-ink/85'
            }`}
          >
            {t.cta}
          </a>
          {/* mobile burger */}
          <button
            aria-label={t.menu}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${onDark ? 'bg-white' : 'bg-ink'}`}
              style={{ transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none' }}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${onDark ? 'bg-white' : 'bg-ink'}`}
              style={{ transform: open ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      <div
        className="overflow-hidden bg-white/95 backdrop-blur-md lg:hidden"
        style={{ maxHeight: open ? 540 : 0, transition: 'max-height 0.5s cubic-bezier(0.23,1,0.32,1)' }}
      >
        <div className="flex flex-col px-6 pb-6 pt-2">
          {t.links.map((l, i) => {
            const active = isActiveLink(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`group border-b border-ink/5 py-3.5 text-[15px] ${
                  active ? 'font-semibold text-ink' : 'font-medium text-ink/80'
                }`}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
                  transition: `opacity 0.45s cubic-bezier(0.23,1,0.32,1) ${i * 60 + 80}ms, transform 0.45s cubic-bezier(0.23,1,0.32,1) ${i * 60 + 80}ms`,
                }}
              >
                <span
                  className={`mr-2.5 inline-block -translate-y-[3px] text-[10px] font-semibold tracking-[0.1em] transition-transform duration-300 group-hover:-translate-y-[6px] ${
                    active ? 'text-gold' : 'text-golddeep/65'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {l.label}
                </span>
              </a>
            );
          })}
          {/* language switcher — mobile menu */}
          <div
            className="pt-4"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(-8px)',
              transition: `opacity 0.4s ${t.links.length * 50 + 80}ms, transform 0.4s ${t.links.length * 50 + 80}ms`,
            }}
          >
            <LangSwitch onDark={false} size="lg" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
