"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { BEFORE_AFTER_NOTE } from "@/data/taxonomy";
import { Reveal } from "../ui/Reveal";
import { ImageSlot } from "../ui/ImageSlot";

/**
 * Interactive work showcase on the homepage: choose a case study on the left
 * (click, hover, or arrow keys) and its story animates in on the right.
 */
export function FeaturedShowcase() {
  const list = projects.filter((p) => p.homeOrder).sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
  const [i, setI] = useState(0);
  const p = list[i];

  return (
    <section id="work" aria-labelledby="showcase-title" className="band-tint py-20 md:py-28">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 id="showcase-title" className="mt-3 text-3xl font-medium leading-[1.1] md:text-[2.6rem]">Proof, not promises</h2>
            <p className="mt-4 text-lg muted">Pick a case study to see the problem, what changed and the headline evidence.</p>
          </div>
          <Link href="/work" className="btn-ghost">Explore all work <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[340px_1fr]">
          <div role="tablist" aria-label="Featured case studies" aria-orientation="vertical" className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {list.map((x, k) => (
              <button
                key={x.id}
                id={`fs-tab-${k}`}
                role="tab"
                aria-selected={i === k}
                aria-controls="fs-panel"
                tabIndex={i === k ? 0 : -1}
                onClick={() => setI(k)}
                onMouseEnter={() => setI(k)}
                onKeyDown={(e) => {
                  const d = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
                  if (!d) return;
                  e.preventDefault();
                  const n = (k + d + list.length) % list.length;
                  setI(n);
                  document.getElementById(`fs-tab-${n}`)?.focus();
                }}
                className={`group relative min-w-[240px] flex-none overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 lg:min-w-0 ${
                  i === k ? "border-transparent bg-[rgb(var(--surface))] shadow-lift" : "hairline hover:bg-[rgb(var(--surface)/0.6)]"
                }`}
              >
                {i === k && <motion.span layoutId="fs-bar" className="absolute inset-y-0 left-0 w-1 bg-[rgb(var(--accent))]" aria-hidden />}
                <span className="text-xs font-semibold uppercase tracking-wider muted">0{k + 1} · {x.type}</span>
                <span className="mt-1.5 block font-serif text-lg leading-snug">{x.shortTitle}</span>
                {x.headline && (
                  <span className="mt-2 block text-sm">
                    <span className="font-semibold text-teal-700 dark:text-teal-300">{x.headline.value}</span> <span className="muted">{x.headline.label}</span>
                  </span>
                )}
              </button>
            ))}
          </div>

          <div id="fs-panel" role="tabpanel" aria-labelledby={`fs-tab-${i}`} className="relative min-h-[460px] overflow-hidden rounded-3xl bg-[rgb(var(--surface))] shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col p-7 md:p-10"
              >
                {p.cover && <ImageSlot image={p.cover} className="-mx-7 -mt-7 mb-8 aspect-[21/8] !rounded-none md:-mx-10 md:-mt-10" showCaption={false} sizes="(min-width: 1024px) 800px, 100vw" />}
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-eyebrow muted">{p.year} · {p.scope}</p>
                    <h3 className="mt-3 text-2xl font-medium leading-tight md:text-3xl">{p.title}</h3>
                  </div>
                  {p.headline && (
                    <div className="text-right">
                      <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }} className="font-serif text-5xl text-teal-700 dark:text-teal-300 md:text-6xl">
                        {p.headline.value}
                      </motion.p>
                      <p className="text-sm muted">{p.headline.label}</p>
                    </div>
                  )}
                </div>

                {p.beforeAfter && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                    <div className="rounded-2xl border border-dashed hairline p-5">
                      <span className="pill-live">{p.beforeAfter.before.label}</span>
                      <p className="mt-3 text-sm leading-relaxed muted">{p.beforeAfter.before.text}</p>
                    </div>
                    <div className="hidden place-items-center sm:grid" aria-hidden>
                      <ArrowRight className="h-5 w-5 text-teal-700 dark:text-teal-300" />
                    </div>
                    <div className="rounded-2xl bg-[rgb(var(--accent-wash))] p-5">
                      <span className="pill-done">{p.beforeAfter.after.label}</span>
                      <p className="mt-3 text-sm leading-relaxed">{p.beforeAfter.after.text}</p>
                    </div>
                    <p className="text-xs muted sm:col-span-3">{BEFORE_AFTER_NOTE[p.beforeAfter.kind]}</p>
                  </div>
                )}

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Skills">
                  {p.skills.slice(0, 5).map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
                  <Link href={`/work/${p.id}`} data-cta={`showcase-${p.id}`} className="btn-primary">
                    Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">: {p.title}</span>
                  </Link>
                  <span className="text-sm muted">{p.sectors.join(" · ")}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
