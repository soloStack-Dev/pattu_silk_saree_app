"use client";

import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/components/home/assets";
import { homeScroll } from "./scroll-sync";
import { CameraRig } from "./camera-rig";
import { BackgroundRig } from "./background-rig";
import { ModelCutout } from "./model-cutout";
import { GoldParticles } from "./gold-particles";
import { OrbitTags } from "./orbit-tags";
import { ThreadLines } from "./thread-lines";
import { LiquidHeritageGallery } from "./liquid-heritage-gallery";
import { GroundShadow } from "./ground-shadow";
import { TouchBurst } from "./touch-burst";
import { fadeInOut } from "./util";

/** Scroll ranges (0..1 across 5 pages) */
const R = {
  hero: [0.0, 0.2] as const,
  heritage: [0.2, 0.4] as const,
  weave: [0.4, 0.6] as const,
  editorial: [0.6, 0.82] as const,
  footer: [0.84, 1] as const,
};

function AmbientGoldText({
  text,
  position,
  from,
  to,
  size = 6,
}: {
  text: string;
  position: [number, number, number];
  from: number;
  to: number;
  size?: number;
}) {
  const scroll = homeScroll;
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const fade = fadeInOut(scroll.offset, from, to, 0.05);
    if (ref.current) {
      ref.current.visible = fade > 0.001;
      ref.current.children.forEach((child) => {
        const t = child as THREE.Mesh;
        const mat = t.material as THREE.MeshBasicMaterial | undefined;
        if (mat) mat.opacity = fade * 0.7;
      });
    }
  });
  return (
    <group position={position} ref={ref}>
      <Text fontSize={size} color="#D4AF37" letterSpacing={0.4} anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <CameraRig />
      <BackgroundRig />

      {/* ---------- Hero ---------- */}
      <ModelCutout
        src={ASSETS.hero}
        position={[0, -131, -90]}
        height={200}
        from={R.hero[0]}
        to={R.hero[1]}
      />
      <GoldParticles
        position={[0, -20, -90]}
        from={R.hero[0]}
        to={R.hero[1]}
        count={450}
        radius={120}
      />
      <GroundShadow position={[0, -235, -90]} from={R.hero[0]} to={R.hero[1]} scale={1.1} />
      <AmbientGoldText
        text="400 YEARS OF CRAFT"
        position={[-185, 85, -150]}
        from={R.hero[0]}
        to={R.hero[1]}
        size={5}
      />

      {/* ---------- Heritage ---------- */}
      <LiquidHeritageGallery
        from={R.heritage[0]}
        to={R.heritage[1]}
      />
      <GoldParticles
        position={[0, 0, -30]}
        from={R.heritage[0]}
        to={R.heritage[1]}
        count={220}
        radius={150}
        size={0.8}
      />

      {/* ---------- Weave ---------- */}
      <ModelCutout
        src={ASSETS.weave}
        position={[32, -30, 0]}
        height={170}
        from={R.weave[0]}
        to={R.weave[1]}
        idleAmp={0.5}
        sway={0.015}
      />
      <ThreadLines from={R.weave[0]} to={R.weave[1]} />
      <GroundShadow position={[32, -115, 0]} from={R.weave[0]} to={R.weave[1]} scale={0.85} />
      <AmbientGoldText
        text="THE ART OF ZARI"
        position={[-120, 75, -80]}
        from={R.weave[0]}
        to={R.weave[1]}
        size={6.5}
      />
      <GoldParticles
        position={[-30, 0, -40]}
        from={R.weave[0]}
        to={R.weave[1]}
        count={260}
        radius={130}
        size={0.9}
      />

      {/* ---------- Editorial ---------- */}
      <ModelCutout
        src={ASSETS.editorial}
        position={[0, 1, 0]}
        height={150}
        from={R.editorial[0]}
        to={R.editorial[1]}
        idleAmp={0.4}
        sway={0.012}
      />
      <OrbitTags position={[0, -6, -20]} from={R.editorial[0]} to={R.editorial[1]} />
      <GroundShadow position={[0, -74, 0]} from={R.editorial[0]} to={R.editorial[1]} scale={0.8} />
      <GoldParticles
        position={[0, 10, -30]}
        from={R.editorial[0]}
        to={R.editorial[1]}
        count={200}
        radius={120}
        size={0.8}
      />
    </>
  );
}

export function HomeScene() {
  return (
    <>
      <fog attach="fog" args={["#160a24", 220, 950]} />
      <ambientLight intensity={0.55} color="#FFF8E7" />
      <directionalLight position={[10, 12, 5]} intensity={1.1} color="#F4E4BC" />
      <pointLight position={[-14, 0, 12]} intensity={90} color="#D4AF37" />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
      <TouchBurst />
    </>
  );
}
