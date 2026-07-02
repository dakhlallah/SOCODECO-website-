import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VIDEO = 'https://videos.pexels.com/video-files/2835998/2835998-uhd_2560_1440_24fps.mp4';

export default function Drone() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      gsap.fromTo(
        '.drone-video',
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      );
      gsap.fromTo(
        '.drone-caption',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 55%', once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[92vh] w-full overflow-hidden bg-navydeep">
      <video
        className="drone-video absolute inset-0 h-full w-full object-cover will-change-transform"
        src={VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Cinematic aerial footage over a construction site"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-navydeep/10 to-navydeep/30" />

      <div className="drone-caption absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8 px-6 pb-16 sm:px-10 lg:px-16">
          <div>
            <p className="eyebrow mb-5 !text-gold">07 — From above</p>
            <h2 className="h-display max-w-2xl text-[clamp(2rem,4.2vw,3.6rem)] text-white">
              Progress you can see{' '}
              <span className="font-serif italic font-normal text-gold">from the sky.</span>
            </h2>
          </div>
          <p className="max-w-xs pb-2 text-[14px] leading-relaxed text-white/60">
            Every SOCODECO site is documented by drone, weekly. Owners follow their building
            rising without leaving their office.
          </p>
        </div>
      </div>
    </section>
  );
}
