"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

export type DeckApi = {
  index: number;
  total: number;
  goTo: (i: number) => void;
  /** Pointer position over the stage, -1..1 on each axis, spring-smoothed. */
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
};

export const DeckContext = createContext<DeckApi | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used inside <Deck>");
  return ctx;
}

export const usePointer = () => useDeck().pointer;
