"use client";

import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect } from "react";

export function Counter({ value, prefix = "", duration = 1.2, className }: { value: number; prefix?: string; duration?: number; className?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v)}`);
  useEffect(() => {
    const c = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, duration, mv]);
  return <motion.span className={className}>{text}</motion.span>;
}
