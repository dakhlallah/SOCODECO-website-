"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const architectureProjects = [
  {
    name: "Kinshasa Cultural Centre",
    type: "Cultural",
    year: "2024",
    description: "A landmark cultural facility celebrating Congolese heritage through distinguished contemporary architectural expression.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    name: "Beirut Business Tower",
    type: "Commercial",
    year: "2023",
    description: "A 35-storey commercial tower redefining the Beirut skyline through sustainable design principles and engineering innovation.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    name: "Villa Euphoria",
    type: "Residential",
    year: "2023",
    description: "An ultra-luxury private residence integrating tropical architecture with refined minimalist interior spaces.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    name: "Goma Medical Centre",
    type: "Healthcare",
    year: "2022",
    description: "A state-of-the-art healthcare facility designed to optimise patient comfort and operational efficiency.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    name: "Lubumbashi Technology Hub",
    type: "Commercial",
    year: "2022",
    description: "An innovation campus designed to support technology enterprises with flexible, collaborative working environments.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    name: "Lakeside Resort",
    type: "Hospitality",
    year: "2021",
    description: "A boutique resort development celebrating the natural splendour of Lake Kivu through sustainable architectural design.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DESIGN
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            ARCHITECTURE
            <br />
            <span className="text-[var(--accent)]">& DESIGN</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our architectural division creates inspiring spaces that combine
            innovative design principles with practical functionality and
            meaningful local context.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              title: "Context",
              description:
                "Every design responds thoughtfully to its environment, climate, and cultural setting.",
            },
            {
              title: "Innovation",
              description:
                "We advance design boundaries whilst respecting proven principles of architecture.",
            },
            {
              title: "Sustainability",
              description:
                "Environmental responsibility is integrated into every design and material decision.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="border-l-2 border-[var(--accent)] pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display text-3xl text-[var(--text)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 md:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            FEATURED PROJECTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {architectureProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
                <motion.div
                  className="absolute inset-0 border-2 border-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {project.type}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {project.year}
                </span>
              </div>
              <h3 className="font-display text-2xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {project.name}
              </h3>
              <p className="text-[var(--text-muted)] text-sm">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
