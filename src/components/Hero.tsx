import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useLang } from '../lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "From Land to Landmark" — the hero scrubs a cinematic AI-generated
 * construction film (empty land → foundations → structure → facade →
 * completed tower) frame-locked to scroll, with stage storytelling
 * overlays. Film: Higgsfield Seedance 2.0, 10s @1080p, re-encoded with
 * dense keyframes (g=12) so currentTime seeks resolve fast while scrubbing.
 */

/** total pinned scroll distance of the journey — Navbar flips style after it */
export const HERO_PIN_LENGTH = 7200;

const STAGE_TIMING = [
  { n: '01', from: 0.0, to: 0.14 },
  { n: '02', from: 0.14, to: 0.34 },
  { n: '03', from: 0.34, to: 0.62 },
  { n: '04', from: 0.62, to: 0.86 },
  { n: '05', from: 0.86, to: 1.0 },
];

const T = {
  fr: {
    stages: [
      { key: 'TERRAIN', title: 'Étude du terrain', text: 'Nous analysons chaque site avant de construire.' },
      { key: 'FONDATIONS', title: 'Fondations', text: 'La solidité commence sous terre.' },
      { key: 'STRUCTURE', title: 'Structure', text: 'La précision définit chaque niveau.' },
      { key: 'FAÇADE', title: 'Façade', text: "Les détails façonnent l'identité." },
      { key: 'LIVRAISON', title: 'Livraison', text: "Un chef-d'œuvre devient réalité." },
    ],
    tagline: "Du terrain au chef-d'œuvre",
    ctaProjects: 'Découvrir les projets',
    ctaStart: 'Démarrer un projet',
    scrollCue: 'Faites défiler pour construire',
    videoAria:
      "Film cinématique d'une tour SOCODECO s'élevant d'un terrain vide jusqu'à un gratte-ciel achevé à Kinshasa",
  },
  en: {
    stages: [
      { key: 'LAND', title: 'Land Study', text: 'We analyze every site before building.' },
      { key: 'FOUNDATION', title: 'Foundation', text: 'Strength starts underground.' },
      { key: 'STRUCTURE', title: 'Structure', text: 'Precision defines every level.' },
      { key: 'FACADE', title: 'Facade', text: 'Details shape identity.' },
      { key: 'DELIVERY', title: 'Delivery', text: 'A landmark becomes real.' },
    ],
    tagline: 'From Land to Landmark',
    ctaProjects: 'Explore Projects',
    ctaStart: 'Start a Project',
    scrollCue: 'Scroll to build',
    videoAria:
      'Cinematic film of a SOCODECO tower rising from empty land to a completed high-rise in Kinshasa',
  },
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Hero() {
  const { lang } = useLang();
  const t = T[lang];
  const stages = STAGE_TIMING.map((s, i) => ({ ...s, ...t.stages[i] }));
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const scrimRef = useRef<HTMLDivElement>(null);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const railEls = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const video = videoRef.current!;

      /* seek-throttled scrubbing: only one in-flight seek, always chasing
         the latest scroll target */
      const requestSeek = () => {
        if (seekingRef.current || video.readyState < 1) return;
        const t = targetTimeRef.current;
        if (Math.abs(video.currentTime - t) < 0.015) return;
        seekingRef.current = true;
        video.currentTime = t;
      };
      const onSeeked = () => {
        seekingRef.current = false;
        requestSeek();
      };
      video.addEventListener('seeked', onSeeked);
      video.addEventListener('loadedmetadata', () => {
        if (reduced) video.currentTime = Math.max(0, video.duration - 0.05);
      });

      const applyUI = (p: number) => {
        /* the film brightens toward the finale — relax the scrim a little */
        const d = clamp01((p - 0.2) / 0.68);
        if (scrimRef.current) scrimRef.current.style.opacity = String(1 - d * 0.2);

        STAGE_TIMING.forEach((s, i) => {
          const el = stageEls.current[i];
          if (!el) return;
          const fadeIn = i === 0 ? 1 : clamp01((p - s.from) / 0.035);
          const fadeOut = i === STAGE_TIMING.length - 1 ? 1 : clamp01((s.to - p) / 0.035);
          const v = Math.min(fadeIn, fadeOut);
          el.style.opacity = String(v);
          el.style.filter = `blur(${(1 - v) * 10}px)`;
          el.style.transform = `translateY(${(1 - v) * 34}px)`;
          const rail = railEls.current[i];
          if (rail) rail.dataset.active = p >= s.from && (p < s.to || i === STAGE_TIMING.length - 1) ? '1' : '0';
        });

        const cue = root.current?.querySelector<HTMLElement>('.journey-cue');
        if (cue) cue.style.opacity = String(1 - clamp01(p / 0.04));

        if (ctaRef.current) {
          const v = clamp01((p - 0.945) / 0.05);
          ctaRef.current.style.opacity = String(v);
          ctaRef.current.style.pointerEvents = v > 0.6 ? 'auto' : 'none';
          ctaRef.current.style.transform = `translateY(${(1 - v) * 26}px)`;
        }
      };

      if (reduced) {
        applyUI(1);
        return () => video.removeEventListener('seeked', onSeeked);
      }

      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${HERO_PIN_LENGTH}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
        onUpdate: () => {
          const dur = video.duration;
          if (dur && isFinite(dur)) {
            targetTimeRef.current = state.p * (dur - 0.06);
            requestSeek();
          }
          applyUI(state.p);
        },
      });

      applyUI(0);

      return () => video.removeEventListener('seeked', onSeeked);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#060d16]">
      {/* the construction film — mirrored so the tower ends on the right,
          leaving the left clear for the stage storytelling */}
      <div className="absolute inset-0 -scale-x-100">
        <video
          ref={videoRef}
          src="/hero-journey.mp4"
          poster="/hero-journey-poster.jpg"
          className="h-full w-full object-cover object-[45%_50%]"
          muted
          playsInline
          preload="auto"
          aria-label={t.videoAria}
        />
      </div>

      {/* legibility scrim on the text side */}
      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060d16]/85 via-[#060d16]/25 to-transparent"
      />
      {/* bottom grade for the rail + cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060d16]/70 to-transparent" />

      {/* film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* stage rail */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-7 md:flex lg:right-12">
        {stages.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => (railEls.current[i] = el)}
            data-active="0"
            className="group flex items-center justify-end gap-3 transition-opacity duration-300 data-[active=0]:opacity-40"
          >
            <span className="text-right text-[9px] font-semibold uppercase tracking-[0.3em] text-white group-data-[active=1]:text-rouge">
              {s.key}
            </span>
            <span className="h-px w-8 bg-white/30 transition-all duration-300 group-data-[active=1]:w-12 group-data-[active=1]:bg-gold" />
          </div>
        ))}
      </div>

      {/* fixed journey mark */}
      <div className="absolute left-6 top-24 z-10 sm:left-10 lg:left-16">
        <p className="eyebrow flex items-center gap-4 !text-rouge">
          <span className="h-px w-10 bg-gold" />
          {t.tagline}
        </p>
      </div>

      {/* stage messages */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {stages.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => (stageEls.current[i] = el)}
            className="absolute left-6 top-1/2 max-w-xl -translate-y-1/2 opacity-0 will-change-transform sm:left-10 lg:left-16"
          >
            <p className="font-display text-[12px] font-bold tracking-[0.3em] text-rouge">
              {s.n} — {s.key}
            </p>
            <h2 className="h-display mt-4 text-[clamp(2.6rem,6.5vw,5.4rem)] text-white [text-shadow:0_2px_36px_rgba(6,13,22,0.55)]">
              {s.title}
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/70 md:text-lg">
              {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* closing CTA on the finished landmark */}
      <div
        ref={ctaRef}
        className="absolute bottom-16 left-6 z-10 flex flex-wrap items-center gap-5 opacity-0 sm:left-10 lg:left-16"
      >
        <MagneticButton href="#projects" variant="gold">
          {t.ctaProjects} <ArrowRight size={15} />
        </MagneticButton>
        <MagneticButton href="#contact" variant="ghost">
          {t.ctaStart}
        </MagneticButton>
      </div>

      {/* scroll cue */}
      <div className="journey-cue absolute bottom-9 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/55">
            {t.scrollCue}
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-4 animate-[cuedrop_1.6s_ease-in-out_infinite] bg-gold" />
          </span>
        </div>
      </div>
    </section>
  );
}
