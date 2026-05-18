"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/nova/Navbar";
import Footer from "@/components/nova/Footer";
import {
  blurFadeUp,
  fadeUp,
  scaleIn,
  stagger,
  viewportOnce,
} from "@/components/nova/motion";
import type { NovaProject } from "@/data/novaProjects";

export default function ProjectDetail({
  project,
  next,
}: {
  project: NovaProject;
  next: NovaProject;
}) {
  const META = [
    { k: "Type", v: project.type },
    { k: "Lieu", v: project.location },
    { k: "Surface", v: project.surface },
    { k: "Livraison", v: project.year },
  ];

  return (
    <div className="nova">
      <Navbar />
      <main>
        <section className="relative h-[88vh] min-h-[34rem] overflow-hidden">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="absolute inset-0"
          >
            <Image
              src={project.cover}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--nova-bg-0)] via-[var(--nova-bg-0)]/30 to-[var(--nova-bg-0)]/40" />
          <div className="nova-haze absolute inset-0" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-10 md:pb-20">
            <div className="mx-auto max-w-7xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/projets"
                  className="group inline-flex items-center gap-2 text-sm font-light text-[var(--nova-gray)] transition-colors hover:text-white"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  Tous les projets
                </Link>
              </motion.div>
              <motion.h1
                variants={blurFadeUp}
                initial="hidden"
                animate="visible"
                className="nova-display nova-glow-text mt-7 text-5xl text-white sm:text-6xl lg:text-8xl"
              >
                {project.name}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--nova-gray)]"
              >
                {project.intro}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-x-10"
          >
            {META.map((m, i) => (
              <motion.div
                key={m.k}
                variants={fadeUp}
                className={`px-1 md:px-8 ${
                  i !== META.length - 1
                    ? "md:border-r md:border-white/[0.07]"
                    : ""
                }`}
              >
                <p className="text-xs font-light uppercase tracking-[0.22em] text-[var(--nova-gray)]">
                  {m.k}
                </p>
                <p className="mt-4 text-xl font-medium tracking-tight text-white md:text-2xl">
                  {m.v}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="px-6 pb-8 md:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto max-w-3xl space-y-8"
          >
            {project.narrative.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-lg font-light leading-relaxed text-[var(--nova-gray)] md:text-xl"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <motion.div
                key={src}
                variants={blurFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`relative overflow-hidden rounded-3xl ${
                  i === 0 ? "md:col-span-2 h-[60vh]" : "h-[44vh]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.name} — vue ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.07] px-6 py-20 md:px-10 md:py-28">
          <Link
            href={`/projets/${next.slug}`}
            className="group mx-auto block max-w-7xl"
          >
            <p className="nova-eyebrow mb-5">Projet suivant</p>
            <div className="flex items-center justify-between gap-6">
              <h2 className="nova-display text-4xl text-white transition-colors duration-500 group-hover:text-[var(--nova-beige)] sm:text-5xl lg:text-7xl">
                {next.name}
              </h2>
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:border-[var(--nova-beige)] group-hover:bg-[var(--nova-beige)] group-hover:text-[#0a0a0a]">
                <ArrowUpRight size={22} strokeWidth={1.4} />
              </span>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
