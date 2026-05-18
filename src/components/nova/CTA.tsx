"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { blurFadeUp, fadeUp, stagger, viewportOnce } from "./motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[88vh] items-center overflow-hidden px-6 md:px-10"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=2400&q=85"
          alt="Architecture de luxe illuminée la nuit"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--nova-bg-0)]/65" />
        <div className="nova-haze absolute inset-0" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p variants={fadeUp} className="nova-eyebrow mb-7">
          Construisons ensemble
        </motion.p>
        <motion.h2
          variants={blurFadeUp}
          className="nova-display nova-glow-text text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Construisons votre prochaine icône architecturale.
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="mailto:contact@ateliernova.fr"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nova-beige)] px-9 py-4 text-sm font-medium tracking-wide text-[#0a0a0a] transition-all duration-500 hover:bg-[var(--nova-champagne)]"
          >
            Commencer un projet
            <ArrowUpRight
              size={17}
              strokeWidth={1.6}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="tel:+33100000000"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-9 py-4 text-sm font-light tracking-wide text-white transition-all duration-500 hover:border-[var(--nova-beige)] hover:bg-white/[0.05]"
          >
            <Phone size={15} strokeWidth={1.5} />
            Planifier un appel
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
