"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { createContext, useContext } from "react";
import { installThreeConsoleFilter } from "@/lib/three-console";

// Runs once, before any Canvas constructs a THREE.Clock.
installThreeConsoleFilter();

export type SceneEnv = { dark: boolean; calm: boolean; brand: string; deep: string; accent: string; fg: string };

const SceneContext = createContext<SceneEnv>({ dark: false, calm: false, brand: "#1baa56", deep: "#0e7a3c", accent: "#ffc107", fg: "#2b2f2c" });

/** Theme + reduced-motion info for anything rendered inside a ThreeCanvas. */
export const useSceneEnv = () => useContext(SceneContext);

/**
 * Shared R3F canvas. `offsetSize` keeps sizing and pointer maths correct inside the
 * transform-scaled stage. Only mounted while its slide is active (the deck renders one slide).
 */
export default function ThreeCanvas({ children, ...props }: CanvasProps) {
  const { resolvedTheme } = useTheme();
  const calm = useReducedMotion() ?? false;
  const dark = resolvedTheme === "dark";
  const env: SceneEnv = dark
    ? { dark, calm, brand: "#2ec26a", deep: "#1baa56", accent: "#ffcc33", fg: "#eef6f0" }
    : { dark, calm, brand: "#1baa56", deep: "#0e7a3c", accent: "#ffc107", fg: "#2b2f2c" };

  return (
    <Canvas dpr={[1, 2]} resize={{ offsetSize: true }} gl={{ antialias: true, alpha: true }} {...props}>
      <SceneContext.Provider value={env}>{children}</SceneContext.Provider>
    </Canvas>
  );
}
