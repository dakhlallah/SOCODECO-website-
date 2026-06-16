"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Construction",
    description:
      "From foundation to finishing, we deliver complete building solutions with precision engineering and uncompromising quality standards.",
  },
  {
    number: "02",
    title: "Engineering",
    description:
      "Structural analysis, BIM modeling, and technical coordination that ensures every project meets international standards.",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "Designing spaces that inspire — combining innovation, sustainability, and contextual sensitivity.",
  },
  {
    number: "04",
    title: "Real Estate Development",
    description:
      "Strategic development of premium residential and commercial properties in key urban markets.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline scrub-based reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,6rem)",
        background: "#F9F8F6",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "3rem",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#B8964E",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#999",
          }}
        >
          Services
        </span>
      </div>

      {/* Headline */}
      <div ref={headlineRef} style={{ marginBottom: "5rem" }}>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#1A1A1A",
          }}
        >
          What We
        </h2>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.05,
            color: "#1A1A1A",
          }}
        >
          Build.
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: { number: string; title: string; description: string };
}) {
  return (
    <motion.div
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.06)",
        padding: "2.5rem",
        cursor: "pointer",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        borderColor: "rgba(184,150,78,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span
        style={{
          fontSize: "4rem",
          fontWeight: 200,
          color: "rgba(184,150,78,0.15)",
          lineHeight: 1,
          display: "block",
          transition: "color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {service.number}
      </span>

      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "#1A1A1A",
          marginTop: "1.5rem",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontSize: "0.85rem",
          color: "#888",
          lineHeight: 1.7,
          marginTop: "1rem",
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          marginTop: "2rem",
          color: "#B8964E",
          fontSize: "1.1rem",
        }}
      >
        &rarr;
      </div>
    </motion.div>
  );
}
