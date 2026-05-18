"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/nova/Navbar";
import Footer from "@/components/nova/Footer";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "@/components/nova/motion";
import { novaProjects } from "@/data/novaProjects";

export default function ProjectsIndex() {
  return (
    <div className="nova">
      <Navbar />
      <main>
        <section className="relative px-6 pt-44 pb-20 md:px-10 md:pt-52">
          <div className="mx-auto max-w-7xl">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="nova-eyebrow mb-7"
            >
              Portfolio
            </motion.p>
            <motion.h1
              variants={blurFadeUp}
              initial="hidden"
              animate="visible"
              className="nova-display nova-glow-text max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl"
            >
              Chaque projet, une géographie sensible.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--nova-gray)] md:text-lg"
            >
              Une sélection d&apos;œuvres où la lumière, la matière et l&apos;usage
              composent une même partition.
            </motion.p>
          </div>
        </section>

        <section className="px-6 pb-28 md:px-10 md:pb-40">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2"
          >
            {novaProjects.map((p) => (
              <motion.div key={p.slug} variants={blurFadeUp}>
                <Link
                  href={`/projets/${p.slug}`}
                  className="group relative block h-[30rem] overflow-hidden rounded-3xl md:h-[34rem]"
                >
                  <Image
                    src={p.cover}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--nova-bg-0)]/90 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
                    <div className="flex justify-end">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <ArrowUpRight size={18} strokeWidth={1.4} />
                      </span>
                    </div>
                    <div>
                      <h2 className="nova-display text-3xl text-white md:text-4xl">
                        {p.name}
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-6 text-sm font-light text-[var(--nova-gray)]">
                        <span>{p.type}</span>
                        <span>{p.location}</span>
                        <span className="text-[var(--nova-beige)]">
                          {p.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
