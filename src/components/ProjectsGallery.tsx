import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';
import { useLang } from '../lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROJECT_MEDIA = [
  { name: 'Gombe Riverside Tower', location: 'Gombe, Kinshasa', year: '2026', img: '/hero-construction.jpg' },
  {
    name: 'SCDC Tower',
    location: 'Gombe, Kinshasa',
    year: '2024',
    img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800',
  },
  {
    name: 'Coin Marais Residences',
    location: 'Barumbu, Kinshasa',
    year: '2022',
    img: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1800',
  },
  {
    name: 'Jakarta Commercial Center',
    location: 'Kinshasa',
    year: '2020',
    img: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1800',
  },
  {
    name: 'Kangayani Complex',
    location: 'Kinshasa',
    year: '2027',
    img: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1800',
  },
];

const T = {
  fr: {
    eyebrow: 'Projets signature',
    headA: 'Un musée de ',
    accent: "chefs-d'œuvre.",
    note: 'Faites défiler — la galerie se déplace latéralement',
    details: [
      { surface: '18 400 m²', status: 'En construction' },
      { surface: '14 800 m²', status: 'Livré' },
      { surface: '9 200 m²', status: 'Livré · Entièrement loué' },
      { surface: '6 400 m²', status: 'Livré · 60 boutiques' },
      { surface: '11 600 m²', status: 'En conception' },
    ],
    endA: 'Votre projet',
    endAccent: 'pourrait être le prochain.',
    endCta: 'Entamons la conversation →',
  },
  en: {
    eyebrow: 'Signature projects',
    headA: 'A museum of ',
    accent: 'landmarks.',
    note: 'Scroll — the gallery moves sideways',
    details: [
      { surface: '18,400 m²', status: 'Under construction' },
      { surface: '14,800 m²', status: 'Delivered' },
      { surface: '9,200 m²', status: 'Delivered · Fully let' },
      { surface: '6,400 m²', status: 'Delivered · 60 shops' },
      { surface: '11,600 m²', status: 'In design' },
    ],
    endA: 'Your project',
    endAccent: 'could be next.',
    endCta: 'Start the conversation →',
  },
};

export default function ProjectsGallery() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = T[lang];
  const projects = PROJECT_MEDIA.map((p, i) => ({ ...p, ...t.details[i] }));

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const track = trackRef.current!;
      if (reduced) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} className="overflow-hidden bg-mist">
      <div className="flex h-auto flex-col justify-center py-24 md:h-screen md:py-0">
        <div className="mx-auto mb-12 w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
          <Reveal>
            <p className="eyebrow mb-6">{t.eyebrow}</p>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={0.08}>
              <h2 className="h-display max-w-2xl text-[clamp(2rem,4vw,3.4rem)]">
                {t.headA}
                <span className="font-serif italic font-normal text-golddeep">{t.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="hidden pb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/40 md:block">
                {t.note}
              </p>
            </Reveal>
          </div>
        </div>

        {/* horizontal track */}
        <div
          ref={trackRef}
          className="flex flex-col gap-14 px-6 will-change-transform sm:px-10 md:flex-row md:gap-10 md:pl-[8vw] md:pr-[12vw] lg:pl-16"
        >
          {projects.map((p, i) => (
            <article key={p.name} className="w-full shrink-0 md:w-[58vw] lg:w-[48vw]">
              <a href="#contact" className="group block">
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.location}`}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className="h-[46vh] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05] md:h-[52vh]"
                  />
                  <span className="absolute left-5 top-5 font-display text-[12px] font-bold tracking-[0.22em] text-white/90 drop-shadow">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute inset-0 bg-navy/0 transition-colors duration-700 group-hover:bg-navy/15" />
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-ink/12 pt-4">
                  <h3 className="font-display text-xl font-bold tracking-tight lg:text-2xl">{p.name}</h3>
                  <div className="flex flex-wrap gap-x-7 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">
                    <span>{p.location}</span>
                    <span>{p.surface}</span>
                    <span className="text-golddeep">{p.status}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}

          {/* end card */}
          <div className="flex w-full shrink-0 items-center md:w-[26vw]">
            <a href="#contact" className="group">
              <p className="h-display text-[clamp(1.6rem,2.6vw,2.4rem)] text-ink/80">
                {t.endA}
                <br />
                <span className="font-serif italic font-normal text-golddeep">{t.endAccent}</span>
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition-colors group-hover:text-golddeep">
                {t.endCta}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
