import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NUMBERS = [
  { value: 37, format: 'plain', suffix: '+', label: 'Years building the DRC' },
  { value: 50, format: 'plain', suffix: '+', label: 'Projects delivered' },
  { value: 1_000_000, format: 'compact', suffix: '+', label: 'm² built & managed' },
  { value: 15, format: 'plain', suffix: '+', label: 'Engineers & architects' },
  { value: 100, format: 'plain', suffix: '%', label: 'Quality control on every pour' },
];

function fmt(v: number, format: string): string {
  if (format === 'compact') {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v < 10_000_000 ? 0 : 0)}M`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
    return String(Math.round(v));
  }
  return Math.round(v).toLocaleString('en-US');
}

export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.num-val').forEach((el) => {
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
    <section ref={root} className="bp-grid relative border-y border-ink/10 bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">The numbers</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/40">
              Audited on site, not in slides
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-5">
          {NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.06}>
              <div className={`border-l pl-6 ${i === 4 ? 'border-gold' : 'border-ink/12'}`}>
                <p className="font-display text-[clamp(2.6rem,4.6vw,4.4rem)] font-bold leading-none tracking-tightest">
                  <span className="num-val" data-value={n.value} data-format={n.format}>
                    0
                  </span>
                  <span className="text-golddeep">{n.suffix}</span>
                </p>
                <p className="mt-4 max-w-[190px] text-[13px] font-medium leading-snug text-ink/55">
                  {n.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
