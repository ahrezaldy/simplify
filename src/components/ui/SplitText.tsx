"use client";

import { motion, type Variants } from "motion/react";
import { EXIT, ease } from "@/lib/motion";

const piece: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -70 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: ease.out } },
  exit: { opacity: 0, y: "-0.3em", transition: EXIT },
};

type Props = {
  text: string;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  step?: number;
  /** Words to tint with the brand colour on hover. */
  highlight?: (word: string, i: number) => boolean;
};

export function SplitText({ text, by = "word", className, delay = 0.1, step, highlight }: Props) {
  const words = text.split(" ");
  const s = step ?? (by === "char" ? 0.035 : 0.06);
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", perspective: 600 }}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{ show: { transition: { staggerChildren: s, delayChildren: delay } }, exit: { transition: { staggerChildren: 0.01 } } }}
      aria-label={text}
    >
      {words.map((w, wi) => (
        <span key={wi} aria-hidden style={{ display: "inline-block", whiteSpace: "pre" }}>
          {by === "char" ? (
            w.split("").map((c, ci) => (
              <motion.span key={ci} variants={piece} style={{ display: "inline-block", transformOrigin: "50% 100%" }}>
                {c}
              </motion.span>
            ))
          ) : (
            <motion.span
              variants={piece}
              style={{ display: "inline-block", transformOrigin: "50% 100%" }}
              className={highlight?.(w, wi) ? "cursor-default rounded transition-colors duration-300 hover:bg-brand hover:text-white" : undefined}
            >
              {w}
            </motion.span>
          )}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
