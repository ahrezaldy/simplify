"use client";

import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { Beef, CakeSlice, Coffee, Cog, Croissant, CupSoda, Donut, Drumstick, Egg, Fish, Hamburger, Hand, IceCreamCone, Pizza, Popcorn, Salad, Sandwich, Soup, UserMinus } from "lucide-react";
import { siApple, siUber } from "simple-icons";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { Photo } from "@/components/ui/Photo";
import { Tilt } from "@/components/ui/Tilt";
import { EXIT, ease, pop, rise, spring, stagger } from "@/lib/motion";

export const McDivider = () => <Divider title="Great Simplifiers" subtitle="Mac and Dick" />;

const VARIETY = [Pizza, Soup, Salad, Coffee, Croissant, Fish, Egg, Drumstick, CakeSlice, Donut, IceCreamCone, Sandwich, Beef, Popcorn];

export function McMenu() {
  const [lean, setLean] = useState(false);
  const tiles = lean ? Array.from({ length: 9 }, (_, i) => ({ I: null, k: `n${i}` })) : Array.from({ length: 28 }, (_, i) => ({ I: VARIETY[i % VARIETY.length], k: `v${i}` }));
  return (
    <SlideFrame title="McDonald's">
      <Parallax depth={14} className="absolute left-[150px] top-[240px]">
        <Photo name="first-mcdonalds.jpg" alt="The McDonald's in San Bernardino, California" className="h-[340px] w-[500px]" />
      </Parallax>
      <motion.ul className="absolute left-[150px] top-[610px] w-[520px] space-y-2 text-[20px] leading-snug text-fg-muted" initial="hidden" animate="show" exit="exit" variants={stagger(0.1, 0.8)}>
        <motion.li variants={rise}>The burgers were all identical, all cooked the same way.</motion.li>
        <motion.li variants={rise}>
          Removing variety made it <b className="text-fg">simpler to procure, operate, cook and serve</b>.
        </motion.li>
      </motion.ul>

      <div className="absolute left-[740px] top-[230px] w-[720px]">
        <div className="flex items-center justify-between">
          <p className="text-[26px] font-black text-fg">{lean ? "Nine items, including drinks" : "A menu full of variety"}</p>
          <Magnetic strength={0.25}>
            <button onClick={() => setLean((l) => !l)} className={`rounded-full px-6 py-3 text-[18px] font-black shadow-md transition-colors ${lean ? "bg-bg-soft text-fg" : "bg-accent text-charcoal"}`}>
              {lean ? "Bring variety back" : "Remove variety"}
            </button>
          </Magnetic>
        </div>
        <LayoutGroup>
          <motion.div layout className={`mt-6 grid gap-3 ${lean ? "grid-cols-3" : "grid-cols-7"}`}>
            {tiles.map(({ I, k }, i) => (
              <motion.div
                key={k}
                layout
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring.snappy, delay: i * 0.015 }}
                whileHover={{ y: -6, rotate: -4 }}
                className={`grid place-items-center rounded-2xl ${lean ? "h-[120px] bg-brand text-white" : "h-[78px] bg-bg-soft text-fg-muted"}`}
              >
                {I ? <I size={30} /> : <span className="text-[44px] font-black">{i + 1}</span>}
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
        {lean && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5 flex items-center gap-3 text-[20px] text-fg-muted">
            <Hamburger className="text-brand" /> <CupSoda className="text-brand" /> The food: hamburgers or cheeseburgers, and fries.
          </motion.p>
        )}
      </div>
    </SlideFrame>
  );
}

const levers = [
  { icon: UserMinus, label: "Subtract waitresses" },
  { icon: Cog, label: "Simplify & automate the process" },
  { icon: Hand, label: "Customers do some of the work" },
  { icon: Hamburger, label: "Assembly-line food" },
];

