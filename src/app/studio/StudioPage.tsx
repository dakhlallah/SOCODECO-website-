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
  scaleIn,
  stagger,
  viewportOnce,
} from "@/components/nova/motion";

const APPROACH = [
  {
    n: "01",
    title: "Écouter le lieu",
    text: "Chaque projet débute par une lecture sensible du site, de sa lumière et de son climat.",
  },
  {
    n: "02",
    title: "Dessiner l'intention",
    text: "Nous traduisons l'usage en géométrie : un parti clair, tenu jusque dans le détail.",
  },
  {
    n: "03",
    title: "Construire la matière",
    text: "Modélisation BIM, prototypage et suivi de chantier au service d'une exécution sans compromis.",
  },
];

const VALUES = [
  "Intemporalité",
  "Précision",
  "Lumière",
  "Silence",
  "Matière",
  "Émotion",
];

export default function StudioPage() {
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
              Le studio
            </motion.p>
            <motion.h1
              variants={blurFadeUp}
              initial="hidden"
              animate="visible"
              className="nova-display nova-glow-text max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl"
            >
              Créer des lieux qui traversent le temps.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[var(--nova-gray)] md:text-xl"
            >
              ATELIER NOVA développe une architecture contemporaine pensée
              comme une expérience sensorielle. Notre approche unit esthétique,
              technologie et émotion.
            </motion.p>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto h-[58vh] max-w-7xl overflow-hidden rounded-3xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2000&q=85"
              alt="Atelier d'architecture ATELIER NOVA"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--nova-bg-0)]/25" />
          </motion.div>
        </section>

        <section className="px-6 py-8 md:px-10">
          <div className="mx-auto max-w-3xl">
            <motion.p
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-2xl font-light leading-relaxed text-white md:text-3xl"
            >
              Nous croyons qu&apos;un bâtiment réussi se mesure au calme
              qu&apos;il procure. Notre travail consiste à retirer l&apos;inutile
              jusqu&apos;à ce qu&apos;il ne reste que l&apos;essentiel : la
              lumière, la proportion, la matière.
            </motion.p>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="nova-display max-w-3xl text-4xl text-white sm:text-5xl"
            >
              Notre approche, en trois mouvements.
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3"
            >
              {APPROACH.map((a, i) => (
                <motion.div
                  key={a.n}
                  variants={fadeUp}
                  className={`px-0 md:px-10 ${
                    i !== APPROACH.length - 1
                      ? "md:border-r md:border-white/[0.07]"
                      : ""
                  } ${i !== 0 ? "mt-12 md:mt-0" : "md:pl-0"}`}
                >
                  <span className="nova-display text-5xl text-[var(--nova-beige)]">
                    {a.n}
                  </span>
                  <h3 className="mt-7 text-2xl font-medium tracking-tight text-white">
                    {a.title}
                  </h3>
                  <p className="mt-5 max-w-xs text-[0.95rem] font-light leading-relaxed text-[var(--nova-gray)]">
                    {a.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[var(--nova-bg-1)] px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-7xl">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="nova-eyebrow mb-10"
            >
              Ce qui nous guide
            </motion.p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-x-12 gap-y-6"
            >
              {VALUES.map((v) => (
                <motion.span
                  key={v}
                  variants={fadeUp}
                  className="nova-display text-3xl text-white sm:text-4xl lg:text-5xl"
                >
                  {v}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <Link href="/#contact" className="group mx-auto block max-w-7xl">
            <p className="nova-eyebrow mb-5">Travaillons ensemble</p>
            <div className="flex items-center justify-between gap-6">
              <h2 className="nova-display text-4xl text-white transition-colors duration-500 group-hover:text-[var(--nova-beige)] sm:text-5xl lg:text-7xl">
                Démarrer une conversation
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
