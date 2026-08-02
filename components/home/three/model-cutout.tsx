"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

type ModelCutoutProps = {
  src: string;
  position: [number, number, number];
  height?: number;
  from: number;
  to: number;
  fadeMargin?: number;
  idleAmp?: number;
  sway?: number;
  initialOpacity?: number;
};

export function ModelCutout({
  src,
  position,
  height = 170,
  from,
  to,
  fadeMargin = 0.03,
  idleAmp = 0.6,
  sway = 0.02,
}: ModelCutoutProps) {
  const texture = useTexture(src);
  const scroll = homeScroll;
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  const dims = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    const aspect = img?.width && img?.height ? img.width / img.height : 0.66;
    return { w: height * aspect, h: height };
  }, [texture, height]);

  useLayoutEffect(() => {
    group.current?.position.set(...position);
  }, [position]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const fade = fadeInOut(scroll.offset, from, to, fadeMargin);
    if (mat.current) mat.current.opacity = fade;
    if (group.current) {
      group.current.position.y =
        position[1] + Math.sin(t * 0.5) * idleAmp * fade;
      group.current.rotation.y = Math.sin(t * 0.3) * sway * fade;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[dims.w, dims.h]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
