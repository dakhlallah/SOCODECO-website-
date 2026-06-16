"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "solid" | "ghost";
  className?: string;
  strength?: number;
}

const variantStyles: Record<
  "outline" | "solid" | "ghost",
  {
    base: React.CSSProperties;
    hover: React.CSSProperties;
  }
> = {
  outline: {
    base: {
      border: "1px solid rgba(0,0,0,0.15)",
      backgroundColor: "transparent",
      color: "#1A1A1A",
    },
    hover: {
      borderColor: "#B8964E",
    },
  },
  solid: {
    base: {
      border: "none",
      backgroundColor: "#B8964E",
      color: "#FFFFFF",
    },
    hover: {
      backgroundColor: "#A6843F",
    },
  },
  ghost: {
    base: {
      border: "none",
      backgroundColor: "transparent",
      color: "#B8964E",
    },
    hover: {
      backgroundColor: "rgba(184,150,78,0.06)",
    },
  },
};

const commonStyles: React.CSSProperties = {
  padding: "0.75rem 2rem",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "background 0.3s, border-color 0.3s, color 0.3s",
  textDecoration: "none",
  display: "inline-block",
};

function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const styles = variantStyles[variant];
  const mergedStyle: React.CSSProperties = {
    ...commonStyles,
    ...styles.base,
    ...(isHovered ? styles.hover : {}),
  };

  const inner = href ? (
    <a href={href} style={mergedStyle} className={className}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} style={mergedStyle} className={className}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.div>
  );
}

export default MagneticButton;
