"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  services: [
    { name: "Entreprise Générale", href: "/services#general-contracting" },
    { name: "Construction Métallique", href: "/services#metal-construction" },
    { name: "Façades & Habillage", href: "/services#facades" },
    { name: "Modélisation BIM", href: "/services#bim" },
  ],
  company: [
    { name: "À Propos", href: "/about" },
    { name: "Équipe Dirigeante", href: "/about#team" },
    { name: "Carrières", href: "/careers" },
    { name: "Actualités", href: "/news" },
  ],
  projects: [
    { name: "Résidentiel", href: "/projects?category=residential" },
    { name: "Commercial", href: "/projects?category=commercial" },
    { name: "Industriel", href: "/projects?category=industrial" },
    { name: "Tous les Projets", href: "/projects" },
  ],
};

export default function Footer() {
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
              Excellence en construction et génie civil en République Démocratique du Congo
              et au Liban. Des projets résidentiels aux installations industrielles,
              nous bâtissons les infrastructures de demain.
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
            <h4 className="font-display text-xl text-[var(--text)] mb-4">Nos Services</h4>
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
            <h4 className="font-display text-xl text-[var(--text)] mb-4">Entreprise</h4>
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
            <h4 className="font-display text-xl text-[var(--text)] mb-4">Contact</h4>
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
            © {new Date().getFullYear()} SOCODECO. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Politique de Confidentialité
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
