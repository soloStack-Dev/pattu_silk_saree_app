"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

type GroundShadowProps = {
  position: [number, number, number];
  from: number;
  to: number;
  scale?: number;
};

export function GroundShadow({ position, from, to, scale = 1 }: GroundShadowProps) {
  const scroll = homeScroll;
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    grad.addColorStop(0, "rgba(0,0,0,0.6)");
    grad.addColorStop(0.6, "rgba(0,0,0,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(() => {
    const fade = fadeInOut(scroll.offset, from, to, 0.04);
    if (mat.current) mat.current.opacity = fade * 0.55;
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={[scale, scale, 1]}>
      <planeGeometry args={[150, 46]} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
}
