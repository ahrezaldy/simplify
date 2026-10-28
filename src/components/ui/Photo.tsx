"use client";

import { motion } from "motion/react";
import { credits, type PhotoName } from "@/lib/credits";
import { EXIT, ease } from "@/lib/motion";
import { Tilt } from "./Tilt";

/** Tilting photo card with a clip-path reveal and the licence credit. */
export function Photo({ name, alt, className, imgClassName, delay = 0.2, round = false }: { name: PhotoName; alt: string; className?: string; imgClassName?: string; delay?: number; round?: boolean }) {
  const c = credits[name];
  return (
    <motion.div
      className={className}
      initial={{ clipPath: round ? "circle(0% at 50% 50%)" : "inset(100% 0% 0% 0% round 28px)" }}
      animate={{ clipPath: round ? "circle(50% at 50% 50%)" : "inset(0% 0% 0% 0% round 28px)" }}
      exit={{ opacity: 0, transition: EXIT }}
      transition={{ duration: 1.1, ease: ease.out, delay }}
    >
      <Tilt max={7} className={`h-full w-full overflow-hidden shadow-2xl ${round ? "rounded-full" : "rounded-[28px]"}`}>
        <motion.img
          src={`/images/${name}`}
          alt={alt}
          draggable={false}
          className={`h-full w-full object-cover ${imgClassName ?? ""}`}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.02 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.6, ease: ease.out }}
        />
        {!round && (
          <span className="absolute bottom-2 right-3 rounded bg-black/45 px-2 py-0.5 text-[11px] text-white/85">
            {c.author} · {c.license}
          </span>
        )}
      </Tilt>
    </motion.div>
  );
}
