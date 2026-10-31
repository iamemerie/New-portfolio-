"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

const SWITCH_MS = 8000; // how long each shape stays before the next one
const FADE_MS = 500; // length of the fade between shapes

// A sphere of points, spread evenly with the golden-angle method.
function Globe() {
  const group = useRef<Group>(null);

  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r * 2;
      arr[i * 3 + 1] = y * 2;
      arr[i * 3 + 2] = Math.sin(theta) * r * 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#c98a4b"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

// A 12 x 12 field of bars whose heights rise and fall in a moving wave.
const COLS = 12;
const ROWS = 12;

function Bars() {
  const group = useRef<Group>(null);
  const bars = useRef<Mesh[]>([]);

  const items = useMemo(() => {
    const list: { x: number; z: number }[] = [];
    for (let x = 0; x < COLS; x++) {
      for (let z = 0; z < ROWS; z++) list.push({ x, z });
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y += 0.002;
    bars.current.forEach((mesh, i) => {
      if (!mesh) return;
      const { x, z } = items[i];
      const h =
        0.6 + 0.5 * Math.sin(clock.elapsedTime * 1.4 + x * 0.5 + z * 0.4);
      mesh.scale.y = h * 3;
      mesh.position.y = (h * 3) / 2 - 1.5; // keep the base on the floor
    });
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {items.map((it, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) bars.current[i] = el;
          }}
          position={[(it.x - COLS / 2) * 0.5, 0, (it.z - ROWS / 2) * 0.5]}
        >
          <boxGeometry args={[0.36, 1, 0.36]} />
          <meshStandardMaterial
            color={(it.x + it.z) % 5 === 0 ? "#c98a4b" : "#3a2a20"}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const [mode, setMode] = useState<"globe" | "bars">("globe");
  const [fading, setFading] = useState(false);

  // Fade out, swap the shape while it's hidden, then fade back in.
  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setFading(true);
      swap = setTimeout(() => {
        setMode((m) => (m === "globe" ? "bars" : "globe"));
        setFading(false);
      }, FADE_MS);
    }, SWITCH_MS);
    return () => {
      clearInterval(cycle);
      clearTimeout(swap);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none h-full w-full transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} />
        {mode === "globe" ? <Globe /> : <Bars />}
      </Canvas>
    </div>
  );
}
