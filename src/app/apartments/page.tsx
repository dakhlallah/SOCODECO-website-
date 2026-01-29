"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const apartments = [
  {
    name: "Apartment Quantum",
    location: "Kinshasa, DRC",
    type: "Premium High-Rise",
    units: "Available units",
    status: "Available",
    image: "/images/apartments/quantum-exterior.jpg",
    features: ["Modern finishes", "Dual elevator access", "Fitted kitchens", "Private balconies"],
    gallery: [
      "/images/apartments/quantum-living.jpg",
      "/images/apartments/quantum-kitchen.jpg",
      "/images/apartments/quantum-elevator.jpg",
      "/images/apartments/quantum-bedroom.jpg",
    ],
  },
  {
    name: "Rhus Luxury Apartments",
    location: "Beirut, Lebanon",
    type: "Luxury High-Rise",
    units: "48 units",
    status: "Available",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    features: ["Panoramic city views", "Rooftop amenities", "24/7 concierge services", "Secure underground parking"],
  },
  {
    name: "Kinshasa Heights",
    location: "Kinshasa, DRC",
    type: "Premium Residential",
    units: "72 units",
    status: "Pre-Sale",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    features: ["River views", "Fitness facilities", "Children's recreation area", "Backup power systems"],
  },
  {
    name: "Goma Gardens",
    location: "Goma, DRC",
    type: "Mid-Rise Complex",
    units: "36 units",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    features: ["Lake views", "Private gardens", "Community facilities", "Secure compound"],
  },
  {
    name: "Marina Bay Residences",
    location: "Beirut, Lebanon",
    type: "Waterfront Living",
    units: "64 units",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    features: ["Sea views", "Private marina access", "Wellness facilities", "Smart home integration"],
  },
];

const statusColors: Record<string, string> = {
  Available: "bg-[var(--accent)] text-[var(--background)]",
  "Pre-Sale": "bg-blue-500 text-[var(--text)]",
  "Sold Out": "bg-red-500 text-[var(--text)]",
  "Under Construction": "bg-yellow-500 text-[var(--background)]",
};

export default function ApartmentsPage() {
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
            RESIDENTIAL
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            LUXURY
            <br />
            <span className="text-[var(--accent)]">APARTMENTS</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover exceptional residential developments crafted with precision
            and designed for contemporary lifestyles in prestigious locations.
          </motion.p>
        </div>
      </section>

      {/* Apartments List */}
      <section className="py-24 px-4 md:px-8">
        <div className="space-y-16">
          {apartments.map((apt, index) => (
            <motion.div
              key={apt.name}
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden group ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={apt.image}
                  alt={apt.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`font-mono text-xs px-3 py-1.5 ${
                      statusColors[apt.status]
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="font-mono text-[var(--accent)] text-xs mb-2 block">
                  {apt.type}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-2">
                  {apt.name}
                </h2>
                <p className="font-mono text-sm text-[var(--text-muted)] mb-6">
                  {apt.location} • {apt.units}
                </p>

                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {apt.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[var(--text)]"
                    >
                      <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 font-display text-lg text-[var(--accent)] hover:text-[var(--text)] transition-colors group"
                >
                  ENQUIRE NOW
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-2 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
