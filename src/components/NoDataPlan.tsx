"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NoDataPlanProps {
  message?: string;
}

export default function NoDataPlan({ message = "No Data Plan... yet!" }: NoDataPlanProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo - Prominently displayed */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/images/socodeco-logo.svg"
          alt="SOCODECO Logo"
          width={320}
          height={96}
          className="w-[280px] md:w-[320px] h-auto"
          priority
        />
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="w-16 h-0.5 bg-[var(--accent)] mb-8"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* Message */}
      <motion.h2
        className="font-display text-3xl md:text-4xl text-[var(--text)] text-center mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {message}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="font-mono text-sm text-[var(--text-muted)] text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Nous travaillons sur de nouveaux projets passionnants. Revenez bientôt!
      </motion.p>

      {/* Decorative elements */}
      <motion.div
        className="mt-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-[var(--accent)] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
