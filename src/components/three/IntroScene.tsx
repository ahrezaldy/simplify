"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { seeded } from "@/lib/random";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

function Particles({ count = 1200 }) {
  const ref = useRef<THREE.Points>(null);
  const { calm, dark } = useSceneEnv();
  const positions = useMemo(() => {
    const rnd = seeded(7);
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd() - 0.5) * 22;
      a[i * 3 + 1] = (rnd() - 0.5) * 13;
      a[i * 3 + 2] = (rnd() - 0.5) * 10 - 2;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * (calm ? 0.005 : 0.025);
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={dark ? "#9ff0c0" : "#ffffff"} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  const spin = useRef(0);
  const [hover, setHover] = useState(false);
  const { calm } = useSceneEnv();
  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    spin.current *= 0.96;
    m.rotation.x += dt * (calm ? 0.05 : 0.25) + spin.current * dt;
    m.rotation.y += dt * (calm ? 0.04 : 0.18) + spin.current * dt * 0.6;
    const s = THREE.MathUtils.lerp(m.scale.x, hover ? 1.08 : 1, 0.1);
    m.scale.setScalar(s);
  });
  return (
    <mesh
      ref={ref}
      position={[4.2, 1.6, -1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => (spin.current += calm ? 2 : 9)}
    >
      <torusGeometry args={[2, 0.55, 48, 128]} />
      <meshPhysicalMaterial color="#ffffff" roughness={0.15} metalness={0.1} transmission={0.6} thickness={1.2} transparent opacity={0.55} />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.2, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.8, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function IntroScene() {
  return (
    <ThreeCanvas camera={{ position: [0, 0, 9], fov: 50 }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={2} />
      <pointLight position={[-6, -3, 4]} intensity={30} color="#ffc107" />
      <Ring />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[-5.6, -3, -2]}>
          <sphereGeometry args={[1.3, 48, 48]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.22} roughness={0.4} />
        </mesh>
      </Float>
      <Float speed={3} floatIntensity={2}>
        <mesh position={[2.4, -2.6, 0]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#ffc107" flatShading />
        </mesh>
      </Float>
      <Float speed={2.5} floatIntensity={2}>
        <mesh position={[-3.8, 2.6, 0.5]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
      </Float>
      <Particles />
      <Rig />
    </ThreeCanvas>
  );
}
