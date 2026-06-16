"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  location: string;
  area: string;
  year: string;
  desc: string;
  image: string;
}

const projects: Project[] = [
  {
    name: "Avant Project",
    location: "Kinshasa, DRC",
    area: "45,000 m²",
    year: "2025",
    desc: "A visionary mixed-use development redefining urban living in Kinshasa. Commercial spaces, residential towers and public amenities in one architectural masterpiece.",
    image: "/images/avant-project/avant-main.png",
  },
  {
    name: "Immeuble Quantum",
    location: "Kinshasa, DRC",
    area: "12,000 m²",
    year: "2021",
    desc: "A modern landmark designed for clarity, comfort and performance. Clean facade and refined lines reflecting contemporary vision.",
    image: "/images/immeuble-quantum.png",
  },
  {
    name: "Résidence Angie",
    location: "Kinshasa, DRC",
    area: "8,500 m²",
    year: "2020",
    desc: "A prestigious residential complex demonstrating our commitment to quality construction and modern living standards.",
    image: "/images/apartments/quantum-exterior.jpg",
  },
  {
    name: "Résidence Familiale",
    location: "Beirut, Lebanon",
    area: "6,200 m²",
    year: "2018",
    desc: "A premium residential development in Lebanon offering refined living spaces and cross-regional construction capabilities.",
    image: "/images/avant-project/avant-view-1.png",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,6rem)",
        background: "#FFFFFF",
      }}
    >
      {/* Top label */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#1A1A1A",
          marginBottom: "3rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#B8964E",
          }}
        />
        Projects
      </span>

      {/* Headline */}
      <h2
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          color: "#1A1A1A",
          marginBottom: "5rem",
        }}
      >
        Selected
        <br />
        <em>Works.</em>
      </h2>

      {/* Project blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
        {projects.map((project, index) => (
          <ProjectBlock
            key={project.name}
            project={project}
            index={index}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imageSlideX = reversed ? 40 : -40;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Inner image parallax: translate y from 20px to -20px as card scrolls
      if (imageRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: imageSlideX }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: "1 1 60%",
          minWidth: "300px",
        }}
      >
        <motion.div
          ref={imageContainerRef}
          style={{
            aspectRatio: "16 / 10",
            overflow: "hidden",
          }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            ref={imageRef}
            src={project.image}
            alt={project.name}
            style={{
              width: "100%",
              height: "110%",
              objectFit: "cover",
              willChange: "transform",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          flex: "1 1 40%",
          minWidth: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#999",
          }}
        >
          {project.year} &mdash; {project.location}
        </span>

        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
            marginTop: "1rem",
          }}
        >
          {project.name}
        </h3>

        <span
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#B8964E",
            marginTop: "0.5rem",
          }}
        >
          {project.area}
        </span>

        <p
          style={{
            fontSize: "0.85rem",
            color: "#888",
            lineHeight: 1.7,
            marginTop: "1.5rem",
          }}
        >
          {project.desc}
        </p>

        <motion.a
          href="#"
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#B8964E",
            marginTop: "2rem",
            textDecoration: "none",
            cursor: "pointer",
            display: "inline-block",
          }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          View Project &rarr;
        </motion.a>
      </motion.div>
    </div>
  );
}
