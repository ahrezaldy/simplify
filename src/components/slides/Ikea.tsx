"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Car, Factory, Home, Mail, Package, Palette, PiggyBank, ShoppingBag, Sofa, Store, Truck, Warehouse } from "lucide-react";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { Photo } from "@/components/ui/Photo";
import { Tilt } from "@/components/ui/Tilt";
import { EXIT, ease, pop, rise, spring, stagger } from "@/lib/motion";

const FlatPackScene = dynamic(() => import("@/components/three/FlatPackScene"), { ssr: false });

export const KampradDivider = () => <Divider title="Great Simplifiers" subtitle="Ingvar Kamprad" />;

const story = [
  { icon: Mail, when: "Age 17", text: "Founded IKEA as a mail-order company." },
  { icon: Sofa, when: "5 years later", text: "Started selling furniture." },
  { icon: Car, when: "One day", text: "He couldn't fit a table into his car. A friend suggested removing the legs." },
  { icon: Package, when: "The idea", text: "Flat-packed furniture." },
];

export function Kamprad() {
  const [step, setStep] = useState(0);
  return (
    <SlideFrame title="Ingvar Kamprad">
      <Parallax depth={14} className="absolute left-[150px] top-[230px]">
        <Photo name="kamprad.jpg" alt="Ingvar Kamprad in Haparanda, 2010" className="h-[560px] w-[300px]" />
      </Parallax>
      <div className="absolute left-[560px] top-[250px] w-[860px]">
        <div className="absolute left-[27px] top-[20px] h-[440px] w-[4px] rounded-full bg-line" />
        <motion.div className="absolute left-[27px] top-[20px] w-[4px] origin-top rounded-full bg-brand" style={{ height: 440 }} animate={{ scaleY: step / (story.length - 1) }} transition={spring.soft} />
        <motion.ol initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.4)}>
          {story.map((s, i) => (
            <motion.li key={s.when} variants={rise} className="relative mb-[34px] flex cursor-pointer items-start gap-8" onPointerEnter={() => setStep(i)} onClick={() => setStep(i)}>
              <motion.span
                className={`relative z-10 grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full ${i <= step ? "bg-brand text-white" : "bg-bg-soft text-fg-muted"}`}
                animate={{ scale: i === step ? 1.15 : 1 }}
                transition={spring.bouncy}
              >
                <s.icon size={26} />
              </motion.span>
              <div>
                <p className={`text-[18px] font-bold uppercase tracking-[0.2em] ${i <= step ? "text-brand" : "text-fg-muted"}`}>{s.when}</p>
                <p className={`mt-1 text-[30px] leading-snug transition-colors ${i === step ? "text-fg" : "text-fg-muted"}`}>{s.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </SlideFrame>
  );
}

export function FlatPack() {
  const [flat, setFlat] = useState(false);
  return (
    <SlideFrame title="Flat-packed furniture">
      <motion.div className="absolute left-[80px] top-[180px] h-[620px] w-[780px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: EXIT }} transition={{ duration: 1, ease: ease.out }}>
        <FlatPackScene flat={flat} onToggle={() => setFlat((f) => !f)} />
      </motion.div>
      <motion.div className="absolute left-[900px] top-[250px] w-[560px]" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.4)}>
        <motion.p variants={rise} className="text-[30px] leading-snug text-fg">
          He realized that <b className="text-brand">half the sale price</b> of a table was in the cost of <b>transporting it</b>.
        </motion.p>
        <motion.div variants={rise} className="mt-10">
          <p className="mb-2 text-[16px] font-bold uppercase tracking-[0.2em] text-fg-muted">Cost of a table</p>
          <div className="flex h-[64px] w-full overflow-hidden rounded-2xl bg-bg-soft">
            <motion.div className="grid place-items-center bg-brand text-[18px] font-bold text-white" style={{ width: "50%" }}>
              Table
            </motion.div>
            <motion.div className="grid place-items-center overflow-hidden whitespace-nowrap bg-charcoal text-[18px] font-bold text-white" animate={{ width: flat ? "0%" : "50%", opacity: flat ? 0 : 1 }} transition={spring.soft}>
              Transport
            </motion.div>
          </div>
        </motion.div>
        <motion.p variants={rise} className="mt-8 text-[26px] leading-snug text-fg-muted">
          If the customer does the final assembly, he could <b className="text-fg">cut his costs in half</b>.
        </motion.p>
        <motion.div variants={pop} className="mt-10">
          <Magnetic strength={0.25}>
            <button onClick={() => setFlat((f) => !f)} className="flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[22px] font-black text-charcoal shadow-lg">
              <Package /> {flat ? "Assemble it" : "Flat-pack it"}
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

const lines = {
  standard: {
    label: "Standard furniture line",
    nodes: [
      { icon: Factory, name: "Factory" },
      { icon: Warehouse, name: "Warehouse" },
      { icon: Store, name: "Store" },
      { icon: Home, name: "Customer's home" },
    ],
  },
  ikea: {
    label: "IKEA line",
    nodes: [
      { icon: Factory, name: "Manufacturer" },
      { icon: Store, name: "Store" },
      { icon: ShoppingBag, name: "The customer itself!" },
    ],
  },
};

export function SupplyLine() {
  const [mode, setMode] = useState<keyof typeof lines>("standard");
  const l = lines[mode];
  return (
    <SlideFrame title="Shorter line, flat packs">
      <div className="absolute left-[150px] top-[225px] flex gap-3 rounded-full bg-bg-soft p-2">
        {(Object.keys(lines) as (keyof typeof lines)[]).map((k) => (
          <button key={k} onClick={() => setMode(k)} className="relative rounded-full px-7 py-3 text-[20px] font-bold">
            {mode === k && <motion.span layoutId="supply-tab" className="absolute inset-0 rounded-full bg-brand" transition={spring.snappy} />}
            <span className={`relative ${mode === k ? "text-white" : "text-fg-muted"}`}>{lines[k].label}</span>
          </button>
        ))}
      </div>

      <div className="absolute left-[150px] top-[360px] h-[220px] w-[1300px]">
        <div className="absolute left-[60px] right-[60px] top-[60px] h-[6px] rounded-full bg-line" />
        <motion.div
          key={mode}
          className="absolute top-[48px] grid h-[30px] w-[30px] place-items-center rounded-full bg-accent text-charcoal shadow-lg"
          initial={{ left: 45 }}
          animate={{ left: [45, 1225] }}
          transition={{ duration: mode === "ikea" ? 2.2 : 4.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
        >
          <Truck size={16} />
        </motion.div>
        <div className="absolute inset-x-0 top-0 flex justify-between">
          <AnimatePresence mode="popLayout">
            {l.nodes.map((n, i) => (
              <motion.div
                key={`${mode}-${n.name}`}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ ...spring.bouncy, delay: i * 0.08 }}
                className="flex w-[160px] flex-col items-center text-center"
              >
                <motion.span whileHover={{ y: -8, rotate: -6 }} className={`grid h-[120px] w-[120px] place-items-center rounded-full shadow-lg ${i === l.nodes.length - 1 && mode === "ikea" ? "bg-accent text-charcoal" : "bg-brand text-white"}`}>
                  <n.icon size={48} />
                </motion.span>
                <span className="mt-4 text-[22px] font-bold text-fg">{n.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} className="absolute left-[150px] top-[640px] w-[1150px] text-[24px] leading-snug text-fg" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
          {mode === "standard" ? (
            <p>Factory → warehouse → store → customer&apos;s home.</p>
          ) : (
            <p>
              Goods are in <b className="text-brand">flat packs</b> — much easier and cheaper to transport and store. IKEA designs most of its furniture and selects manufacturing partners carefully; the
              manufacturers become part of the IKEA system.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </SlideFrame>
  );
}

const pillars = [
  { icon: ShoppingBag, title: "One-stop solution", body: "Increases the usefulness of its products and its shopping experience." },
  { icon: Palette, title: "The art", body: "The art embodied in the products." },
  { icon: Store, title: "Ease of use", body: "Stores easy to find, ample free parking, more stock in-store than elsewhere, most items taken away immediately — no waiting for delivery." },
  { icon: PiggyBank, title: "Lean costs", body: "Lots of well-paid salespeople would bite into profits. Without self-assembly, cost would almost double." },
];

export function IkeaExperience() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <SlideFrame title="IKEA">
      <Parallax depth={18} className="absolute left-[150px] top-[240px]">
        <Photo name="ikea-store.jpg" alt="IKEA store with a large free car park" className="h-[480px] w-[560px]" />
      </Parallax>
      <motion.div className="absolute left-[760px] top-[230px] grid w-[700px] grid-cols-2 gap-5" initial="hidden" animate="show" exit="exit" variants={stagger(0.1, 0.4)}>
        {pillars.map((p, i) => (
          <motion.div key={p.title} variants={pop} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
            <Tilt max={10} className={`h-[245px] rounded-[28px] p-7 transition-colors duration-300 ${hover === i ? "bg-brand text-white" : "bg-bg-soft text-fg"}`}>
              <motion.span animate={{ rotate: hover === i ? -10 : 0, scale: hover === i ? 1.15 : 1 }} transition={spring.bouncy} className="inline-block">
                <p.icon size={36} className={hover === i ? "text-accent" : "text-brand"} />
              </motion.span>
              <p className="mt-4 text-[26px] font-black">{p.title}</p>
              <p className={`mt-2 text-[17px] leading-snug ${hover === i ? "text-white/90" : "text-fg-muted"}`}>{p.body}</p>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}
