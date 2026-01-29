"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const services = [
  {
    id: "general-contracting",
    title: "General Contracting",
    description:
      "Our objective is to provide turnkey solutions to our project owners thanks to an integrated design office allowing the study of the entire structure. In the execution phase, we carry out the structural work and manage, coordinate and ensure the follow-up of all the trades.",
    features: [
      "Turnkey construction solutions",
      "Heavy work and foundations",
      "Structural engineering",
      "Multi-trade coordination",
      "Quality control and supervision",
      "Project scheduling and delivery",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    id: "metal-construction",
    title: "Metal & Steel Construction",
    description:
      "With our metal work team and specialised machinery, we are able to fabricate a wide range of advanced metal work. SOCODECO is recognised as a benchmark in the metal building industry, achieved through product perfection, engineering excellence, and experienced team management.",
    features: [
      "Steel structure fabrication",
      "Industrial hangars and warehouses",
      "Pre-engineered buildings (PEB)",
      "Metal framework systems",
      "Welding and assembly",
      "Protective coatings and finishes",
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "facades",
    title: "Facades & Cladding",
    description:
      "We have trained companions and managers for the realisation of the most technical facades. Our expertise covers aluminium, Alucobond, and Alumond systems with all necessary qualifications for complex architectural envelope solutions.",
    features: [
      "Alucobond facade systems",
      "Aluminium cladding",
      "Curtain wall installation",
      "Glass facade systems",
      "Thermal insulation integration",
      "Weather protection solutions",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "bim",
    title: "Building Information Modelling",
    description:
      "Oftentimes physical and functional essence of any construction project needs to be represented digitally, in a 3D model format. Our BIM specialists create detailed digital models that enhance collaboration, minimise errors, and optimise project outcomes.",
    features: [
      "3D modelling and visualisation",
      "Clash detection and resolution",
      "4D scheduling integration",
      "Quantity take-offs and estimation",
      "Facility management support",
      "As-built documentation",
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "rehabilitation",
    title: "Rehabilitation & Renovation",
    description:
      "A specialised service carries out rehabilitation work. We have been renovating or transforming residential, office, school, hospital or other buildings for more than 30 years, bringing new life to existing structures.",
    features: [
      "Building restoration",
      "Structural reinforcement",
      "Interior renovation",
      "Historic preservation",
      "Modernisation upgrades",
      "Adaptive reuse projects",
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  },
  {
    id: "interior",
    title: "Interior Architecture",
    description:
      "Throughout your development or renovation project, an interior designer will accompany the study phase plans, materials, quotes up to the construction phase work monitoring, choice of furniture, design products, and decoration.",
    features: [
      "Space planning and design",
      "Material selection",
      "Custom furniture solutions",
      "Shop and office branding",
      "Restaurant fit-outs",
      "Turnkey interior delivery",
    ],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  },
];

export default function ServicesPage() {
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
            OUR SERVICES
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            OUR
            <br />
            <span className="text-[var(--accent)]">CAPABILITIES</span>
          </motion.h1>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 px-4 md:px-8 overflow-hidden ${
            index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface)]"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className={index % 2 === 1 ? "lg:order-2" : ""}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
                {service.title}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--text)]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div
                className={`absolute inset-0 border-2 border-[var(--accent)] -z-10 hidden md:block ${
                  index % 2 === 0
                    ? "translate-x-4 translate-y-4"
                    : "-translate-x-4 translate-y-4"
                }`}
              />
            </motion.div>
          </div>
        </section>
      ))}

      <ContactSection />
      <Footer />
    </>
  );
}
