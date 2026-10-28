"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { SplitText } from "@/components/ui/SplitText";
import { EXIT, ease } from "@/lib/motion";
import { BrandMark } from "./SlideFrame";

type Ripple = { id: number; x: number; y: number };

/** Green section divider with parallax rings; clicking drops a ripple ring. */
export function Divider({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-divider-bg text-divider-fg"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        // getBoundingClientRect is in zoomed px; convert back to stage px
        const k = 1600 / r.width;
        setRipples((rs) => [...rs.slice(-4), { id, x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }]);
      }}
    >
      <Parallax depth={30} className="pointer-events-none absolute -left-[120px] -top-[120px]">
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.6, opacity: 0, transition: EXIT }}
          transition={{ duration: 1.2, ease: ease.out }}
          className="h-[300px] w-[300px] rounded-full border-[44px] border-white/25"
        />
      </Parallax>
      <Parallax depth={-40} className="pointer-events-none absolute -bottom-[260px] -right-[160px]">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, transition: EXIT }}
          transition={{ duration: 1.3, ease: ease.out, delay: 0.1 }}
          className="relative h-[560px] w-[560px] rounded-full bg-white/18"
        >
          <div className="absolute -top-[10px] left-[10px] h-[140px] w-[140px] rounded-full bg-white/15" />
        </motion.div>
      </Parallax>
      <Parallax depth={60} className="pointer-events-none absolute right-[260px] top-[120px]">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-[70px] w-[70px] rounded-full border-[10px] border-white/20"
        />
      </Parallax>

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full border-4 border-white/50"
            style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 700, height: 700, opacity: 0 }}
            transition={{ duration: 1.4, ease: ease.out }}
            onAnimationComplete={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      <div className="absolute bottom-[300px] left-[104px]">
        <Magnetic strength={0.12}>
          <h2 className="text-[112px] font-black leading-none tracking-tight">
            <SplitText text={title} by="char" />
          </h2>
        </Magnetic>
        {subtitle && (
          <motion.p
            className="mt-6 text-[40px] font-light"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: EXIT }}
            transition={{ duration: 0.8, ease: ease.out, delay: 0.55 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
      <div className="absolute bottom-[34px] left-[48px]">
        <BrandMark light />
      </div>
      <motion.p
        className="absolute bottom-[40px] right-[56px] text-[15px] text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        click anywhere
      </motion.p>
    </div>
  );
}
