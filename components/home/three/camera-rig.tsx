"use client";

import { useFrame } from "@react-three/fiber";
import { homeScroll } from "./scroll-sync";

export function CameraRig() {
  const scroll = homeScroll;

  useFrame((state) => {
    const s = scroll.offset;
    state.camera.position.x = Math.sin(s * Math.PI * 2) * 9;
    state.camera.position.y = Math.cos(s * Math.PI) * 4;
    state.camera.position.z = 500 - s * 500;
    state.camera.lookAt(0, -12, 0);
  });

  return null;
}
