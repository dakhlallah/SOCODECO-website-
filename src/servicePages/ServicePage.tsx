import { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowRight, Award, BadgeCheck, Clock4, ShieldCheck, Wrench, HardHat } from 'lucide-react';

import { setupAnchorNavigation } from '../lib/anchors';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ServiceConfig {
  label: string;
  title: string;
  accent: string; // word rendered in gold serif italic inside the title
  subtitle: string;
  heroVideo: string;
  heroPoster: string;
  introHeading: string;
  introAccent: string;
  introText: string[];
  introImg: string;
  introImgAlt: string;
  services: { icon: LucideIcon; title: string; text: string }[];
  steps: { n: string; title: string }[];
  filmVideo: string;
  filmPoster: string;
  filmHeading: string;
  filmAccent: string;
  filmText: string;
  ctaBg: string;
}

const WHY = [
  { icon: Award, title: '37+ Years Experience', text: 'Building the DRC since 1989 — and still standing behind every structure.' },
  { icon: BadgeCheck, title: 'Certified Engineers', text: 'Qualified Congolese and Lebanese professionals on every project phase.' },
  { icon: Clock4, title: 'On-Time Delivery', text: 'Realistic schedules we actually keep — written into our own contracts.' },
  { icon: ShieldCheck, title: 'Quality Assurance', text: 'Every deliverable checked, inspected and signed before the next step.' },
  { icon: Wrench, title: 'Modern Tools & Methods', text: 'BIM, modern equipment and international working standards.' },
  { icon: HardHat, title: 'Safety First', text: 'Zero-incident policy enforced on every site — no exceptions.' },
];

/** Renders `title` with `accent` styled in gold serif italic. */
function AccentTitle({ title, accent, className }: { title: string; accent: string; className: string }) {
  const i = title.indexOf(accent);
  if (i === -1) return <h1 className={className}>{title}</h1>;
  return (
    <h1 className={className}>
      {title.slice(0, i)}
      <span className="font-serif italic font-normal text-gold">{accent}</span>
      {title.slice(i + accent.length)}
    </h1>
  );
}

