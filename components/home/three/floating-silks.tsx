"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

type FloatingSilksProps = {
  from: number;
  to: number;
};

export function FloatingSilks({ from, to }: FloatingSilksProps) {
  const scroll = homeScroll;
  const group = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);

  const planes: { position: [number, number, number]; rot: [number, number, number] }[] = [
    { position: [-55, 26, -90], rot: [0.4, 0.3, 0.2] },
    { position: [45, -8, -100], rot: [-0.3, -0.4, 0.1] },
    { position: [10, 52, -95], rot: [0.2, 0.5, -0.2] },
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const fade = fadeInOut(scroll.offset, from, to, 0.04);
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.rotation.x = planes[i].rot[0] + Math.sin(t * 0.3 + i) * 0.1;
        child.rotation.y = planes[i].rot[1] + Math.cos(t * 0.25 + i) * 0.12;
        child.position.y = planes[i].position[1] + Math.sin(t * 0.5 + i * 2) * 6;
      });
      group.current.visible = fade > 0.001;
    }
    mats.current.forEach((m) => {
      if (m) m.opacity = fade * 0.22;
    });
  });

  return (
    <group ref={group}>
      {planes.map((p, i) => (
        <mesh key={i} position={p.position} rotation={p.rot}>
          <planeGeometry args={[70, 44]} />
          <meshBasicMaterial
            ref={(el) => {
              mats.current[i] = el as unknown as THREE.MeshBasicMaterial;
            }}
            color="#4A148C"
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
