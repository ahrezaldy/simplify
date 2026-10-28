import type { Transition, Variants } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  in: [0.55, 0, 1, 0.45] as const,
};

export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 } satisfies Transition,
  snappy: { type: "spring", stiffness: 320, damping: 26 } satisfies Transition,
  bouncy: { type: "spring", stiffness: 260, damping: 14 } satisfies Transition,
};

export const EXIT = { duration: 0.28, ease: ease.in } satisfies Transition;

/** Parent that staggers its children in, and reverses them out on exit. */
export const stagger = (step = 0.08, delay = 0.15): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: ease.out } },
  exit: { opacity: 0, y: -14, filter: "blur(4px)", transition: EXIT },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: spring.bouncy },
  exit: { opacity: 0, scale: 0.92, transition: EXIT },
};

export const slideIn = (x = -40): Variants => ({
  hidden: { opacity: 0, x },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.out } },
  exit: { opacity: 0, x: x / 2, transition: EXIT },
});
