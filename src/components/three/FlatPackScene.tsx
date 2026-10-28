"use client";

import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

type Pose = { p: [number, number, number]; r: [number, number, number] };

const LEGS: { built: Pose; flat: Pose }[] = [
  [-1, -0.55],
  [1, -0.55],
  [-1, 0.55],
  [1, 0.55],
].map(([x, z], i) => ({
  built: { p: [x, 0.5, z], r: [0, 0, 0] },
  flat: { p: [-0.75 + i * 0.5, 0.2, 0], r: [Math.PI / 2, 0, 0] },
}));
const TOP = { built: { p: [0, 1.06, 0], r: [0, 0, 0] } as Pose, flat: { p: [0, 0.06, 0], r: [0, 0, 0] } as Pose };

function Part({ pose, flat, children }: { pose: { built: Pose; flat: Pose }; flat: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { calm } = useSceneEnv();
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const t = flat ? pose.flat : pose.built;
    const k = calm ? 0.25 : 0.08;
    g.position.lerp(new THREE.Vector3(...t.p), k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, t.r[0], k);
  });
  return (
    <group ref={ref} position={pose.built.p}>
      {children}
    </group>
  );
}

function Box({ flat }: { flat: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, flat ? 0.55 : 0, 0.06);
    m.scale.y = THREE.MathUtils.lerp(m.scale.y, flat ? 1 : 2.5, 0.06);
  });
  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <boxGeometry args={[2.7, 0.42, 1.6]} />
      <meshStandardMaterial color="#c9a66b" transparent opacity={0} roughness={0.9} depthWrite={false} />
    </mesh>
  );
}

function Table({ flat, onToggle }: { flat: boolean; onToggle: () => void }) {
  const { dark } = useSceneEnv();
  const wood = <meshStandardMaterial color={dark ? "#d8b98a" : "#e2c290"} roughness={0.55} />;
  return (
    <group
      onClick={(e) => (e.stopPropagation(), onToggle())}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <Part pose={TOP} flat={flat}>
        <RoundedBox args={[2.5, 0.12, 1.4]} radius={0.04}>
          {wood}
        </RoundedBox>
      </Part>
      {LEGS.map((l, i) => (
        <Part key={i} pose={l} flat={flat}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 1, 16]} />
            <meshStandardMaterial color={dark ? "#f2f2f2" : "#3f3f3f"} roughness={0.4} />
          </mesh>
        </Part>
      ))}
      <Box flat={flat} />
    </group>
  );
}

function Lights() {
  const { dark, brand } = useSceneEnv();
  return (
    <>
      <ambientLight intensity={dark ? 0.6 : 1} />
      <directionalLight position={[3, 6, 4]} intensity={2.2} />
      <pointLight position={[-3, 2, 2]} intensity={12} color={brand} />
    </>
  );
}

export default function FlatPackScene({ flat, onToggle }: { flat: boolean; onToggle: () => void }) {
  return (
    <ThreeCanvas camera={{ position: [3.2, 2.6, 4.2], fov: 40 }}>
      <Lights />
      <group position={[0, -0.6, 0]}>
        <Table flat={flat} onToggle={onToggle} />
        <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={7} blur={2.4} far={3} />
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} minPolarAngle={0.6} maxPolarAngle={1.4} target={[0, 0, 0]} />
    </ThreeCanvas>
  );
}
