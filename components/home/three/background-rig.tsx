"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";

const STOPS = [
  { at: 0, color: new THREE.Color("#160a24") },
  { at: 0.24, color: new THREE.Color("#3E2723") },
  { at: 0.5, color: new THREE.Color("#2a0018") },
  { at: 0.72, color: new THREE.Color("#FAF9F6") },
  { at: 1, color: new THREE.Color("#141414") },
];

function sampleColor(offset: number) {
  let a = STOPS[0];
  let b = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (offset >= STOPS[i].at && offset <= STOPS[i + 1].at) {
      a = STOPS[i];
      b = STOPS[i + 1];
      break;
    }
  }
  const t = Math.min(1, Math.max(0, (offset - a.at) / (b.at - a.at)));
  return a.color.clone().lerp(b.color, t);
}

export function BackgroundRig() {
  const scroll = homeScroll;

  useFrame((state) => {
    const s = scroll.offset;
    const color = sampleColor(s);
    state.scene.background = color;
    const fog = state.scene.fog as THREE.Fog | null;
    if (fog) {
      fog.color.copy(color);
      fog.far = s > 0.6 && s < 0.86 ? 2000 : 950;
      fog.near = s > 0.6 && s < 0.86 ? 600 : 220;
    }
  });

  return null;
}
