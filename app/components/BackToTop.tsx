"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Rocket } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  // Show the button once the visitor has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function launch() {
    if (launching) return;
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Bring the rocket back to its pad once the scroll has finished.
    setTimeout(() => setLaunching(false), 1400);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={launch}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-accent backdrop-blur-xl transition hover:bg-white/20"
        >
          <motion.div
            className="relative grid place-items-center"
            animate={launching ? { y: -90, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={
              launching
                ? { duration: 1.1, ease: "easeIn" }
                : { duration: 0.5, ease: "easeOut" }
            }
          >
            <Rocket size={20} className="-rotate-45" />

            {/* Flame: flickers while the rocket is launching */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-3 w-1.5 -translate-x-1/2 rounded-full bg-accent"
              animate={
                launching
                  ? { scaleY: [1, 2.2, 1], opacity: [0.8, 1, 0.6] }
                  : { scaleY: 0, opacity: 0 }
              }
              transition={
                launching
                  ? { duration: 0.25, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