export function Speedee() {
  const [on, setOn] = useState<boolean[]>(levers.map(() => false));
  const count = on.filter(Boolean).length;
  return (
    <SlideFrame title="Speedee Service System">
      <Parallax depth={-16} className="absolute right-[150px] top-[110px]">
        <Photo name="speedee-sign.jpg" alt="Historic Speedee McDonald's sign in Downey, California" className="h-[640px] w-[427px]" />
      </Parallax>
      <motion.div className="absolute left-[150px] top-[240px] w-[820px]" initial="hidden" animate="show" exit="exit" variants={stagger(0.1, 0.4)}>
        <motion.p variants={rise} className="text-[18px] font-bold uppercase tracking-[0.2em] text-fg-muted">
          Switch on each move
        </motion.p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {levers.map((l, i) => (
            <motion.button
              key={l.label}
              variants={pop}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))}
              className={`flex items-center gap-4 rounded-2xl p-5 text-left text-[21px] font-bold transition-colors ${on[i] ? "bg-brand text-white shadow-lg" : "bg-bg-soft text-fg"}`}
            >
              <motion.span animate={{ rotate: on[i] ? 360 : 0 }} transition={spring.soft} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on[i] ? "bg-white/20" : "bg-brand-soft text-brand"}`}>
                <l.icon size={22} />
              </motion.span>
              {l.label}
            </motion.button>
          ))}
        </div>

        <motion.div variants={rise} className="mt-10 space-y-5">
          <p className="text-[18px] font-bold uppercase tracking-[0.2em] text-fg-muted">Labour cost per serving</p>
          <Bar label="Typical coffee shop" width={1} tone="bg-charcoal" />
          <Bar label="McDonald's" width={1 - count * 0.21} tone="bg-brand" />
          <motion.p animate={{ opacity: count === levers.length ? 1 : 0, y: count === levers.length ? 0 : 8 }} className="text-[22px] text-fg">
            …reduced to <b className="text-brand">a fraction</b> of a typical coffee shop.
          </motion.p>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

function Bar({ label, width, tone }: { label: string; width: number; tone: string }) {
  return (
    <div className="flex items-center gap-5">
      <span className="w-[220px] text-[20px] font-bold text-fg">{label}</span>
      <div className="h-[34px] flex-1 overflow-hidden rounded-full bg-bg-soft">
        <motion.div className={`h-full rounded-full ${tone}`} initial={{ width: 0 }} animate={{ width: `${width * 100}%` }} transition={spring.soft} />
      </div>
    </div>
  );
}

export const OthersDivider = () => <Divider title="Great Simplifiers" subtitle="… others" />;

const brands = [
  { icon: siUber, name: "Ubercab", note: "Automate: hail a cab / ride" },
  { icon: siApple, name: "Apple", note: "" },
];

export function OtherSimplifiers() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <SlideFrame title="Other simplifiers">
      <motion.div className="absolute left-[150px] top-[250px] flex gap-16" initial="hidden" animate="show" exit="exit" variants={stagger(0.15, 0.4)}>
        {brands.map((b) => (
          <motion.div key={b.name} variants={pop} onPointerEnter={() => setHover(b.name)} onPointerLeave={() => setHover(null)}>
            <Tilt max={14} className="relative grid h-[480px] w-[560px] place-items-center overflow-hidden rounded-[40px] bg-bg-soft">
              <motion.span
                className="absolute inset-0 origin-bottom bg-charcoal"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hover === b.name ? 1 : 0 }}
                transition={{ duration: 0.5, ease: ease.out }}
              />
              <motion.svg viewBox="0 0 24 24" className="relative h-[200px] w-[200px]" animate={{ scale: hover === b.name ? 1.12 : 1, y: hover === b.name ? -30 : 0 }} transition={spring.bouncy}>
                <path d={b.icon.path} fill={hover === b.name ? "#ffffff" : "var(--fg)"} />
              </motion.svg>
              <motion.div className="absolute bottom-10 text-center" animate={{ opacity: hover === b.name ? 1 : 0.7, y: hover === b.name ? 0 : 10 }}>
                <p className={`text-[34px] font-black ${hover === b.name ? "text-white" : "text-fg"}`}>{b.name}</p>
                {b.note && <p className={`text-[20px] ${hover === b.name ? "text-accent" : "text-fg-muted"}`}>{b.note}</p>}
              </motion.div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="absolute right-[150px] top-[120px] text-[15px] text-fg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.4 } }} exit={{ opacity: 0, transition: EXIT }}>
        hover a logo
      </motion.p>
    </SlideFrame>
  );
}
