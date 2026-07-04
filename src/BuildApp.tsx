import { useRef, useState, useEffect, type ChangeEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  ArrowRight,
  Home,
  Building2,
  Briefcase,
  Store,
  Warehouse,
  Blocks,
  Award,
  BadgeCheck,
  Clock4,
  Eye,
  Mail,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

import { setupAnchorNavigation } from './lib/anchors';
import { LanguageProvider, useLang } from './lib/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import MagneticButton from './components/MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = 'info@socodeco.org';
const WHATSAPP = '243990000027';

const TYPE_ICONS = [Home, Building2, Briefcase, Store, Warehouse, Blocks];
const WHY_ICONS = [Award, BadgeCheck, Clock4, Eye];

const T = {
  fr: {
    hero: {
      eyebrow: 'Construire avec SOCODECO',
      headA: 'Construisez votre ',
      accent: 'projet',
      headB: ' avec SOCODECO',
      sub: "Vous avez un terrain ou une idée de projet ? SOCODECO vous accompagne de l'étude à la livraison clé en main.",
      ctaRequest: 'Parlez-nous de votre projet',
      ctaTypes: 'Types de projets',
      videoAria: 'Chantier de construction SOCODECO à Kinshasa — grues et structure en béton au coucher du soleil',
    },
    types: {
      eyebrow: 'Types de projets',
      headA: 'Du plan de la villa au ',
      accent: 'quartier entier.',
      items: [
        { title: 'Villa', text: 'Résidences privées sur mesure — du plan à la remise des clés.' },
        { title: 'Immeuble', text: "Immeubles résidentiels et mixtes en hauteur, structurés pour durer." },
        { title: 'Bureau', text: 'Sièges sociaux et plateaux de bureaux aux standards internationaux.' },
        { title: 'Commerce', text: 'Boutiques, showrooms et centres commerciaux qui attirent.' },
        { title: 'Entrepôt', text: 'Entrepôts et bâtiments logistiques dimensionnés pour votre activité.' },
        { title: 'Projet immobilier', text: 'Développements complets — faisabilité, financement, construction.' },
      ],
    },
    process: {
      eyebrow: 'Notre accompagnement',
      headA: 'Une seule équipe, du premier rendez-vous à la ',
      accent: 'dernière clé.',
      steps: ['Étude', 'Conception', 'Devis', 'Construction', 'Suivi', 'Livraison'],
    },
    why: {
      eyebrow: 'Pourquoi construire avec SOCODECO',
      headA: 'Un chantier sans ',
      accent: 'surprises.',
      items: [
        { title: 'Expertise', text: '37+ ans de construction en RDC — ingénieurs et architectes intégrés.' },
        { title: 'Qualité', text: 'Chaque coulage testé, chaque phase inspectée et signée avant la suivante.' },
        { title: 'Délais', text: 'Des plannings réalistes que nous tenons — inscrits dans nos contrats.' },
        { title: 'Transparence', text: 'Comptes ouverts, rapports réguliers et un interlocuteur unique.' },
      ],
    },
    form: {
      eyebrow: 'Formulaire',
      headA: 'Demande de ',
      accent: 'construction',
      sub: 'Décrivez votre projet — notre équipe technique vous recontacte rapidement avec une première évaluation.',
      labels: {
        nom: 'Nom complet *',
        tel: 'Téléphone *',
        email: 'Email',
        type: 'Type de projet *',
        localisation: 'Localisation du terrain',
        surface: 'Surface du terrain',
        etages: "Nombre d'étages souhaité",
        budget: 'Budget estimatif *',
        date: 'Date souhaitée de démarrage',
        plan: 'Avez-vous déjà un plan ?',
        message: 'Message supplémentaire',
      },
      placeholders: {
        nom: 'ex. Jean Kabasele',
        tel: 'ex. +243 990 000 000',
        email: 'ex. vous@exemple.com',
        type: 'Choisissez un type de projet',
        localisation: 'ex. Gombe, Kinshasa',
        surface: 'ex. 600 m²',
        etages: 'ex. R+3',
        budget: 'ex. 250 000 $',
        message: 'Décrivez votre projet, vos contraintes, vos attentes…',
      },
      typeOptions: ['Villa', 'Immeuble', 'Bureau', 'Boutique', 'Entrepôt', 'Autre'],
      planYes: 'Oui',
      planNo: 'Non',
      errors: {
        nom: 'Veuillez saisir votre nom complet.',
        tel: 'Veuillez saisir votre numéro de téléphone.',
        type: 'Veuillez choisir un type de projet.',
        budget: 'Veuillez indiquer votre budget estimatif.',
      },
      submitEmail: 'Envoyer par Email',
      submitWhatsApp: 'Envoyer par WhatsApp',
      success: "Votre demande est prête — finalisez l'envoi dans l'application qui vient de s'ouvrir.",
      emailSubject: 'Nouvelle demande de construction SOCODECO',
      waIntro: 'Bonjour SOCODECO, je souhaite faire une demande de construction.',
      msgLabels: {
        nom: 'Nom',
        tel: 'Téléphone',
        email: 'Email',
        type: 'Type de projet',
        localisation: 'Localisation du terrain',
        surface: 'Surface du terrain',
        etages: "Nombre d'étages",
        budget: 'Budget estimatif',
        date: 'Date de démarrage',
        plan: 'Plan existant',
        message: 'Message',
      },
    },
    cta: {
      headA: 'Prêt à poser la ',
      accent: 'première pierre ?',
      text: "De l'étude au clé en main, une seule équipe responsable de votre chantier.",
      button: 'Parlez-nous de votre projet',
    },
  },
  en: {
    hero: {
      eyebrow: 'Build with SOCODECO',
      headA: 'Build your ',
      accent: 'project',
      headB: ' with SOCODECO',
      sub: 'You have land or a project idea? SOCODECO supports you from the first study to turnkey delivery.',
      ctaRequest: 'Tell us about your project',
      ctaTypes: 'Project types',
      videoAria: 'SOCODECO construction site in Kinshasa — cranes and concrete structure at sunset',
    },
    types: {
      eyebrow: 'Project types',
      headA: 'From a villa plan to an ',
      accent: 'entire district.',
      items: [
        { title: 'Villa', text: 'Custom private residences — from the plan to the keys.' },
        { title: 'Building', text: 'High-rise residential and mixed-use buildings, structured to last.' },
        { title: 'Office', text: 'Headquarters and office floors built to international standards.' },
        { title: 'Retail', text: 'Shops, showrooms and commercial centers that attract.' },
        { title: 'Warehouse', text: 'Warehouses and logistics buildings sized for your operations.' },
        { title: 'Real estate project', text: 'Complete developments — feasibility, financing, construction.' },
      ],
    },
    process: {
      eyebrow: 'How we support you',
      headA: 'One team, from the first meeting to the ',
      accent: 'last key.',
      steps: ['Study', 'Design', 'Quotation', 'Construction', 'Monitoring', 'Delivery'],
    },
    why: {
      eyebrow: 'Why build with SOCODECO',
      headA: 'A project without ',
      accent: 'surprises.',
      items: [
        { title: 'Expertise', text: '37+ years building the DRC — in-house engineers and architects.' },
        { title: 'Quality', text: 'Every pour tested, every phase inspected and signed before the next.' },
        { title: 'Deadlines', text: 'Realistic schedules we actually keep — written into our contracts.' },
        { title: 'Transparency', text: 'Open books, regular reporting and a single point of contact.' },
      ],
    },
    form: {
      eyebrow: 'Form',
      headA: 'Construction ',
      accent: 'request',
      sub: 'Describe your project — our technical team gets back to you quickly with a first assessment.',
      labels: {
        nom: 'Full name *',
        tel: 'Phone *',
        email: 'Email',
        type: 'Type of project *',
        localisation: 'Land location',
        surface: 'Land surface',
        etages: 'Desired number of floors',
        budget: 'Estimated budget *',
        date: 'Desired start date',
        plan: 'Do you already have a plan?',
        message: 'Additional message',
      },
      placeholders: {
        nom: 'e.g. John Kabasele',
        tel: 'e.g. +243 990 000 000',
        email: 'e.g. you@example.com',
        type: 'Choose a type of project',
        localisation: 'e.g. Gombe, Kinshasa',
        surface: 'e.g. 600 m²',
        etages: 'e.g. G+3',
        budget: 'e.g. $250,000',
        message: 'Describe your project, constraints and expectations…',
      },
      typeOptions: ['Villa', 'Building', 'Office', 'Shop', 'Warehouse', 'Other'],
      planYes: 'Yes',
      planNo: 'No',
      errors: {
        nom: 'Please enter your full name.',
        tel: 'Please enter your phone number.',
        type: 'Please choose a type of project.',
        budget: 'Please indicate your estimated budget.',
      },
      submitEmail: 'Send by Email',
      submitWhatsApp: 'Send by WhatsApp',
      success: 'Your request is ready — finish sending it in the app that just opened.',
      emailSubject: 'New SOCODECO construction request',
      waIntro: 'Hello SOCODECO, I would like to make a construction request.',
      msgLabels: {
        nom: 'Name',
        tel: 'Phone',
        email: 'Email',
        type: 'Type of project',
        localisation: 'Land location',
        surface: 'Land surface',
        etages: 'Number of floors',
        budget: 'Estimated budget',
        date: 'Start date',
        plan: 'Existing plan',
        message: 'Message',
      },
    },
    cta: {
      headA: 'Ready to lay the ',
      accent: 'first stone?',
      text: 'From study to turnkey, one team accountable for your entire project.',
      button: 'Tell us about your project',
    },
  },
};

/* ============================== HERO ============================== */

function BuildHero() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].hero;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.build-stagger',
        { opacity: 0, y: 44, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.11, ease: 'power3.out', delay: 0.3 },
      );
      if (reduced) return;
      gsap.fromTo('.build-video', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.to('.build-media', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-navydeep">
      <div className="build-media absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <video
          className="build-video h-full w-full object-cover will-change-transform"
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
        <p className="build-stagger eyebrow mb-7 flex items-center gap-4 !text-rouge">
          <span className="h-px w-10 bg-gold" />
          {t.eyebrow}
        </p>
        <h1 className="build-stagger h-display max-w-4xl text-[clamp(2.4rem,5.8vw,5rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]">
          {t.headA}
          <span className="font-serif italic font-normal text-rouge">{t.accent}</span>
          {t.headB}
        </h1>
        <p className="build-stagger mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/70 md:text-[17px]">{t.sub}</p>
        <div className="build-stagger mt-11 flex flex-wrap items-center gap-5">
          <MagneticButton href="#demande" variant="gold" className="glow-gold group/btn">
            {t.ctaRequest}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
          <MagneticButton href="#types" variant="ghost" className="group/btn">
            {t.ctaTypes}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ========================== PROJECT TYPES ========================= */

function ProjectTypes() {
  const { lang } = useLang();
  const t = T[lang].types;

  return (
    <section id="types" className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            {t.headA}
            <span className="font-serif italic font-normal text-rougedeep">{t.accent}</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, i) => {
            const Icon = TYPE_ICONS[i];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-10 shadow-[0_4px_30px_rgba(11,27,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(11,27,43,0.25)]">
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

function BuildProcess() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].process;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set('.bp-fill', { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        '.bp-fill',
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>('.bp-step').forEach((el, i) => {
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
          <p className="eyebrow mb-8 !text-rouge">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-24 max-w-3xl text-[clamp(2.2rem,4.4vw,3.8rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-rouge">{t.accent}</span>
          </h2>
        </Reveal>

        <div className="relative mb-12 hidden h-px w-full bg-white/12 lg:block">
          <div className="bp-fill absolute inset-0 bg-gold" />
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {t.steps.map((title, i) => (
            <div key={i} className="bp-step relative">
              <span className="absolute -top-[3.4rem] left-0 hidden h-3 w-3 rounded-full border-2 border-gold bg-navydeep lg:block" />
              <p className="font-display text-[13px] font-bold tracking-[0.22em] text-rouge">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight lg:text-xl">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== WHY =============================== */

function BuildWhy() {
  const { lang } = useLang();
  const t = T[lang].why;

  return (
    <section className="bg-paper py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display mb-20 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)]">
            {t.headA}
            <span className="font-serif italic font-normal text-rougedeep">{t.accent}</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <Reveal key={i} delay={(i % 4) * 0.08}>
                <div className="group h-full rounded-2xl border border-ink/8 bg-white/60 p-9 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white hover:shadow-[0_20px_50px_-16px_rgba(11,27,43,0.2)]">
                  <span className="mb-7 inline-grid h-12 w-12 place-items-center rounded-full bg-navy text-rouge transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
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

/* ============================== FORM ============================== */

const inputCls = (error: boolean) =>
  `w-full rounded-xl border bg-white px-5 py-3.5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:ring-4 ${
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15'
      : 'border-ink/15 focus:border-gold focus:ring-gold/15'
  }`;

function BuildForm() {
  const { lang } = useLang();
  const t = T[lang].form;

  const [form, setForm] = useState({
    nom: '',
    tel: '',
    email: '',
    type: '',
    localisation: '',
    surface: '',
    etages: '',
    budget: '',
    date: '',
    plan: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const successTimer = useRef<number>();

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const validate = () => {
    const er = {
      nom: !form.nom.trim(),
      tel: !form.tel.trim(),
      type: !form.type,
      budget: !form.budget.trim(),
    };
    setErrors(er);
    if (Object.values(er).some(Boolean)) {
      document.getElementById('demande')?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const buildLines = () => {
    const m = t.msgLabels;
    const planLabel = form.plan === 'oui' ? t.planYes : form.plan === 'non' ? t.planNo : '—';
    return [
      `${m.nom}: ${form.nom.trim() || '—'}`,
      `${m.tel}: ${form.tel.trim() || '—'}`,
      `${m.email}: ${form.email.trim() || '—'}`,
      `${m.type}: ${form.type || '—'}`,
      `${m.localisation}: ${form.localisation.trim() || '—'}`,
      `${m.surface}: ${form.surface.trim() || '—'}`,
      `${m.etages}: ${form.etages.trim() || '—'}`,
      `${m.budget}: ${form.budget.trim() || '—'}`,
      `${m.date}: ${form.date || '—'}`,
      `${m.plan}: ${planLabel}`,
      `${m.message}: ${form.message.trim() || '—'}`,
    ];
  };

  const showSuccess = () => {
    setSuccess(true);
    window.clearTimeout(successTimer.current);
    successTimer.current = window.setTimeout(() => setSuccess(false), 8000);
  };

  const sendEmail = () => {
    if (!validate()) return;
    const body = `${t.emailSubject}\n\n${buildLines().join('\n')}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(body)}`;
    showSuccess();
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const msg = `${t.waIntro}\n\n${buildLines().join('\n')}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    showSuccess();
  };

  const err = (k: string, msg: string) =>
    errors[k] ? <p className="mt-1.5 text-[12.5px] font-medium text-red-500">{msg}</p> : null;

  const label = 'mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60';

  const planBtn = (value: 'oui' | 'non', text: string) => (
    <button
      type="button"
      onClick={() => setForm((f) => ({ ...f, plan: f.plan === value ? '' : value }))}
      className={`rounded-full border px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
        form.plan === value
          ? 'border-gold bg-gold text-ink'
          : 'border-ink/15 bg-white text-ink/60 hover:border-gold/60 hover:text-ink'
      }`}
    >
      {text}
    </button>
  );

  return (
    <section id="demande" className="bg-mist py-32 lg:py-44">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-8">{t.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-display text-[clamp(2.2rem,4vw,3.4rem)]">
                {t.headA}
                <span className="font-serif italic font-normal text-rougedeep">{t.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-sm text-[15px] leading-[1.85] text-ink/55">{t.sub}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1} y={44}>
              <form
                noValidate
                onSubmit={(e) => e.preventDefault()}
                className="rounded-3xl bg-white p-8 shadow-[0_20px_70px_-24px_rgba(11,27,43,0.25)] sm:p-10 lg:p-12"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bf-nom" className={label}>{t.labels.nom}</label>
                    <input id="bf-nom" type="text" value={form.nom} onChange={set('nom')} placeholder={t.placeholders.nom} className={inputCls(!!errors.nom)} />
                    {err('nom', t.errors.nom)}
                  </div>
                  <div>
                    <label htmlFor="bf-tel" className={label}>{t.labels.tel}</label>
                    <input id="bf-tel" type="tel" value={form.tel} onChange={set('tel')} placeholder={t.placeholders.tel} className={inputCls(!!errors.tel)} />
                    {err('tel', t.errors.tel)}
                  </div>
                  <div>
                    <label htmlFor="bf-email" className={label}>{t.labels.email}</label>
                    <input id="bf-email" type="email" value={form.email} onChange={set('email')} placeholder={t.placeholders.email} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="bf-type" className={label}>{t.labels.type}</label>
                    <select id="bf-type" value={form.type} onChange={set('type')} className={`${inputCls(!!errors.type)} ${form.type ? '' : 'text-ink/30'}`}>
                      <option value="" disabled>{t.placeholders.type}</option>
                      {t.typeOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {err('type', t.errors.type)}
                  </div>
                  <div>
                    <label htmlFor="bf-localisation" className={label}>{t.labels.localisation}</label>
                    <input id="bf-localisation" type="text" value={form.localisation} onChange={set('localisation')} placeholder={t.placeholders.localisation} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="bf-surface" className={label}>{t.labels.surface}</label>
                    <input id="bf-surface" type="text" value={form.surface} onChange={set('surface')} placeholder={t.placeholders.surface} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="bf-etages" className={label}>{t.labels.etages}</label>
                    <input id="bf-etages" type="text" value={form.etages} onChange={set('etages')} placeholder={t.placeholders.etages} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="bf-budget" className={label}>{t.labels.budget}</label>
                    <input id="bf-budget" type="text" value={form.budget} onChange={set('budget')} placeholder={t.placeholders.budget} className={inputCls(!!errors.budget)} />
                    {err('budget', t.errors.budget)}
                  </div>
                  <div>
                    <label htmlFor="bf-date" className={label}>{t.labels.date}</label>
                    <input id="bf-date" type="date" value={form.date} onChange={set('date')} className={inputCls(false)} />
                  </div>
                  <div>
                    <span className={label}>{t.labels.plan}</span>
                    <div className="flex gap-3 pt-0.5">
                      {planBtn('oui', t.planYes)}
                      {planBtn('non', t.planNo)}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bf-message" className={label}>{t.labels.message}</label>
                    <textarea id="bf-message" rows={4} value={form.message} onChange={set('message')} placeholder={t.placeholders.message} className={`${inputCls(false)} resize-y`} />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={sendEmail}
                    className="group/btn inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ink/85"
                  >
                    <Mail size={15} className="text-rouge" />
                    {t.submitEmail}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </button>
                  <button
                    type="button"
                    onClick={sendWhatsApp}
                    className="group/btn glow-gold inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
                  >
                    <MessageCircle size={15} />
                    {t.submitWhatsApp}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </button>
                </div>

                {/* success message */}
                <div
                  aria-live="polite"
                  className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ maxHeight: success ? 120 : 0, opacity: success ? 1 : 0, transform: success ? 'translateY(0)' : 'translateY(10px)' }}
                >
                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-4">
                    <CheckCircle2 size={20} className="shrink-0 text-rougedeep" />
                    <p className="text-[14px] font-medium text-ink/80">{t.success}</p>
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ FINAL CTA =========================== */

function BuildCTA() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].cta;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.buildcta-bg',
        { yPercent: -8, scale: 1.08 },
        { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative flex min-h-[80vh] items-center overflow-hidden bg-navydeep">
      <img
        src="/construction-cta.jpg"
        alt=""
        aria-hidden
        className="buildcta-bg absolute inset-0 h-full w-full object-cover will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navydeep/85 via-navydeep/50 to-navydeep/20" />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 sm:px-10 lg:px-16">
        <Reveal delay={0.05}>
          <h2 className="h-display max-w-3xl text-[clamp(2.4rem,5.4vw,4.6rem)] text-white">
            {t.headA}
            <span className="font-serif italic font-normal text-rouge">{t.accent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/65 md:text-base">{t.text}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-12">
            <MagneticButton href="#demande" variant="gold" className="glow-gold group/btn">
              {t.button}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== APP ============================== */

function BuildContent() {
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
        <BuildHero />
        <ProjectTypes />
        <BuildProcess />
        <BuildWhy />
        <BuildForm />
        <BuildCTA />
      </main>
      <Footer />
    </>
  );
}

export default function BuildApp() {
  return (
    <LanguageProvider
      title={{
        fr: 'Construire avec SOCODECO | Kinshasa, RDC',
        en: 'Build with SOCODECO | Kinshasa, DRC',
      }}
    >
      <BuildContent />
    </LanguageProvider>
  );
}
