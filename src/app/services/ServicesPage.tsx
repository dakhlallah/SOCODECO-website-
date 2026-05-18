"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/nova/Navbar";
import Footer from "@/components/nova/Footer";
import {
  blurFadeUp,
  fadeUp,
  stagger,
  viewportOnce,
} from "@/components/nova/motion";

const SERVICES = [
  {
    title: "Architecture résidentielle",
    text: "Villas et résidences privées conçues comme des œuvres habitables, où chaque seuil est dessiné pour le corps et le regard.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
  },
  {
    title: "Architecture commerciale",
    text: "Sièges, lieux culturels et espaces de travail à forte identité, pensés pour durer et pour fédérer.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85",
  },
  {
    title: "Design intérieur",
    text: "Atmosphères sur mesure : matières nobles, lumière maîtrisée et mobilier dessiné pour le lieu.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
  },
  {
    title: "BIM & visualisation 3D",
    text: "Modélisation avancée et images photoréalistes pour décider juste, du concept au chantier.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
  },
];

const PROCESS = [
  { n: "01", t: "Esquisse", d: "Intention, faisabilité, premières lignes." },
  { n: "02", t: "Conception", d: "Avant-projet, matières, lumière, BIM." },
  { n: "03", t: "Développement", d: "Détails techniques, appels d'offres." },
  { n: "04", t: "Réalisation", d: "Suivi de chantier et livraison." },
];

export default function ServicesPage() {
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
              Nos expertises
            </motion.p>
            <motion.h1
              variants={blurFadeUp}
              initial="hidden"
              animate="visible"
              className="nova-display nova-glow-text max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl"
            >
              Une maîtrise complète, de l&apos;idée à la matière.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[var(--nova-gray)] md:text-xl"
            >
              Quatre domaines d&apos;intervention, une même exigence : la
              justesse.
            </motion.p>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2"
          >
            {SERVICES.map((s) => (
              <motion.article
                key={s.title}
                variants={blurFadeUp}
                className="group relative h-[28rem] overflow-hidden rounded-3xl md:h-[32rem]"
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
                      <h2 className="text-xl font-medium tracking-tight text-white md:text-2xl">
                        {s.title}
                      </h2>
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
        </section>

        <section className="bg-[var(--nova-bg-1)] px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="nova-display max-w-3xl text-4xl text-white sm:text-5xl"
            >
              Un processus clair, du premier trait à la clé en main.
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
            >
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.n}
                  variants={fadeUp}
                  className={`px-0 lg:px-8 ${
                    i !== PROCESS.length - 1
                      ? "lg:border-r lg:border-white/[0.07]"
                      : ""
                  } ${i !== 0 ? "mt-10 sm:mt-0" : "lg:pl-0"}`}
                >
                  <span className="nova-display text-4xl text-[var(--nova-beige)]">
                    {p.n}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight text-white">
                    {p.t}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-[var(--nova-gray)]">
                    {p.d}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <Link href="/#contact" className="group mx-auto block max-w-7xl">
            <p className="nova-eyebrow mb-5">Un projet en tête</p>
            <div className="flex items-center justify-between gap-6">
              <h2 className="nova-display text-4xl text-white transition-colors duration-500 group-hover:text-[var(--nova-beige)] sm:text-5xl lg:text-7xl">
                Parlons-en
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
