import { useLang } from '../lib/i18n';

const T = {
  fr: {
    home: 'SOCODECO — accueil',
    links: [
      { label: 'Notre histoire', href: '/about.html' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Projets', href: '/#projects' },
      { label: 'Qualité', href: '/#quality' },
      { label: "Location d'espaces", href: '/location.html' },
      { label: 'Construire', href: '/construire.html' },
      { label: 'Contact', href: '#contact' },
    ],
    rights: 'Tous droits réservés.',
    address: '+243 990 000 027 · Kinshasa · République Démocratique du Congo',
  },
  en: {
    home: 'SOCODECO — home',
    links: [
      { label: 'Our Story', href: '/about.html' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Quality', href: '/#quality' },
      { label: 'Rent a Space', href: '/location.html' },
      { label: 'Build', href: '/construire.html' },
      { label: 'Contact', href: '#contact' },
    ],
    rights: 'All rights reserved.',
    address: '+243 990 000 027 · Kinshasa · Democratic Republic of the Congo',
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <footer className="border-t border-white/10 bg-navydeep py-16 text-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="/#hero" aria-label={t.home} className="block transition-opacity hover:opacity-80">
            <p className="font-display text-3xl font-bold tracking-tightest">SOCODECO</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/35">
              Société de Construction et de Développement du Congo
            </p>
          </a>
          <nav className="flex flex-wrap gap-x-9 gap-y-3 text-[13.5px] text-white/55">
            {t.links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-rouge">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-[12.5px] text-white/30 md:flex-row">
          <p>
            © {new Date().getFullYear()} SOCODECO. {t.rights}
          </p>
          <p>{t.address}</p>
        </div>
      </div>
    </footer>
  );
}
