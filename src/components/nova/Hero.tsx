"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, EASE } from "./motion";

const SPECS = [
  { k: "Surface", v: "850 m²" },
  { k: "Lieu", v: "Genève" },
  { k: "Type", v: "Résidence privée" },
  { k: "Budget", v: "Sur mesure" },
  { k: "Livraison", v: "2026" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2400&q=85"
          alt="Villa contemporaine dans une forêt brumeuse au crépuscule"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[var(--nova-bg-0)]/35" />
        <div className="nova-haze absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--nova-bg-0)] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-36 pb-24 md:px-10 lg:grid-cols-12 lg:pt-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7"
        >
          <motion.p variants={fadeUp} className="nova-eyebrow mb-7">
            Studio d&apos;architecture contemporaine
          </motion.p>
          <motion.h1
            variants={blurFadeUp}
            className="nova-display nova-glow-text max-w-3xl text-[2.7rem] leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
          >
            L&apos;ingénierie émotionnelle de l&apos;espace.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--nova-gray)] md:text-lg"
          >
            Nous concevons des architectures intemporelles où innovation,
            lumière et expérience humaine fusionnent.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#projets"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nova-beige)] px-8 py-4 text-sm font-medium tracking-wide text-[#0a0a0a] transition-all duration-500 hover:bg-[var(--nova-champagne)]"
            >
              Découvrir nos projets
              <ArrowUpRight
                size={17}
                strokeWidth={1.6}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#studio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-light tracking-wide text-white transition-all duration-500 hover:border-[var(--nova-beige)] hover:bg-white/[0.04]"
            >
              Notre approche
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={blurFadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="lg:col-span-5 lg:justify-self-end"
        >
          <div className="liquid-glass w-full max-w-sm rounded-3xl p-8">
            <p className="nova-eyebrow mb-6">Projet en cours</p>
            <div className="space-y-0">
              {SPECS.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, ease: EASE }}
                >
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-xs font-light uppercase tracking-[0.2em] text-[var(--nova-gray)]">
                      {s.k}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-white">
                      {s.v}
                    </span>
                  </div>
                  {i < SPECS.length - 1 && <div className="nova-hairline" />}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#principes"
        aria-label="Faire défiler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={20} strokeWidth={1.2} />
        </motion.span>
      </motion.a>
    </section>
  );
}
