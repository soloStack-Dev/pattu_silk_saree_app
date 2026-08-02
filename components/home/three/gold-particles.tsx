"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

type GoldParticlesProps = {
  position: [number, number, number];
  from: number;
  to: number;
  count?: number;
  radius?: number;
  size?: number;
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function GoldParticles({
  position,
  from,
  to,
  count = 400,
  radius = 90,
  size = 1.1,
}: GoldParticlesProps) {
  const scroll = homeScroll;
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    const rand = seededRandom(1337);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.4 + rand() * 0.6);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count, radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const fade = fadeInOut(scroll.offset, from, to, 0.05);
    const velocity = 1 + scroll.delta * 90;
    const mat = points.current?.material as THREE.PointsMaterial | undefined;
    if (mat) mat.opacity = fade * 0.9;

    const pos = points.current?.geometry.getAttribute("position");
    if (pos) {
      const arr = pos.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += (0.04 + (i % 7) * 0.012) * velocity * 0.016;
        arr[i * 3] += Math.sin(t * 0.8 + i) * 0.012 * 0.016;
        if (arr[i * 3 + 1] > radius) arr[i * 3 + 1] = -radius;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={points} position={position}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        color="#D4AF37"
        size={size}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
