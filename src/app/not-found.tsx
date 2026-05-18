import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="nova">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-10">
        <div className="nova-haze absolute inset-0" />
        <div className="relative z-10 max-w-xl text-center">
          <p className="nova-eyebrow mb-7">Erreur 404</p>
          <h1 className="nova-display nova-glow-text text-6xl leading-[1.02] text-white sm:text-7xl lg:text-8xl">
            Page
            <br />
            <span className="text-[var(--nova-beige)]">introuvable</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-[var(--nova-gray)]">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--nova-beige)] px-9 py-4 text-sm font-medium tracking-wide text-[#0a0a0a] transition-all duration-500 hover:bg-[var(--nova-champagne)]"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-9 py-4 text-sm font-light tracking-wide text-white transition-all duration-500 hover:border-[var(--nova-beige)] hover:bg-white/[0.04]"
            >
              Voir les projets
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
