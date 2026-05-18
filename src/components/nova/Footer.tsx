"use client";

const COLS = [
  {
    title: "Studio",
    links: ["Accueil", "Projets", "Services", "À propos"],
  },
  {
    title: "Services",
    links: [
      "Architecture résidentielle",
      "Architecture commerciale",
      "Design intérieur",
      "BIM & 3D",
    ],
  },
  {
    title: "Réseaux",
    links: ["Instagram", "LinkedIn", "Behance", "Pinterest"],
  },
  {
    title: "Contact",
    links: ["contact@ateliernova.fr", "+33 1 00 00 00 00", "Paris — Genève"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--nova-bg-0)] px-6 pb-12 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="nova-display text-3xl text-white">ATELIER&nbsp;NOVA</p>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-[var(--nova-gray)]">
              Architecture • Innovation • Expérience
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-8 md:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  {c.title}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm font-light text-[var(--nova-gray)] transition-colors duration-300 hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 nova-hairline" />
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs font-light tracking-wide text-white/40 md:flex-row">
          <p>© 2026 ATELIER NOVA. Tous droits réservés.</p>
          <p>Conçu comme une expérience.</p>
        </div>
      </div>
    </footer>
  );
}
