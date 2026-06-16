"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  format?: (n: number) => string;
}

const stats: Stat[] = [
  {
    target: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    target: 50,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    target: 750000,
    suffix: "m²+",
    label: "Built Area",
    format: (n: number) => n.toLocaleString("en-US"),
  },
];

function useCounter(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let rafId: number;

    function easeOut(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setValue(Math.round(easedProgress * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(target);
        setDone(true);
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, target, duration]);

  return { value, done };
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const { value, done } = useCounter(stat.target, active);

  const displayValue = stat.format ? stat.format(value) : String(value);

  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div
        style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 200,
          color: "#1A1A1A",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {displayValue}
        {done && <span style={{ color: "#B8964E" }}>{stat.suffix}</span>}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#999",
          marginTop: "1rem",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,6rem)",
        background: "#F9F8F6",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`${index < stats.length - 1 ? "md:border-r border-b md:border-b-0" : ""} border-black/[0.06]`}
          >
            <StatItem stat={stat} active={isInView} />
          </div>
        ))}
      </div>
    </section>
  );
}
