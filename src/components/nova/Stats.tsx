"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "./motion";

const STATS = [
  { v: "120+", k: "Projets livrés" },
  { v: "18", k: "Pays" },
  { v: "25", k: "Architectes" },
  { v: "15", k: "Ans d'expérience" },
];

export default function Stats() {
  return (
    <section className="relative bg-[var(--nova-bg-1)] px-6 py-24 md:px-10 md:py-36">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-16 md:grid-cols-4 md:gap-x-10"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.k}
            variants={fadeUp}
            className={`px-2 md:px-8 ${
              i !== STATS.length - 1 ? "md:border-r md:border-white/[0.07]" : ""
            }`}
          >
            <p className="nova-display text-5xl text-white sm:text-6xl lg:text-7xl">
              {s.v}
            </p>
            <p className="mt-4 text-xs font-light uppercase tracking-[0.22em] text-[var(--nova-gray)]">
              {s.k}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
