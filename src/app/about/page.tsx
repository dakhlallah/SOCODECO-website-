"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const team = [
  { name: "Oussama Dakhlallah", role: "PDG & Fondateur", image: "/images/oussama-dakhlallah.jpg" },
  { name: "Jean-Pierre Mutombo", role: "Directeur Général", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Sarah El-Khoury", role: "Directrice des Opérations", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Emmanuel Kabongo", role: "Directeur Technique", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            QUI SOMMES-NOUS
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            L'EXCELLENCE
            <br />
            <span className="text-[var(--accent)]">EN CONSTRUCTION</span>
            <br />
            DEPUIS 1991
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-8">
              NOTRE HISTOIRE
            </h2>
            <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
              <p>
                Fondée en 1991, SOCODECO est une entreprise de construction reconnue, active
                dans la réalisation de projets de bâtiment et de génie civil. Forte de plus
                de trois décennies d'expérience, l'entreprise s'est imposée comme un acteur
                fiable dans la gestion de projets, la qualité d'exécution et le respect des
                normes de construction.
              </p>
              <p>
                L'expansion de SOCODECO en République Démocratique du Congo marque une étape
                stratégique majeure de son développement. Depuis son siège situé dans le
                quartier de la Gombe à Kinshasa, l'entreprise accompagne ses clients sur
                l'ensemble du territoire avec le même engagement envers la qualité, la rigueur
                et le professionnalisme qui caractérisent ses activités historiques.
              </p>
              <p>
                Aujourd'hui, SOCODECO incarne l'excellence dans la construction lorsque
                l'expertise technique s'allie à une organisation méthodique. Spécialisée dans
                l'entreprise générale, le bâtiment, les travaux de génie civil, les fondations
                et la construction clé en main, SOCODECO contribue durablement au développement
                urbain et à la réalisation des infrastructures de demain.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative aspect-[4/3]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
              alt="SOCODECO construction site"
              fill
              className="object-cover hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 border-2 border-[var(--accent)] translate-x-4 translate-y-4 -z-10 hidden md:block" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            NOS VALEURS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Excellence",
              description: "Nous maintenons les plus hauts standards professionnels sur chaque projet, quelle que soit son envergure ou sa complexité.",
            },
            {
              title: "Intégrité",
              description: "La transparence et l'éthique guident toutes nos décisions commerciales et nos relations avec nos partenaires.",
            },
            {
              title: "Innovation",
              description: "Nous adoptons les technologies avancées et les méthodologies modernes pour des résultats supérieurs.",
            },
            {
              title: "Durabilité",
              description: "Nous construisons pour les besoins présents tout en préservant les ressources pour les générations futures.",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="border-l-2 border-[var(--accent)] pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display text-2xl text-[var(--text)] mb-3">
                {value.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 md:px-8" id="team">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
            ÉQUIPE DIRIGEANTE
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            DIRECTION
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/20 transition-all duration-500" />
              </div>
              <h3 className="font-display text-xl text-[var(--text)]">{member.name}</h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
