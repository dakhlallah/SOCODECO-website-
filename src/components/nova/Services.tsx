"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";

const SERVICES = [
  {
    title: "Architecture résidentielle",
    text: "Villas et résidences privées conçues comme des œuvres habitables.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
  },
  {
    title: "Architecture commerciale",
    text: "Espaces de travail et lieux culturels à forte identité.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
  },
  {
    title: "Design intérieur",
    text: "Atmosphères sur mesure, matières et lumière maîtrisées.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85",
  },
  {
    title: "BIM & visualisation 3D",
    text: "Modélisation avancée pour une précision sans compromis.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=85",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[var(--nova-bg-0)] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="nova-eyebrow mb-6"
        >
          Nos expertises
        </motion.p>
        <motion.h2
          variants={blurFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="nova-display max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl"
        >
          Une maîtrise complète, de l&apos;idée à la matière.
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              className="group relative h-[26rem] overflow-hidden rounded-3xl md:h-[30rem]"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--nova-bg-0)] via-[var(--nova-bg-0)]/30 to-transparent" />
              <div className="liquid-glass absolute inset-x-5 bottom-5 rounded-2xl p-6 md:inset-x-7 md:bottom-7 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-white md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[var(--nova-gray)]">
                      {s.text}
                    </p>
                  </div>
                  <span className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-[var(--nova-beige)] group-hover:bg-[var(--nova-beige)] group-hover:text-[#0a0a0a]">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
