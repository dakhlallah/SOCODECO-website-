"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const services = [
  {
    id: "general-contracting",
    title: "Entreprise Générale",
    description:
      "Notre objectif est de fournir des solutions clé en main grâce à notre bureau d'études intégré permettant l'analyse complète de la structure. En phase d'exécution, nous réalisons le gros œuvre et assurons la gestion, la coordination et le suivi de tous les corps de métier.",
    features: [
      "Solutions clé en main",
      "Gros œuvre et fondations",
      "Ingénierie structurelle",
      "Coordination multi-corps",
      "Contrôle qualité et supervision",
      "Planning et livraison projet",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    id: "metal-construction",
    title: "Construction Métallique",
    description:
      "Avec notre équipe spécialisée et nos machines performantes, nous fabriquons une large gamme d'ouvrages métalliques avancés. SOCODECO est reconnu comme une référence dans l'industrie de la construction métallique, grâce à la perfection de nos produits et l'excellence de notre ingénierie.",
    features: [
      "Fabrication de charpentes",
      "Hangars et entrepôts industriels",
      "Bâtiments préfabriqués (PEB)",
      "Systèmes d'ossature métallique",
      "Soudure et assemblage",
      "Revêtements de protection",
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "facades",
    title: "Façades & Habillage",
    description:
      "Nous disposons d'équipes formées et de managers qualifiés pour la réalisation des façades les plus techniques. Notre expertise couvre les systèmes aluminium, Alucobond et Alumond avec toutes les qualifications nécessaires pour les enveloppes architecturales complexes.",
    features: [
      "Systèmes de façades Alucobond",
      "Bardage aluminium",
      "Installation murs-rideaux",
      "Façades vitrées",
      "Intégration isolation thermique",
      "Solutions étanchéité",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "bim",
    title: "Modélisation BIM",
    description:
      "L'essence physique et fonctionnelle de tout projet de construction doit être représentée numériquement en format 3D. Nos spécialistes BIM créent des modèles numériques détaillés qui améliorent la collaboration, minimisent les erreurs et optimisent les résultats du projet.",
    features: [
      "Modélisation et visualisation 3D",
      "Détection et résolution des conflits",
      "Intégration planning 4D",
      "Métrés et estimations",
      "Support gestion des installations",
      "Documentation as-built",
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "rehabilitation",
    title: "Réhabilitation & Rénovation",
    description:
      "Un service spécialisé réalise les travaux de réhabilitation. Depuis plus de 30 ans, nous rénovons et transformons des bâtiments résidentiels, bureaux, écoles, hôpitaux et autres, redonnant vie aux structures existantes.",
    features: [
      "Restauration de bâtiments",
      "Renforcement structurel",
      "Rénovation intérieure",
      "Préservation patrimoniale",
      "Modernisation et mise aux normes",
      "Reconversion de bâtiments",
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  },
  {
    id: "interior",
    title: "Architecture Intérieure",
    description:
      "Tout au long de votre projet de développement ou de rénovation, un architecte d'intérieur vous accompagne depuis la phase d'études (plans, matériaux, devis) jusqu'à la phase de construction (suivi des travaux, choix du mobilier, décoration).",
    features: [
      "Conception et aménagement d'espaces",
      "Sélection des matériaux",
      "Mobilier sur mesure",
      "Agencement commerces et bureaux",
      "Aménagement restaurants",
      "Livraison intérieure clé en main",
    ],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  },
];

export default function ServicesPage() {
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
            NOS SERVICES
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NOS
            <br />
            <span className="text-[var(--accent)]">EXPERTISES</span>
          </motion.h1>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 px-4 md:px-8 overflow-hidden ${
            index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface)]"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className={index % 2 === 1 ? "lg:order-2" : ""}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
                {service.title}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--text)]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover hover:scale-105 transition-all duration-700"
              />
              <div
                className={`absolute inset-0 border-2 border-[var(--accent)] -z-10 hidden md:block ${
                  index % 2 === 0
                    ? "translate-x-4 translate-y-4"
                    : "-translate-x-4 translate-y-4"
                }`}
              />
            </motion.div>
          </div>
        </section>
      ))}

      <ContactSection />
      <Footer />
    </>
  );
}
