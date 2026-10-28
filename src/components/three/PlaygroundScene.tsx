"use client";

import { Line, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

export type PlaygroundState = { x: number; y: number; size: number; tone: "start" | "mass" | "premium" | "mixed" };

function Axes() {
  const { fg } = useSceneEnv();
  const label = (text: string, pos: THREE.Vector3Tuple) => (
    <Text font="/fonts/Lato-Black.ttf" position={pos} fontSize={0.24} letterSpacing={0.15} color={fg} fillOpacity={0.6} anchorX="center">
      {text}
    </Text>
  );
  return (
    <group>
      <Line points={[[-4.5, -2.6, 0], [4.8, -2.6, 0]]} color={fg} lineWidth={2} transparent opacity={0.5} />
      <Line points={[[-4.5, -2.6, 0], [-4.5, 2.8, 0]]} color={fg} lineWidth={2} transparent opacity={0.5} />
      {label("SIMPLICITY →", [3.6, -3.05, 0])}
      {label("WILLINGNESS TO PAY ↑", [-2.6, 3.2, 0])}
    </group>
  );
}

function Product({ state }: { state: PlaygroundState }) {
  const pulse = useRef(0);
  const core = useRef<THREE.Mesh>(null);
  const market = useRef<THREE.Mesh>(null);
  const { brand, accent, calm, dark } = useSceneEnv();
  const color = state.tone === "premium" ? brand : state.tone === "mass" ? (dark ? "#9fb0a5" : "#3f3f3f") : accent;
  useFrame((_, dt) => {
    const k = calm ? 0.2 : 0.06;
    const c = core.current;
    const m = market.current;
    if (!c || !m) return;
    c.position.lerp(new THREE.Vector3(state.x, state.y, 0), k);
    m.position.copy(c.position);
    pulse.current = Math.max(0, pulse.current - dt * 1.5);
    const target = state.size * (1 + pulse.current * 0.3);
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, target, k));
    m.rotation.y += dt * 0.2;
    c.rotation.x += dt * 0.6;
    (m.material as THREE.MeshPhysicalMaterial).color.lerp(new THREE.Color(color), 0.08);
  });
  return (
    <>
      <mesh ref={market} scale={0.5}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.28} roughness={0.2} transmission={0.4} depthWrite={false} />
      </mesh>
      <mesh ref={core} position={[-3, 0, 0]} onClick={() => (pulse.current = 1)}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial color={dark ? "#ffffff" : "#2b2f2c"} flatShading />
      </mesh>
    </>
  );
}

function Lights() {
  const { dark, brand } = useSceneEnv();
  return (
    <>
      <ambientLight intensity={dark ? 0.5 : 0.9} />
      <directionalLight position={[3, 5, 6]} intensity={2} />
      <pointLight position={[-3, 2, 4]} intensity={15} color={brand} />
      <Sparkles count={60} scale={[10, 6, 3]} size={2.5} speed={0.3} color={brand} />
    </>
  );
}

export default function PlaygroundScene({ state }: { state: PlaygroundState }) {
  return (
    <ThreeCanvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Lights />
      <Axes />
      <Product state={state} />
      <OrbitControls enableZoom={false} enablePan={false} minAzimuthAngle={-0.5} maxAzimuthAngle={0.5} minPolarAngle={1.2} maxPolarAngle={1.9} />
    </ThreeCanvas>
  );
}
