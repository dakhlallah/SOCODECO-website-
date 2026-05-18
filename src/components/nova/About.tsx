"use client";

import { motion } from "framer-motion";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";

export default function About() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden bg-[#f6f4f0] px-6 py-28 text-[#0a0a0a] md:px-10 md:py-44"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute -right-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-[#0a0a0a]/10"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-24 top-24 hidden h-24 w-24 rounded-full bg-[var(--nova-beige)]/40 blur-2xl md:block"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-4xl"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0a0a0a]/50"
        >
          À propos
        </motion.p>
        <motion.h2
          variants={blurFadeUp}
          className="nova-display mt-8 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
        >
          Créer des lieux qui traversent le temps.
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mt-10 h-px w-24 bg-[#0a0a0a]/20"
        />
        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-[#0a0a0a]/70 md:text-xl"
        >
          ATELIER NOVA développe une architecture contemporaine pensée comme
          une expérience sensorielle. Notre approche unit esthétique,
          technologie et émotion.
        </motion.p>
      </motion.div>
    </section>
  );
}
