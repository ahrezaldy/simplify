"use client";

import { Billboard, Float, Line, OrbitControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

export type RecapNode = { id: string; label: string; pos: [number, number, number] };
export type RecapEdge = [string, string];

function Node({ node, index, active, onSelect }: { node: RecapNode; index: number; active: boolean; onSelect: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const born = useRef(0);
  const { brand, accent, dark, calm } = useSceneEnv();
  useFrame((state, dt) => {
    born.current = Math.min(1, born.current + dt * (calm ? 3 : 1.4));
    const appear = THREE.MathUtils.clamp(born.current * 3 - index * 0.25, 0, 1);
    const target = appear * (active ? 1.35 : hover ? 1.2 : 1);
    const m = ref.current;
    if (!m) return;
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, target, 0.15));
    if (active && !calm) m.rotation.y += dt;
    if (active) (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
  });
  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        scale={0}
        onClick={(e) => (e.stopPropagation(), onSelect())}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true), (document.body.style.cursor = "pointer"))}
        onPointerOut={() => (setHover(false), (document.body.style.cursor = ""))}
      >
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color={active ? accent : brand} emissive={active ? accent : brand} emissiveIntensity={active ? 0.5 : 0.15} flatShading roughness={0.35} />
      </mesh>
      <Billboard position={[0, -0.82, 0]}>
        <Text font="/fonts/Lato-Black.ttf" fontSize={0.32} color={active ? "#2b2f2c" : dark ? "#e8f1eb" : "#2b2f2c"} outlineWidth={active ? 0.06 : 0.03} outlineColor={active ? accent : dark ? "#1a2a21" : "#ffffff"} anchorX="center" anchorY="top">
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

function Edge({ from, to, delay }: { from: THREE.Vector3Tuple; to: THREE.Vector3Tuple; delay: number }) {
  const ref = useRef<{ material: THREE.Material & { dashOffset: number; opacity: number } } | null>(null);
  const t = useRef(-delay);
  const { dark } = useSceneEnv();
  useFrame((_, dt) => {
    t.current += dt;
    const m = ref.current?.material;
    if (!m) return;
    m.opacity = THREE.MathUtils.clamp(t.current * 1.5, 0, 0.9);
    m.dashOffset -= dt * 0.6;
  });
  return (
    <Line
      // drei's Line ref type is loose; we only touch material props
      ref={ref as never}
      points={[from, to]}
      color={dark ? "#9ff0c0" : "#3f3f3f"}
      lineWidth={2.5}
      dashed
      dashSize={0.25}
      gapSize={0.12}
      transparent
      opacity={0}
    />
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1 + state.pointer.y * 1.2, 0.03);
  });
  return null;
}

function Lights() {
  const { dark } = useSceneEnv();
  return (
    <>
      <ambientLight intensity={dark ? 0.5 : 0.9} />
      <directionalLight position={[4, 6, 6]} intensity={2} />
    </>
  );
}

export default function RecapScene({ nodes, edges, active, onSelect }: { nodes: RecapNode[]; edges: RecapEdge[]; active: string; onSelect: (id: string) => void }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <ThreeCanvas camera={{ position: [0, 1, 11], fov: 45 }}>
      <Lights />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        {edges.map(([a, b], i) => (
          <Edge key={`${a}-${b}`} from={byId[a].pos} to={byId[b].pos} delay={0.4 + i * 0.18} />
        ))}
        {nodes.map((n, i) => (
          <Node key={n.id} node={n} index={i} active={active === n.id} onSelect={() => onSelect(n.id)} />
        ))}
      </Float>
      <Rig />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} minAzimuthAngle={-0.6} maxAzimuthAngle={0.6} minPolarAngle={1.1} maxPolarAngle={1.9} />
    </ThreeCanvas>
  );
}
