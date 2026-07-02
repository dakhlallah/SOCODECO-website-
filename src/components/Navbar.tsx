import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_PIN_LENGTH } from './Hero';

const LINKS = [
  { label: 'Home', href: '/#hero' },
  { label: 'About', href: '/about.html' },
  { label: 'Expertise', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Quality', href: '/#quality' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ variant = 'journey' }: { variant?: 'journey' | 'page' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled
          ? 'bg-white/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md'
          : 'bg-gradient-to-b from-navydeep/40 to-transparent backdrop-blur-[2px]'
      }`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        {/* wordmark — always returns to the landing page */}
        <a href="/#hero" aria-label="SOCODECO — home" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-gold font-display text-[13px] font-bold leading-none text-ink">
            SO
          </span>
          <span
            className={`font-display text-[17px] font-bold tracking-tight transition-colors duration-500 ${
              onDark ? 'text-white' : 'text-ink'
            }`}
          >
            SOCODECO
            <span
              className={`ml-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] md:inline ${
                onDark ? 'text-white/45' : 'text-ink/40'
              }`}
            >
              Construction · Développement
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                onDark
                  ? 'text-white/75 hover:bg-white/10 hover:text-white'
                  : 'text-ink/70 hover:bg-ink/[0.04] hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`hidden items-center rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 lg:inline-flex ${
              onDark ? 'bg-gold text-ink hover:bg-white' : 'bg-ink text-white hover:bg-ink/85'
            }`}
          >
            Start a Project
          </a>
          {/* mobile burger */}
          <button
            aria-label="Toggle menu"
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
        style={{ maxHeight: open ? 360 : 0, transition: 'max-height 0.5s cubic-bezier(0.23,1,0.32,1)' }}
      >
        <div className="flex flex-col px-6 pb-6 pt-2">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 py-3.5 text-[15px] font-medium text-ink/80"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(-8px)',
                transition: `opacity 0.4s ${i * 50 + 80}ms, transform 0.4s ${i * 50 + 80}ms`,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
