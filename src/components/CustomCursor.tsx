"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type CursorMode = "default" | "pointer" | "text";

function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const dotX = useSpring(0, { stiffness: 500, damping: 28 });
  const dotY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 150, damping: 15 });
  const ringY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setHasFinePointer(finePointer);
    if (!finePointer) return;

    // Hide default cursor globally
    const style = document.createElement("style");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);
    styleRef.current = style;

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnterInteractive = () => setMode("pointer");
    const handleMouseLeaveInteractive = () => setMode("default");
    const handleMouseEnterText = () => setMode("text");
    const handleMouseLeaveText = () => setMode("default");

    const INTERACTIVE_SELECTOR = 'a, button, [data-cursor="pointer"]';
    const TEXT_SELECTOR = '[data-cursor="text"]';

    const bindListeners = () => {
      document.querySelectorAll(INTERACTIVE_SELECTOR).forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      document.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterText);
        el.addEventListener("mouseleave", handleMouseLeaveText);
      });
    };

    const unbindListeners = () => {
      document.querySelectorAll(INTERACTIVE_SELECTOR).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      document.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterText);
        el.removeEventListener("mouseleave", handleMouseLeaveText);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    bindListeners();

    // Re-bind when DOM changes
    const observer = new MutationObserver(() => {
      unbindListeners();
      bindListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      unbindListeners();
      observer.disconnect();
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hasFinePointer) return null;

  const dotScale = mode === "pointer" ? 0.5 : mode === "text" ? 3 : 1;
  const dotOpacity = mode === "text" ? 0.1 : 1;
  const ringScale = mode === "pointer" ? 1.5 : mode === "text" ? 0 : 1;
  const ringBorderColor =
    mode === "pointer" ? "rgba(184,150,78,0.3)" : "rgba(26,26,26,0.15)";

  return (
    <>
      {/* Dot (inner cursor) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          pointerEvents: "none",
          zIndex: 9998,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#B8964E",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: dotScale,
          opacity: isVisible ? dotOpacity : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Ring (outer cursor) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          pointerEvents: "none",
          zIndex: 9998,
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "transparent",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: ringScale,
          borderColor: ringBorderColor,
          borderWidth: 1,
          borderStyle: "solid",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}

export default CustomCursor;
