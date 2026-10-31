"use client";

import { motion } from "motion/react";

// A thin brown line with a soft glow. A faint highlight sweeps across it slowly.
export default function GlowDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-px w-full"
    >
      {/* The line itself */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#c98a4b]/40 to-transparent" />

      {/* Soft glow beneath the line */}
      <div className="absolute -top-3 inset-x-0 h-6 bg-linear-to-r from-transparent via-[#c98a4b]/10 to-transparent blur-md" />

      {/* Slow highlight that travels along the line */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-[#e0a86a]/50 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "400%" }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
