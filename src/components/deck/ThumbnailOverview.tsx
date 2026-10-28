"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { slides } from "@/components/slides";
import { ease, spring } from "@/lib/motion";

/** Esc grid. Thumbnails are lightweight title cards so no 3D scene mounts here. */
export function ThumbnailOverview({ index, goTo, onClose }: { index: number; goTo: (i: number) => void; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-bg/90 p-10 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      onClick={onClose}
    >
      <div className="mx-auto mb-6 flex max-w-[1400px] items-center justify-between">
        <h2 className="text-3xl font-black text-brand">All slides</h2>
        <button onClick={onClose} aria-label="Close overview" className="grid h-10 w-10 place-items-center rounded-full hover:bg-brand hover:text-white">
          <X />
        </button>
      </div>
      <motion.ol
        className="mx-auto grid max-w-[1400px] grid-cols-5 gap-5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.015 } } }}
      >
        {slides.map((s, i) => {
          const divider = s.kind === "divider";
          return (
            <motion.li
              key={s.id}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: ease.out } } }}
              whileHover={{ y: -6, scale: 1.03, transition: spring.snappy }}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
                onClose();
              }}
              className={`relative aspect-video cursor-pointer overflow-hidden rounded-xl border-2 p-4 shadow-sm ${
                i === index ? "border-accent" : "border-line"
              } ${divider ? "bg-divider-bg text-white" : "bg-card text-fg"}`}
            >
              <span className={`font-mono text-xs ${divider ? "text-white/70" : "text-fg-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
              <p className={`mt-2 text-lg font-black leading-tight ${divider ? "" : "text-brand"}`}>{s.title}</p>
              {s.section && <p className={`absolute bottom-3 left-4 text-xs ${divider ? "text-white/70" : "text-fg-muted"}`}>{s.section}</p>}
              {!divider && <span className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-brand/80" />}
            </motion.li>
          );
        })}
      </motion.ol>
    </motion.div>
  );
}
