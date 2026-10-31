"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// A ring that follows the mouse and grows over links and buttons.
//
// Why it doesn't lag:
//  - the position lives in motion values, which write straight to the element,
//    so React does NOT re-render on every mouse move
//  - the spring is stiff, so the ring trails the pointer by only a hair
//  - React state only changes when the pointer enters or leaves something
//    clickable, a handful of times, not 60 times a second
export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(
        !!target?.closest?.(
          "a, button, [role='button'], input, textarea, select, label",
        ),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    // Only shown for a real mouse (not touch), and not when the visitor has
    // asked their device to reduce motion. The normal cursor stays visible.
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden motion-reduce:hidden [@media(pointer:fine)]:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className={`-ml-4 -mt-4 h-8 w-8 rotate-45 rounded-sm border-2 border-accent transition-colors duration-200 ${
          hovering ? "bg-accent/10" : "bg-transparent"
        }`}
        animate={{ scale: hovering ? 1.8 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
