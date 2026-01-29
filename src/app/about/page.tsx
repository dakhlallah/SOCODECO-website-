"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const team = [
  { name: "Oussama Dakhlallah", role: "CEO & Founder", image: "/images/oussama-dakhlallah.jpg" },
  { name: "Jean-Pierre Mutombo", role: "Managing Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Sarah El-Khoury", role: "Chief Operations Officer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Emmanuel Kabongo", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] flex items-end pt-32 pb-16 px-4 md:px-8">
        <div className="w-full">
          <motion.span
            className="font-mono text-[var(--accent)] text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT US
          </motion.span>
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text)] leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            ENGINEERING
            <br />
            <span className="text-[var(--accent)]">EXCELLENCE</span>
            <br />
            SINCE 1991
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-8">
              OUR STORY
            </h2>
            <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
              <p>
                Founded in 1991, Construction SOCODECO is a Lebanese leading company
                that has been delivering a wide range of quality and innovative
                metal work and steel building constructions inside and outside Lebanon.
                With over three decades of experience, we have established ourselves
                as pioneers in project management and construction excellence.
              </p>
              <p>
                Our expansion to the Democratic Republic of Congo marked a significant
                chapter in our history, enabling us to bring world-class construction
                expertise to Central Africa. From our headquarters in Kinshasa&apos;s
                Gombe district, we serve clients across the region with the same
                commitment to quality that defines our Lebanese operations.
              </p>
              <p>
                Today, SOCODECO stands as a demonstration of what is achievable
                when professional excellence meets methodical precision. Specialising
                in general contracting, metal structures, Alucobond facades, foundations,
                and turnkey construction, we continue to shape lifestyles and build
                the infrastructure of tomorrow.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative aspect-[4/3]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
              alt="SOCODECO construction site"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border-2 border-[var(--accent)] translate-x-4 translate-y-4 -z-10 hidden md:block" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 md:px-8 bg-[var(--surface)]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            OUR VALUES
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Excellence",
              description: "We uphold the highest professional standards across every project, regardless of scale or complexity.",
            },
            {
              title: "Integrity",
              description: "Transparent communication and ethical business practices inform all organisational decisions.",
            },
            {
              title: "Innovation",
              description: "We adopt advanced technologies and progressive methodologies to deliver superior outcomes.",
            },
            {
              title: "Sustainability",
              description: "We construct for present requirements whilst safeguarding resources for future generations.",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="border-l-2 border-[var(--accent)] pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display text-2xl text-[var(--text)] mb-3">
                {value.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 md:px-8" id="team">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[var(--accent)] text-sm mb-4 block">
            EXECUTIVE TEAM
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
            LEADERSHIP
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/20 transition-all duration-500" />
              </div>
              <h3 className="font-display text-xl text-[var(--text)]">{member.name}</h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
