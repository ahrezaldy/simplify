"use client";

import { motion } from "motion/react";
import { House } from "lucide-react";
import { Parallax } from "@/components/ui/Parallax";
import { SplitText } from "@/components/ui/SplitText";
import { EXIT, ease } from "@/lib/motion";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-[22px] font-black tracking-tight ${light ? "text-white" : "text-brand"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${light ? "bg-white/20" : "bg-brand-soft"}`}>
        <House size={18} strokeWidth={2.6} />
      </span>
      mamikos.com
    </div>
  );
}

/** Content slide chrome: corner rings from the original deck, footer, animated title. */
export function SlideFrame({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <Parallax depth={18} className="pointer-events-none absolute -left-[130px] -top-[150px]">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0, transition: EXIT }}
          transition={{ duration: 1, ease: ease.out }}
          className="h-[260px] w-[260px] rounded-full border-[44px] border-brand"
        />
      </Parallax>
      <Parallax depth={-26} className="pointer-events-none absolute -bottom-[180px] -right-[140px]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0, transition: EXIT }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.1 }}
          className="relative h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand to-brand-deep"
        >
          <div className="absolute -top-[30px] left-[40px] h-[90px] w-[90px] rounded-full bg-brand/60" />
        </motion.div>
      </Parallax>

      {title && (
        <h2 className="absolute left-[150px] top-[96px] text-[64px] font-black leading-none tracking-tight text-brand">
          <SplitText text={title} />
          <motion.span
            className="mt-3 block h-[5px] origin-left rounded-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transition: EXIT }}
            transition={{ duration: 0.9, ease: ease.out, delay: 0.35 }}
            style={{ width: 90 }}
          />
        </h2>
      )}

      <div className={`absolute inset-0 ${className ?? ""}`}>{children}</div>

      <div className="pointer-events-none absolute bottom-[34px] left-[56px]">
        <BrandMark />
      </div>
      <div className="pointer-events-none absolute bottom-[40px] left-[300px] text-[15px] text-fg-muted">Strictly Confidential - For Internal Use Only</div>
    </div>
  );
}
