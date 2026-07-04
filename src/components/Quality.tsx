import Reveal from './Reveal';
import { useLang } from '../lib/i18n';

const T = {
  fr: {
    eyebrow: 'Qualité & contrôle',
    headA: "Rien n'est supposé.",
    headB: 'Tout est ',
    accent: 'vérifié.',
    sub: "La construction sérieuse, c'est de la procédure, de l'inspection et des signatures — répétées jusqu'à ce que le bâtiment soit à vous.",
    badge: 'Politique zéro incident',
    alt1: 'Ingénieurs examinant des plans de structure sur le chantier',
    alt2: 'Ouvrier de chantier avec casque et harnais',
    controls: [
      {
        n: '01',
        title: 'Inspection de chantier',
        text: "L'ingénieur responsable parcourt chaque phase avant sa clôture — ferraillage, coffrage, réseaux, finitions.",
      },
      {
        n: '02',
        title: 'Essais du béton',
        text: 'Affaissement à la livraison, essais sur cubes à 7 et 28 jours, traçabilité signée avant toute mise en charge.',
      },
      {
        n: '03',
        title: 'Contrôle de sécurité',
        text: "Casques, harnais et zones d'exclusion imposés de l'excavation à la remise des clés — visiteurs et direction compris.",
      },
      {
        n: '04',
        title: 'Coordination structurelle',
        text: 'Architecture, structure et réseaux résolus sur le plan — pas improvisés sur la dalle.',
      },
      {
        n: '05',
        title: 'Sélection des matériaux',
        text: "Chaque finition échantillonnée, comparée et approuvée par le maître d'ouvrage avant toute commande.",
      },
    ],
  },
  en: {
    eyebrow: 'Quality & control',
    headA: 'Nothing is assumed.',
    headB: 'Everything is ',
    accent: 'verified.',
    sub: 'Serious construction is procedure, inspection and signature — repeated until the building is yours.',
    badge: 'Zero-incident policy',
    alt1: 'Engineers reviewing structural plans on site',
    alt2: 'Site worker in helmet and harness',
    controls: [
      {
        n: '01',
        title: 'Site inspection',
        text: 'The responsible engineer walks every phase before it closes — reinforcement, formwork, networks, finishes.',
      },
      {
        n: '02',
        title: 'Concrete testing',
        text: 'Slump on delivery, cube tests at 7 and 28 days, signed traceability before any element is loaded.',
      },
      {
        n: '03',
        title: 'Safety control',
        text: 'Helmets, harnesses and exclusion zones enforced from excavation to handover — visitors and management included.',
      },
      {
        n: '04',
        title: 'Structural coordination',
        text: 'Architecture, structure and networks resolved on the drawing — not improvised on the slab.',
      },
      {
        n: '05',
        title: 'Material selection',
        text: 'Every finish sampled, benchmarked and approved by the owner before a single order is placed.',
      },
    ],
  },
};

const IMG =
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600';
const IMG2 =
  'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=1000';

export default function Quality() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section id="quality" className="bp-grid-dark bg-navydeep py-32 text-white lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8 !text-rouge">{t.eyebrow}</p>
        </Reveal>
        <div className="mb-20 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
              {t.headA}
              <br />
              {t.headB}
              <span className="font-serif italic font-normal text-rouge">{t.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-[15px] leading-relaxed text-white/50">{t.sub}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal y={48}>
              <div className="relative">
                <img src={IMG} alt={t.alt1} loading="lazy" className="h-[420px] w-full object-cover lg:h-[560px]" />
                <div className="absolute -bottom-10 -right-4 hidden w-56 border-8 border-navydeep md:block">
                  <img src={IMG2} alt={t.alt2} loading="lazy" className="h-64 w-full object-cover" />
                </div>
                <span className="absolute left-6 top-6 bg-rouge px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white">
                  {t.badge}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {t.controls.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.06}>
                <div className="group flex items-baseline gap-8 border-b border-white/10 py-7 first:border-t">
                  <span className="font-display text-3xl font-bold text-white/15 transition-colors duration-500 group-hover:text-rouge">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight lg:text-2xl">{c.title}</h3>
                    <p className="mt-2.5 max-w-xl text-[14px] leading-[1.8] text-white/45">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
