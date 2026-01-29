"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import Footer from "@/components/Footer";

interface ProjectContentProps {
  project: Project;
  otherProjects: Project[];
}

export default function ProjectContent({ project, otherProjects }: ProjectContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-transparent" />
        </div>

        <div className="relative z-10 min-h-[70vh] flex items-end px-4 md:px-8 pb-16">
          <div>
            <motion.div
              className="flex gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-xs text-[var(--accent)] bg-[var(--background)]/80 px-3 py-1">
                {project.category}
              </span>
              <span className="font-mono text-xs text-[var(--text)]/60">
                {project.year}
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--text)] leading-none mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="font-mono text-lg text-[var(--text)]/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.location}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl text-[var(--text)] mb-6">
                PRÉSENTATION DU PROJET
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                {project.description}
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                Ce projet illustre notre engagement envers l'excellence en construction
                et ingénierie. Grâce à une collaboration étroite avec toutes les parties
                prenantes, nous avons livré une solution complète répondant aux exigences
                fonctionnelles et aux aspirations de conception.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                La conception intègre des pratiques de construction durables et des
                matériaux locaux lorsque possible, reflétant notre engagement envers
                la responsabilité environnementale et l'intégration communautaire.
              </p>
            </motion.div>

            {/* Gallery */}
            <motion.div
              className="mt-16 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {project.gallery && project.gallery.length > 0 ? (
                project.gallery.map((img, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={img}
                      alt={`${project.title} detail ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-500"
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.image}
                      alt={`${project.title} detail 1`}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.image}
                      alt={`${project.title} detail 2`}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[var(--surface)] p-8 border border-[var(--surface-light)]">
              <h3 className="font-display text-xl text-[var(--text)] mb-6">
                DÉTAILS DU PROJET
              </h3>
              <dl className="space-y-6">
                <div>
                  <dt className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    CLIENT
                  </dt>
                  <dd className="text-[var(--text)]">Développement Privé</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    CATÉGORIE
                  </dt>
                  <dd className="text-[var(--text)]">{project.category}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    LOCALISATION
                  </dt>
                  <dd className="text-[var(--text)]">{project.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    ANNÉE DE LIVRAISON
                  </dt>
                  <dd className="text-[var(--text)]">{project.year}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    PRESTATIONS
                  </dt>
                  <dd className="text-[var(--text)]">
                    Conception, Ingénierie, Gestion de Projet
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl text-[var(--text)]">AUTRES RÉALISATIONS</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {otherProjects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${p.id}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <h3 className="font-display text-xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {p.location}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
