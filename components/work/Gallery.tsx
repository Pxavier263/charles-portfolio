"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ImagePlaceholder } from "@/lib/types";
import { ImageSlot } from "../ui/ImageSlot";
import { withBase } from "@/lib/paths";

/**
 * Photo gallery with a keyboard- and swipe-friendly lightbox.
 * Real photos (with `src`) open in the lightbox; empty slots show only in review mode.
 */
export function Gallery({ photos, title }: { photos: ImagePlaceholder[]; title: string }) {
  const real = photos.filter((p) => p.src);
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + real.length) % real.length)), [real.length]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const placeholders = photos.filter((p) => !p.src);

  return (
    <div>
      <ul className="grid auto-rows-[180px] gap-3 sm:grid-cols-3 md:auto-rows-[220px]">
        {real.map((p, i) => (
          <li key={p.src} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden rounded-2xl" aria-label={`Open photo: ${p.caption}`}>
              <Image src={withBase(p.src!)} alt={p.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent opacity-80 transition-opacity group-hover:opacity-100" aria-hidden />
              <span className="absolute bottom-3 left-4 right-10 text-left text-xs font-medium text-white">{p.caption}</span>
              <Expand className="absolute bottom-3 right-3 h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </button>
          </li>
        ))}
        {placeholders.map((p, i) => (
          <li key={(p.suggested ?? p.caption) + i} className={real.length === 0 && i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
            <ImageSlot image={p} className="h-full" />
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === ref.current && setOpen(null)}
        aria-label={`${title} — photos`}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0"
      >
        {open !== null && real[open] && (
          <div
            className="flex h-full flex-col bg-ink-950/95 text-white"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-white/70" aria-live="polite">{open + 1} / {real.length} · {real[open].caption}</p>
              <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20" aria-label="Close photos">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={open} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-4">
                  <Image src={withBase(real[open].src!)} alt={real[open].alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {real.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" aria-hidden /></button>
                  <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Next photo"><ChevronRight className="h-6 w-6" aria-hidden /></button>
                </>
              )}
            </div>
            {real.length > 1 && (
              <ul className="flex justify-center gap-2 overflow-x-auto p-4" aria-label="Thumbnails">
                {real.map((p, i) => (
                  <li key={p.src}>
                    <button type="button" onClick={() => setOpen(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === open} className={`relative block h-14 w-20 overflow-hidden rounded-lg ring-2 ${i === open ? "ring-teal-300" : "ring-transparent opacity-60"}`}>
                      <Image src={withBase(p.src!)} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
