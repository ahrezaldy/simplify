"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Feather, Layers, Lightbulb, Shield, Sparkles, Tag, Users } from "lucide-react";
import { useDeck } from "@/components/deck/DeckContext";
import { BrandMark, SlideFrame } from "@/components/deck/SlideFrame";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { SplitText } from "@/components/ui/SplitText";
import { Tilt } from "@/components/ui/Tilt";
import { EXIT, ease, pop, rise, slideIn, spring, stagger } from "@/lib/motion";
import { slides } from ".";

const IntroScene = dynamic(() => import("@/components/three/IntroScene"), { ssr: false });
const BookScene = dynamic(() => import("@/components/three/BookScene"), { ssr: false });

export function Title() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-divider-bg text-white">
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1.2 }}>
        <IntroScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <Parallax depth={-14}>
          <motion.p
            className="mb-4 text-center text-[22px] font-bold uppercase tracking-[0.35em] text-white/80"
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            exit={{ opacity: 0, transition: EXIT }}
            transition={{ duration: 1.4, ease: ease.out, delay: 0.6 }}
          >
            How the best businesses in the world succeed
          </motion.p>
        </Parallax>
        <div className="pointer-events-auto">
          <Magnetic strength={0.08}>
            <h1 className="text-[220px] font-black leading-none tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
              <SplitText text="Simplify" by="char" step={0.06} delay={0.2} />
            </h1>
          </Magnetic>
        </div>
        <motion.div
          className="mt-8 flex items-center gap-4 text-[28px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10, transition: EXIT }}
          transition={{ duration: 0.8, ease: ease.out, delay: 1 }}
        >
          <span className="font-bold">Arif Hidayah Rezaldy</span>
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-light">Mamikos</span>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-[34px] right-[48px]">
        <BrandMark light />
      </div>
      <motion.p className="pointer-events-none absolute bottom-[40px] left-[48px] text-[15px] text-white/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        tip: click the ring · press → to begin
      </motion.p>
    </div>
  );
}

const agenda = [
  { id: "book", title: "The book & the core idea", icon: BookOpen, note: "Price- vs proposition-simplifying" },
  { id: "div-ford", title: "Great simplifiers", icon: Lightbulb, note: "Ford, IKEA, McDonald's, Uber, Apple" },
  { id: "div-tradeoffs", title: "Trade-offs", icon: Layers, note: "Consumer vs supplier benefits" },
  { id: "div-proposition", title: "How to proposition-simplify", icon: Sparkles, note: "Easier, more useful, more artistic" },
  { id: "div-price", title: "How to price-simplify", icon: Tag, note: "Nine levers" },
  { id: "div-dino", title: "Save the dino", icon: Shield, note: "When a market leader is attacked" },
  { id: "recap", title: "Recap & playground", icon: Feather, note: "Put it together" },
];

