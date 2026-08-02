"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uScrollVelocity;
varying vec2 vUv;

void main() {
  vec3 pos = position;
  float wave = sin(pos.x * 0.1 + uTime * 2.0) * 2.0;
  wave += sin(pos.y * 0.2 - uTime * 3.0) * uScrollVelocity * 2.5;
  pos.z += wave;
  pos.z += sin(pos.x * 0.5 + uTime) * 0.5 * (1.0 - abs(uv.y - 0.5) * 2.0);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform sampler2D uTex;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  vec4 tex = texture2D(uTex, vUv);
  gl_FragColor = vec4(tex.rgb, tex.a * uOpacity);
}
`;

type FabricPlaneProps = {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  from: number;
  to: number;
  args?: [number, number, number, number];
};

export function FabricPlane({
  src,
  position,
  rotation,
  from,
  to,
  args = [150, 48, 72, 72],
}: FabricPlaneProps) {
  const texture = useTexture(src);
  const scroll = homeScroll;
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uScrollVelocity: { value: 0 },
          uOpacity: { value: 0 },
          uTex: { value: texture },
        },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [texture],
  );

  useFrame((state) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    u.uScrollVelocity.value = scroll.delta * 60;
    u.uOpacity.value = fadeInOut(scroll.offset, from, to, 0.04);
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <primitive object={material} attach="material" ref={matRef} />
    </mesh>
  );
}
