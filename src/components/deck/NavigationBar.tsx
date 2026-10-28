"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { spring } from "@/lib/motion";

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      aria-label={label}
      title={label}
      onClick={onClick}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={spring.snappy}
      className="grid h-10 w-10 place-items-center rounded-full text-fg hover:bg-brand hover:text-white"
    >
      {children}
    </motion.button>
  );
}

export function NavigationBar({ index, total, goTo, onOverview, jump }: { index: number; total: number; goTo: (i: number) => void; onOverview: () => void; jump: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [full, setFull] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 2500);
    };
    wake();
    window.addEventListener("pointermove", wake);
    window.addEventListener("keydown", wake);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <motion.nav
        animate={{ opacity: idle ? 0.15 : 1, y: idle ? 8 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-card/85 px-2 py-1.5 shadow-lg backdrop-blur"
      >
        <IconButton label="Previous (←)" onClick={() => goTo(index - 1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <div className="w-[88px] text-center font-mono text-sm tabular-nums text-fg">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={index} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="inline-block">
              {pad(index + 1)}
            </motion.span>
          </AnimatePresence>
          <span className="text-fg-muted"> / {pad(total)}</span>
        </div>
        <IconButton label="Next (→)" onClick={() => goTo(index + 1)}>
          <ChevronRight size={20} />
        </IconButton>
        <span className="mx-1 h-6 w-px bg-line" />
        <IconButton label="Slide overview (Esc)" onClick={onOverview}>
          <LayoutGrid size={18} />
        </IconButton>
        <IconButton label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={resolvedTheme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.span>
          </AnimatePresence>
        </IconButton>
        <IconButton label={full ? "Exit fullscreen (Esc)" : "Fullscreen (F)"} onClick={() => (full ? document.exitFullscreen() : document.documentElement.requestFullscreen())}>
          {full ? <Minimize size={18} /> : <Maximize size={18} />}
        </IconButton>
      </motion.nav>

      <AnimatePresence>
        {jump && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 top-6 z-50 rounded-2xl bg-brand px-5 py-3 font-mono text-2xl text-white shadow-xl"
          >
            Go to {jump} <span className="text-sm opacity-70">↵</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
