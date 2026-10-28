"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Bot, Globe, Handshake, Minus, Network, Palette, Shapes, Sparkles, Store, Gift, Users, Wand2, Wrench } from "lucide-react";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { SplitText } from "@/components/ui/SplitText";
import { Tilt } from "@/components/ui/Tilt";
import { EXIT, ease, pop, spring, stagger } from "@/lib/motion";

export const PropDivider = () => <Divider title="How To" subtitle="Proposition Simplify" />;
export const PriceDivider = () => <Divider title="How To" subtitle="Price Simplify" />;

const TONES = ["bg-charcoal text-white", "bg-brand text-white", "bg-accent text-charcoal"];

const props = [
  { icon: Wand2, title: "Easier to Use", items: ["Eliminate", "Make intuitive and clear", "Make faster", "Make smaller / lighter / more portable", "Make easier to obtain"] },
  { icon: Sparkles, title: "More Useful", items: ["Improve quality", "Add new capabilities without adversely affecting ease of use", "Provide a wider range of products", "Personalize"] },
  { icon: Palette, title: "More Artistic", items: [] },
];

export function PropositionLevers() {
  const [open, setOpen] = useState(0);
  return (
    <SlideFrame title="Proposition simplify">
      <motion.div className="absolute left-[150px] top-[240px] flex w-[1300px] gap-6" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.35)}>
        {props.map((p, i) => {
          const active = open === i;
          return (
            <motion.div key={p.title} variants={pop} layout onPointerEnter={() => setOpen(i)} onClick={() => setOpen(i)} style={{ flex: active ? 1.7 : 1 }} transition={spring.soft} className="cursor-pointer">
              <Tilt max={6} className={`h-[520px] overflow-hidden rounded-[36px] p-9 ${active ? TONES[i] : "bg-bg-soft text-fg"}`}>
                <div className="flex items-center gap-4">
                  <span className={`grid h-14 w-14 place-items-center rounded-full text-[24px] font-black ${active ? "bg-white text-charcoal" : "bg-card text-fg-muted"}`}>{i + 1}</span>
                  <motion.span animate={{ rotate: active ? 0 : -15, scale: active ? 1 : 0.8 }} transition={spring.bouncy}>
                    <p.icon size={34} />
                  </motion.span>
                </div>
                <motion.h3 layout="position" className="mt-8 text-[40px] font-black leading-tight">
                  {p.title}
                </motion.h3>
                <AnimatePresence mode="wait">
                  {active && (
                    <motion.div key="body" initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }} variants={stagger(0.06, 0.15)} className="mt-6">
                      {p.items.length ? (
                        <ul className="space-y-3">
                          {p.items.map((it) => (
                            <motion.li key={it} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { ease: ease.out, duration: 0.45 } } }} className="flex gap-3 text-[23px] leading-snug">
                              <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-current opacity-70" />
                              {it}
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[30px] font-bold leading-snug">
                          <SplitText text="“A great carpenter isn't going to use lousy wood for the back of the cabinet, even though nobody's going to see it”" step={0.03} />
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>
    </SlideFrame>
  );
}

const price = [
  { icon: Minus, title: "Subtract Features", examples: [] },
  { icon: Shapes, title: "Reduce Variety", examples: ["Ford", "McDonald's"] },
  { icon: Gift, title: "Add Cheap Benefits", examples: ["IKEA free parking"] },
  { icon: Bot, title: "Automate", examples: ["The use of the assembly line", "Automate hailing a cab / ride"] },
  { icon: Network, title: "Orchestrate", examples: [] },
  { icon: Users, title: "Co-opt Customers", examples: ["IKEA"] },
  { icon: Store, title: "Sell Direct", examples: [] },
  { icon: Wrench, title: "Use Simpler Technology", examples: [] },
  {
    icon: Globe,
    title: "International Scale Up",
    examples: ["History shows that when a firm with a genuinely universal and attractive product leaves a gap in a market, allowing a local imitator to grab first-mover advantage, they may never recover."],
  },
];

export function PriceLevers() {
  const [sel, setSel] = useState(1);
  const p = price[sel];
  return (
    <SlideFrame title="Price simplify">
      <motion.div className="absolute left-[150px] top-[230px] grid w-[780px] grid-cols-3 gap-4" initial="hidden" animate="show" exit="exit" variants={stagger(0.05, 0.3)}>
        {price.map((l, i) => (
          <motion.button
            key={l.title}
            variants={pop}
            onPointerEnter={() => setSel(i)}
            onClick={() => setSel(i)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex h-[170px] flex-col justify-between overflow-hidden rounded-[26px] p-5 text-left transition-colors ${sel === i ? TONES[i % 3] + " shadow-xl" : "bg-bg-soft text-fg"}`}
          >
            <span className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-full font-black ${sel === i ? "bg-white text-charcoal" : "bg-card text-fg-muted"}`}>{i + 1}</span>
              <l.icon size={26} className={sel === i ? "" : "text-brand"} />
            </span>
            <span className="text-[22px] font-black leading-tight">{l.title}</span>
          </motion.button>
        ))}
      </motion.div>
      <div className="absolute left-[990px] top-[230px] h-[540px] w-[470px]">
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, transition: EXIT }} transition={{ duration: 0.45, ease: ease.out }}>
            <p className="font-mono text-[20px] text-fg-muted">Lever {sel + 1} of 9</p>
            <motion.div initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={spring.bouncy} className="mt-6 inline-grid h-24 w-24 place-items-center rounded-3xl bg-brand text-white">
              <p.icon size={48} />
            </motion.div>
            <h3 className="mt-6 text-[48px] font-black leading-tight text-fg">{p.title}</h3>
            {p.examples.length > 0 && (
              <div className="mt-6">
                <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand">{p.examples[0].length > 60 ? "Why" : "Examples"}</p>
                <ul className="mt-3 space-y-2">
                  {p.examples.map((e, i) => (
                    <motion.li key={e} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className="flex items-start gap-3 text-[22px] leading-snug text-fg">
                      <Handshake size={20} className="mt-1 shrink-0 text-accent" />
                      {e}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}
