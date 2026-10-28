"use client";

import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { slides } from "@/components/slides";
import { ease } from "@/lib/motion";
import { DeckContext, type DeckApi } from "./DeckContext";
import { NavigationBar } from "./NavigationBar";
import { ThumbnailOverview } from "./ThumbnailOverview";

const W = 1600;
const H = 900;

function indexFromHash() {
  const m = window.location.hash.match(/^#\/slide\/(\d+)/);
  const n = m ? parseInt(m[1], 10) - 1 : 0;
  return Math.min(Math.max(n, 0), slides.length - 1);
}

export function Deck() {
  const [index, setIndex] = useState(indexFromHash);
  const [dir, setDir] = useState(1);
  const [overview, setOverview] = useState(false);
  const [jump, setJump] = useState("");
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  const goTo = useCallback((i: number) => {
    const n = Math.min(Math.max(i, 0), slides.length - 1);
    setIndex((cur) => {
      if (n !== cur) setDir(n > cur ? 1 : -1);
      return n;
    });
  }, []);

  useEffect(() => {
    const target = `#/slide/${index + 1}`;
    if (window.location.hash !== target) history.replaceState(null, "", target);
    document.title = `${String(index + 1).padStart(2, "0")} · ${slides[index].title} — Simplify`;
  }, [index]);

  useEffect(() => {
    const onHash = () => goTo(indexFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [goTo]);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          goTo(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goTo(index - 1);
          break;
        case "Home":
          goTo(0);
          break;
        case "End":
          goTo(slides.length - 1);
          break;
        case "f":
        case "F":
          if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
          break;
        case "Escape":
          // Browsers consume Esc to leave fullscreen; outside fullscreen it toggles the overview.
          if (!document.fullscreenElement) setOverview((o) => !o);
          setJump("");
          break;
        case "Enter":
          if (jump) {
            goTo(parseInt(jump, 10) - 1);
            setJump("");
            setOverview(false);
          }
          break;
        case "Backspace":
          setJump((j) => j.slice(0, -1));
          break;
        default:
          if (/^\d$/.test(e.key)) setJump((j) => (j + e.key).slice(-3));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, jump, goTo]);

  const api = useMemo<DeckApi>(() => ({ index, total: slides.length, goTo, pointer: { x: px, y: py } }), [index, goTo, px, py]);
  const Slide = slides[index].Component;

  return (
    <DeckContext.Provider value={api}>
      <main
        className="fixed inset-0 overflow-hidden bg-bg-soft"
        onPointerMove={(e) => {
          const r = stageRef.current?.getBoundingClientRect();
          if (!r) return;
          px.set(((e.clientX - r.left) / r.width) * 2 - 1);
          py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
      >
        <div
          ref={stageRef}
          className="absolute left-1/2 top-1/2 overflow-hidden bg-bg shadow-2xl"
          style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          {/* drag gestures must map viewport px back into the scaled stage */}
          <MotionConfig reducedMotion="user" transformPagePoint={(p) => ({ x: p.x / scale, y: p.y / scale })}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.section
              key={index}
              custom={dir}
              className="absolute inset-0"
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.98 }),
                center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: ease.out } },
                leave: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.98, transition: { duration: 0.35, ease: ease.in } }),
              }}
              initial="enter"
              animate="center"
              exit="leave"
            >
              <Slide />
            </motion.section>
          </AnimatePresence>
          </MotionConfig>
        </div>

        <motion.div
          className="pointer-events-none fixed left-0 top-0 h-[3px] bg-brand"
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.6, ease: ease.out }}
        />

        <NavigationBar index={index} total={slides.length} goTo={goTo} onOverview={() => setOverview(true)} jump={jump} />
        <AnimatePresence>{overview && <ThumbnailOverview index={index} goTo={goTo} onClose={() => setOverview(false)} />}</AnimatePresence>
      </main>
    </DeckContext.Provider>
  );
}
