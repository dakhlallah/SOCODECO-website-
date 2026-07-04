import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  ArrowRight,
  Mountain,
  Layers,
  Building2,
  Frame,
  PanelsTopLeft,
  KeyRound,
  Award,
  BadgeCheck,
  Clock4,
  ShieldCheck,
  Wrench,
  HardHat,
} from 'lucide-react';

import { setupAnchorNavigation } from './lib/anchors';
import { LanguageProvider, useLang } from './lib/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import MagneticButton from './components/MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ========================= TRANSLATIONS ========================== */

const SERVICE_ICONS = [Mountain, Layers, Building2, Frame, PanelsTopLeft, KeyRound];
const WHY_ICONS = [Award, BadgeCheck, Clock4, ShieldCheck, Wrench, HardHat];

const PROJECT_MEDIA: { name: string; location: string; year: string; img: string; tall: boolean; rent?: boolean }[] = [
  { name: 'Gombe Riverside Tower', location: 'Gombe, Kinshasa', year: '2026', img: '/hero-construction.jpg', tall: true },
  { name: 'SCDC Tower', location: 'Gombe, Kinshasa', year: '2026', img: '/scdc-tower.jpg', tall: false },
  { name: 'Quantum Building', location: 'Kinshasa', year: '2022', img: '/quantum-building.jpg', tall: true, rent: true },
  { name: 'Riverside Headquarters', location: 'Kinshasa', year: '2025', img: '/our-story.jpg', tall: false },
  { name: 'Angie Building', location: 'Kinshasa', year: '2020', img: '/angie-building.jpg', tall: false, rent: true },
  { name: 'Marché Jakarta', location: 'Kinshasa', year: '2026', img: '/marche-jakarta.jpg', tall: true, rent: true },
];

