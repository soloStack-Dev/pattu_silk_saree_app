"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MAX_BURSTS = 6;
const PER_BURST = 26;
const LIFE = 1.5;

type Burst = {
  pos: THREE.Vector3;
  born: number;
  active: boolean;
};

const pool: Burst[] = Array.from({ length: MAX_BURSTS }, () => ({
  pos: new THREE.Vector3(),
  born: 0,
  active: false,
}));

function takeBurst(): Burst {
  const now = performance.now();
  const free = pool.find((b) => !b.active);
  if (free) {
    free.born = now;
    return free;
  }
  const oldest = pool.reduce((a, b) => (b.born < a.born ? b : a), pool[0]);
  oldest.born = now;
  return oldest;
}

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

function burstSeed(burst: number, pi: number) {
  const s = Math.sin((burst + 1) * 12.9898 + pi * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export function TouchBurst() {
  const { gl, camera } = useThree();
  const rings = useRef<THREE.Group>(null);
  const sparks = useRef<THREE.Points>(null);

  const velocities = useMemo(() => {
    const v = new Float32Array(MAX_BURSTS * PER_BURST * 3);
    for (let b = 0; b < MAX_BURSTS; b++) {
      for (let i = 0; i < PER_BURST; i++) {
        const r1 = burstSeed(b, i);
        const r2 = burstSeed(b, i + 101);
        const theta = r1 * Math.PI * 2;
        const phi = Math.acos(2 * r2 - 1);
        const up = Math.abs(Math.cos(phi)) * 1.6 + 0.5;
        const vx = Math.sin(phi) * Math.cos(theta);
        const vy = Math.cos(phi) >= 0 ? up : Math.cos(phi) * 0.3;
        const vz = Math.sin(phi) * Math.sin(theta);
        const speed = 60 + r1 * 140;
        v[(b * PER_BURST + i) * 3] = vx * speed;
        v[(b * PER_BURST + i) * 3 + 1] = vy * speed;
        v[(b * PER_BURST + i) * 3 + 2] = vz * speed;
      }
    }
    return v;
  }, []);

  const sparkPositions = useMemo(
    () => new Float32Array(MAX_BURSTS * PER_BURST * 3),
    [],
  );

  useEffect(() => {
    const el = gl.domElement;
    if (!isCoarsePointer()) return;
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const rect = el.getBoundingClientRect();
      if (
        t.clientX < rect.left ||
        t.clientX > rect.right ||
        t.clientY < rect.top ||
        t.clientY > rect.bottom
      ) {
        return;
      }
      ndc.set(
        ((t.clientX - rect.left) / rect.width) * 2 - 1,
        -((t.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return;
      const burst = takeBurst();
      burst.pos.copy(hit);
      burst.active = true;
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouch);
    };
  }, [gl, camera]);

  useFrame(() => {
    const now = performance.now();

    if (rings.current) {
      rings.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const burst = pool[i % MAX_BURSTS];
        if (!burst.active) {
          mesh.visible = false;
          return;
        }
        const age = (now - burst.born) / 1000;
        if (age > LIFE) {
          burst.active = false;
          mesh.visible = false;
          return;
        }
        mesh.visible = true;
        const p = age / LIFE;
        const ease = p * p * (3 - 2 * p);
        mesh.position.copy(burst.pos);
        mesh.scale.setScalar(0.4 + ease * 95);
        mat.opacity = (1 - p) * 0.9;
      });
    }

    const pos = sparks.current?.geometry.getAttribute("position");
    if (pos) {
      const arr = pos.array as Float32Array;
      for (let b = 0; b < MAX_BURSTS; b++) {
        const burst = pool[b];
        for (let i = 0; i < PER_BURST; i++) {
          const idx = (b * PER_BURST + i) * 3;
          if (!burst.active) {
            arr[idx] = burst.pos.x;
            arr[idx + 1] = -9999;
            arr[idx + 2] = burst.pos.z;
            continue;
          }
          const age = (now - burst.born) / 1000;
          if (age > LIFE) {
            arr[idx] = burst.pos.x;
            arr[idx + 1] = -9999;
            arr[idx + 2] = burst.pos.z;
            continue;
          }
          const drag = Math.max(0.12, 1 - age * 0.55);
          arr[idx] = burst.pos.x + velocities[idx] * age * drag;
          arr[idx + 1] = burst.pos.y + velocities[idx + 1] * age * drag;
          arr[idx + 2] = burst.pos.z + velocities[idx + 2] * age * drag;
        }
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={rings}>
        {Array.from({ length: MAX_BURSTS }).map((_, i) => (
          <mesh key={i} visible={false}>
            <torusGeometry args={[1, 1.6, 10, 64]} />
            <meshBasicMaterial
              color="#F4E4BC"
              transparent
              opacity={0}
              toneMapped={false}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <points ref={sparks} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D4AF37"
          size={1.1}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </>
  );
}
