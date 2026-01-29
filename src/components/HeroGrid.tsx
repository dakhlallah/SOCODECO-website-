"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroGrid() {
  const t = useTranslation();
  const { language } = useLanguage();

  const categories = [
    t.categories.all,
    t.categories.residential,
    t.categories.commercial,
    t.categories.industrial,
  ];

  const categoryMap: Record<string, string> = {
    [t.categories.all]: "All",
    [t.categories.residential]: "Résidentiel",
    [t.categories.commercial]: "Commercial",
    [t.categories.industrial]: "Industriel",
  };

  const [activeCategory, setActiveCategory] = useState(t.categories.all);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === t.categories.all
      ? projects
      : projects.filter((p) => p.category === categoryMap[activeCategory]);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      {/* Header */}
      <motion.div
        className="mb-8 md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none mb-4">
          {t.hero.title1}
          <br />
          <span className="text-[var(--accent)]">{t.hero.title2}</span>
        </h1>
        <p className="text-[var(--text-muted)] max-w-xl text-lg font-mono">
          {t.hero.description}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex gap-4 mb-8 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`font-mono text-sm px-4 py-2 border transition-all duration-300 ${
              activeCategory === category
                ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]"
                : "border-[var(--surface-light)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                layout: { duration: 0.4 },
              }}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/projects/${project.id}`}>
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredProject === project.id
                        ? "scale-110"
                        : "scale-100"
                    }`}
                  />
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    hoveredProject === project.id
                      ? "bg-[var(--accent)]/20"
                      : "bg-[var(--background)]/40"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top: Category & Year */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[var(--accent)] bg-[var(--background)]/80 px-2 py-1">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-white/60">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom: Title & Location */}
                  <div>
                    <motion.h3
                      className="font-display text-3xl md:text-4xl text-white mb-1"
                      animate={{
                        y: hoveredProject === project.id ? 0 : 10,
                        opacity: hoveredProject === project.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="font-mono text-sm text-white/60"
                      animate={{
                        y: hoveredProject === project.id ? 0 : 10,
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      {project.location}
                    </motion.p>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[var(--surface-light)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {[
          { number: "150+", label: t.hero.stats.projects },
          { number: "34+", label: t.hero.stats.years },
          { number: "2", label: t.hero.stats.offices },
          { number: "500+", label: t.hero.stats.professionals },
        ].map((stat, index) => (
          <div key={stat.label} className="text-center md:text-left">
            <motion.span
              className="font-display text-5xl md:text-6xl text-[var(--accent)] block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.number}
            </motion.span>
            <span className="font-mono text-sm text-[var(--text-muted)]">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
