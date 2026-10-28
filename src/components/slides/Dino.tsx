"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AlertTriangle, Blocks, Copy, GitFork, Rocket, Scale, Search, ShoppingCart, Swords, Target, TrendingUp, UserX, Wallet, Wrench, Zap } from "lucide-react";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { Parallax } from "@/components/ui/Parallax";
import { Tilt } from "@/components/ui/Tilt";
import { EXIT, ease, pop, rise, spring, stagger } from "@/lib/motion";

export const DinoDivider = () => <Divider title="Save the Dino" subtitle="Dino → Market Leader" />;

const signs = {
  proposition: [
    "The product or service is designed differently — simpler, using a new method or technology.",
    "The new product is a joy to use.",
    "The product is priced at a premium to yours.",
    "At least one of the new entrants is growing fast.",
  ],
  price: [
    "A much cheaper product emerges. It does not matter if its performance is inferior.",
    "New entrants play the game differently — smaller, lighter, faster, or all three; maybe new technology.",
    "At least one simplifying firm is growing fast. Even with a tiny share now, it may soon grow exponentially.",
  ],
};

export function WarningSigns() {
  const [tab, setTab] = useState<keyof typeof signs>("proposition");
  const [seen, setSeen] = useState<Set<string>>(new Set());
  return (
    <SlideFrame title="Warning signs">
      <div className="absolute left-[150px] top-[230px] flex gap-2 rounded-full bg-bg-soft p-2">
        {(Object.keys(signs) as (keyof typeof signs)[]).map((k) => (
          <button key={k} onClick={() => setTab(k)} className="relative rounded-full px-7 py-3 text-[20px] font-bold">
            {tab === k && <motion.span layoutId="sign-tab" className="absolute inset-0 rounded-full bg-charcoal" transition={spring.snappy} />}
            <span className={`relative ${tab === k ? "text-white" : "text-fg-muted"}`}>From {k}-simplifier competitors</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ol key={tab} className="absolute left-[150px] top-[340px] w-[1050px] space-y-4" initial="hidden" animate="show" exit="exit" variants={stagger(0.1, 0.1)}>
          {signs[tab].map((s, i) => {
            const id = `${tab}${i}`;
            const on = seen.has(id);
            return (
              <motion.li key={id} variants={rise}>
                <button
                  onClick={() => setSeen((x) => new Set(x.has(id) ? [...x].filter((y) => y !== id) : [...x, id]))}
                  className={`flex w-full items-center gap-5 rounded-2xl p-5 text-left text-[25px] leading-snug transition-colors ${on ? "bg-accent/25 text-fg" : "bg-bg-soft text-fg hover:bg-brand-soft"}`}
                >
                  <motion.span animate={{ rotate: on ? [0, -14, 14, 0] : 0, scale: on ? 1.1 : 1 }} transition={{ duration: 0.5 }} className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${on ? "bg-accent text-charcoal" : "bg-card text-fg-muted"}`}>
                    <AlertTriangle size={22} />
                  </motion.span>
                  {s}
                </button>
              </motion.li>
            );
          })}
        </motion.ol>
      </AnimatePresence>
      <Parallax depth={-20} className="absolute right-[150px] top-[340px]">
        <motion.div className="grid h-[160px] w-[160px] place-items-center rounded-full bg-charcoal text-white shadow-xl" animate={{ scale: 1 + seen.size * 0.05 }} transition={spring.bouncy}>
          <div className="text-center">
            <p className="text-[56px] font-black leading-none text-accent">{[...seen].filter((s) => s.startsWith(tab)).length}</p>
            <p className="text-[15px] text-white/70">signs spotted</p>
          </div>
        </motion.div>
      </Parallax>
    </SlideFrame>
  );
}

const traps = [
  { icon: Wallet, name: "Overhead Trap", body: "Firms become addicted to their rules of thumb about acceptable margins — and miss that although simpler products' margins are lower, so are the overheads." },
  { icon: Copy, name: "Cannibalization Trap", body: "Leaders were initially reluctant to go online for fear of cannibalizing bricks-and-mortar retail — despite the advantages of combining them." },
  { icon: UserX, name: "Customer Trap", body: "Assuming your customers aren't interested in the new business model." },
  { icon: Blocks, name: "Complexity Trap", body: "Assuming it's okay for the product or business system to become ever more complex as long as performance keeps improving." },
  { icon: Wrench, name: "Skill Trap", body: "Not having the skills or the culture required to enter a new market." },
];

export function BadReasons() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <SlideFrame title="Bad reasons not to simplify">
      <motion.div className="absolute left-[150px] top-[240px] flex w-[1300px] gap-5" initial="hidden" animate="show" exit="exit" variants={stagger(0.08, 0.35)}>
        {traps.map((t, i) => (
          <motion.div key={t.name} variants={pop} className="h-[480px] flex-1" style={{ perspective: 1200 }}>
            <motion.button
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped === i ? 180 : 0 }}
              transition={spring.soft}
              onClick={() => setFlipped(flipped === i ? null : i)}
              whileHover={{ y: -8 }}
            >
              <span className="absolute inset-0 flex flex-col justify-between rounded-[28px] bg-charcoal p-7 text-left text-white" style={{ backfaceVisibility: "hidden" }}>
                <t.icon size={40} className="text-accent" />
                <span>
                  <span className="block font-mono text-[16px] text-white/60">0{i + 1}</span>
                  <span className="block text-[26px] font-black leading-tight [overflow-wrap:anywhere]">{t.name}</span>
                  <span className="mt-3 block text-[15px] text-white/60">click to reveal</span>
                </span>
              </span>
              <span className="absolute inset-0 flex flex-col rounded-[28px] bg-brand p-7 text-left text-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <span className="text-[22px] font-black">{t.name}</span>
                <span className="mt-4 text-[20px] leading-snug">{t.body}</span>
              </span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

const steps = [
  { icon: Search, text: "Determine whether your new rival is price- or proposition-simplifying." },
  { icon: Scale, text: "Decide whether to respond by price- or proposition-simplifying yourself." },
  { icon: Swords, text: "Commit to seeing off the threat by simplifying more radically than they are." },
];

export function DinoSteps() {
  const [step, setStep] = useState(0);
  return (
    <SlideFrame title="How a dino simplifies">
      <div className="absolute left-[150px] top-[360px] w-[1300px]">
        <div className="relative mx-[60px] h-[6px] rounded-full bg-line">
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-brand" animate={{ width: `${(step / (steps.length - 1)) * 100}%` }} transition={spring.soft} />
        </div>
        <motion.div className="-mt-[63px] flex justify-between" initial="hidden" animate="show" exit="exit" variants={stagger(0.15, 0.3)}>
          {steps.map((s, i) => (
            <motion.button key={i} variants={pop} onClick={() => setStep(i)} onPointerEnter={() => setStep(i)} className="flex w-[360px] flex-col items-center text-center">
              <motion.span
                className={`grid h-[120px] w-[120px] place-items-center rounded-full shadow-lg ${i <= step ? "bg-brand text-white" : "bg-bg-soft text-fg-muted"}`}
                animate={{ scale: i === step ? 1.12 : 1 }}
                transition={spring.bouncy}
              >
                <s.icon size={48} />
              </motion.span>
              <span className="mt-6 font-mono text-[18px] text-fg-muted">Step {i + 1}</span>
              <span className={`mt-2 text-[26px] leading-snug transition-colors ${i === step ? "font-bold text-fg" : "text-fg-muted"}`}>{s.text}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </SlideFrame>
  );
}

const structures = [
  { icon: Target, text: "Develop the new, simple product alongside and within your existing organization.", verdict: "Nearly always fails!", score: 0.08 },
  { icon: Rocket, text: "Abandon your existing, more complex product and switch entirely to the new simple product.", verdict: "", score: 0.5 },
  { icon: GitFork, text: "Set up a parallel, completely autonomous unit to supply the new, simple product.", verdict: "", score: 0.5 },
  { icon: Zap, text: "Sponsor a spin-off to make the new, simple product.", verdict: "", score: 0.5 },
  { icon: ShoppingCart, text: "Acquire one or more of the new, simplifying firms.", verdict: "Usually the best chance of success.", score: 0.95 },
];

export function DinoStructure() {
  const [sel, setSel] = useState(4);
  const s = structures[sel];
  return (
    <SlideFrame title="Adopt the right structure">
      <motion.div className="absolute left-[150px] top-[230px] w-[820px] space-y-3" initial="hidden" animate="show" exit="exit" variants={stagger(0.08, 0.3)}>
        {structures.map((st, i) => (
          <motion.button
            key={i}
            variants={rise}
            onPointerEnter={() => setSel(i)}
            onClick={() => setSel(i)}
            className={`flex w-full items-center gap-5 rounded-2xl p-4 text-left text-[22px] leading-snug transition-colors ${sel === i ? "bg-charcoal text-white" : "bg-bg-soft text-fg"}`}
          >
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${sel === i ? "bg-accent text-charcoal" : "bg-card text-brand"}`}>
              <st.icon size={22} />
            </span>
            {st.text}
          </motion.button>
        ))}
      </motion.div>
      <Parallax depth={-14} className="absolute left-[1040px] top-[240px]">
        <Tilt className="h-[500px] w-[420px] rounded-[36px] bg-bg-soft p-9">
          <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-fg-muted">What the book says</p>
          <div className="relative mt-10 h-[220px] w-[60px] overflow-hidden rounded-full bg-line">
            <motion.div className="absolute inset-x-0 bottom-0 rounded-full" animate={{ height: `${s.score * 100}%`, backgroundColor: s.score < 0.3 ? "#d9534f" : s.score > 0.8 ? "var(--brand)" : "var(--accent)" }} transition={spring.soft} />
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12, transition: EXIT }} transition={{ duration: 0.35, ease: ease.out }} className="mt-8 text-[30px] font-black leading-tight text-fg">
              {s.verdict || "An option"}
            </motion.p>
          </AnimatePresence>
          <TrendingUp className="absolute right-9 top-9 text-brand" />
        </Tilt>
      </Parallax>
    </SlideFrame>
  );
}
