"use client";

import { motion } from "motion/react";

// Fixed positions, so the server and browser render the same dots (no hydration mismatch).
const dots = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  duration: 12 + (i % 6) * 2,
  delay: (i % 5) * 0.8,
}));

export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Drifting glows */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
        animate={{ x: [0, 120, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl"
        animate={{ x: [0, -90, 60, 0], y: [0, 80, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: [0, 70, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(242,233,225,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,233,225,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* Slow floating particles */}
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent/60"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
