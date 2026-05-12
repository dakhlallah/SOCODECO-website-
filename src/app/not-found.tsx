import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="text-center max-w-xl">
        <p className="font-mono text-[var(--accent)] text-sm mb-4">
          ERROR 404
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-[var(--text)] leading-none mb-6">
          PAGE
          <br />
          <span className="text-[var(--accent)]">INTROUVABLE</span>
        </h1>
        <p className="text-[var(--text-muted)] mb-10">
          La page que vous recherchez n&apos;existe pas ou a été déplacée. /
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-lg hover:bg-[var(--accent-dark)] transition-colors"
          >
            ACCUEIL / HOME
          </Link>
          <Link
            href="/projects"
            className="px-8 py-4 border-2 border-[var(--surface-light)] text-[var(--text)] font-display text-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            PROJETS / PROJECTS
          </Link>
        </div>
      </div>
    </main>
  );
}
