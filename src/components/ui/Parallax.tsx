"use client";

import { motion, useTransform } from "motion/react";
import { usePointer } from "@/components/deck/DeckContext";

/** Shifts children by `depth` px against the stage pointer. Negative depth moves with it. */
export function Parallax({ depth = 20, children, className, style }: { depth?: number; children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const p = usePointer();
  const x = useTransform(p.x, (v) => v * -depth);
  const y = useTransform(p.y, (v) => v * -depth);
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}
