"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const architectureProjectsFr = [
  {
    name: "Centre Culturel de Kinshasa",
    type: "Culturel",
    year: "2024",
    description: "Un équipement culturel emblématique célébrant le patrimoine congolais à travers une expression architecturale contemporaine distinguée.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    name: "Tour d'Affaires de Beyrouth",
    type: "Commercial",
    year: "2023",
    description: "Une tour commerciale de 35 étages redéfinissant la skyline de Beyrouth grâce aux principes de conception durable et à l'innovation technique.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    name: "Villa Euphoria",
    type: "Résidentiel",
    year: "2023",
    description: "Une résidence privée ultra-luxe intégrant architecture tropicale et espaces intérieurs minimalistes raffinés.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    name: "Centre Médical de Goma",
    type: "Santé",
    year: "2022",
    description: "Un établissement de santé de pointe conçu pour optimiser le confort des patients et l'efficacité opérationnelle.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    name: "Pôle Technologique de Lubumbashi",
    type: "Commercial",
    year: "2022",
    description: "Un campus d'innovation conçu pour accompagner les entreprises technologiques avec des espaces de travail flexibles et collaboratifs.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    name: "Resort du Lac Kivu",
    type: "Hôtellerie",
    year: "2021",
    description: "Un développement hôtelier boutique célébrant la splendeur naturelle du lac Kivu à travers une conception architecturale durable.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  },
];

const architectureProjectsEn = [
  {
    name: "Kinshasa Cultural Center",
    type: "Cultural",
    year: "2024",
    description: "An iconic cultural facility celebrating Congolese heritage through distinguished contemporary architectural expression.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    name: "Beirut Business Tower",
    type: "Commercial",
    year: "2023",
    description: "A 35-story commercial tower redefining the Beirut skyline through sustainable design principles and technical innovation.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    name: "Villa Euphoria",
    type: "Residential",
    year: "2023",
    description: "An ultra-luxury private residence integrating tropical architecture and refined minimalist interior spaces.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    name: "Goma Medical Center",
    type: "Healthcare",
    year: "2022",
    description: "A state-of-the-art healthcare facility designed to optimize patient comfort and operational efficiency.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    name: "Lubumbashi Technology Hub",
    type: "Commercial",
    year: "2022",
    description: "An innovation campus designed to support technology companies with flexible and collaborative workspaces.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    name: "Lake Kivu Resort",
    type: "Hospitality",
    year: "2021",
    description: "A boutique hotel development celebrating the natural splendor of Lake Kivu through sustainable architectural design.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  },
];

export default function ArchitecturePage() {
  const t = useTranslation();
  const { language } = useLanguage();
  const architectureProjects = language === "fr" ? architectureProjectsFr : architectureProjectsEn;

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
            {t.architecture.label}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.architecture.title1}
            <br />
            <span className="text-[var(--accent)]">{t.architecture.title2}</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.architecture.description}
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <div className="grid lg:grid-cols-3 gap-12">
          {t.architecture.philosophy.map((item, index) => (
            <motion.div
              key={item.title}
              className="border-l-2 border-[var(--accent)] pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display text-3xl text-[var(--text)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 md:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            {t.architecture.projectsTitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {architectureProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
                <motion.div
                  className="absolute inset-0 border-2 border-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {project.type}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {project.year}
                </span>
              </div>
              <h3 className="font-display text-2xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {project.name}
              </h3>
              <p className="text-[var(--text-muted)] text-sm">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
