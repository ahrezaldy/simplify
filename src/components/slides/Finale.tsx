"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { siFacebook, siInstagram, siX, siYoutube } from "simple-icons";
import { BrandMark, SlideFrame } from "@/components/deck/SlideFrame";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitText } from "@/components/ui/SplitText";
import type { PlaygroundState } from "@/components/three/PlaygroundScene";
import type { RecapEdge, RecapNode } from "@/components/three/RecapScene";
import { EXIT, ease, pop, spring, stagger } from "@/lib/motion";

const RecapScene = dynamic(() => import("@/components/three/RecapScene"), { ssr: false });
const PlaygroundScene = dynamic(() => import("@/components/three/PlaygroundScene"), { ssr: false });
const IntroScene = dynamic(() => import("@/components/three/IntroScene"), { ssr: false });

const NODES: (RecapNode & { detail: string })[] = [
  { id: "rival", label: "Spot the simplifier", pos: [-5.4, 0.4, 0], detail: "Is the new rival price- or proposition-simplifying? Watch for the warning signs: a different design, a joy to use, a much cheaper product, a fast-growing entrant." },
  { id: "price", label: "Price-simplify", pos: [-2.4, -1.6, 1], detail: "Cut price 50–90% by redesigning the business system: subtract features, reduce variety, automate, co-opt customers, sell direct, scale up." },
  { id: "prop", label: "Proposition-simplify", pos: [-2.4, 2.2, -1], detail: "Make it easier to use, more useful and more artistic. Creates a new market; may command a premium." },
  { id: "tradeoff", label: "Virtuous trade-offs", pos: [0.8, 0.3, 0], detail: "Aim for two good attributes instead of one good and one bad." },
  { id: "traps", label: "Avoid the traps", pos: [3.4, 1.9, 0.6], detail: "Overhead, cannibalization, customer, complexity and skill traps are bad reasons not to simplify." },
  { id: "radical", label: "Out-simplify them", pos: [5.4, -0.6, 0], detail: "Commit to simplifying more radically than the rival — and pick the structure. Acquiring the simplifier usually has the best chance; building it inside the old organization nearly always fails." },
];
const EDGES: RecapEdge[] = [
  ["rival", "price"],
  ["rival", "prop"],
  ["price", "tradeoff"],
  ["prop", "tradeoff"],
  ["tradeoff", "traps"],
  ["traps", "radical"],
];

