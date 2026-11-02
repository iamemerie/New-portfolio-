"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import globePoints from "@/app/data/globe-points.json";

const CYAN = "#22d3ee";

// Built once, outside the component, so nothing is recalculated on render.
const positions = new Float32Array(globePoints);

// A world map drawn as dots on a rotating, slightly tilted globe.
function Globe() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.2]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={CYAN}
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none h-full w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <Globe />
      </Canvas>
    </div>
  );
}
