"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./three/silence-three-clock";
import { HomeScene } from "./three/home-scene";
import { HomeOverlays } from "./home-overlays";
import { startScrollSync } from "./three/scroll-sync";

export default function HomeStage() {
  useEffect(() => startScrollSync(), []);

  return (
    <>
      <div className="home-stage">
        <Canvas
          camera={{ position: [0, 0, 500], fov: 45, near: 1, far: 2000 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <HomeScene />
        </Canvas>
      </div>
      <HomeOverlays />
    </>
  );
}
