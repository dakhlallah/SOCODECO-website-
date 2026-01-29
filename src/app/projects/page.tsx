"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, categories } from "@/data/projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[40vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PORTFOLIO
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NOS
            <br />
            <span className="text-[var(--accent)]">RÉALISATIONS</span>
          </motion.h1>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 px-4 md:px-8">
        {/* Category Filter */}
        <motion.div
          className="flex gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-mono text-sm px-6 py-3 border transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]"
                  : "border-[var(--surface-light)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-[var(--background)]/30 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
                    <motion.div
                      className="absolute inset-0 border-2 border-[var(--accent)]"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-xs text-[var(--accent)] bg-[var(--background)]/90 px-2 py-1">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="font-mono text-xs text-[var(--text)]/60">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm text-[var(--text-muted)]">
                    {project.location}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
