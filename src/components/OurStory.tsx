import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Our Story — two-column luxury editorial: architectural photograph slides
 * in from the left, typography fades in from the right.
 */
export default function OurStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(['.story-img', '.story-text'], { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        '.story-img',
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 68%', once: true },
        },
      );
      gsap.fromTo(
        '.story-text',
        { opacity: 0, x: 44 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 62%', once: true },
        },
      );
      /* gentle parallax inside the image frame */
      gsap.fromTo(
        '.story-img img',
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="story" ref={root} className="bg-paper py-32 lg:py-44">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
        {/* photograph */}
        <div className="story-img lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(11,27,43,0.35)]">
            <img
              src="/our-story.jpg"
              alt="Completed SOCODECO office building in Kinshasa — precast concrete facade with gold anodized fins at golden hour"
              className="h-[480px] w-full object-cover lg:h-[660px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navydeep/30 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">
              Delivered by SOCODECO — Kinshasa
            </p>
          </div>
        </div>

        {/* typography */}
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="story-text eyebrow mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            Who we are
          </p>
          <h2 className="story-text h-display text-[clamp(2.2rem,4vw,3.6rem)]">
            Building the Future with{' '}
            <span className="font-serif italic font-normal text-golddeep">Precision</span> and
            Trust
          </h2>
          <div className="story-text mt-9 space-y-6 text-[15.5px] leading-[1.9] text-ink/60 md:text-base">
            <p>
              SOCODECO is one of the leading general construction companies in the Democratic
              Republic of Congo. For over three decades, we have successfully delivered
              residential, commercial, industrial and institutional developments through
              engineering excellence and uncompromising quality.
            </p>
            <p>
              Every project reflects our commitment to innovation, precision and long term value.
            </p>
          </div>
          <div className="story-text mt-11 flex items-center gap-5 border-t border-ink/10 pt-8">
            <span className="grid h-12 w-12 place-items-center bg-gold font-display text-sm font-bold text-ink">
              SO
            </span>
            <div>
              <p className="font-display text-[15px] font-bold tracking-tight">
                Société de Construction et de Développement du Congo
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.24em] text-ink/40">
                Kinshasa — since 1989
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
