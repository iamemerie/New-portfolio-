"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";

const SPIDER = "#8a0303";
const SILK = "#f8f6ef";
const WEB = "#f8f6ef";

// Each leg is four joints from the body outward: hip, knee, ankle, foot.
// These are for the right side. The left side is mirrored.
const LEG_JOINTS: [number, number][][] = [
  [
    [5, -7],
    [13, -17],
    [21, -14],
    [26, -2],
  ],
  [
    [6, -4],
    [17, -10],
    [25, -6],
    [30, 6],
  ],
  [
    [6, -1],
    [17, -3],
    [24, 4],
    [28, 14],
  ],
  [
    [5, 2],
    [13, 4],
    [18, 12],
    [21, 20],
  ],
];

type Strand = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind: "thread" | "spoke";
};

function Legs({ walking }: { walking: boolean }) {
  return (
    <>
      {LEG_JOINTS.flatMap((joints, i) =>
        [1, -1].map((side) => {
          const [hip] = joints;
          // Points relative to the hip, so the leg rotates around its root.
          const rel = joints
            .slice(1)
            .map(([px, py]) => [side * (px - hip[0]), py - hip[1]]);
          const dir = (i + (side === 1 ? 0 : 1)) % 2 === 0 ? 1 : -1;

          return (
            <g
              key={`${i}-${side}`}
              transform={`translate(${side * hip[0]} ${hip[1]})`}
            >
              <motion.g
                style={{ originX: 0, originY: 0 }}
                animate={
                  walking ? { rotate: [-12 * dir, 12 * dir] } : { rotate: 0 }
                }
                transition={
                  walking
                    ? {
                        duration: 0.32,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: i * 0.03,
                      }
                    : { duration: 0.3 }
                }
              >
                <path
                  d={`M0 0 L${rel[0][0]} ${rel[0][1]} L${rel[1][0]} ${rel[1][1]} L${rel[2][0]} ${rel[2][1]}`}
                  fill="none"
                  stroke={SPIDER}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={rel[2][0]} cy={rel[2][1]} r={0.9} fill="#ffd1ea" />
              </motion.g>
            </g>
          );
        }),
      )}
    </>
  );
}

// The spider's body: a fat abdomen with spots, a waist, a head with eight eyes, fangs and palps.
function Body() {
  return (
    <>
      <defs>
        <radialGradient id="spiderBody" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ff9fd0" />
          <stop offset="55%" stopColor={SPIDER} />
          <stop offset="100%" stopColor="#7a0a48" />
        </radialGradient>
      </defs>

      {/* Abdomen */}
      <ellipse cx={0} cy={10} rx={11} ry={14} fill="url(#spiderBody)" />
      <circle cx={0} cy={4} r={1.6} fill="#ffc2e2" opacity={0.55} />
      <circle cx={-3.5} cy={9} r={1.2} fill="#ffc2e2" opacity={0.55} />
      <circle cx={3.5} cy={9} r={1.2} fill="#ffc2e2" opacity={0.55} />
      <circle cx={0} cy={15} r={1.4} fill="#ffc2e2" opacity={0.55} />

      {/* Waist */}
      <circle cx={0} cy={-1} r={3} fill="#a0156a" />

      {/* Head (cephalothorax) */}
      <ellipse cx={0} cy={-9} rx={7.5} ry={8} fill="url(#spiderBody)" />

      {/* Eyes: two large in front, smaller ones around them */}
      <circle cx={-2.8} cy={-13.6} r={1.2} fill="#0b0807" />
      <circle cx={2.8} cy={-13.6} r={1.2} fill="#0b0807" />
      <circle cx={-1.2} cy={-14.2} r={0.8} fill="#0b0807" />
      <circle cx={1.2} cy={-14.2} r={0.8} fill="#0b0807" />
      <circle cx={-5} cy={-11} r={0.9} fill="#0b0807" />
      <circle cx={5} cy={-11} r={0.9} fill="#0b0807" />
      <circle cx={-4} cy={-8.5} r={0.7} fill="#0b0807" />
      <circle cx={4} cy={-8.5} r={0.7} fill="#0b0807" />

      {/* Fangs (chelicerae) */}
      <path
        d="M-1.8 -4.5 Q-2.6 -2.5 -2 -1"
        stroke="#7a0a48"
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M1.8 -4.5 Q2.6 -2.5 2 -1"
        stroke="#7a0a48"
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
      />

      {/* Pedipalps (short feelers by the mouth) */}
      <path
        d="M-3 -5.5 L-6 -3"
        stroke={SPIDER}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M3 -5.5 L6 -3"
        stroke={SPIDER}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </>
  );
}

