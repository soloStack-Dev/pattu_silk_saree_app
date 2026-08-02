"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

const MILESTONES = [
  "1920 · THE FIRST LOOM",
  "1950 · ROYAL PATRONAGE",
  "1980 · GOLDEN ZARI",
  "2000 · ATELIER REBORN",
  "2026 · MODERN HERITAGE",
];

type HeritageCarouselProps = {
  position: [number, number, number];
  from: number;
  to: number;
  radius?: number;
};

export function HeritageCarousel({
  position,
  from,
  to,
  radius = 130,
}: HeritageCarouselProps) {
  const scroll = homeScroll;
  const group = useRef<THREE.Group>(null);
  const labelsRef = useRef<THREE.Mesh[]>([]);
  const matRef = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(() => {
    const fade = fadeInOut(scroll.offset, from, to, 0.035);
    const spin = 0.006 + scroll.delta * 1.4;
    if (group.current) {
      group.current.rotation.y += spin;
      group.current.visible = fade > 0.001;
    }
    matRef.current.forEach((m) => {
      if (m) m.opacity = fade * 0.9;
    });
  });

  return (
    <group position={position}>
      <group ref={group}>
        {MILESTONES.map((label, i) => {
          const angle = (i / MILESTONES.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <group key={label} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <mesh
                ref={(el) => {
                  labelsRef.current[i] = el as unknown as THREE.Mesh;
                }}
              >
                <planeGeometry args={[72, 14]} />
                <meshBasicMaterial
                  ref={(el) => {
                    matRef.current[i] = el as unknown as THREE.MeshBasicMaterial;
                  }}
                  color="#1A1A1A"
                  transparent
                  opacity={0}
                  depthWrite={false}
                />
              </mesh>
              <Text
                fontSize={4.6}
                color="#D4AF37"
                letterSpacing={0.35}
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.2]}
              >
                {label}
              </Text>
            </group>
          );
        })}

        {[0, 1].map((i) => (
          <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[radius + i * 18, 0.6, 8, 64]} />
            <meshBasicMaterial
              ref={(el) => {
                matRef.current[MILESTONES.length + i] = el as unknown as THREE.MeshBasicMaterial;
              }}
              color={i === 0 ? "#D4AF37" : "#F4E4BC"}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
