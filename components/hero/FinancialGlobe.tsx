"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { HERO_THEME } from "./heroConfig";
import type { ViewportTier } from "@/hooks/useViewportTier";
import styles from "./hero.module.css";

type FinancialGlobeProps = {
  reducedMotion: boolean;
  tier: ViewportTier;
  onReadyChange?: (ready: boolean) => void;
};

function particleCount(tier: ViewportTier) {
  switch (tier) {
    case "mobile":
      return HERO_THEME.particleCountMobile;
    case "tablet":
      return HERO_THEME.particleCountTablet;
    case "desktop":
      return HERO_THEME.particleCountDesktop;
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
}

function spherePointCloud(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 0.02 + (i / Math.max(count - 1, 1)) * 0.98;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const idx = i * 3;
    positions[idx] = Math.cos(theta) * r * radius;
    positions[idx + 1] = y * radius;
    positions[idx + 2] = Math.sin(theta) * r * radius;
  }

  return positions;
}

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fresnelFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform vec3 uColor;

  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.6);
    gl_FragColor = vec4(uColor, fresnel * 0.62);
  }
`;

function GlobeScene({
  reducedMotion,
  tier,
}: {
  reducedMotion: boolean;
  tier: ViewportTier;
}) {
  const group = useRef<THREE.Group>(null);
  const count = particleCount(tier);
  const points = useMemo(() => spherePointCloud(count, 1.62), [count]);
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return geometry;
  }, [points]);
  const accent = useMemo(() => new THREE.Color(HERO_THEME.accent), []);
  const animate = HERO_THEME.enableAnimation && !reducedMotion && HERO_THEME.rotationSpeed > 0;
  const scale =
    HERO_THEME.globeScale *
    (tier === "mobile" ? 0.72 : tier === "tablet" ? 0.88 : 1);

  const uniforms = useMemo(
    () => ({
      uColor: { value: accent },
    }),
    [accent],
  );

  useFrame((_, delta) => {
    if (!group.current || !animate) {
      return;
    }
    group.current.rotation.y += delta * HERO_THEME.rotationSpeed;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.18,
      0.02,
    );
  });

  const segments = tier === "mobile" ? 48 : 96;

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={scale}>
      <mesh>
        <sphereGeometry args={[1.58, segments, segments]} />
        <meshStandardMaterial
          color="#070a08"
          roughness={0.94}
          metalness={0.22}
          envMapIntensity={0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.592, 36, 22]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.605, segments, segments]} />
        <shaderMaterial
          vertexShader={fresnelVertex}
          fragmentShader={fresnelFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <points geometry={pointsGeometry}>
        <pointsMaterial
          color={accent}
          size={tier === "mobile" ? 0.018 : 0.022}
          sizeAttenuation
          transparent
          opacity={0.72}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

export function FinancialGlobe({
  reducedMotion,
  tier,
  onReadyChange,
}: FinancialGlobeProps) {
  const frameloop =
    HERO_THEME.enableAnimation && !reducedMotion ? "always" : "demand";
  const onReadyChangeRef = useRef(onReadyChange);
  onReadyChangeRef.current = onReadyChange;

  useEffect(() => {
    return () => {
      onReadyChangeRef.current?.(false);
    };
  }, []);

  return (
    <div className={styles.globeStage} aria-hidden="true">
      <Canvas
        className={styles.globeCanvas}
        dpr={[1, 1.5]}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              onReadyChangeRef.current?.(true);
            });
          });
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.42, 4.35]} fov={36} near={0.1} far={20} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[1.4, 2.2, 1.6]} intensity={0.55} color="#c8ffd0" />
        <directionalLight position={[-2.2, 0.6, -1]} intensity={0.12} color={HERO_THEME.accent} />
        <GlobeScene reducedMotion={reducedMotion} tier={tier} />
      </Canvas>
    </div>
  );
}