let strandId = 0; // shared across effect runs, so every strand gets a unique id
export default function Spider() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const anchorX = useMotionValue(-200);
  const anchorY = useMotionValue(-200);
  const [ready, setReady] = useState(false);
  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState(1);
  const [strands, setStrands] = useState<Strand[]>([]);

  // The silk the spider is currently hanging from, drawn from its last landing point.
  const dragD = useTransform(
    [anchorX, anchorY, x, y],
    ([ax, ay, px, py]: number[]) => {
      const mx = (ax + px) / 2;
      const my =
        (ay + py) / 2 + Math.min(40, Math.hypot(px - ax, py - ay) * 0.12);
      return `M${ax} ${ay} Q${mx} ${my} ${px} ${py}`;
    },
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    let walkingNow = false;
    let cx: AnimationPlaybackControls | undefined;
    let cy: AnimationPlaybackControls | undefined;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    let wander: ReturnType<typeof setInterval> | undefined;

    // Add a strand to the web. Each one fades out and is removed after a few seconds.
    function addStrand(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      kind: Strand["kind"],
    ) {
      const id = ++strandId;
      setStrands((s) => [...s.slice(-60), { id, x1, y1, x2, y2, kind }]);
      setTimeout(
        () => setStrands((s) => s.filter((v) => v.id !== id)),
        kind === "thread" ? 9000 : 6000,
      );
    }

    // On landing, fix the silk to the spot and spin a few spokes around it.
    function landAt(tx: number, ty: number) {
      anchorX.set(tx);
      anchorY.set(ty);
      for (let k = 0; k < 6; k++) {
        const angle = (k * Math.PI) / 3 + Math.random() * 0.4;
        const len = 14 + Math.random() * 16;
        addStrand(
          tx,
          ty,
          tx + Math.cos(angle) * len,
          ty + Math.sin(angle) * len,
          "spoke",
        );
      }
    }

    // Shoot a thread to the target, walk along it, then land.
    function walkTo(tx: number, ty: number, onDone?: () => void) {
      cx?.stop();
      cy?.stop();
      const dist = Math.hypot(tx - x.get(), ty - y.get());
      if (dist < 4) {
        onDone?.();
        return;
      }
      addStrand(anchorX.get(), anchorY.get(), tx, ty, "thread");
      setFacing(tx >= x.get() ? 1 : -1);
      walkingNow = true;
      setWalking(true);
      const duration = Math.max(0.9, dist / 240);
      cx = animate(x, tx, { duration, ease: "easeInOut" });
      cy = animate(y, ty, {
        duration,
        ease: "easeInOut",
        onComplete: () => {
          walkingNow = false;
          setWalking(false);
          landAt(tx, ty);
          onDone?.();
        },
      });
    }

    function stopWander() {
      clearInterval(wander);
      wander = undefined;
    }

    function startWander() {
      if (wander) return;
      wander = setInterval(() => {
        if (walkingNow) return;
        walkTo(
          80 + Math.random() * window.innerWidth * 0.5,
          200 + Math.random() * (window.innerHeight - 320),
        );
      }, 3600);
    }

    // Walk to the section in view, or wander in the hero if none is.
    function followSection() {
      const ids = ["work", "about", "cv", "capabilities"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (
          r.top < window.innerHeight * 0.6 &&
          r.bottom > window.innerHeight * 0.25
        ) {
          stopWander();
          walkTo(window.innerWidth - 110, Math.max(100, r.top + 40));
          return;
        }
      }
      startWander();
    }

    function onScroll() {
      clearTimeout(debounce);
      debounce = setTimeout(followSection, 180);
    }

    // Start on the logo: the silk runs from the logo, and the spider crawls out and down.
    const logo = document.getElementById("site-logo");
    if (logo) {
      const r = logo.getBoundingClientRect();
      const sx = r.left + r.width * 0.35;
      const sy = r.top + r.height * 0.5;
      x.set(sx);
      y.set(sy);
      anchorX.set(sx);
      anchorY.set(sy);
      setReady(true);
      setTimeout(() => walkTo(sx - 6, sy + 110, followSection), 500);
    } else {
      setReady(true);
      followSection();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(debounce);
      clearInterval(wander);
      cx?.stop();
      cy?.stop();
    };
  }, [x, y, anchorX, anchorY]);

  if (!ready) return null;

  return (
    <>
      {/* The web: threads and spokes that fade out over time */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-full w-full overflow-visible"
      >
        {strands.map((s) => (
          <motion.line
            key={s.id}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={s.kind === "thread" ? SILK : WEB}
            strokeWidth={s.kind === "thread" ? 1 : 0.7}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: s.kind === "thread" ? 9 : 6,
              ease: "linear",
            }}
          />
        ))}
        {/* The silk the spider hangs from right now */}
        <motion.path d={dragD} fill="none" stroke={SILK} strokeWidth={1} />
      </svg>

      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.svg
            width={84}
            height={84}
            viewBox="-40 -40 80 80"
            animate={{ scaleX: facing }}
            transition={{ duration: 0.25 }}
            style={{ filter: `drop-shadow(0 0 6px ${SPIDER})` }}
          >
            <Legs walking={walking} />
            <motion.g
              animate={{ y: walking ? [0, -1, 0] : 0 }}
              transition={
                walking
                  ? { duration: 0.32, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            >
              <Body />
            </motion.g>
          </motion.svg>
        </div>
      </motion.div>
    </>
  );
}
