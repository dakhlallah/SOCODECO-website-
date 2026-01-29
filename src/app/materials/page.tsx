"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const materials = [
  {
    name: "Béton & Ciment",
    description: "Formulations de béton haute performance et produits cimentiers conçus pour l'excellence structurelle.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    specs: ["Résistance: 25-50 MPa", "Formules à prise rapide", "Variantes écologiques"],
  },
  {
    name: "Acier de Construction",
    description: "Acier de qualité supérieure pour ossatures, armatures et applications architecturales.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: ["Nuances: S355 & S460", "Profilés laminés à chaud", "Revêtements anticorrosion"],
  },
  {
    name: "Granulats",
    description: "Pierres, sables et graviers contrôlés pour travaux de fondation et production de béton.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    specs: ["Classifications multiples", "Lavés et criblés", "Sources locales et importées"],
  },
  {
    name: "Bois & Produits Dérivés",
    description: "Produits bois issus de sources durables pour la construction et les finitions intérieures.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    specs: ["Options certifiées FSC", "Traités pour durabilité", "Plusieurs essences disponibles"],
  },
  {
    name: "Systèmes d'Isolation",
    description: "Solutions d'isolation thermique et acoustique pour une performance énergétique optimale.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    specs: ["Laine minérale", "Panneaux mousse", "Écrans réfléchissants"],
  },
  {
    name: "Systèmes de Toiture",
    description: "Solutions complètes de couverture incluant étanchéité et matériaux de finition.",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
    specs: ["Toitures métalliques", "Membranes d'étanchéité", "Tuiles et ardoises"],
  },
];

export default function MaterialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            MATÉRIAUX
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            MATÉRIAUX
            <br />
            <span className="text-[var(--accent)]">DE CONSTRUCTION</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nous approvisionnons et fournissons des matériaux de construction
            premium, garantissant que chaque projet est réalisé avec des
            composants certifiés conformes aux normes internationales.
          </motion.p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              className="group bg-[var(--surface)] border border-[var(--surface-light)] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--text)] mb-2">
                  {material.name}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  {material.description}
                </p>
                <ul className="space-y-1">
                  {material.specs.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-xs text-[var(--accent)]"
                    >
                      → {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
            DEMANDE DE DEVIS
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Contactez notre équipe approvisionnement pour vos devis de matériaux
            de construction. Nous proposons des prix compétitifs et des livraisons
            fiables en République Démocratique du Congo et au Liban.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-xl hover:bg-[var(--accent-dark)] transition-colors"
          >
            DEMANDER UN DEVIS
          </a>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
