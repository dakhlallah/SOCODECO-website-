"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const materials = [
  {
    name: "Concrete & Cement",
    description: "High-performance concrete formulations and cement products engineered for structural excellence.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    specs: ["Compressive strength: 25-50 MPa", "Rapid-setting formulations", "Environmentally conscious variants"],
  },
  {
    name: "Structural Steel",
    description: "Premium-grade steel for structural frameworks, reinforcement, and architectural applications.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: ["Grade: S355 & S460", "Hot-rolled sections", "Corrosion-resistant coatings"],
  },
  {
    name: "Aggregates",
    description: "Quality-controlled stone, sand, and gravel for foundation works and concrete production.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    specs: ["Multiple grain classifications", "Washed and screened", "Local and imported sources"],
  },
  {
    name: "Timber & Wood Products",
    description: "Sustainably sourced timber products for construction and interior finishing applications.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    specs: ["FSC-certified options", "Treated for durability", "Multiple species available"],
  },
  {
    name: "Insulation Systems",
    description: "Thermal and acoustic insulation solutions for energy-efficient building performance.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    specs: ["Mineral wool systems", "Foam board solutions", "Reflective barrier options"],
  },
  {
    name: "Roofing Systems",
    description: "Comprehensive roofing solutions encompassing waterproofing and finishing materials.",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
    specs: ["Metal roofing systems", "Membrane applications", "Tile specifications"],
  },
];

export default function MaterialsPage() {
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
            MATERIALS
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            BUILDING
            <br />
            <span className="text-[var(--accent)]">MATERIALS</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We source and supply premium construction materials, ensuring every
            project is constructed with quality-assured components that meet
            international specifications and standards.
          </motion.p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              className="group bg-[var(--surface)] border border-[var(--surface-light)] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--text)] mb-2">
                  {material.name}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  {material.description}
                </p>
                <ul className="space-y-1">
                  {material.specs.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-xs text-[var(--accent)]"
                    >
                      → {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
            MATERIAL ENQUIRIES
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Contact our procurement team for quotations on construction materials.
            We offer competitive pricing and dependable delivery across the Democratic
            Republic of Congo and Lebanon.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-[var(--accent)] text-[var(--background)] font-display text-xl hover:bg-[var(--accent-dark)] transition-colors"
          >
            REQUEST QUOTATION
          </a>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
