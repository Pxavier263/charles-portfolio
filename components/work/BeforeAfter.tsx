"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/profile";
import { BEFORE_AFTER_NOTE } from "@/data/taxonomy";
import type { Project } from "@/lib/types";
import { ImageSlot } from "../ui/ImageSlot";
import { withBase } from "@/lib/paths";

type BA = NonNullable<Project["beforeAfter"]>;

/** Draggable photo comparison — used when both sides have a real image. Keyboard: the slider is a native range input. */
function PhotoSlider({ ba }: { ba: BA }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-2xl bg-[rgb(var(--tint))]">
      <Image src={withBase(ba.after.image!.src!)} alt={ba.after.image!.alt} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={withBase(ba.before.image!.src!)} alt={ba.before.image!.alt} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-lift">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
      <span className="pill-live absolute left-3 top-3 !bg-white/90 !text-ink-900">{ba.before.label}</span>
      <span className="pill-done absolute right-3 top-3 !bg-white/90 !text-ink-900">{ba.after.label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare: drag to reveal ${ba.before.label} or ${ba.after.label}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/** Text comparison with an animated toggle on phones and side-by-side panels on larger screens. */
function TextCompare({ ba }: { ba: BA }) {
  const [side, setSide] = useState<"before" | "after">("after");
  const Panel = ({ which }: { which: "before" | "after" }) => {
    const d = ba[which];
    const after = which === "after";
    return (
      <div className={`h-full rounded-2xl p-6 md:p-8 ${after ? "bg-[rgb(var(--surface))] shadow-lift ring-1 ring-[rgb(var(--accent)/0.35)]" : "border border-dashed hairline"}`}>
        <span className={after ? "pill-done" : "pill-live"}>{d.label}</span>
        <p className={`mt-4 font-serif leading-snug ${after ? "text-2xl" : "text-xl muted"}`}>{d.text}</p>
      </div>
    );
  };
  return (
    <>
      <div className="hidden items-stretch gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Panel which="before" />
        <div className="grid place-items-center" aria-hidden>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgb(var(--accent))] text-white dark:text-ink-950"><ArrowRight className="h-5 w-5" /></span>
        </div>
        <Panel which="after" />
      </div>
      <div className="md:hidden">
        <div role="group" aria-label="Show before or after" className="mb-4 inline-flex rounded-full border hairline p-1">
          {(["before", "after"] as const).map((s) => (
            <button key={s} type="button" aria-pressed={side === s} onClick={() => setSide(s)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${side === s ? "is-on" : ""}`}>
              {ba[s].label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={side} initial={{ opacity: 0, x: side === "after" ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Panel which={side} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export function BeforeAfter({ ba }: { ba: BA }) {
  const hasPhotos = Boolean(ba.before.image?.src && ba.after.image?.src);
  return (
    <div>
      {hasPhotos ? <PhotoSlider ba={ba} /> : <TextCompare ba={ba} />}
      {hasPhotos && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <p className="text-sm muted"><span className="font-semibold text-[rgb(var(--text))]">{ba.before.label}: </span>{ba.before.text}</p>
          <p className="text-sm muted"><span className="font-semibold text-[rgb(var(--text))]">{ba.after.label}: </span>{ba.after.text}</p>
        </div>
      )}
      <p className="mt-4 text-xs muted">{BEFORE_AFTER_NOTE[ba.kind]}</p>
      {!hasPhotos && siteConfig.reviewMode && (ba.before.image || ba.after.image) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ba.before.image && <ImageSlot image={ba.before.image} className="aspect-[16/9]" />}
          {ba.after.image && <ImageSlot image={ba.after.image} className="aspect-[16/9]" />}
          <p className="text-xs muted sm:col-span-2">Add both photos to turn this into a draggable before/after slider.</p>
        </div>
      )}
    </div>
  );
}
