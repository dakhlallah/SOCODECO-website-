import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowRight, Store, Briefcase, Home, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';

import { setupAnchorNavigation } from './lib/anchors';
import { LanguageProvider, useLang } from './lib/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import MagneticButton from './components/MagneticButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = 'info@socodeco.org';
const WHATSAPP = '243990000027';

type SpaceType = '' | 'boutique' | 'bureau' | 'appartement';

const CARD_MEDIA: { key: Exclude<SpaceType, ''>; icon: typeof Store; img: string }[] = [
  { key: 'boutique', icon: Store, img: '/marche-jakarta.jpg' },
  { key: 'bureau', icon: Briefcase, img: '/our-story.jpg' },
  { key: 'appartement', icon: Home, img: '/realestate-about.jpg' },
];

const T = {
  fr: {
    hero: {
      eyebrow: "Location d'Espaces",
      headA: "Trouvez l'espace ",
      accent: 'idéal',
      headB: ' pour votre activité ou votre logement',
      sub: 'SOCODECO vous accompagne dans la location de boutiques, bureaux et appartements adaptés à vos besoins.',
      ctaSpaces: 'Voir les espaces disponibles',
      ctaRequest: 'Faire une demande',
      videoAria: 'Développement immobilier SOCODECO de luxe à Kinshasa — boutiques, bureaux et appartements modernes',
    },
    types: {
      eyebrow: "Types d'espaces disponibles",
      headA: 'Un espace pour chaque ',
      accent: 'ambition.',
      cardCta: 'Demander une location',
      cards: {
        boutique: { title: 'Boutique', text: 'Pour commerce, showroom, restaurant, pharmacie ou point de vente.' },
        bureau: { title: 'Bureau', text: 'Pour entreprises, cabinets, agences, startups ou institutions.' },
        appartement: { title: 'Appartement', text: 'Pour résidence privée, expatriés, familles ou logement professionnel.' },
      },
    },
    form: {
      eyebrow: 'Formulaire',
      headA: 'Demande de ',
      accent: 'location',
      sub: 'Remplissez le formulaire — notre équipe vous recontacte rapidement avec des espaces correspondant à votre besoin.',
      labels: {
        nom: 'Nom complet *',
        tel: 'Numéro de téléphone *',
        email: 'Adresse email',
        type: "Type d'espace *",
        surface: 'Surface souhaitée',
        budget: 'Budget mensuel *',
        duree: 'Durée de location',
        localisation: 'Localisation préférée',
        date: "Date souhaitée d'entrée",
        message: 'Message supplémentaire',
      },
      placeholders: {
        nom: 'ex. Jean Kabasele',
        tel: 'ex. +243 990 000 000',
        email: 'ex. vous@exemple.com',
        type: "Choisissez un type d'espace",
        surface: 'ex. 120 m²',
        budget: 'ex. 1 500 $ / mois',
        duree: 'ex. 2 ans',
        localisation: 'ex. Gombe, Kinshasa',
        message: 'Précisez vos besoins, équipements souhaités, activité prévue…',
      },
      errors: {
        nom: 'Veuillez saisir votre nom complet.',
        tel: 'Veuillez saisir votre numéro de téléphone.',
        type: "Veuillez choisir un type d'espace.",
        budget: 'Veuillez indiquer votre budget mensuel.',
      },
      submitEmail: 'Envoyer par Email',
      submitWhatsApp: 'Envoyer par WhatsApp',
      success: "Votre demande est prête — finalisez l'envoi dans l'application qui vient de s'ouvrir.",
      emailSubject: 'Nouvelle demande de location SOCODECO',
      waIntro: 'Bonjour SOCODECO, je souhaite faire une demande de location.',
      msgLabels: {
        nom: 'Nom',
        tel: 'Téléphone',
        email: 'Email',
        type: "Type d'espace",
        surface: 'Surface souhaitée',
        budget: 'Budget mensuel',
        duree: 'Durée',
        localisation: 'Localisation',
        date: "Date d'entrée",
        message: 'Message',
      },
    },
    cta: {
      headA: 'Vous cherchez un espace à ',
      accent: 'louer ?',
      text: 'Notre équipe vous répond rapidement pour vous proposer une solution adaptée à votre besoin.',
      button: 'Contactez-nous maintenant',
    },
  },
  en: {
    hero: {
      eyebrow: 'Rent a Space',
      headA: 'Find the ',
      accent: 'ideal',
      headB: ' space for your business or your home',
      sub: 'SOCODECO helps you rent shops, offices and apartments tailored to your needs.',
      ctaSpaces: 'View available spaces',
      ctaRequest: 'Make a request',
      videoAria: 'Luxury SOCODECO real estate development in Kinshasa — modern shops, offices and apartments',
    },
    types: {
      eyebrow: 'Available space types',
      headA: 'A space for every ',
      accent: 'ambition.',
      cardCta: 'Request a rental',
      cards: {
        boutique: { title: 'Shop', text: 'For retail, showrooms, restaurants, pharmacies or points of sale.' },
        bureau: { title: 'Office', text: 'For companies, firms, agencies, startups or institutions.' },
        appartement: { title: 'Apartment', text: 'For private residence, expatriates, families or corporate housing.' },
      },
    },
    form: {
      eyebrow: 'Form',
      headA: 'Rental ',
      accent: 'request',
      sub: 'Fill in the form — our team gets back to you quickly with spaces matching your needs.',
      labels: {
        nom: 'Full name *',
        tel: 'Phone number *',
        email: 'Email address',
        type: 'Type of space *',
        surface: 'Desired surface',
        budget: 'Monthly budget *',
        duree: 'Rental duration',
        localisation: 'Preferred location',
        date: 'Desired move-in date',
        message: 'Additional message',
      },
      placeholders: {
        nom: 'e.g. John Kabasele',
        tel: 'e.g. +243 990 000 000',
        email: 'e.g. you@example.com',
        type: 'Choose a type of space',
        surface: 'e.g. 120 m²',
        budget: 'e.g. $1,500 / month',
        duree: 'e.g. 2 years',
        localisation: 'e.g. Gombe, Kinshasa',
        message: 'Describe your needs, desired amenities, planned activity…',
      },
      errors: {
        nom: 'Please enter your full name.',
        tel: 'Please enter your phone number.',
        type: 'Please choose a type of space.',
        budget: 'Please indicate your monthly budget.',
      },
      submitEmail: 'Send by Email',
      submitWhatsApp: 'Send by WhatsApp',
      success: 'Your request is ready — finish sending it in the app that just opened.',
      emailSubject: 'New SOCODECO rental request',
      waIntro: 'Hello SOCODECO, I would like to make a rental request.',
      msgLabels: {
        nom: 'Name',
        tel: 'Phone',
        email: 'Email',
        type: 'Type of space',
        surface: 'Desired surface',
        budget: 'Monthly budget',
        duree: 'Duration',
        localisation: 'Location',
        date: 'Move-in date',
        message: 'Message',
      },
    },
    cta: {
      headA: 'Looking for a space to ',
      accent: 'rent?',
      text: 'Our team responds quickly with a solution tailored to your needs.',
      button: 'Contact Us Now',
    },
  },
};

