"use client";

import { motion } from "framer-motion";
import { Gem, LayoutGrid, Box } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";

const ITEMS = [
  {
    icon: Gem,
    title: "Matériaux & précision",
    text: "Nous sélectionnons des matériaux nobles et des solutions techniques pensées pour durer.",
  },
  {
    icon: LayoutGrid,
    title: "Design fonctionnel",
    text: "Chaque espace est conçu pour améliorer l'expérience quotidienne et la fluidité des usages.",
  },
  {
    icon: Box,
    title: "Innovation BIM & 3D",
    text: "Nous intégrons les technologies BIM et la modélisation avancée pour une précision totale.",
  },
];

export default function Principles() {
  return (
    <section
      id="principes"
      className="relative bg-[var(--nova-bg-1)] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          variants={blurFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="nova-display max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl"
        >
          Les principes qui définissent notre vision.
        </motion.h2>

        <div className="mt-9 nova-hairline" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3"
        >
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className={`relative px-0 md:px-10 ${
                i === 0 ? "md:pl-0" : ""
              } ${i !== ITEMS.length - 1 ? "md:border-r md:border-white/[0.07]" : ""} ${
                i !== 0 ? "mt-14 md:mt-0" : ""
              }`}
            >
              <it.icon
                size={26}
                strokeWidth={1.1}
                className="text-[var(--nova-beige)]"
              />
              <h3 className="mt-8 text-2xl font-medium tracking-tight text-white">
                {it.title}
              </h3>
              <p className="mt-5 max-w-xs text-[0.95rem] font-light leading-relaxed text-[var(--nova-gray)]">
                {it.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
