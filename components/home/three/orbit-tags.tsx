"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

const TAGS = ["Weaving", "Styling", "Culture", "Care"];

type OrbitTagsProps = {
  position: [number, number, number];
  from: number;
  to: number;
  radius?: number;
  height?: number;
};

export function OrbitTags({
  position,
  from,
  to,
  radius = 95,
  height = 30,
}: OrbitTagsProps) {
  const scroll = homeScroll;
  const group = useRef<THREE.Group>(null);
  const tagRefs = useRef<THREE.Object3D[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const fade = fadeInOut(scroll.offset, from, to, 0.04);
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.visible = fade > 0.001;
    }
    tagRefs.current.forEach((tag) => {
      if (tag) tag.lookAt(state.camera.position);
    });
  });

  return (
    <group position={position} ref={group}>
      {TAGS.map((tag, i) => {
        const angle = (i / TAGS.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 1.7) * height;
        return (
          <group
            key={tag}
            position={[x, y, z]}
            ref={(el) => {
              tagRefs.current[i] = el as unknown as THREE.Object3D;
            }}
          >
            <Text
              fontSize={7}
              color="#D4AF37"
              letterSpacing={0.3}
              anchorX="center"
              anchorY="middle"
            >
              {tag}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
