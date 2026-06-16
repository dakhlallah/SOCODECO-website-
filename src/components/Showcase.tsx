"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax + scale via GSAP ScrollTrigger
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -100,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Text reveal: fade in and slide up on enter
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(50vh, 80vh, 80vh)",
        background: "#F9F8F6",
      }}
    >
      {/* Parallax Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src="/images/avant-project/avant-main.png"
          alt="Avant Project — Kinshasa, DRC"
          className="w-full h-full object-cover"
          style={{
            transform: "scale(1.15)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 10%, transparent 60%)",
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.15)",
        }}
      />

      {/* Text overlay — bottom-left */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 z-10 p-8 md:p-12 lg:p-16"
      >
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "0.5rem",
          }}
        >
          Featured Project
        </p>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 300,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "0.35rem",
          }}
        >
          Avant Project
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
          Kinshasa, DRC
        </p>
      </div>
    </section>
  );
}
