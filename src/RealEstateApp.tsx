import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Building2,
  Blocks,
  Hotel,
  Warehouse,
  RefreshCcw,
  MapPin,
  Medal,
  TrendingUp,
  PenTool,
  Eye,
  Handshake,
  Quote,
} from 'lucide-react';

import { setupAnchorNavigation } from './lib/anchors';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import MagneticButton from './components/MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ============================== HERO ============================== */

function REHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.reh-stagger',
        { opacity: 0, y: 44, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.11, ease: 'power3.out', delay: 0.3 },
      );
      if (reduced) return;
      gsap.fromTo('.reh-video', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.to('.reh-media', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-navydeep">
      <div className="reh-media absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <video
          className="reh-video h-full w-full object-cover will-change-transform"
          src="/expertise-realestate.mp4"
          poster="/expertise-realestate.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Drone flyover of a luxury SOCODECO mixed-use development in Kinshasa at sunset"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navydeep/90 via-navydeep/25 to-navydeep/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navydeep/70 via-navydeep/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <p className="reh-stagger eyebrow mb-7 flex items-center gap-4 !text-gold">
          <span className="h-px w-10 bg-gold" />
          Real Estate Development
        </p>
        <h1 className="reh-stagger h-display max-w-4xl text-[clamp(2.6rem,6.2vw,5.4rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]">
          Developing Exceptional{' '}
          <span className="font-serif italic font-normal text-gold">Places</span> for Tomorrow
        </h1>
        <p className="reh-stagger mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/70 md:text-[17px]">
          SOCODECO creates high-quality residential, commercial and mixed-use developments that
          combine innovative architecture, engineering excellence and long-term value for
          investors, businesses and communities across the Democratic Republic of Congo.
        </p>
        <div className="reh-stagger mt-11 flex flex-wrap items-center gap-5">
          <MagneticButton href="#developments" variant="gold" className="glow-gold group/btn">
            Explore Our Developments
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost" className="group/btn">
            Contact Our Team
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ============================== ABOUT ============================= */

function REAbout() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(['.rea-img', '.rea-text'], { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        '.rea-img',
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 68%', once: true } },
      );
      gsap.fromTo(
        '.rea-text',
        { opacity: 0, x: 44 },
        { opacity: 1, x: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 62%', once: true } },
      );
      gsap.fromTo(
        '.rea-img img',
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper py-32 lg:py-44">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="rea-img lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(11,27,43,0.35)]">
            <img
              src="/realestate-about.jpg"
              alt="Completed SOCODECO residential development in Kinshasa with landscaped courtyard"
              className="h-[480px] w-full object-cover lg:h-[660px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navydeep/30 via-transparent to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="rea-text eyebrow mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            About our developments
          </p>
          <h2 className="rea-text h-display text-[clamp(2.2rem,4vw,3.6rem)]">
            Creating Sustainable{' '}
            <span className="font-serif italic font-normal text-golddeep">Communities</span>
          </h2>
          <div className="rea-text mt-9 space-y-6 text-[15.5px] leading-[1.9] text-ink/60 md:text-base">
            <p>
              SOCODECO develops real estate projects that redefine modern living and working
              environments. Every development is carefully planned to deliver architectural
              excellence, functional spaces and long-term investment value.
            </p>
            <p>
              From concept and land acquisition to construction and final delivery, we manage
              every phase with precision and transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================== DEVELOPMENTS ========================== */

const DEVELOPMENTS = [
  { icon: Home, title: 'Luxury Residential', text: 'Modern apartment towers and villas.' },
  { icon: Building2, title: 'Commercial Buildings', text: 'Office towers and business centers.' },
  { icon: Blocks, title: 'Mixed-Use Developments', text: 'Integrated residential, retail and office projects.' },
  { icon: Hotel, title: 'Hospitality', text: 'Hotels and serviced apartments.' },
  { icon: Warehouse, title: 'Industrial Parks', text: 'Warehouses and logistics facilities.' },
  { icon: RefreshCcw, title: 'Urban Regeneration', text: 'Redevelopment and modernization projects.' },
];

function REDevelopments() {
  return (
    <section id="developments" className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">Our developments</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Every asset class,{' '}
            <span className="font-serif italic font-normal text-golddeep">mastered.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEVELOPMENTS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-10 shadow-[0_4px_30px_rgba(11,27,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(11,27,43,0.25)]">
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <span className="mb-8 inline-grid h-14 w-14 place-items-center rounded-full bg-mist text-ink transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold">
                  <d.icon size={22} strokeWidth={1.6} className="transition-transform duration-500 group-hover:scale-110" />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight lg:text-2xl">{d.title}</h3>
                <p className="mt-3.5 text-[14px] leading-relaxed text-ink/55">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PROCESS ============================= */

const STEPS = [
  { n: '01', title: 'Site Selection' },
  { n: '02', title: 'Planning & Feasibility' },
  { n: '03', title: 'Architectural Design' },
  { n: '04', title: 'Construction' },
  { n: '05', title: 'Sales & Delivery' },
  { n: '06', title: 'Property Management' },
];

function REProcess() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set('.rep-fill', { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        '.rep-fill',
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>('.rep-step').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 68%', once: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bp-grid-dark bg-navydeep py-32 text-white lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-gold">Development process</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-24 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
            From land to{' '}
            <span className="font-serif italic font-normal text-gold">lasting value.</span>
          </h2>
        </Reveal>

        <div className="relative mb-12 hidden h-px w-full bg-white/12 lg:block">
          <div className="rep-fill absolute inset-0 bg-gold" />
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="rep-step relative">
              <span className="absolute -top-[3.4rem] left-0 hidden h-3 w-3 rounded-full border-2 border-gold bg-navydeep lg:block" />
              <p className="font-display text-[13px] font-bold tracking-[0.22em] text-gold">{s.n}</p>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight lg:text-xl">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== FEATURED PROJECTS ======================= */

const PROJECTS = [
  { name: 'Gombe Riverside Tower', location: 'Gombe, Kinshasa', type: 'Mixed-use', units: '86 units', status: 'Under construction', img: '/hero-construction.jpg', tall: true },
  { name: 'Coin Marais Residences', location: 'Barumbu, Kinshasa', type: 'Residential', units: '48 units', status: 'Delivered · Fully let', img: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1400', tall: false },
  { name: 'Riverside Headquarters', location: 'Kinshasa', type: 'Commercial', units: '12,000 m² offices', status: 'Delivered', img: '/our-story.jpg', tall: true },
  { name: 'SCDC Tower', location: 'Gombe, Kinshasa', type: 'Offices & retail', units: '60 suites', status: 'Delivered', img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400', tall: false },
  { name: 'Jakarta Commercial Center', location: 'Kinshasa', type: 'Retail', units: '60 shops', status: 'Delivered', img: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1400', tall: false },
  { name: 'Kangayani Complex', location: 'Kinshasa', type: 'Mixed-use', units: '120 units', status: 'In design', img: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1400', tall: true },
];

function REProjects() {
  return (
    <section className="bg-paper py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">Featured projects</p>
        </Reveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Addresses that{' '}
              <span className="font-serif italic font-normal text-golddeep">appreciate.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <a href="/#projects" className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-golddeep">
              Full portfolio
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.07}>
              <a href="#contact" className="group relative block overflow-hidden rounded-2xl">
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
                    {p.location} · <span className="text-gold">{p.type}</span> · {p.units}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold/90">{p.status}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== WHY INVEST ============================== */

const WHY = [
  { icon: MapPin, title: 'Prime Locations', text: 'Sites selected on real demand, access and long-term neighborhood value.' },
  { icon: Medal, title: 'High Construction Standards', text: 'Developed and built by the same house — no gap between promise and pour.' },
  { icon: TrendingUp, title: 'Long-Term Investment Value', text: 'Assets designed to hold value and yield for decades, not cycles.' },
  { icon: PenTool, title: 'Innovative Design', text: 'Architecture that differentiates your asset on the skyline and the market.' },
  { icon: Eye, title: 'Transparent Project Management', text: 'Open books, verifiable milestones and a single point of accountability.' },
  { icon: Handshake, title: 'Trusted Reputation', text: '37+ years of delivered promises across the DRC.' },
];

function REWhy() {
  return (
    <section className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">Why invest with SOCODECO</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Where serious capital feels{' '}
            <span className="font-serif italic font-normal text-golddeep">at home.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-ink/8 bg-white/60 p-9 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white hover:shadow-[0_20px_50px_-16px_rgba(11,27,43,0.2)]">
                <span className="mb-7 inline-grid h-12 w-12 place-items-center rounded-full bg-navy text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <w.icon size={19} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight lg:text-xl">{w.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/55">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== INVESTMENT FILM ========================= */

function REFilm() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.ref-video',
        { scale: 1.16 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
      );
      gsap.fromTo(
        '.ref-caption',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 55%', once: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[88vh] w-full overflow-hidden bg-navydeep">
      <video
        className="ref-video absolute inset-0 h-full w-full object-cover will-change-transform"
        src="/realestate-invest.mp4"
        poster="/realestate-invest.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Evening drone film over an illuminated SOCODECO development in Kinshasa"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-navydeep/10 to-navydeep/30" />
      <div className="ref-caption absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8 px-6 pb-14 sm:px-10 lg:px-16">
          <h2 className="h-display max-w-2xl text-[clamp(1.9rem,4vw,3.4rem)] text-white">
            Places people are proud to{' '}
            <span className="font-serif italic font-normal text-gold">call theirs.</span>
          </h2>
          <p className="max-w-xs pb-2 text-[14px] leading-relaxed text-white/60">
            Evenings in a SOCODECO development — lit, landscaped and lived in, above the
            Kinshasa skyline.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================ STATISTICS ========================== */

const STATS = [
  { value: 37, format: 'plain', suffix: '+', label: 'Years of Experience' },
  { value: 500, format: 'plain', suffix: '+', label: 'Completed Projects' },
  { value: 1_000_000, format: 'compact', suffix: '+', label: 'Square Meters Developed' },
  { value: 100, format: 'plain', suffix: '%', label: 'Commitment to Quality' },
];

function fmt(v: number, format: string): string {
  if (format === 'compact') {
    if (v >= 1_000_000) return `${Math.round(v / 1_000_000)}M`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  }
  return Math.round(v).toLocaleString('en-US');
}

function REStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.res-val').forEach((el) => {
        const target = Number(el.dataset.value);
        const format = el.dataset.format || 'plain';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = fmt(obj.v, format);
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
            <Reveal key={n.label} delay={i * 0.06}>
              <div className="border-l border-ink/12 pl-6">
                <p className="font-display text-[clamp(2.6rem,4.6vw,4.4rem)] font-bold leading-none tracking-tightest">
                  <span className="res-val" data-value={n.value} data-format={n.format}>0</span>
                  <span className="text-golddeep">{n.suffix}</span>
                </p>
                <p className="mt-4 max-w-[200px] text-[13px] font-medium leading-snug text-ink/55">{n.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================== TESTIMONIALS ========================== */

const TESTIMONIALS = [
  {
    quote:
      'We bought two floors off-plan in a SOCODECO tower. Delivery was on the promised date, and the finish matched the showroom exactly. In Kinshasa, that is rare — and priceless.',
    name: 'Patrick M.',
    role: 'Private investor — Gombe',
  },
  {
    quote:
      'Our headquarters was developed, built and is now managed by the same team. One phone number for eight years. That continuity is why we keep expanding with them.',
    name: 'Chantal K.',
    role: 'Managing Director — logistics group',
  },
  {
    quote:
      "As a homeowner, what convinced me was the transparency: monthly reports, real photos, real dates. We received our keys early and the courtyard is even better than the renders.",
    name: 'Jonathan & Grace L.',
    role: 'Homeowners — Coin Marais Residences',
  },
  {
    quote:
      'SOCODECO understands institutional investors. Clean titles, audited costs, verifiable milestones — our board approved the second phase without a single reservation.',
    name: 'Rachid B.',
    role: 'Investment fund partner',
  },
];

function RETestimonials() {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="bg-navy py-32 text-white lg:py-40"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow mb-8 !text-gold">Client testimonials</p>
              <h2 className="h-display max-w-xl text-[clamp(2rem,3.8vw,3.2rem)] text-white">
                Trusted by the people who{' '}
                <span className="font-serif italic font-normal text-gold">live it.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-3">
              <button
                aria-label="Previous testimonial"
                onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/70 transition-all hover:border-gold hover:text-gold"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/70 transition-all hover:border-gold hover:text-gold"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="relative min-h-[240px] max-w-4xl overflow-hidden md:min-h-[210px]">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: `translateX(${(i - idx) * 40}px)`,
                  pointerEvents: i === idx ? 'auto' : 'none',
                }}
              >
                <Quote size={26} className="mb-6 text-gold" />
                <blockquote className="max-w-3xl font-display text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium leading-snug tracking-tight text-white/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-[15px] font-bold text-gold">{t.name}</p>
                  <p className="mt-0.5 text-[12px] uppercase tracking-[0.2em] text-white/40">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-400 ${i === idx ? 'w-10 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================== CTA ============================== */

function RECTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.recta-bg',
        { yPercent: -8, scale: 1.08 },
        { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative flex min-h-[92vh] items-center overflow-hidden bg-navydeep">
      <img
        src="/realestate-cta.jpg"
        alt="Illuminated SOCODECO mixed-use development in Kinshasa at blue hour, aerial view"
        className="recta-bg absolute inset-0 h-full w-full object-cover will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navydeep/85 via-navydeep/50 to-navydeep/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-gold">Partner with us</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display max-w-3xl text-[clamp(2.4rem,5.6vw,5rem)] text-white">
            Invest in the Future with{' '}
            <span className="font-serif italic font-normal text-gold">SOCODECO</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/65 md:text-base">
            Whether you are looking to develop, invest or acquire premium real estate, SOCODECO
            delivers projects that combine quality, innovation and long-term value.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <MagneticButton
              href={'https://wa.me/243990000027?text=' + encodeURIComponent('Hello SOCODECO — I would like information about your real estate developments.')}
              variant="gold"
              className="glow-gold group/btn"
            >
              Request Information
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </MagneticButton>
            <MagneticButton href="mailto:contact@socodeco.org" variant="ghost" className="group/btn">
              Contact Our Experts
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== APP ============================== */

export default function RealEstateApp() {
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
    <>
      <Navbar variant="page" />
      <main>
        <REHero />
        <REAbout />
        <REDevelopments />
        <REProcess />
        <REProjects />
        <REWhy />
        <REFilm />
        <REStats />
        <RETestimonials />
        <RECTA />
      </main>
      <Footer />
    </>
  );
}