const T = {
  fr: {
    hero: {
      eyebrow: 'Construction générale',
      headA: "Bâtir l'avenir avec ",
      accent: 'Précision',
      headB: ' et Excellence',
      text: "SOCODECO livre des solutions de construction complètes, des fondations à la remise finale des clés, en conjuguant expertise d'ingénierie, innovation et qualité sans compromis pour créer des édifices emblématiques à travers la République Démocratique du Congo.",
      ctaQuote: 'Demander un devis',
      ctaProjects: 'Voir nos projets',
      videoAria: 'Chantier de grande hauteur à Kinshasa au coucher du soleil — grues, structure en béton et ingénieurs',
    },
    intro: {
      eyebrow: 'Introduction',
      headA: 'Des solutions de construction ',
      accent: 'complètes',
      text: "Chez SOCODECO, nous gérons chaque étape de la construction avec précision et souci du détail. De la planification et de l'ingénierie structurelle à l'exécution et à la livraison, nous veillons à ce que chaque projet soit réalisé en toute sécurité, avec efficacité et selon les plus hauts standards internationaux.",
      imgAlt: "Tour SOCODECO moderne achevée à Kinshasa à l'heure dorée",
    },
    services: {
      eyebrow: 'Nos services',
      headA: 'Tout ce dont une structure a ',
      accent: 'besoin.',
      items: [
        { title: 'Préparation de site & terrassement', text: 'Défrichage, excavation, compactage et plateformes dimensionnés pour le sol de Kinshasa.' },
        { title: 'Fondations & béton structurel', text: 'Semelles, radiers et noyaux coulés, testés et signés à chaque étape.' },
        { title: 'Structures en béton armé', text: 'Colonnes, poutres et dalles exécutées étage par étage avec un contrôle millimétrique.' },
        { title: 'Charpentes métalliques', text: "Fabrication et montage d'acier structurel pour les grandes portées et la rapidité." },
        { title: 'Enveloppe & façades', text: "Murs-rideaux, panneaux préfabriqués et étanchéité qui définissent l'identité." },
        { title: 'Construction clé en main', text: 'Un contrat, une équipe — du premier plan à la dernière clé.' },
      ],
    },
    process: {
      eyebrow: 'Notre méthode',
      headA: 'Cinq étapes. Une seule ',
      accent: 'signature.',
      steps: ['Planification', 'Ingénierie', 'Construction', 'Contrôle qualité', 'Livraison du projet'],
    },
    projects: {
      eyebrow: 'Projets phares',
      headA: 'Construits pour être ',
      accent: 'mémorables.',
      portfolio: 'Portfolio complet',
      types: ['Mixte', 'Bureaux & commerces', 'Mixte', 'Siège social', 'Résidentiel', 'Commerces'],
      rentCta: 'Louer un espace →',
      rentMsg: 'Bonjour SOCODECO — je souhaite louer un espace au Marché Jakarta.',
    },
    why: {
      eyebrow: 'Pourquoi choisir SOCODECO',
      headA: 'Le partenaire que choisissent les projets ',
      accent: 'sérieux.',
      items: [
        { title: "37+ ans d'expérience", text: 'Nous bâtissons la RDC depuis 1989 — et répondons encore de chaque structure.' },
        { title: 'Ingénieurs certifiés', text: 'Des ingénieurs congolais et libanais qualifiés sur chaque projet, à chaque phase.' },
        { title: 'Livraison dans les délais', text: 'Des plannings réalistes que nous tenons — inscrits dans nos propres contrats.' },
        { title: 'Assurance qualité', text: 'Chaque coulage testé, chaque couche inspectée et signée avant la suivante.' },
        { title: 'Équipements modernes', text: 'Grues, pompes et systèmes de coffrage entretenus au standard international.' },
        { title: "La sécurité d'abord", text: "Politique zéro incident appliquée de l'excavation à la remise des clés — sans exception." },
      ],
    },
    film: {
      headA: 'Du terrain au ',
      accent: "chef-d'œuvre.",
      text: 'Béton, grues et coordination — un seul geste continu de précision, filmé au-dessus de Kinshasa.',
      videoAria: "Film cinématique d'une tour SOCODECO s'élevant d'un terrain vide jusqu'à son achèvement à Kinshasa",
    },
    stats: ["Années d'expérience", 'Projets réalisés', 'Professionnels de la construction', 'Engagement qualité'],
    cta: {
      eyebrow: "Commencez aujourd'hui",
      headA: 'Construisons votre prochain ',
      accent: "chef-d'œuvre",
      text: 'Que vous planifiiez un développement résidentiel, commercial ou industriel, SOCODECO est votre partenaire de construction de confiance, du concept à la livraison.',
      ctaQuote: 'Demander un devis',
      ctaContact: 'Contacter notre équipe',
      whatsapp: 'Bonjour SOCODECO — je souhaite demander un devis pour un projet de construction.',
      imgAlt: "Tour mixte SOCODECO haut de gamme achevée à l'heure bleue à Kinshasa",
    },
  },
  en: {
    hero: {
      eyebrow: 'General Construction',
      headA: 'Building the Future with ',
      accent: 'Precision',
      headB: ' and Excellence',
      text: 'SOCODECO delivers complete construction solutions, from foundations to final handover, combining engineering expertise, innovation and uncompromising quality to create landmarks across the Democratic Republic of Congo.',
      ctaQuote: 'Request a Quote',
      ctaProjects: 'View Our Projects',
      videoAria: 'High-rise construction site in Kinshasa at sunset — cranes, concrete structure and engineers',
    },
    intro: {
      eyebrow: 'Introduction',
      headA: 'Complete Construction ',
      accent: 'Solutions',
      text: 'At SOCODECO, we manage every stage of construction with precision and attention to detail. From planning and structural engineering to execution and project delivery, we ensure every project is completed safely, efficiently and to the highest international standards.',
      imgAlt: 'Completed modern SOCODECO tower in Kinshasa at golden hour',
    },
    services: {
      eyebrow: 'Our services',
      headA: 'Everything a structure ',
      accent: 'needs.',
      items: [
        { title: 'Site Preparation & Earthworks', text: 'Clearing, excavation, compaction and platforms engineered for Kinshasa soil.' },
        { title: 'Foundations & Structural Concrete', text: 'Footings, rafts and cores poured, tested and signed at every stage.' },
        { title: 'Reinforced Concrete Structures', text: 'Columns, beams and slabs executed floor by floor with millimetric control.' },
        { title: 'Steel Structures', text: 'Fabrication and erection of structural steel for long spans and speed.' },
        { title: 'Building Envelope & Facades', text: 'Curtain walls, precast panels and waterproofing that define identity.' },
        { title: 'Turnkey Construction', text: 'One contract, one team — from the first drawing to the last key.' },
      ],
    },
    process: {
      eyebrow: 'Our process',
      headA: 'Five steps. One ',
      accent: 'signature.',
      steps: ['Planning', 'Engineering', 'Construction', 'Quality Control', 'Project Delivery'],
    },
    projects: {
      eyebrow: 'Featured projects',
      headA: 'Built to be ',
      accent: 'remembered.',
      portfolio: 'Full portfolio',
      types: ['Mixed-use', 'Offices & retail', 'Mixed-use', 'Corporate office', 'Residential', 'Retail'],
      rentCta: 'Rent a space →',
      rentMsg: 'Hello SOCODECO — I would like to rent a space at Marché Jakarta.',
    },
    why: {
      eyebrow: 'Why choose SOCODECO',
      headA: 'The partner serious projects ',
      accent: 'choose.',
      items: [
        { title: '37+ Years Experience', text: 'Building the DRC since 1989 — and still standing behind every structure.' },
        { title: 'Certified Engineers', text: 'Qualified Congolese and Lebanese engineers on every project, on every phase.' },
        { title: 'On-Time Delivery', text: 'Realistic schedules we actually keep — written into our own contracts.' },
        { title: 'Quality Assurance', text: 'Every pour tested, every layer inspected and signed before the next one.' },
        { title: 'Modern Equipment', text: 'Cranes, pumps and formwork systems maintained to international standard.' },
        { title: 'Safety First', text: 'Zero-incident policy enforced from excavation to handover — no exceptions.' },
      ],
    },
    film: {
      headA: 'From land to ',
      accent: 'landmark.',
      text: 'Concrete, cranes and coordination — one continuous act of precision, filmed above Kinshasa.',
      videoAria: 'Cinematic film of a SOCODECO tower rising from empty land to completion in Kinshasa',
    },
    stats: ['Years of Experience', 'Completed Projects', 'Construction Professionals', 'Commitment to Quality'],
    cta: {
      eyebrow: 'Start today',
      headA: "Let's Build Your Next ",
      accent: 'Landmark',
      text: 'Whether you are planning a residential, commercial or industrial development, SOCODECO is your trusted construction partner from concept to completion.',
      ctaQuote: 'Request a Quote',
      ctaContact: 'Contact Our Team',
      whatsapp: 'Hello SOCODECO — I would like to request a quote for a construction project.',
      imgAlt: 'Completed premium SOCODECO mixed-use tower at blue hour in Kinshasa',
    },
  },
};

