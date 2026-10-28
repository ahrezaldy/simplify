"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ThumbsDown, ThumbsUp, User, Building2 } from "lucide-react";
import { Divider } from "@/components/deck/Divider";
import { SlideFrame } from "@/components/deck/SlideFrame";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { Photo } from "@/components/ui/Photo";
import { ease, rise, spring, stagger } from "@/lib/motion";

export const TradeDivider = () => <Divider title="Trade-Offs" />;

const LISTS = {
  consumer: {
    icon: User,
    title: "Consumer benefit",
    items: [
      "Power or performance up",
      "Easier to buy",
      "Easier to use",
      "Speed of consumption",
      "Advantage of being in a larger network",
      "Lower prices",
      "Higher standards",
      "Greater consistency",
      "Self-service benefits customer",
      "Lighter",
      "More portable",
      "New segment of consumers",
    ],
  },
  supplier: {
    icon: Building2,
    title: "Supplier benefit",
    items: [
      "Market share and volumes up",
      "Costs down",
      "Profits up",
      "Speed of delivery",
      "Advantage of being in a larger network",
      "Lower costs",
      "Greater customer loyalty and retention",
      "Lower cost of recruiting customers",
      "Self-service benefits supplier",
    ],
  },
};

type Side = keyof typeof LISTS;

/** Two independent lists — items are not paired across columns. */
export function Benefits() {
  const [hover, setHover] = useState<string | null>(null);
  const [side, setSide] = useState<"both" | Side>("both");
  return (
    <SlideFrame title="Who benefits?">
      <div className="absolute right-[150px] top-[110px] flex gap-2 rounded-full bg-bg-soft p-1.5">
        {(["both", "consumer", "supplier"] as const).map((k) => (
          <button key={k} onClick={() => setSide(k)} className="relative rounded-full px-5 py-2 text-[17px] font-bold capitalize">
            {side === k && <motion.span layoutId="benefit-tab" className="absolute inset-0 rounded-full bg-brand" transition={spring.snappy} />}
            <span className={`relative ${side === k ? "text-white" : "text-fg-muted"}`}>{k}</span>
          </button>
        ))}
      </div>
      <motion.div className="absolute left-[150px] top-[215px] flex w-[1180px] gap-8" initial="hidden" animate="show" exit="exit" variants={stagger(0.12, 0.3)}>
        {(Object.keys(LISTS) as Side[]).map((k) => {
          const l = LISTS[k];
          const dim = side !== "both" && side !== k;
          const focus = side === k;
          return (
            <motion.div
              key={k}
              variants={rise}
              animate={{ opacity: dim ? 0.3 : 1, scale: focus ? 1.02 : dim ? 0.98 : 1 }}
              transition={spring.soft}
              className={`flex-1 rounded-[32px] p-7 ${k === "consumer" ? "bg-brand-soft" : "bg-bg-soft"}`}
            >
              <p className={`flex items-center gap-3 text-[24px] font-black ${k === "consumer" ? "text-brand" : "text-fg"}`}>
                <l.icon /> {l.title}
              </p>
              <motion.ul className="mt-4" initial="hidden" animate="show" variants={stagger(0.035, 0.45)} onPointerLeave={() => setHover(null)}>
                {l.items.map((it) => {
                  const id = `${k}:${it}`;
                  const on = hover === id;
                  return (
                    <motion.li key={id} variants={rise} onPointerEnter={() => setHover(id)} className="relative flex items-center gap-3 py-[5px] text-[19px] text-fg">
                      {on && <motion.span layoutId={`benefit-hl-${k}`} className="absolute inset-x-[-12px] inset-y-0 rounded-xl bg-card shadow-sm" transition={spring.snappy} />}
                      <motion.span className={`relative h-2 w-2 shrink-0 rounded-full ${k === "consumer" ? "bg-brand" : "bg-fg-muted"}`} animate={{ scale: on ? 1.6 : 1 }} />
                      <motion.span className="relative" animate={{ x: on ? 6 : 0 }}>
                        {it}
                      </motion.span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          );
        })}
      </motion.div>
    </SlideFrame>
  );
}

export function Virtuous() {
  const [virtuous, setVirtuous] = useState(false);
  return (
    <SlideFrame title="Virtuous trade-off">
      <motion.p className="absolute left-[150px] top-[240px] w-[560px] text-[34px] leading-snug text-fg" initial="hidden" animate="show" exit="exit" variants={rise}>
        If you can make a virtuous trade-off, you end up with <b className="text-brand">two good attributes</b>, instead of one good and one bad.
      </motion.p>

      <div className="absolute left-[150px] top-[520px] w-[560px]">
        <div className="relative h-[170px]">
          <motion.div className="absolute left-[30px] right-[30px] top-[60px] h-[10px] origin-center rounded-full bg-charcoal" animate={{ rotate: virtuous ? 0 : -9 }} transition={spring.bouncy}>
            <Pan left good />
            <Pan good={virtuous} />
          </motion.div>
          <div className="absolute left-1/2 top-[70px] h-0 w-0 -translate-x-1/2 border-x-[26px] border-b-[60px] border-x-transparent border-b-charcoal" />
        </div>
        <Magnetic strength={0.2}>
          <button onClick={() => setVirtuous((v) => !v)} className={`mt-4 rounded-full px-7 py-3 text-[20px] font-black shadow-md transition-colors ${virtuous ? "bg-brand text-white" : "bg-accent text-charcoal"}`}>
            {virtuous ? "Ordinary trade-off" : "Make it virtuous"}
          </button>
        </Magnetic>
      </div>

      <Parallax depth={-18} className="absolute left-[800px] top-[230px]">
        <Photo name="mosquito.jpg" alt="De Havilland Mosquito in flight" className="h-[440px] w-[650px]" />
        <motion.p className="mt-5 text-center text-[22px] text-fg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          De Havilland Mosquito (WWII) — <b>“Wooden Wonder”</b>
        </motion.p>
      </Parallax>
    </SlideFrame>
  );
}

function Pan({ left = false, good }: { left?: boolean; good: boolean }) {
  return (
    <div className={`absolute -top-[70px] ${left ? "-left-[20px]" : "-right-[20px]"}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={String(good)}
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 40 }}
          transition={{ duration: 0.35, ease: ease.out }}
          className={`grid h-[64px] w-[64px] place-items-center rounded-full text-white shadow-lg ${good ? "bg-brand" : "bg-[#d9534f]"}`}
        >
          {good ? <ThumbsUp /> : <ThumbsDown />}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
