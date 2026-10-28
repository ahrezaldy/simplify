"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

const COUNT = 7;
const SPAN = 16;

/** Low-poly Model T silhouette: identical, all black. */
function Car({ offset, speed }: { offset: number; speed: React.RefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const hop = useRef(0);
  const x = useRef(offset);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    x.current += dt * (0.4 + speed.current * 3.2);
    if (x.current > SPAN / 2) x.current -= SPAN;
    hop.current = Math.max(0, hop.current - dt * 2.4);
    g.position.x = x.current;
    g.position.y = 0.55 + Math.sin(hop.current * Math.PI) * 0.9;
    g.rotation.z = Math.sin(hop.current * Math.PI * 2) * 0.15;
    g.children.forEach((c) => {
      if (c.userData.wheel) c.rotation.z -= dt * (1 + speed.current * 8);
    });
  });
  const black = <meshStandardMaterial color="#111111" roughness={0.25} metalness={0.4} />;
  return (
    <group ref={ref} onClick={(e) => (e.stopPropagation(), (hop.current = 1))} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
      <RoundedBox args={[1.5, 0.35, 0.8]} radius={0.06} position={[0, 0.15, 0]}>
        {black}
      </RoundedBox>
      <RoundedBox args={[0.7, 0.55, 0.78]} radius={0.06} position={[-0.25, 0.6, 0]}>
        {black}
      </RoundedBox>
      <mesh position={[0.5, 0.42, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.6]} />
        {black}
      </mesh>
      {[-0.5, 0.5].flatMap((wx) =>
        [-0.42, 0.42].map((wz) => (
          <mesh key={`${wx}${wz}`} position={[wx, -0.05, wz]} rotation={[Math.PI / 2, 0, 0]} userData={{ wheel: true }}>
            <cylinderGeometry args={[0.24, 0.24, 0.1, 18]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
          </mesh>
        )),
      )}
    </group>
  );
}

function Line({ speed }: { speed: number }) {
  const { dark, brand, calm } = useSceneEnv();
  const s = useRef(speed);
  const belt = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    s.current = THREE.MathUtils.lerp(s.current, calm ? speed * 0.3 : speed, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 3 + state.pointer.y * 0.8, 0.05);
    state.camera.lookAt(0, 0.4, 0);
    const m = belt.current?.material as THREE.MeshStandardMaterial | undefined;
    if (m?.map) m.map.offset.x -= 0.004 + s.current * 0.03;
  });
  const stripes = useStripes(dark);
  return (
    <>
      <ambientLight intensity={dark ? 0.5 : 0.9} />
      {/* black cars need a bright sky light to read against the dark theme */}
      <hemisphereLight args={["#ffffff", brand, dark ? 1.6 : 0.4]} />
      <directionalLight position={[-4, 3, 8]} intensity={dark ? 2.5 : 0.8} />
      <directionalLight position={[4, 8, 6]} intensity={2.4} />
      <pointLight position={[0, 3, 3]} intensity={18} color={brand} />
      <mesh ref={belt} position={[0, 0, 0]}>
        <boxGeometry args={[SPAN, 0.18, 1.4]} />
        <meshStandardMaterial map={stripes} roughness={0.9} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} position={[-SPAN / 2 + 0.6 + i * 1.15, -0.55, 0.62]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 8]} />
          <meshStandardMaterial color={dark ? "#5a7466" : "#b9c4bd"} />
        </mesh>
      ))}
      {Array.from({ length: COUNT }, (_, i) => (
        <Car key={i} offset={-SPAN / 2 + (i * SPAN) / COUNT} speed={s} />
      ))}
    </>
  );
}

function useStripes(dark: boolean) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 16;
    const g = c.getContext("2d")!;
    g.fillStyle = dark ? "#3a5245" : "#5c6560";
    g.fillRect(0, 0, 256, 16);
    g.fillStyle = dark ? "#2fd06f" : "#ffc107";
    for (let i = 0; i < 8; i++) g.fillRect(i * 32, 0, 8, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(8, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [dark]);
}

export default function AssemblyScene({ speed }: { speed: number }) {
  return (
    <ThreeCanvas camera={{ position: [0, 3, 8], fov: 45 }}>
      <Line speed={speed} />
    </ThreeCanvas>
  );
}
