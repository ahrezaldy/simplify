"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Factory, PaintBucket, Quote, Ruler } from "lucide-react";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { Counter } from "@/components/ui/Counter";
import { Parallax } from "@/components/ui/Parallax";
import { Photo } from "@/components/ui/Photo";
import { SplitText } from "@/components/ui/SplitText";
import { EXIT, ease, pop, rise, spring, stagger } from "@/lib/motion";

const AssemblyScene = dynamic(() => import("@/components/three/AssemblyScene"), { ssr: false });

export const FordDivider = () => <Divider title="Great Simplifiers" subtitle="Henry Ford" />;

const QUOTE =
  "I will build a motor car for the great multitude. It will be large enough for the family but small enough for the individual to run and care for. It will be constructed of the best materials, by the best men to be hired, after the simplest designs that modern engineering can devise. But it will be so low in price that no man making a good salary would be unable to own one – and enjoy with his family the blessing of hours of pleasure in God's great open spaces.";
const KEY = new Set(["multitude.", "simplest", "designs", "low", "price"]);

export function FordQuote() {
  return (
    <SlideFrame>
      <Parallax depth={12} className="absolute left-[90px] top-[400px]">
        <Photo name="henry-ford.jpg" alt="Henry Ford, 1919" round className="h-[300px] w-[300px]" imgClassName="grayscale-[30%]" />
        <motion.p className="mt-5 text-center text-[34px] text-brand" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          Henry Ford
        </motion.p>
      </Parallax>
      <Parallax depth={-14} className="absolute left-[470px] top-[60px]">
        <motion.div
          className="relative grid h-[780px] w-[780px] place-items-center rounded-full bg-brand px-[110px] text-center text-white"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0, transition: EXIT }}
          transition={{ duration: 1, ease: ease.out }}
        >
          <motion.div
            className="absolute left-[40px] top-[40px] grid h-[180px] w-[180px] place-items-center rounded-full bg-[#7ac68a]"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...spring.bouncy, delay: 0.5 }}
            whileHover={{ rotate: 12, scale: 1.08 }}
          >
            <Quote size={72} fill="white" strokeWidth={0} />
          </motion.div>
          <p className="text-[26px] leading-[1.5]">
            <SplitText text={`“${QUOTE}”`} step={0.018} delay={0.6} highlight={(w) => KEY.has(w)} />
          </p>
        </motion.div>
      </Parallax>
      <motion.p className="absolute right-[90px] top-[90px] text-[15px] text-fg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        hover the key words
      </motion.p>
    </SlideFrame>
  );
}

const facts = [
  { icon: Ruler, title: "Standardized", body: "Standardized the Model T." },
  { icon: Factory, title: "Moving line", body: "Moved from batch production to a continuously moving assembly line." },
  { icon: PaintBucket, title: "Any colour, black", body: "All cars were painted black — only Japan black paint dried quickly enough to keep up with the speed of the line." },
];

export function ModelT() {
  const [open, setOpen] = useState(0);
  return (
    <SlideFrame title="Ford Model T">
      <Parallax depth={16} className="absolute left-[150px] top-[250px]">
        <Photo name="model-t.jpg" alt="1925 Ford Model T touring car" className="h-[500px] w-[680px]" />
      </Parallax>
      <motion.div className="absolute left-[900px] top-[250px] w-[560px] space-y-4" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.5)}>
        {facts.map((f, i) => (
          <motion.button
            key={f.title}
            variants={rise}
            layout
            onClick={() => setOpen(i)}
            onPointerEnter={() => setOpen(i)}
            className={`block w-full rounded-3xl p-6 text-left transition-colors ${open === i ? "bg-charcoal text-white shadow-xl" : "bg-bg-soft text-fg"}`}
          >
            <motion.div layout="position" className="flex items-center gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${open === i ? "bg-accent text-charcoal" : "bg-brand-soft text-brand"}`}>
                <f.icon size={24} />
              </span>
              <span className="text-[28px] font-black">{f.title}</span>
              <span className="ml-auto font-mono text-[16px] opacity-60">0{i + 1}</span>
            </motion.div>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="overflow-hidden pt-4 text-[22px] leading-snug text-white/85"
                >
                  {f.body}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

export function AssemblyLine() {
  const [line, setLine] = useState(0);
  const price = Math.round(600 - line * 400);
  return (
    <SlideFrame title="The moving assembly line">
      <motion.div className="absolute left-0 top-[170px] h-[460px] w-[1600px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1 }}>
        <AssemblyScene speed={line} />
      </motion.div>
      <motion.p className="absolute right-[150px] top-[120px] text-[15px] text-fg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        click a car · drag the slider
      </motion.p>

      <motion.div className="absolute left-[150px] top-[640px] flex w-[1120px] items-center gap-12" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.6)}>
        <motion.div variants={pop} className="w-[300px]">
          <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-fg-muted">Price of a car</p>
          <p className="text-[84px] font-black leading-none text-brand tabular-nums">
            <Counter value={price} prefix="~$" duration={0.4} />
          </p>
        </motion.div>
        <motion.div variants={rise} className="flex-1">
          <div className="mb-3 flex justify-between text-[18px] font-bold">
            <span className={line < 0.5 ? "text-fg" : "text-fg-muted"}>Batch production</span>
            <span className={line >= 0.5 ? "text-brand" : "text-fg-muted"}>Continuously moving line</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={line}
            onChange={(e) => setLine(parseFloat(e.target.value))}
            aria-label="Production method"
            className="h-3 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--brand)]"
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={line > 0.95 ? "done" : "go"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 text-[22px] text-fg"
            >
              {line > 0.95 ? "Prices cut by two-thirds — cars accessible to the masses." : "Slide toward the moving line →"}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}
