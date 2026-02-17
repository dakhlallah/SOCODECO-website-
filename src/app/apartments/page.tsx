"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const apartments = [
  {
    name: "Appartements Quantum",
    location: "Kinshasa, RDC",
    type: "Tour Premium",
    units: "Unités disponibles",
    status: "available",
    image: "/SOCODECO-website-/images/apartments/quantum-exterior.jpg",
    features: ["Finitions modernes", "Double accès ascenseur", "Cuisines équipées", "Balcons privatifs"],
  },
  {
    name: "Résidences Rhus Luxe",
    location: "Beyrouth, Liban",
    type: "Tour de Luxe",
    units: "48 unités",
    status: "available",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    features: ["Vue panoramique", "Équipements rooftop", "Conciergerie 24h/24", "Parking souterrain sécurisé"],
  },
  {
    name: "Kinshasa Heights",
    location: "Kinshasa, RDC",
    type: "Résidentiel Premium",
    units: "72 unités",
    status: "presale",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    features: ["Vue sur le fleuve", "Salle de sport", "Aire de jeux enfants", "Groupe électrogène"],
  },
  {
    name: "Goma Gardens",
    location: "Goma, RDC",
    type: "Complexe Résidentiel",
    units: "36 unités",
    status: "sold",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    features: ["Vue sur le lac", "Jardins privatifs", "Équipements collectifs", "Résidence sécurisée"],
  },
  {
    name: "Marina Bay Residences",
    location: "Beyrouth, Liban",
    type: "Front de Mer",
    units: "64 unités",
    status: "construction",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    features: ["Vue sur mer", "Accès marina privée", "Centre bien-être", "Domotique intégrée"],
  },
];

export default function ApartmentsPage() {
  const t = useTranslation();

  const statusColors: Record<string, string> = {
    available: "bg-[var(--accent)] text-[var(--background)]",
    presale: "bg-blue-500 text-[var(--text)]",
    sold: "bg-red-500 text-[var(--text)]",
    construction: "bg-yellow-500 text-[var(--background)]",
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t.apartments.status.available,
      presale: t.apartments.status.presale,
      sold: t.apartments.status.sold,
      construction: t.apartments.status.construction,
    };
    return statusMap[status] || status;
  };

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
            {t.apartments.label}
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.apartments.title1}
            <br />
            <span className="text-[var(--accent)]">{t.apartments.title2}</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-[var(--text-muted)] max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.apartments.description}
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
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`font-mono text-xs px-3 py-1.5 ${
                      statusColors[apt.status]
                    }`}
                  >
                    {getStatusLabel(apt.status)}
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
                  {t.apartments.contactCta}
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
