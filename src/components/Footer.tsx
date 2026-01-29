"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const t = useTranslation();

  const footerLinks = {
    services: [
      { name: t.services.items[0].title, href: "/services#general-contracting" },
      { name: t.services.items[1].title, href: "/services#metal-construction" },
      { name: t.services.items[2].title, href: "/services#facades" },
      { name: t.services.items[3].title, href: "/services#bim" },
    ],
    company: [
      { name: t.footer.aboutLink, href: "/about" },
      { name: t.footer.teamLink, href: "/about#team" },
      { name: t.footer.careersLink, href: "/careers" },
      { name: t.footer.newsLink, href: "/news" },
    ],
    projects: [
      { name: t.categories.residential, href: "/projects?category=residential" },
      { name: t.categories.commercial, href: "/projects?category=commercial" },
      { name: t.categories.industrial, href: "/projects?category=industrial" },
      { name: t.footer.allProjects, href: "/projects" },
    ],
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--surface-light)]">
      {/* Main Footer */}
      <div className="px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="font-display text-4xl text-[var(--text)]">SOCODECO</span>
            </Link>
            <p className="mt-4 text-[var(--text-muted)] text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="mt-6 flex gap-4">
              {["Instagram", "LinkedIn", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl text-[var(--text)] mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-xl text-[var(--text)] mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-[var(--text)] mb-4">{t.footer.contactTitle}</h4>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <p className="text-[var(--accent)] mb-1">RD Congo</p>
                <p className="text-[var(--text-muted)]">
                  8225 Avenue Kabasele
                  <br />
                  C/Gombe, Kinshasa
                  <br />
                  +243 820 200 003
                </p>
              </div>
              <div>
                <p className="text-[var(--accent)] mb-1">Liban</p>
                <p className="text-[var(--text-muted)]">
                  Rue Hamra
                  <br />
                  Beyrouth, Liban
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:info@socodeco.org"
                  className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  info@socodeco.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--surface-light)] px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} SOCODECO. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
