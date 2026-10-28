"use client";

import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ThreeCanvas, { useSceneEnv } from "./ThreeCanvas";

const font = () => getComputedStyle(document.body).fontFamily;

function coverTexture() {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 960;
  const g = c.getContext("2d")!;
  g.fillStyle = "#2f2f2f";
  g.fillRect(0, 0, c.width, c.height);
  // big asterisk behind the title, as on the cover
  g.save();
  g.translate(300, 560);
  g.fillStyle = "#4a4a4a";
  for (let i = 0; i < 3; i++) {
    g.rotate(Math.PI / 3);
    g.fillRect(-300, -45, 600, 90);
  }
  g.restore();
  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.font = `700 40px ${font()}`;
  ["HOW THE BEST", "BUSINESSES IN THE", "WORLD SUCCEED"].forEach((t, i) => g.fillText(t, 320, 110 + i * 50));
  g.font = `300 190px ${font()}`;
  g.fillText("simplify", 320, 470);
  g.fillStyle = "#d8b56a";
  g.font = `700 38px ${font()}`;
  g.fillText("RICHARD KOCH", 320, 760);
  g.fillStyle = "#ffffff";
  g.fillText("AND GREG LOCKWOOD", 320, 810);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function spineTexture() {
  const c = document.createElement("canvas");
  c.width = 120;
  c.height = 960;
  const g = c.getContext("2d")!;
  g.fillStyle = "#262626";
  g.fillRect(0, 0, 120, 960);
  g.translate(60, 480);
  g.rotate(Math.PI / 2);
  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.font = `300 64px ${font()}`;
  g.fillText("simplify", -120, 22);
  g.fillStyle = "#d8b56a";
  g.font = `700 26px ${font()}`;
  g.fillText("KOCH · LOCKWOOD", 250, 12);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Book() {
  const ref = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const { calm } = useSceneEnv();
  const mats = useMemo(() => {
    const pages = new THREE.MeshStandardMaterial({ color: "#f3efe4", roughness: 0.9 });
    const back = new THREE.MeshStandardMaterial({ color: "#2f2f2f", roughness: 0.6 });
    return [
      pages, // +x (fore-edge)
      new THREE.MeshStandardMaterial({ map: spineTexture(), roughness: 0.6 }), // -x spine
      pages,
      pages,
      new THREE.MeshStandardMaterial({ map: coverTexture(), roughness: 0.55 }), // front
      back,
    ];
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = hover ? 1.06 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, target, 0.1));
    if (!hover && !calm) ref.current.rotation.y += dt * 0.15;
  });
  return (
    <group ref={ref} rotation={[0, -0.5, 0]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <mesh material={mats}>
        <boxGeometry args={[2, 3, 0.38]} />
      </mesh>
    </group>
  );
}

function Lights() {
  const { dark } = useSceneEnv();
  return <ambientLight intensity={dark ? 0.6 : 1} />;
}

export default function BookScene() {
  return (
    <ThreeCanvas camera={{ position: [0, 0.3, 6], fov: 40 }}>
      <Lights />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, 1, 3]} intensity={20} color="#1baa56" />
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <Book />
      </Float>
      <ContactShadows position={[0, -2, 0]} opacity={0.35} scale={8} blur={2.5} far={4} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.7} />
    </ThreeCanvas>
  );
}
