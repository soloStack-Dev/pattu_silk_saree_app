"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

type ThreadLinesProps = {
  from: number;
  to: number;
};

function curvePoints(start: [number, number, number], end: [number, number, number], mid: [number, number, number]) {
  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end),
    ],
  ).getPoints(40);
}

const THREADS: {
  start: [number, number, number];
  end: [number, number, number];
  mid: [number, number, number];
}[] = [
  { start: [-80, 40, -40], end: [10, 30, 0], mid: [-30, 55, -20] },
  { start: [-95, 25, -40], end: [5, 15, 0], mid: [-40, 40, -22] },
  { start: [-75, 10, -38], end: [12, 0, 0], mid: [-25, 22, -18] },
];

export function ThreadLines({ from, to }: ThreadLinesProps) {
  const scroll = homeScroll;
  const mats = useRef<THREE.LineBasicMaterial[]>([]);

  const data = useMemo(
    () =>
      THREADS.map((t) => ({
        points: curvePoints(t.start, t.end, t.mid),
        start: t.start,
        end: t.end,
      })),
    [],
  );

  useFrame(() => {
    const fade = fadeInOut(scroll.offset, from, to, 0.04);
    mats.current.forEach((m, i) => {
      if (m) {
        m.opacity = fade * (0.6 + 0.4 * Math.sin(Date.now() * 0.004 + i));
      }
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <Line
          key={i}
          points={d.points}
          color="#D4AF37"
          lineWidth={1.4}
          dashed
          dashSize={2.2}
          gapSize={1.1}
          transparent
          opacity={0}
          ref={(el) => {
            mats.current[i] = (el as unknown as { material: THREE.LineBasicMaterial })
              ?.material as THREE.LineBasicMaterial;
          }}
        />
      ))}
    </>
  );
}
