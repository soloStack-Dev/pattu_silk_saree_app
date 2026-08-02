"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/data/products";

const BURST_COUNT = 160;
const burstPositions = new Float32Array(
  Array.from(
    { length: BURST_COUNT * 3 },
    () => (Math.random() - 0.5) * 90,
  ),
);

function GoldRing({
  position,
  radius,
  speed,
  phase,
}: {
  position: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    if (mat.current) mat.current.opacity = 0;
    if (mesh.current) {
      mesh.current.scale.setScalar(0.01);
      gsap.to(mesh.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.1,
        delay: phase,
        ease: "back.out(1.7)",
      });
    }
  }, [phase]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) {
      const fade = THREE.MathUtils.clamp((t - phase) * 0.8, 0, 1);
      mat.current.opacity = fade * 0.9;
    }
    if (mesh.current) {
      mesh.current.rotation.z = t * speed;
      mesh.current.position.y =
        position[1] + Math.sin(t * 1.2 + phase) * 6;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.22, 16, 96]} />
      <meshBasicMaterial
        ref={mat}
        color="#D4AF37"
        transparent
        opacity={0}
        toneMapped={false}
      />
    </mesh>
  );
}

function Sparkle({
  position,
  size,
  phase,
}: {
  position: [number, number, number];
  size: number;
  phase: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    if (mat.current) mat.current.opacity = 0;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current && mesh.current) {
      const from = phase * 1.5;
      if (t < from) return;
      const local = t - from;
      const life = THREE.MathUtils.clamp(local / 1.6, 0, 1);
      const ease = life * life * (3 - 2 * life);
      mesh.current.position.x =
        position[0] + Math.cos(phase * 6.28) * 55 * ease;
      mesh.current.position.y =
        position[1] + Math.sin(phase * 4.2) * 45 * ease + 18 * ease;
      mesh.current.position.z = position[2] + ease * 18;
      mesh.current.scale.setScalar(size * (1 - life * 0.6));
      mat.current.opacity = (1 - life) * 0.9;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial ref={mat} color="#F4E4BC" transparent opacity={0} />
    </mesh>
  );
}

function SuccessScene() {
  const group = useRef<THREE.Group>(null);
  const burst = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (group.current) {
      group.current.scale.setScalar(0.01);
      gsap.to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
    }
    const geo = burst.current?.geometry as THREE.BufferGeometry | undefined;
    if (geo) {
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      positions.current = new Float32Array(attr.array as Float32Array);
    }
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.position.y = Math.sin(t * 0.9) * 4;
    }
    const pos = burst.current?.geometry.getAttribute("position");
    if (pos && positions.current) {
      const arr = pos.array as Float32Array;
      for (let i = 0; i < positions.current.length; i += 3) {
        const life = (t * 0.9 + i * 0.0007) % 1;
        const ease = life * life * (3 - 2 * life);
        const baseX = positions.current[i];
        const baseY = positions.current[i + 1];
        const baseZ = positions.current[i + 2];
        arr[i] = baseX * ease;
        arr[i + 1] = baseY * ease + life * 30;
        arr[i + 2] = baseZ * ease;
      }
      pos.needsUpdate = true;
    }
  });

  const sparks: [number, number, number, number, number][] = [
    [0, 14, 0, 1.4, 0.0],
    [-16, -8, 4, 1.0, 0.35],
    [16, -8, 4, 1.0, 0.5],
    [-9, -16, 6, 0.8, 0.65],
    [9, -16, 6, 0.8, 0.8],
  ];

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 10, 30]} intensity={2.2} color="#F4E4BC" />
      <group ref={group}>
        <GoldRing position={[0, 4, 0]} radius={22} speed={0.35} phase={0.15} />
        <GoldRing position={[0, 4, 0]} radius={34} speed={-0.22} phase={0.45} />
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[15, 32, 32]} />
          <meshStandardMaterial
            color="#8B1A3C"
            metalness={0.6}
            roughness={0.35}
            emissive="#8B1A3C"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 4, 1]}>
          <ringGeometry args={[13.4, 16.6, 40]} />
          <meshBasicMaterial color="#F4E4BC" transparent opacity={0.55} toneMapped={false} />
        </mesh>
        <mesh position={[0, 4, 1.2]}>
          <ringGeometry args={[17.2, 18.6, 40]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.7} toneMapped={false} />
        </mesh>
        {sparks.map(([x, y, z, s, ph], i) => (
          <Sparkle key={i} position={[x, y, z]} size={s} phase={ph} />
        ))}
      </group>
      <points ref={burst}>
        <pointsMaterial color="#D4AF37" size={1.6} transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[burstPositions, 3]}
          />
        </bufferGeometry>
      </points>
    </>
  );
}

type OrderSuccessProps = {
  open: boolean;
  total: number;
  onClose: () => void;
};

export function OrderSuccess({ open, total, onClose }: OrderSuccessProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".order-success__card",
        { y: 60, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" },
      );
      gsap.fromTo(
        ".order-success__text > *",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, delay: 0.35, ease: "power2.out" },
      );
    }, rootRef.current);
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div ref={rootRef} className="order-success" role="dialog" aria-modal="true">
      <div className="order-success__backdrop" onClick={onClose} />
      <div className="order-success__card">
        <div className="order-success__canvas">
          <Canvas
            camera={{ position: [0, 0, 120], fov: 45, near: 1, far: 500 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
          >
            <SuccessScene />
          </Canvas>
        </div>
        <div className="order-success__text">
          <span className="order-success__check">
            <Check size={26} strokeWidth={2.5} />
          </span>
          <h3>Order Placed Successfully</h3>
          <p>
            Your sarees are being hand-woven with devotion.
            <br />
            Total paid: <strong>{formatPrice(total)}</strong>
          </p>
          <button className="order-success__btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
