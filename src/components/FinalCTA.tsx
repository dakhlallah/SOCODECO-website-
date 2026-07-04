import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useLang } from '../lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const T = {
  fr: {
    eyebrow: 'Démarrer un projet',
    line1: 'Construisez votre',
    line2a: 'prochain ',
    line2accent: "chef-d'œuvre",
    line3: 'avec SOCODECO.',
    ctaTalk: 'Entamons la conversation',
    ctaWrite: 'Écrivez-nous',
    whatsappText: "Bonjour SOCODECO — je souhaite construire un chef-d'œuvre.",
    whatsappLabel: 'WhatsApp — ligne directe avec le bureau',
  },
  en: {
    eyebrow: 'Start a project',
    line1: 'Build your next',
    line2a: '',
    line2accent: 'landmark',
    line3: 'with SOCODECO.',
    ctaTalk: 'Start the conversation',
    ctaWrite: 'Write to us',
    whatsappText: 'Hello SOCODECO — I want to build a landmark.',
    whatsappLabel: 'WhatsApp — direct line to the office',
  },
};

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang];
  const whatsapp = 'https://wa.me/243990000027?text=' + encodeURIComponent(t.whatsappText);

  useGSAP(
    () => {
      gsap.fromTo(
        '.cta-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 62%', once: true },
        },
      );
      gsap.fromTo(
        '.cta-after',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 45%', once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="contact"
      ref={root}
      className="bp-grid-dark relative flex min-h-screen flex-col justify-center bg-[#060d16] py-32 text-white"
    >
      {/* faint gold horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{ background: 'radial-gradient(80% 100% at 50% 100%, rgba(201,169,97,0.14), transparent 70%)' }}
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <p className="eyebrow mb-10 !text-gold">{t.eyebrow}</p>

        <h2 className="h-display text-[clamp(2.6rem,7vw,6.4rem)] text-white">
          <span className="block overflow-hidden">
            <span className="cta-line block">{t.line1}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block">
              {t.line2a}
              <span className="font-serif italic font-normal text-gold">{t.line2accent}</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block">{t.line3}</span>
          </span>
        </h2>

        <div className="cta-after mt-14 flex flex-wrap items-center gap-6">
          <MagneticButton href={whatsapp} variant="gold">
            {t.ctaTalk} <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton href="mailto:info@socodeco.org" variant="ghost">
            {t.ctaWrite}
          </MagneticButton>
        </div>

        <div className="cta-after mt-20 flex flex-wrap gap-x-14 gap-y-6 border-t border-white/10 pt-10">
          <div className="flex items-center gap-4">
            <Phone size={16} className="shrink-0 text-gold" />
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-white/65">
              <a href="tel:+243990000027" className="transition-colors hover:text-white">
                +243 990 000 027
              </a>
              <span className="text-white/25">·</span>
              <a href="tel:+243822666555" className="transition-colors hover:text-white">
                +243 822 666 555
              </a>
              <span className="text-white/25">·</span>
              <a href="tel:+243998420000" className="transition-colors hover:text-white">
                +243 998 420 000
              </a>
            </span>
          </div>
          <a href="mailto:info@socodeco.org" className="group flex items-center gap-4">
            <Mail size={16} className="text-gold" />
            <span className="text-[14px] text-white/65 transition-colors group-hover:text-white">
              info@socodeco.org
            </span>
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
            <MessageCircle size={16} className="text-gold" />
            <span className="text-[14px] text-white/65 transition-colors group-hover:text-white">
              {t.whatsappLabel}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