export default function ServiceApp({ config: c }: { config: ServiceConfig }) {
  const root = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.sp-stagger',
        { opacity: 0, y: 44, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.11, ease: 'power3.out', delay: 0.3 },
      );
      if (reduced) {
        gsap.set(['.sp-img', '.sp-text'], { opacity: 1, x: 0 });
        gsap.set('.sp-fill', { scaleX: 1 });
        return;
      }
      gsap.fromTo('.sp-hero-video', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.to('.sp-hero-media', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: '.sp-hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.fromTo('.sp-img', { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: '.sp-intro', start: 'top 68%', once: true } });
      gsap.fromTo('.sp-text', { opacity: 0, x: 44 }, { opacity: 1, x: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.sp-intro', start: 'top 62%', once: true } });
      gsap.fromTo('.sp-img img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.sp-intro', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
      gsap.fromTo('.sp-fill', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.sp-process', start: 'top 70%', end: 'bottom 45%', scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>('.sp-step').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.sp-process', start: 'top 68%', once: true } });
      });
      gsap.fromTo('.sp-film-video', { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.sp-film', start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      gsap.fromTo('.sp-film-caption', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.sp-film', start: 'top 55%', once: true } });
      gsap.fromTo('.sp-cta-bg', { yPercent: -8, scale: 1.08 }, { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.sp-cta', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <Navbar variant="page" />
      <main>
        {/* HERO */}
        <section className="sp-hero relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-navydeep">
          <div className="sp-hero-media absolute -inset-y-[10%] inset-x-0 will-change-transform">
            <video
              className="sp-hero-video h-full w-full object-cover will-change-transform"
              src={c.heroVideo}
              poster={c.heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={c.introImgAlt}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navydeep/90 via-navydeep/25 to-navydeep/45" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navydeep/70 via-navydeep/15 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
            <p className="sp-stagger eyebrow mb-7 flex items-center gap-4 !text-gold">
              <span className="h-px w-10 bg-gold" />
              {c.label}
            </p>
            <AccentTitle
              title={c.title}
              accent={c.accent}
              className="sp-stagger h-display max-w-4xl text-[clamp(2.6rem,6vw,5.2rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]"
            />
            <p className="sp-stagger mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/70 md:text-[17px]">{c.subtitle}</p>
            <div className="sp-stagger mt-11 flex flex-wrap items-center gap-5">
              <MagneticButton href="#contact" variant="gold" className="glow-gold group/btn">
                Start a Project
                <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </MagneticButton>
              <MagneticButton href="/#projects" variant="ghost" className="group/btn">
                View Our Projects
                <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="sp-intro bg-paper py-32 lg:py-44">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
            <div className="sp-img lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(11,27,43,0.35)]">
                <img src={c.introImg} alt={c.introImgAlt} className="h-[440px] w-full object-cover lg:h-[620px]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navydeep/30 via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="sp-text eyebrow mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                {c.label}
              </p>
              <h2 className="sp-text h-display text-[clamp(2.2rem,4vw,3.6rem)]">
                {c.introHeading}{' '}
                <span className="font-serif italic font-normal text-golddeep">{c.introAccent}</span>
              </h2>
              <div className="sp-text mt-9 space-y-6 text-[15.5px] leading-[1.9] text-ink/60 md:text-base">
                {c.introText.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-mist py-32 lg:py-44">
          <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <p className="eyebrow mb-8">What we deliver</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
                Six capabilities, one{' '}
                <span className="font-serif italic font-normal text-golddeep">standard.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {c.services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-10 shadow-[0_4px_30px_rgba(11,27,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(11,27,43,0.25)]">
                    <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="mb-8 inline-grid h-14 w-14 place-items-center rounded-full bg-mist text-ink transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold">
                      <s.icon size={22} strokeWidth={1.6} className="transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight lg:text-2xl">{s.title}</h3>
                    <p className="mt-3.5 text-[14px] leading-relaxed text-ink/55">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="sp-process bp-grid-dark bg-navydeep py-32 text-white lg:py-40">
          <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <p className="eyebrow mb-8 !text-gold">Our process</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-display mb-24 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
                Method before{' '}
                <span className="font-serif italic font-normal text-gold">movement.</span>
              </h2>
            </Reveal>
            <div className="relative mb-12 hidden h-px w-full bg-white/12 lg:block">
              <div className="sp-fill absolute inset-0 bg-gold" />
            </div>
            <div className={`grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-8 ${c.steps.length > 5 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'}`}>
              {c.steps.map((s) => (
                <div key={s.n} className="sp-step relative">
                  <span className="absolute -top-[3.4rem] left-0 hidden h-3 w-3 rounded-full border-2 border-gold bg-navydeep lg:block" />
                  <p className="font-display text-[13px] font-bold tracking-[0.22em] text-gold">{s.n}</p>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight lg:text-xl">{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FILM */}
        <section className="sp-film relative h-[88vh] w-full overflow-hidden bg-navydeep">
          <video
            className="sp-film-video absolute inset-0 h-full w-full object-cover will-change-transform"
            src={c.filmVideo}
            poster={c.filmPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={c.filmText}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-navydeep/10 to-navydeep/30" />
          <div className="sp-film-caption absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8 px-6 pb-14 sm:px-10 lg:px-16">
              <h2 className="h-display max-w-2xl text-[clamp(1.9rem,4vw,3.4rem)] text-white">
                {c.filmHeading}{' '}
                <span className="font-serif italic font-normal text-gold">{c.filmAccent}</span>
              </h2>
              <p className="max-w-xs pb-2 text-[14px] leading-relaxed text-white/60">{c.filmText}</p>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="bg-mist py-32 lg:py-44">
          <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <p className="eyebrow mb-8">Why choose SOCODECO</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
                The partner serious projects{' '}
                <span className="font-serif italic font-normal text-golddeep">choose.</span>
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

        {/* FINAL CTA */}
        <section id="contact" className="sp-cta relative flex min-h-[88vh] items-center overflow-hidden bg-navydeep">
          <img src={c.ctaBg} alt="SOCODECO development in Kinshasa at blue hour" className="sp-cta-bg absolute inset-0 h-full w-full object-cover will-change-transform" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navydeep/85 via-navydeep/50 to-navydeep/20" />
          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 sm:px-10 lg:px-16">
            <Reveal>
              <p className="eyebrow mb-8 !text-gold">{c.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-display max-w-3xl text-[clamp(2.4rem,5.4vw,4.8rem)] text-white">
                Start Your Project with{' '}
                <span className="font-serif italic font-normal text-gold">SOCODECO</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/65 md:text-base">
                Our team is ready to study your needs, guide you clearly and deliver a
                professional solution adapted to your project.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-12">
                <MagneticButton
                  href={'https://wa.me/243990000027?text=' + encodeURIComponent(`Bonjour SOCODECO — je souhaite discuter d'un projet (${c.label}).`)}
                  variant="gold"
                  className="glow-gold group/btn"
                >
                  Contactez-nous maintenant
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
