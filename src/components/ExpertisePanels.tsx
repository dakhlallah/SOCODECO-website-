import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { useLang } from '../lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MEDIA = [
  { n: '01', video: '/expertise-construction.mp4', poster: '/expertise-construction.jpg', href: '/construction.html' },
  { n: '02', video: '/expertise-engineering.mp4', poster: '/expertise-engineering.jpg', href: '/engineering.html' },
  { n: '03', video: '/expertise-realestate.mp4', poster: '/expertise-realestate.jpg', href: '/realestate.html' },
  { n: '04', video: '/expertise-management.mp4', poster: '/expertise-management.jpg', href: '/management.html' },
  { n: '05', video: '/expertise-architecture.mp4', poster: '/expertise-architecture.jpg', href: '/architecture.html' },
  { n: '06', video: '/expertise-interior.mp4', poster: '/expertise-interior.jpg', href: '/interior.html' },
];

const T = {
  fr: {
    eyebrow: 'Expertise',
    headA: 'Six disciplines. Un seul nom ',
    accent: 'responsable',
    headB: '.',
    open: (title: string) => `Ouvrir la page ${title}`,
    panels: [
      {
        title: 'Construction générale',
        text: 'Structures de grande hauteur à Kinshasa — fondations, colonnes, dalles et enveloppe, exécutées par nos propres équipes.',
      },
      {
        title: 'Ingénierie',
        text: 'Conception structurelle, électrique et hydraulique adaptée au sol et au réseau de Kinshasa.',
      },
      {
        title: 'Développement immobilier',
        text: 'Foncier, faisabilité, financement et gestion à long terme de notre propre portefeuille.',
      },
      {
        title: 'Gestion de projet',
        text: 'Inspections par drone, réunions de chantier, contrôle qualité et sécurité — une seule équipe responsable sur site.',
      },
      {
        title: 'Architecture',
        text: 'BIM, maquettes physiques et revues de conception — des architectes libanais et congolais qui conçoivent ensemble à Kinshasa.',
      },
      {
        title: 'Finitions intérieures',
        text: 'Marbre, menuiserie, gypse et lumière — un artisanat qui transforme les gros œuvres livrés en intérieurs de luxe.',
      },
    ],
  },
  en: {
    eyebrow: 'Expertise',
    headA: 'Six disciplines. One ',
    accent: 'accountable',
    headB: ' name.',
    open: (title: string) => `Open the ${title} page`,
    panels: [
      {
        title: 'General Construction',
        text: 'High-rise structures in Kinshasa — foundations, columns, slabs and envelope, executed by our own teams.',
      },
      {
        title: 'Engineering',
        text: 'Structural, electrical and hydraulic design adapted to Kinshasa soil and grid.',
      },
      {
        title: 'Real Estate Development',
        text: 'Land, feasibility, financing and long-term management of our own portfolio.',
      },
      {
        title: 'Project Management',
        text: 'Drone inspections, progress meetings, quality and safety control — one accountable team on site.',
      },
      {
        title: 'Architecture',
        text: 'BIM, physical models and design reviews — Lebanese and Congolese architects designing together in Kinshasa.',
      },
      {
        title: 'Interior Finishing',
        text: 'Marble, joinery, gypsum and light — craft that turns delivered shells into luxury interiors.',
      },
    ],
  },
};

type PanelData = (typeof MEDIA)[number] & { title: string; text: string; openLabel: string };

function Panel({ p, active, onActivate }: { p: PanelData; active: boolean; onActivate: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        onActivate();
        videoRef.current?.play().catch(() => {});
      }}
      onClick={() => {
        onActivate();
        videoRef.current?.play().catch(() => {});
      }}
      className={`group relative w-full cursor-pointer overflow-hidden border-b border-white/10 transition-[height] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        active ? 'h-[46vh] min-h-[320px]' : 'h-[15vh] min-h-[104px]'
      }`}
    >
      {/* media — poster paints instantly, film fades over it once playable */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
        <img src={p.poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
          src={p.video}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d16]/85 via-[#060d16]/25 to-[#060d16]/40" />
      </div>

      {/* row content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-end px-6 pb-6 sm:px-10 lg:px-16">
        <div className="flex w-full items-end justify-between gap-6">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className={`font-display text-sm font-bold transition-colors duration-500 ${active ? 'text-gold' : 'text-white/35'}`}>
              {p.n}
            </span>
            <div>
              <h3
                className={`font-display font-bold tracking-tightest transition-all duration-700 ${
                  active ? 'text-[clamp(2rem,4.6vw,4rem)] text-white' : 'text-[clamp(1.5rem,3vw,2.6rem)] text-white/75'
                }`}
              >
                {p.title}
              </h3>
              <p
                className={`max-w-lg text-[14px] leading-relaxed text-white/60 transition-all duration-500 ${
                  active ? 'mt-3 h-auto opacity-100' : 'mt-0 h-0 overflow-hidden opacity-0'
                }`}
              >
                {p.text}
              </p>
            </div>
          </div>
          {p.href ? (
            <a
              href={p.href}
              aria-label={p.openLabel}
              className={`mb-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500 hover:scale-110 ${
                active ? 'border-gold bg-gold text-ink' : 'border-white/20 text-white/50'
              }`}
            >
              <ArrowUpRight size={17} />
            </a>
          ) : (
            <span
              className={`mb-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                active ? 'border-gold bg-gold text-ink' : 'border-white/20 text-white/50'
              }`}
            >
              <ArrowUpRight size={17} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExpertisePanels() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang];
  const panels: PanelData[] = MEDIA.map((m, i) => ({
    ...m,
    title: t.panels[i].title,
    text: t.panels[i].text,
    openLabel: t.open(t.panels[i].title),
  }));

  /* subtle parallax on the section header while scrolling */
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.exp-head',
        { yPercent: 14 },
        {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="services" ref={root} className="bg-[#060d16] py-28 lg:py-36">
      <div className="exp-head mx-auto max-w-[1500px] px-6 will-change-transform sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-gold">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-16 max-w-3xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-gold">{t.accent}</span>
            {t.headB}
          </h2>
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        {panels.map((p, i) => (
          <Panel key={p.n} p={p} active={active === i} onActivate={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}
