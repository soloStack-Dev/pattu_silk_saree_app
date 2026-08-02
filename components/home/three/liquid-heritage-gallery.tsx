"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { homeScroll } from "./scroll-sync";
import { fadeInOut } from "./util";

const VERTEX_SHADER = `
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform float uAmplitude;
varying vec2 vUv;
varying float vHover;

void main() {
  vUv = uv;
  vHover = uHover;

  float dist = distance(uv, uMouse);

  float ripple = sin(dist * 55.0 - uTime * 6.5) * exp(-dist * 5.5);
  float wave = sin(uv.x * 16.0 + uTime * 2.8) * cos(uv.y * 12.0 - uTime * 1.9);

  float disp = (ripple * uHover * 0.6 + wave * 0.1 + wave * uHover * 0.3) * uAmplitude;

  vec3 newPosition = position + normal * disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
uniform float uOpacity;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vHover;

void main() {
  vec2 uv = vUv;
  float dist = distance(uv, uMouse);

  float ripple = sin(dist * 42.0 - uTime * 5.5) * exp(-dist * 4.5);
  vec2 dir = uv - uMouse;
  float len = max(length(dir), 0.0001);
  vec2 offset = (dir / len) * ripple * 0.018 * uHover;
  uv += offset;

  vec4 tex = texture2D(uTexture, clamp(uv, 0.002, 0.998));

  float sheen = pow(1.0 - clamp(dist, 0.0, 1.0), 4.0) * uHover;
  vec3 gold = vec3(1.0, 0.86, 0.58);
  vec3 col = mix(tex.rgb, tex.rgb + gold * 0.55, sheen);

  float edge = smoothstep(0.9, 0.3, length(uv - 0.5)) * 0.22;
  col += gold * edge * uHover;

  gl_FragColor = vec4(col, uOpacity);
}
`;

const IMAGES: {
  src: string;
  position: [number, number, number];
  height: number;
  rotY: number;
}[] = [
  {
    src: "/asserts/collection-page-images/product-image-four.jpg",
    position: [-230, -34, -28],
    height: 86,
    rotY: 0.14,
  },
  {
    src: "/asserts/collection-page-images/product-image-six.jpg",
    position: [-138, 16, -46],
    height: 104,
    rotY: 0.08,
  },
  {
    src: "/asserts/collection-page-images/product-image-nine.jpg",
    position: [-48, 50, -58],
    height: 112,
    rotY: 0.02,
  },
  {
    src: "/asserts/collection-page-images/product-image-five.jpg",
    position: [52, 46, -56],
    height: 124,
    rotY: -0.02,
  },
  {
    src: "/asserts/collection-page-images/product-image-eight.jpg",
    position: [148, 12, -44],
    height: 112,
    rotY: -0.08,
  },
  {
    src: "/asserts/collection-page-images/product-image-seven.jpg",
    position: [234, -36, -26],
    height: 96,
    rotY: -0.14,
  },
];

type LiquidImageProps = {
  src: string;
  position: [number, number, number];
  height: number;
  rotY: number;
  index: number;
  from: number;
  to: number;
  mouse: React.MutableRefObject<THREE.Vector2>;
};

function LiquidImage({ src, position, height, rotY, index, from, to, mouse }: LiquidImageProps) {
  const texture = useTexture(src);
  const scroll = homeScroll;

  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAmplitude: { value: 2.2 },
      uTexture: { value: texture },
      uOpacity: { value: 0 },
    }),
    [texture],
  );

  const hover = useRef(0);
  const targetUv = useRef(new THREE.Vector2(0.5, 0.5));
  const entrance = useRef(0);
  const entered = useRef(false);
  const disposed = useRef(false);

  const w = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    const aspect = img?.width && img?.height ? img.width / img.height : 0.75;
    return height * aspect;
  }, [texture, height]);

  useEffect(() => {
    return () => {
      disposed.current = true;
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleOver = () => {
    document.body.style.cursor = "pointer";
    gsap.to(hover, { current: 1, duration: 0.7, ease: "power2.out" });
  };

  const handleOut = () => {
    document.body.style.cursor = "auto";
    gsap.to(hover, { current: 0, duration: 0.9, ease: "power3.out" });
    gsap.to(targetUv.current, { x: 0.5, y: 0.5, duration: 0.8, ease: "power2.out" });
  };

  useFrame((state) => {
    if (disposed.current) return;
    const t = state.clock.elapsedTime;
    const fade = fadeInOut(scroll.offset, from, to, 0.03);

    const u = matRef.current?.uniforms;
    if (u) {
      u.uTime.value = t;
      u.uHover.value += (hover.current - u.uHover.value) * 0.12;
      u.uMouse.value.lerp(targetUv.current, 0.1);
      u.uOpacity.value = fade * entrance.current;
    }

    if (!entered.current && fade > 0.02 && group.current) {
      entered.current = true;
      gsap.to(entrance, {
        current: 1,
        duration: 1.1,
        delay: index * 0.08,
        ease: "power3.out",
      });
      gsap.fromTo(
        group.current.scale,
        { x: 0.45, y: 0.45, z: 0.45 },
        { x: 1, y: 1, z: 1, duration: 1.4, delay: index * 0.08, ease: "back.out(1.6)" },
      );
      gsap.fromTo(
        group.current.position,
        { y: group.current.position.y - 60 },
        { y: group.current.position.y, duration: 1.4, delay: index * 0.08, ease: "power3.out" },
      );
    }

    if (mesh.current) {
      mesh.current.scale.setScalar(1 + (u?.uHover.value ?? 0) * 0.06);
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity = (u?.uHover.value ?? 0) * 0.4 * fade;
    }

    if (inner.current) {
      const mx = mouse.current.x;
      const hv = u?.uHover.value ?? 0;
      inner.current.position.y =
        Math.sin(t * 0.6 + index * 1.7) * 5 * (0.35 + hv * 0.65);
      inner.current.rotation.y =
        rotY + Math.sin(t * 0.4 + index) * 0.045 + mx * 0.05 * (0.3 + hv);
      inner.current.rotation.z = Math.sin(t * 0.5 + index * 2.1) * 0.015;
    }
  });

  return (
    <group ref={group} position={position}>
      <group ref={inner}>
        <mesh
          ref={mesh}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleOver();
          }}
          onPointerMove={(e) => {
            e.stopPropagation();
            if (e.uv) targetUv.current.copy(e.uv);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleOut();
          }}
        >
          <planeGeometry args={[w, height, 96, 96]} />
          <shaderMaterial
            ref={matRef}
            vertexShader={VERTEX_SHADER}
            fragmentShader={FRAGMENT_SHADER}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0, -0.6]} scale={1.04}>
          <planeGeometry args={[w, height]} />
          <meshBasicMaterial
            ref={glowMatRef}
            color="#D4AF37"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

type LiquidHeritageGalleryProps = {
  from: number;
  to: number;
};

export function LiquidHeritageGallery({ from, to }: LiquidHeritageGalleryProps) {
  const scroll = homeScroll;
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    mouse.current.set(state.pointer.x, state.pointer.y);
    const fade = fadeInOut(scroll.offset, from, to, 0.03);
    if (group.current) {
      group.current.visible = fade > 0.001;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
      group.current.rotation.z = mouse.current.y * 0.012;
    }
  });

  return (
    <group position={[0, 26, -55]} ref={group}>
      {IMAGES.map((img, i) => (
        <LiquidImage key={img.src} {...img} index={i} from={from} to={to} mouse={mouse} />
      ))}
    </group>
  );
}
