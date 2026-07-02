import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * About SOCODECO — full-screen cinematic hero: slow-motion engineers on
 * site (Higgsfield film) behind large centered editorial copy.
 */
export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set('.about-stagger', { opacity: 1, y: 0, filter: 'blur(0px)' });
        return;
      }

      /* text rises out of a blur as the section enters */
      gsap.fromTo(
        '.about-stagger',
        { opacity: 0, y: 46, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 62%', once: true },
        },
      );

      /* endless slow zoom on the film */
      gsap.fromTo(
        '.about-video',
        { scale: 1 },
        { scale: 1.1, duration: 22, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      );

      /* parallax while scrolling through */
      gsap.fromTo(
        '.about-media',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      );
      gsap.to('.about-copy', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.7 },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-navydeep"
    >
      {/* film */}
      <div className="about-media absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <video
          className="about-video h-full w-full object-cover will-change-transform"
          src="/about-hero.mp4"
          poster="/about-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Engineers walking through an active SOCODECO construction site at sunrise"
        />
      </div>

      {/* 35% dark gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navydeep/50 via-navydeep/35 to-navydeep/60" />

      {/* centered content */}
      <div className="about-copy relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-36 text-center">
        <p className="about-stagger inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold backdrop-blur-md">
          About SOCODECO
        </p>

        <h2 className="about-stagger h-display mt-10 text-[clamp(2.6rem,6.4vw,5.6rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]">
          Building{' '}
          <span className="font-serif italic font-normal text-gold">Excellence</span>
          <br />
          Since 1989
        </h2>

        <p className="about-stagger mt-9 max-w-2xl text-[15.5px] leading-[1.9] text-white/70 md:text-[17px]">
          For more than 37 years, SOCODECO has delivered exceptional construction projects across
          the Democratic Republic of Congo. From concept to completion, we combine engineering
          expertise, innovation and uncompromising quality to build landmarks that stand the test
          of time.
        </p>

        <div className="about-stagger mt-12 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href="/#projects" variant="gold">
            Discover Our Projects <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Contact Our Team
          </MagneticButton>
        </div>
      </div>

      {/* bottom hairline transition into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
