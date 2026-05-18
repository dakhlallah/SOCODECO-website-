"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";
import { novaProjects, type NovaProject } from "@/data/novaProjects";

function ProjectCard({ p }: { p: NovaProject }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div variants={blurFadeUp}>
      <Link
        href={`/projets/${p.slug}`}
        ref={ref}
        className="group relative block h-[78vh] overflow-hidden rounded-3xl"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src={p.cover}
            alt={p.name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--nova-bg-0)]/90 via-transparent to-[var(--nova-bg-0)]/20" />

        <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-12">
          <div className="flex justify-end">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
              <ArrowUpRight size={20} strokeWidth={1.4} />
            </span>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h3 className="nova-display text-4xl text-white md:text-6xl">
              {p.name}
            </h3>
            <div className="flex gap-8 text-sm font-light text-[var(--nova-gray)]">
              <span>{p.type}</span>
              <span>{p.location}</span>
              <span className="text-[var(--nova-beige)]">{p.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="projets"
      className="relative bg-[var(--nova-bg-0)] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="nova-eyebrow mb-6"
            >
              Réalisations sélectionnées
            </motion.p>
            <motion.h2
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="nova-display max-w-2xl text-4xl text-white sm:text-5xl lg:text-6xl"
            >
              Des œuvres qui habitent le paysage.
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Link
              href="/projets"
              className="group inline-flex items-center gap-2 text-sm font-light tracking-wide text-[var(--nova-gray)] transition-colors hover:text-white"
            >
              Voir tous les projets
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 flex flex-col gap-7"
        >
          {novaProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
