"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Building3D = dynamic(() => import("./Building3D"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const ease = [0.16, 1, 0.3, 1] as const;

const lineVariant = (delay: number) => ({
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease, delay },
  },
});

const fadeUp = (delay: number) => ({
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease, delay },
  },
});

/* ------------------------------------------------------------------ */
/*  Spring config for CTA buttons                                     */
/* ------------------------------------------------------------------ */

const ctaSpring = { type: "spring" as const, stiffness: 400, damping: 17 };

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse({ x, y });
    },
    []
  );

  /* ---- GSAP ScrollTrigger: text parallax + fade ---- */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    if (!section || !content || !headline) return;

    // Headline moves up faster than scroll (parallax)
    gsap.to(headline, {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Entire content layer fades out as user scrolls past 80%
    gsap.to(content, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "80% bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* ---------- 3-D canvas (background) ---------- */}
      <Building3D mouseX={mouse.x} mouseY={mouse.y} />

      {/* ---------- gradient overlay ---------- */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.80) 40%, transparent 75%)",
        }}
      />

      {/* ---------- content layer ---------- */}
      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-24"
      >
        {/* bottom row: left text + right info */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* ---- left: headline ---- */}
          <motion.div
            ref={headlineRef}
            initial="hidden"
            animate="visible"
            className="max-w-[820px]"
          >
            {/* scroll hint with bouncing arrow */}
            <motion.span
              variants={fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 select-none"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "#777",
                textTransform: "uppercase",
              }}
            >
              [ Scroll Down{" "}
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
              >
                &#8595;
              </motion.span>{" "}
              ]
            </motion.span>

            {/* headline */}
            <h1
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}
            >
              <motion.span
                variants={lineVariant(0.3)}
                className="block"
                style={{ fontWeight: 300, color: "#F5F2EA" }}
              >
                BUILDING
              </motion.span>
              <motion.span
                variants={lineVariant(0.6)}
                className="block"
                style={{ fontWeight: 300, color: "#F5F2EA" }}
              >
                THE FUTURE
              </motion.span>
              <motion.span
                variants={lineVariant(0.9)}
                className="block"
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#C8A96B",
                }}
              >
                OF CITIES
              </motion.span>
            </h1>
          </motion.div>

          {/* ---- right: description + CTAs ---- */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="pointer-events-auto flex flex-col items-start gap-6 md:items-end md:text-right"
            style={{ maxWidth: 320 }}
          >
            <motion.p
              variants={fadeUp(1.2)}
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "#999",
              }}
            >
              Premium construction, engineering, and real estate development for
              landmark projects.
            </motion.p>

            <motion.div
              variants={fadeUp(1.5)}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={ctaSpring}
                className="inline-block transition-colors duration-300 hover:bg-[rgba(200,169,107,0.08)]"
                style={{
                  border: "1px solid rgba(200,169,107,0.3)",
                  padding: "0.75rem 2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.7rem",
                  color: "#C8A96B",
                }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={ctaSpring}
                className="inline-block transition-colors duration-300 hover:opacity-90"
                style={{
                  backgroundColor: "#C8A96B",
                  color: "#0a0a0a",
                  padding: "0.75rem 2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                Start a Project
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