/* ============================== HERO ============================== */

function ConstructionHero() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].hero;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.ch-stagger',
        { opacity: 0, y: 44, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.11, ease: 'power3.out', delay: 0.3 },
      );
      if (reduced) return;
      gsap.fromTo('.ch-video', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.to('.ch-media', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-navydeep">
      <div className="ch-media absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <video
          className="ch-video h-full w-full object-cover will-change-transform"
          src="/expertise-construction.mp4"
          poster="/expertise-construction.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={t.videoAria}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navydeep/90 via-navydeep/25 to-navydeep/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navydeep/70 via-navydeep/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <p className="ch-stagger eyebrow mb-7 flex items-center gap-4 !text-gold">
          <span className="h-px w-10 bg-gold" />
          {t.eyebrow}
        </p>
        <h1 className="ch-stagger h-display max-w-4xl text-[clamp(2.6rem,6.2vw,5.4rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]">
          {t.headA}
          <span className="font-serif italic font-normal text-gold">{t.accent}</span>
          {t.headB}
        </h1>
        <p className="ch-stagger mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/70 md:text-[17px]">
          {t.text}
        </p>
        <div className="ch-stagger mt-11 flex flex-wrap items-center gap-5">
          <MagneticButton href="#contact" variant="gold" className="glow-gold group/btn">
            {t.ctaQuote}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
          <MagneticButton href="/#projects" variant="ghost" className="group/btn">
            {t.ctaProjects}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ========================== INTRODUCTION ========================== */

function ConstructionIntro() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].intro;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(['.ci-img', '.ci-text'], { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        '.ci-img',
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 68%', once: true } },
      );
      gsap.fromTo(
        '.ci-text',
        { opacity: 0, x: 44 },
        { opacity: 1, x: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 62%', once: true } },
      );
      gsap.fromTo(
        '.ci-img img',
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper py-32 lg:py-44">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="ci-img lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(11,27,43,0.35)]">
            <img
              src="/construction-intro.jpg"
              alt={t.imgAlt}
              className="h-[480px] w-full object-cover lg:h-[660px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navydeep/30 via-transparent to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="ci-text eyebrow mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            {t.eyebrow}
          </p>
          <h2 className="ci-text h-display text-[clamp(2.2rem,4vw,3.6rem)]">
            {t.headA}
            <span className="font-serif italic font-normal text-golddeep">{t.accent}</span>
          </h2>
          <p className="ci-text mt-9 text-[15.5px] leading-[1.9] text-ink/60 md:text-base">{t.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ============================ SERVICES ============================ */

function ConstructionServices() {
  const { lang } = useLang();
  const t = T[lang].services;

  return (
    <section className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            {t.headA}
            <span className="font-serif italic font-normal text-golddeep">{t.accent}</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-10 shadow-[0_4px_30px_rgba(11,27,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(11,27,43,0.25)]">
                  {/* gold accent line */}
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="mb-8 inline-grid h-14 w-14 place-items-center rounded-full bg-mist text-ink transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold">
                    <Icon size={22} strokeWidth={1.6} className="transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight lg:text-2xl">{s.title}</h3>
                  <p className="mt-3.5 text-[14px] leading-relaxed text-ink/55">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ PROCESS ============================= */

function ConstructionProcess() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].process;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set('.cp-fill', { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        '.cp-fill',
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>('.cp-step').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.06, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 68%', once: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bp-grid-dark bg-navydeep py-32 text-white lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-gold">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-24 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-gold">{t.accent}</span>
          </h2>
        </Reveal>

        <div className="relative mb-12 hidden h-px w-full bg-white/12 lg:block">
          <div className="cp-fill absolute inset-0 bg-gold" />
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {t.steps.map((title, i) => (
            <div key={i} className="cp-step relative">
              <span className="absolute -top-[3.4rem] left-0 hidden h-3 w-3 rounded-full border-2 border-gold bg-navydeep lg:block" />
              <p className="font-display text-[13px] font-bold tracking-[0.22em] text-gold">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight lg:text-2xl">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== FEATURED PROJECTS ======================= */

function FeaturedProjects() {
  const { lang } = useLang();
  const t = T[lang].projects;
  const projects = PROJECT_MEDIA.map((p, i) => ({ ...p, type: t.types[i] }));
  const rentUrl = '/location.html';

  return (
    <section className="bg-paper py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
              {t.headA}
              <span className="font-serif italic font-normal text-golddeep">{t.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <a href="/#projects" className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-golddeep">
              {t.portfolio}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* masonry */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.07}>
              <a
                href={p.rent ? rentUrl : '#contact'}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.location}`}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.07] ${p.tall ? 'h-[480px]' : 'h-[330px]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-navydeep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-7 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">{p.name}</h3>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                    {p.location} · <span className="text-gold">{p.type}</span> · {p.year}
                  </p>
                  {p.rent && (
                    <p className="mt-3 inline-flex rounded-full bg-gold px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                      {t.rentCta}
                    </p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== WHY CHOOSE SOCODECO ===================== */

function WhyChoose() {
  const { lang } = useLang();
  const t = T[lang].why;

  return (
    <section className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            {t.headA}
            <span className="font-serif italic font-normal text-golddeep">{t.accent}</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-ink/8 bg-white/60 p-9 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white hover:shadow-[0_20px_50px_-16px_rgba(11,27,43,0.2)]">
                  <span className="mb-7 inline-grid h-12 w-12 place-items-center rounded-full bg-navy text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight lg:text-xl">{w.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink/55">{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ======================== CONSTRUCTION FILM ======================= */

function ConstructionFilm() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].film;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.cf-video',
        { scale: 1.16 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
      );
      gsap.fromTo(
        '.cf-caption',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 55%', once: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[88vh] w-full overflow-hidden bg-navydeep">
      <video
        className="cf-video absolute inset-0 h-full w-full object-cover will-change-transform"
        src="/hero-journey.mp4"
        poster="/hero-journey-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t.videoAria}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-navydeep/10 to-navydeep/30" />
      <div className="cf-caption absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8 px-6 pb-14 sm:px-10 lg:px-16">
          <h2 className="h-display max-w-2xl text-[clamp(1.9rem,4vw,3.4rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-gold">{t.accent}</span>
          </h2>
          <p className="max-w-xs pb-2 text-[14px] leading-relaxed text-white/60">{t.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ============================ STATISTICS ========================== */

const STATS = [
  { value: 37, suffix: '+' },
  { value: 500, suffix: '+' },
  { value: 100, suffix: '+' },
  { value: 100, suffix: '%' },
];

function ConstructionStats() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const labels = T[lang].stats;

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.cs-val').forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-US');
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bp-grid border-y border-ink/10 bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {STATS.map((n, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border-l border-ink/12 pl-6">
                <p className="font-display text-[clamp(2.6rem,4.6vw,4.4rem)] font-bold leading-none tracking-tightest">
                  <span className="cs-val" data-value={n.value}>0</span>
                  <span className="text-golddeep">{n.suffix}</span>
                </p>
                <p className="mt-4 max-w-[200px] text-[13px] font-medium leading-snug text-ink/55">{labels[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================== CTA ============================== */

function ConstructionCTA() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].cta;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.cta-bg',
        { yPercent: -8, scale: 1.08 },
        { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative flex min-h-[92vh] items-center overflow-hidden bg-navydeep">
      <img
        src="/construction-cta.jpg"
        alt={t.imgAlt}
        className="cta-bg absolute inset-0 h-full w-full object-cover will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navydeep/85 via-navydeep/50 to-navydeep/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-gold">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display max-w-3xl text-[clamp(2.4rem,5.6vw,5rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-gold">{t.accent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/65 md:text-base">{t.text}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <MagneticButton
              href={'https://wa.me/243990000027?text=' + encodeURIComponent(t.whatsapp)}
              variant="gold"
              className="glow-gold group/btn"
            >
              {t.ctaQuote}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </MagneticButton>
            <MagneticButton href="mailto:info@socodeco.org" variant="ghost" className="group/btn">
              {t.ctaContact}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== APP ============================== */

export default function ConstructionApp() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const cleanupAnchors = setupAnchorNavigation(lenis);

    return () => {
      cleanupAnchors();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider
      title={{
        fr: "Construction générale — SOCODECO | Bâtir l'avenir avec précision",
        en: 'General Construction — SOCODECO | Building the Future with Precision',
      }}
    >
      <Navbar variant="page" />
      <main>
        <ConstructionHero />
        <ConstructionIntro />
        <ConstructionServices />
        <ConstructionProcess />
        <FeaturedProjects />
        <WhyChoose />
        <ConstructionFilm />
        <ConstructionStats />
        <ConstructionCTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
