"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLParagraphElement>(null);
  const rightColRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline lines: scrub-based reveal
      const lines = headlineRef.current?.querySelectorAll("[data-headline-line]");
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 0.8,
            },
          }
        );
      }

      // CTA button fade in
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              end: "top 65%",
              scrub: 0.6,
            },
          }
        );
      }

      // Left column: slower parallax (moves less)
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: 60, opacity: 0 },
          {
            y: -20,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 90%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );
      }

      // Right column: slightly faster parallax (moves more)
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { y: 80, opacity: 0 },
          {
            y: -40,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 90%",
              end: "top 30%",
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
      id="about"
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,6rem)",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "4rem",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#B8964E",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#1A1A1A",
          }}
        >
          About
        </span>
      </div>

      {/* Headline + CTA row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "4rem",
        }}
      >
        <div ref={headlineRef}>
          {["Creating", "Landmarks", "That Last."].map((line, i) => (
            <div
              key={i}
              data-headline-line
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#1A1A1A",
                fontStyle: i === 2 ? "italic" : "normal",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <motion.a
          ref={ctaRef}
          href="#about"
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            border: "1px solid rgba(0,0,0,0.15)",
            padding: "0.6rem 1.5rem",
            color: "#1A1A1A",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            flexShrink: 0,
            textDecoration: "none",
            opacity: 0,
          }}
          whileHover={{ borderColor: "rgba(0,0,0,0.35)" }}
          transition={{ duration: 0.3 }}
        >
          About SOCODECO
          <span style={{ fontSize: "0.85rem" }}>&rarr;</span>
        </motion.a>
      </div>

      {/* Two text columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 400px), 480px))",
          gap: "4rem",
        }}
      >
        <p
          ref={leftColRef}
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "480px",
          }}
        >
          Founded in 1991, SOCODECO is a construction and civil engineering firm
          recognized for the quality of its work and the rigor of its project
          management. With over three decades of experience, the company has
          established itself as a reliable partner for landmark projects.
        </p>
        <p
          ref={rightColRef}
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "480px",
          }}
        >
          From our headquarters in Kinshasa to our regional office in Lebanon,
          SOCODECO deploys structural expertise, advanced engineering methods and
          an unwavering commitment to quality across every project we undertake.
        </p>
      </div>
    </section>
  );
}