export function Agenda() {
  const { goTo } = useDeck();
  const [hover, setHover] = useState(0);
  const at = (id: string) => slides.findIndex((s) => s.id === id);
  const Icon = agenda[hover].icon;
  return (
    <SlideFrame title="What we'll cover">
      <motion.ol className="absolute left-[150px] top-[230px] w-[720px]" initial="hidden" animate="show" exit="exit" variants={stagger(0.07, 0.3)}>
        {agenda.map((a, i) => (
          <motion.li key={a.id} variants={slideIn(-50)}>
            <button
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onClick={() => goTo(at(a.id))}
              className="group relative flex w-full items-center gap-6 py-[13px] text-left"
            >
              <span className={`font-mono text-[20px] transition-colors ${hover === i ? "text-brand" : "text-fg-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`text-[34px] font-bold transition-all duration-300 ${hover === i ? "translate-x-3 text-fg" : "text-fg-muted"}`}>{a.title}</span>
              <ArrowUpRight className={`ml-auto transition-all duration-300 ${hover === i ? "text-brand opacity-100" : "opacity-0"}`} />
              {hover === i && <motion.span layoutId="agenda-underline" className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-brand" transition={spring.snappy} />}
            </button>
          </motion.li>
        ))}
      </motion.ol>
      <Parallax depth={-20} className="absolute right-[190px] top-[250px]">
        <Tilt className="h-[400px] w-[440px] rounded-[32px] bg-brand p-10 text-white shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={hover} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: ease.out }}>
              <motion.div initial={{ rotate: -30, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={spring.bouncy}>
                <Icon size={84} strokeWidth={1.6} />
              </motion.div>
              <p className="mt-10 font-mono text-[18px] text-white/70">Part {hover + 1}</p>
              <p className="mt-2 text-[40px] font-black leading-tight">{agenda[hover].title}</p>
              <p className="mt-4 text-[22px] text-white/85">{agenda[hover].note}</p>
            </motion.div>
          </AnimatePresence>
          <p className="absolute bottom-7 left-10 text-[15px] text-white/70">click a topic to jump</p>
        </Tilt>
      </Parallax>
    </SlideFrame>
  );
}

export function Book() {
  return (
    <SlideFrame>
      <motion.div className="absolute left-[120px] top-[60px] h-[760px] w-[640px]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1, ease: ease.out }}>
        <BookScene />
      </motion.div>
      <motion.p className="absolute left-[330px] top-[800px] text-[15px] text-fg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        drag to turn the book
      </motion.p>
      <motion.div className="absolute left-[820px] top-[230px] w-[640px]" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.4)}>
        <motion.p variants={rise} className="text-[20px] font-bold uppercase tracking-[0.25em] text-brand">
          The source
        </motion.p>
        <motion.h2 variants={rise} className="mt-4 text-[76px] font-black leading-[1] text-fg">
          Simplify
        </motion.h2>
        <motion.p variants={rise} className="mt-3 text-[30px] text-fg-muted">
          How the best businesses in the world succeed
        </motion.p>
        <motion.div variants={rise} className="mt-10 flex items-center gap-4 text-[28px] text-fg">
          <Users className="text-brand" /> Richard Koch &amp; Greg Lockwood
        </motion.div>
        <motion.div variants={rise} className="mt-4 flex items-center gap-4 text-[28px] text-fg">
          <BookOpen className="text-brand" /> First published 2016
        </motion.div>
        <motion.a
          variants={rise}
          href="https://www.amazon.com/Simplify-Best-Businesses-World-Succeed/dp/1599185997"
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 text-[22px] font-bold text-brand"
        >
          <span className="relative">
            View on Amazon
            <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </motion.a>
      </motion.div>
    </SlideFrame>
  );
}

const ways = [
  {
    key: "price",
    icon: Tag,
    title: "Price-simplifying",
    lead: "Cut price by 50–90%",
    points: [
      "Not an inferior product — organise delivery differently, so volume is much higher and efficiency greater",
      "Can mean radical redesign of the product and of how the industry is organised (business system redesign)",
    ],
    tone: "bg-charcoal text-white",
  },
  {
    key: "prop",
    icon: Sparkles,
    title: "Proposition-simplifying",
    lead: "Aesthetically pleasing",
    points: ["Creates a large market that did not previously exist in the same form", "No radical price cut — may even command a price premium"],
    tone: "bg-brand text-white",
  },
];

export function HowToSimplify() {
  const [focus, setFocus] = useState<string | null>(null);
  return (
    <SlideFrame title="How to simplify">
      <motion.div className="absolute left-[150px] top-[250px] flex gap-12" initial="hidden" animate="show" exit="exit" variants={stagger(0.15, 0.35)}>
        {ways.map((w) => {
          const dim = focus && focus !== w.key;
          return (
            <motion.div key={w.key} variants={pop} animate={{ opacity: dim ? 0.45 : 1, scale: focus === w.key ? 1.03 : dim ? 0.97 : 1 }} transition={spring.soft}>
              <Tilt
                max={8}
                className={`h-[500px] w-[620px] cursor-pointer rounded-[36px] p-12 shadow-xl ${w.tone}`}
                onPointerEnter={() => setFocus(w.key)}
                onPointerLeave={() => setFocus(null)}
              >
                <motion.div whileHover={{ rotate: [0, -12, 10, 0] }} transition={{ duration: 0.6 }} className="inline-grid h-20 w-20 place-items-center rounded-2xl bg-white/15">
                  <w.icon size={42} />
                </motion.div>
                <h3 className="mt-8 text-[46px] font-black">{w.title}</h3>
                <p className="mt-2 text-[28px] font-bold text-accent">{w.lead}</p>
                <ul className="mt-6 space-y-4">
                  {w.points.map((p, i) => (
                    <motion.li
                      key={p}
                      className="flex gap-3 text-[22px] leading-snug text-white/90"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: ease.out }}
                    >
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>
    </SlideFrame>
  );
}

type Path = "both" | "prop" | "price";

export function CorePrinciples() {
  const [path, setPath] = useState<Path>("both");
  const W = 1000;
  const H = 560;
  const cur = { x: 90, y: 240 };
  const premium = { x: 740, y: 110, r: 90 };
  const mass = { x: 700, y: 360, r: 150 };
  const show = (p: Path) => path === "both" || path === p;

  return (
    <SlideFrame title="Core principles">
      <div className="absolute left-[1230px] top-[250px] flex flex-col gap-4">
        {(["prop", "price", "both"] as Path[]).map((p) => (
          <Magnetic key={p} strength={0.2}>
            <button
              onClick={() => setPath(p)}
              className={`w-[260px] rounded-full px-6 py-4 text-left text-[20px] font-bold transition-colors ${
                path === p ? (p === "price" ? "bg-charcoal text-white" : "bg-brand text-white") : "bg-bg-soft text-fg-muted hover:text-fg"
              }`}
            >
              {p === "prop" ? "Proposition-simplifying" : p === "price" ? "Price-simplifying" : "Show both"}
            </button>
          </Magnetic>
        ))}
      </div>

      <div className="absolute left-[200px] top-[230px]" style={{ width: W, height: H }}>
        <motion.div className="absolute bottom-0 left-0 w-[4px] origin-bottom bg-fg-muted" style={{ height: H }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0, transition: EXIT }} transition={{ duration: 0.9, ease: ease.out, delay: 0.2 }} />
        <motion.div className="absolute bottom-0 left-0 h-[4px] origin-left bg-fg-muted" style={{ width: W }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0, transition: EXIT }} transition={{ duration: 0.9, ease: ease.out, delay: 0.35 }} />
        <p className="absolute whitespace-nowrap text-[18px] font-bold tracking-[0.2em] text-fg-muted" style={{ left: -40, top: "50%", transform: "translate(-50%, -50%) rotate(-90deg)" }}>WILLINGNESS TO PAY →</p>
        <p className="absolute -bottom-[44px] left-0 text-[18px] font-bold tracking-[0.2em] text-fg-muted">SIMPLICITY →</p>
        <p className="absolute -left-[50px] top-0 text-[16px] text-fg-muted">High</p>
        <p className="absolute -left-[46px] bottom-2 text-[16px] text-fg-muted">Low</p>

        <svg className="absolute inset-0 overflow-visible" width={W} height={H}>
          {[
            { k: "prop" as const, to: { x: premium.x - premium.r, y: premium.y + 10 }, color: "var(--brand)" },
            { k: "price" as const, to: { x: mass.x - mass.r * 0.8, y: mass.y - mass.r * 0.55 }, color: "var(--charcoal)" },
          ].map((l, i) => (
            <motion.line
              key={l.k}
              x1={cur.x}
              y1={cur.y}
              x2={l.to.x}
              y2={l.to.y}
              stroke={l.color}
              strokeWidth={10}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: show(l.k) ? 1 : 0.12 }}
              transition={{ pathLength: { duration: 1, ease: ease.out, delay: 0.8 + i * 0.2 }, opacity: { duration: 0.4 } }}
            />
          ))}
        </svg>

        <Bubble x={cur.x} y={cur.y} r={26} className="bg-fg" label="Current market size" labelPos="top" delay={0.5} />
        <motion.p className="absolute text-[22px] font-bold text-brand" style={{ left: 260, top: 110, rotate: -11 }} animate={{ opacity: show("prop") ? 1 : 0.15 }}>
          Proposition-simplifying
        </motion.p>
        <motion.p className="absolute text-[22px] font-bold text-fg" style={{ left: 250, top: 300, rotate: 22 }} animate={{ opacity: show("price") ? 1 : 0.15 }}>
          Price-simplifying
        </motion.p>
        <Parallax depth={-10}>
          <Bubble x={premium.x} y={premium.y} r={premium.r} active={show("prop")} className="bg-brand/80" label="Premium market" delay={1.4} />
        </Parallax>
        <Parallax depth={-16}>
          <Bubble x={mass.x} y={mass.y} r={mass.r} active={show("price")} className="bg-charcoal/85" label="Mass market" delay={1.6} />
        </Parallax>
      </div>
    </SlideFrame>
  );
}

function Bubble({ x, y, r, className, label, labelPos = "in", delay = 0, active = true }: { x: number; y: number; r: number; className: string; label: string; labelPos?: "in" | "top"; delay?: number; active?: boolean }) {
  return (
    <motion.div
      className={`absolute grid place-items-center rounded-full ${className}`}
      style={{ left: x - r, top: y - r, width: r * 2, height: r * 2 }}
      initial={{ scale: 0 }}
      animate={{ scale: active ? 1 : 0.55, opacity: active ? 1 : 0.3 }}
      exit={{ scale: 0, transition: EXIT }}
      transition={{ ...spring.bouncy, delay: active ? delay * 0.3 : 0 }}
      whileHover={{ scale: active ? 1.08 : 0.6 }}
    >
      {labelPos === "in" ? (
        <span className="rounded-lg bg-white px-3 py-1 text-[18px] font-bold text-charcoal">{label}</span>
      ) : (
        <span className="absolute -top-[46px] whitespace-nowrap rounded-lg border border-line bg-card px-3 py-1 text-[16px] font-bold text-fg">{label}</span>
      )}
    </motion.div>
  );
}