export function Recap() {
  const [active, setActive] = useState("rival");
  const i = NODES.findIndex((n) => n.id === active);
  const n = NODES[i];
  return (
    <SlideFrame title="Recap">
      <motion.div className="absolute left-0 top-[150px] h-[480px] w-[1600px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1 }}>
        <RecapScene nodes={NODES} edges={EDGES} active={active} onSelect={setActive} />
      </motion.div>
      <motion.p className="absolute right-[150px] top-[120px] text-[15px] text-fg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        click a node · drag to orbit
      </motion.p>
      <div className="absolute left-[150px] top-[640px] flex w-[1150px] items-start gap-8">
        <div className="flex gap-2 pt-2">
          {NODES.map((x, j) => (
            <button key={x.id} aria-label={x.label} onClick={() => setActive(x.id)} className="h-3 rounded-full transition-all" style={{ width: j === i ? 36 : 12, background: j === i ? "var(--brand)" : "var(--line)" }} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: ease.out }}>
            <p className="text-[28px] font-black text-fg">
              <span className="mr-3 font-mono text-[20px] text-brand">0{i + 1}</span>
              {n.label}
            </p>
            <p className="mt-1 text-[21px] leading-snug text-fg-muted">{n.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}

const PRICE = ["Subtract features", "Reduce variety", "Add cheap benefits", "Automate", "Orchestrate", "Co-opt customers", "Sell direct", "Simpler technology", "Scale up"];
const PROP = ["Easier to use", "More useful", "More artistic"];

function compute(price: Set<string>, prop: Set<string>): PlaygroundState {
  const p = price.size;
  const q = prop.size;
  const x = -3 + (p + q * 2) * 0.55;
  const y = Math.max(-2, Math.min(2.2, q * 0.7 - p * 0.22));
  const size = 0.55 + p * 0.17 + q * 0.12;
  const tone = p === 0 && q === 0 ? "start" : q === 0 ? "mass" : p === 0 ? "premium" : "mixed";
  return { x: Math.min(x, 4), y, size, tone };
}

export function Playground() {
  const [price, setPrice] = useState<Set<string>>(new Set());
  const [prop, setProp] = useState<Set<string>>(new Set());
  const state = compute(price, prop);
  const toggle = (set: Set<string>, fn: (s: Set<string>) => void, k: string) => {
    const n = new Set(set);
    if (n.has(k)) n.delete(k);
    else n.add(k);
    fn(n);
  };
  const verdict = {
    start: "Today's market — pick some levers.",
    mass: "Heading for the mass market: lower willingness to pay, far bigger market.",
    premium: "Heading for a premium market: higher willingness to pay, a new market.",
    mixed: "Mixing both ways — moving right on simplicity either way.",
  }[state.tone];

  return (
    <SlideFrame title="Simplifier playground">
      <motion.div className="absolute left-[80px] top-[170px] h-[620px] w-[900px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1, ease: ease.out }}>
        <PlaygroundScene state={state} />
      </motion.div>
      <motion.div className="absolute left-[1010px] top-[200px] w-[450px]" initial="hidden" animate="show" exit="exit" variants={stagger(0.03, 0.4)}>
        <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-fg">Price levers</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRICE.map((k) => (
            <Chip key={k} on={price.has(k)} onClick={() => toggle(price, setPrice, k)} tone="bg-charcoal text-white">
              {k}
            </Chip>
          ))}
        </div>
        <p className="mt-6 text-[16px] font-bold uppercase tracking-[0.2em] text-brand">Proposition levers</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROP.map((k) => (
            <Chip key={k} on={prop.has(k)} onClick={() => toggle(prop, setProp, k)} tone="bg-brand text-white">
              {k}
            </Chip>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={state.tone} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-7 min-h-[90px] text-[22px] font-bold leading-snug text-fg">
            {verdict}
          </motion.p>
        </AnimatePresence>
        <div className="mt-2 flex flex-col items-start gap-3">
          <button
            onClick={() => {
              setPrice(new Set());
              setProp(new Set());
            }}
            className="flex items-center gap-2 rounded-full bg-bg-soft px-5 py-2 text-[16px] font-bold text-fg-muted hover:text-fg"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <span className="text-[14px] text-fg-muted">Illustrative · directions from the core principles chart</span>
        </div>
      </motion.div>
    </SlideFrame>
  );
}

function Chip({ on, onClick, tone, children }: { on: boolean; onClick: () => void; tone: string; children: React.ReactNode }) {
  return (
    <motion.button variants={pop} onClick={onClick} whileTap={{ scale: 0.92 }} animate={{ scale: on ? 1.04 : 1 }} transition={spring.snappy} className={`rounded-full px-4 py-2 text-[16px] font-bold transition-colors ${on ? tone + " shadow-md" : "bg-bg-soft text-fg-muted hover:text-fg"}`}>
      {children}
    </motion.button>
  );
}

const SOCIALS = [
  { icon: siFacebook, label: "facebook.com/mamikosapp", href: "https://facebook.com/mamikosapp" },
  { icon: siInstagram, label: "mamikosapp", href: "https://instagram.com/mamikosapp" },
  { icon: siX, label: "mamikosapp", href: "https://x.com/mamikosapp" },
  { icon: siYoutube, label: "MamiKos App", href: "https://www.youtube.com/results?search_query=MamiKos+App" },
];

export function Thanks() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-divider-bg text-white">
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1.2 }}>
        <IntroScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="pointer-events-auto">
          <Magnetic strength={0.1}>
            <h2 className="text-[220px] font-black leading-none tracking-tight">
              <SplitText text="Thanks!" by="char" step={0.07} />
            </h2>
          </Magnetic>
        </div>
        <motion.p className="mt-4 text-[28px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <b>Arif Hidayah Rezaldy</b> · Mamikos
        </motion.p>
        <motion.ul className="pointer-events-auto mt-14 flex gap-12" initial="hidden" animate="show" exit="exit" variants={stagger(0.1, 1.1)}>
          {SOCIALS.map((s) => (
            <motion.li key={s.href} variants={pop}>
              <Magnetic strength={0.3}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-[22px]">
                  <motion.svg viewBox="0 0 24 24" className="h-8 w-8" whileHover={{ rotate: -12, scale: 1.2 }} transition={spring.bouncy}>
                    <path d={s.icon.path} fill="currentColor" />
                  </motion.svg>
                  <span className="relative">
                    {s.label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </a>
              </Magnetic>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="pointer-events-none absolute bottom-[34px] right-[48px]">
        <BrandMark light />
      </div>
    </div>
  );
}