/* ============================== HERO ============================== */

function RentHero() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].hero;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.fromTo(
        '.rent-stagger',
        { opacity: 0, y: 44, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.11, ease: 'power3.out', delay: 0.3 },
      );
      if (reduced) return;
      gsap.fromTo('.rent-video', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.to('.rent-media', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-navydeep">
      <div className="rent-media absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <video
          className="rent-video h-full w-full object-cover will-change-transform"
          src="/expertise-realestate.mp4"
          poster="/expertise-realestate.jpg"
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
        <p className="rent-stagger eyebrow mb-7 flex items-center gap-4 !text-rouge">
          <span className="h-px w-10 bg-gold" />
          {t.eyebrow}
        </p>
        <h1 className="rent-stagger h-display max-w-4xl text-[clamp(2.4rem,5.6vw,4.8rem)] text-white [text-shadow:0_2px_40px_rgba(6,13,22,0.5)]">
          {t.headA}
          <span className="font-serif italic font-normal text-rouge">{t.accent}</span>
          {t.headB}
        </h1>
        <p className="rent-stagger mt-8 max-w-xl text-[15.5px] leading-[1.85] text-white/70 md:text-[17px]">{t.sub}</p>
        <div className="rent-stagger mt-11 flex flex-wrap items-center gap-5">
          <MagneticButton href="#espaces" variant="gold" className="glow-gold group/btn">
            {t.ctaSpaces}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
          <MagneticButton href="#demande" variant="ghost" className="group/btn">
            {t.ctaRequest}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ========================== SPACE TYPES =========================== */

function SpaceTypes({ onPick }: { onPick: (k: Exclude<SpaceType, ''>) => void }) {
  const { lang } = useLang();
  const t = T[lang].types;

  return (
    <section id="espaces" className="bg-mist py-32 lg:py-44">
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARD_MEDIA.map((c, i) => {
            const card = t.cards[c.key];
            return (
              <Reveal key={c.key} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white shadow-[0_4px_30px_rgba(11,27,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_-18px_rgba(11,27,43,0.3)]">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={c.img}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navydeep/40 to-transparent" />
                    <span className="absolute bottom-5 left-6 grid h-14 w-14 place-items-center rounded-full bg-rouge text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <c.icon size={22} strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="flex flex-col p-8 pb-9">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{card.title}</h3>
                    <p className="mt-3 min-h-[48px] text-[14.5px] leading-relaxed text-ink/55">{card.text}</p>
                    <a
                      href="#demande"
                      onClick={() => onPick(c.key)}
                      className="group/cta mt-7 inline-flex items-center gap-2.5 self-start rounded-full bg-ink px-6 py-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-rouge"
                    >
                      {t.cardCta}
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                    </a>
                  </div>
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

function RentForm({ pickedType }: { pickedType: SpaceType }) {
  const { lang } = useLang();
  const t = T[lang].form;
  const typeLabels = T[lang].types.cards;

  const [form, setForm] = useState({
    nom: '',
    tel: '',
    email: '',
    type: '' as SpaceType,
    surface: '',
    budget: '',
    duree: '',
    localisation: '',
    date: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const successTimer = useRef<number>();

  /* card buttons preselect the space type */
  useEffect(() => {
    if (pickedType) setForm((f) => ({ ...f, type: pickedType }));
  }, [pickedType]);

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
    const typeLabel = form.type ? typeLabels[form.type as Exclude<SpaceType, ''>].title : '—';
    return [
      `${m.nom}: ${form.nom.trim() || '—'}`,
      `${m.tel}: ${form.tel.trim() || '—'}`,
      `${m.email}: ${form.email.trim() || '—'}`,
      `${m.type}: ${typeLabel}`,
      `${m.surface}: ${form.surface.trim() || '—'}`,
      `${m.budget}: ${form.budget.trim() || '—'}`,
      `${m.duree}: ${form.duree.trim() || '—'}`,
      `${m.localisation}: ${form.localisation.trim() || '—'}`,
      `${m.date}: ${form.date || '—'}`,
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

  return (
    <section id="demande" className="bg-paper py-32 lg:py-44">
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
                    <label htmlFor="rf-nom" className={label}>{t.labels.nom}</label>
                    <input id="rf-nom" type="text" value={form.nom} onChange={set('nom')} placeholder={t.placeholders.nom} className={inputCls(!!errors.nom)} />
                    {err('nom', t.errors.nom)}
                  </div>
                  <div>
                    <label htmlFor="rf-tel" className={label}>{t.labels.tel}</label>
                    <input id="rf-tel" type="tel" value={form.tel} onChange={set('tel')} placeholder={t.placeholders.tel} className={inputCls(!!errors.tel)} />
                    {err('tel', t.errors.tel)}
                  </div>
                  <div>
                    <label htmlFor="rf-email" className={label}>{t.labels.email}</label>
                    <input id="rf-email" type="email" value={form.email} onChange={set('email')} placeholder={t.placeholders.email} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="rf-type" className={label}>{t.labels.type}</label>
                    <select id="rf-type" value={form.type} onChange={set('type')} className={`${inputCls(!!errors.type)} ${form.type ? '' : 'text-ink/30'}`}>
                      <option value="" disabled>{t.placeholders.type}</option>
                      <option value="boutique">{typeLabels.boutique.title}</option>
                      <option value="bureau">{typeLabels.bureau.title}</option>
                      <option value="appartement">{typeLabels.appartement.title}</option>
                    </select>
                    {err('type', t.errors.type)}
                  </div>
                  <div>
                    <label htmlFor="rf-surface" className={label}>{t.labels.surface}</label>
                    <input id="rf-surface" type="text" value={form.surface} onChange={set('surface')} placeholder={t.placeholders.surface} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="rf-budget" className={label}>{t.labels.budget}</label>
                    <input id="rf-budget" type="text" value={form.budget} onChange={set('budget')} placeholder={t.placeholders.budget} className={inputCls(!!errors.budget)} />
                    {err('budget', t.errors.budget)}
                  </div>
                  <div>
                    <label htmlFor="rf-duree" className={label}>{t.labels.duree}</label>
                    <input id="rf-duree" type="text" value={form.duree} onChange={set('duree')} placeholder={t.placeholders.duree} className={inputCls(false)} />
                  </div>
                  <div>
                    <label htmlFor="rf-localisation" className={label}>{t.labels.localisation}</label>
                    <input id="rf-localisation" type="text" value={form.localisation} onChange={set('localisation')} placeholder={t.placeholders.localisation} className={inputCls(false)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="rf-date" className={label}>{t.labels.date}</label>
                    <input id="rf-date" type="date" value={form.date} onChange={set('date')} className={inputCls(false)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="rf-message" className={label}>{t.labels.message}</label>
                    <textarea id="rf-message" rows={4} value={form.message} onChange={set('message')} placeholder={t.placeholders.message} className={`${inputCls(false)} resize-y`} />
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
                    className="group/btn glow-gold inline-flex items-center gap-2.5 rounded-full bg-rouge px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ink"
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
                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-rouge/40 bg-rouge/10 px-6 py-4">
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

function RentCTA() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang].cta;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.rentcta-bg',
        { yPercent: -8, scale: 1.08 },
        { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
      );
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative flex min-h-[80vh] items-center overflow-hidden bg-navydeep">
      <img
        src="/realestate-cta.jpg"
        alt=""
        aria-hidden
        className="rentcta-bg absolute inset-0 h-full w-full object-cover will-change-transform"
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

function RentContent() {
  const [pickedType, setPickedType] = useState<SpaceType>('');

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
        <RentHero />
        <SpaceTypes onPick={setPickedType} />
        <RentForm pickedType={pickedType} />
        <RentCTA />
      </main>
      <Footer />
    </>
  );
}

export default function RentApp() {
  return (
    <LanguageProvider
      title={{
        fr: "Location d'Espaces — SOCODECO | Kinshasa, RDC",
        en: 'Rent a Space — SOCODECO | Kinshasa, DRC',
      }}
    >
      <RentContent />
    </LanguageProvider>
  );
}
