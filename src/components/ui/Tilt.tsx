"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type Props = React.ComponentProps<typeof motion.div> & { max?: number; glare?: boolean };

/** Card that tilts toward the cursor with a soft moving glare. */
export function Tilt({ max = 10, glare = true, children, className, style, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const bg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d", ...style }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      {...rest}
    >
      {children as React.ReactNode}
      {glare && <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" style={{ background: bg }} />}
    </motion.div>
  );
}
