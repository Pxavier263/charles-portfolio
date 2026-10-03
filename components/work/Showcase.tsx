"use client";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, LayoutGrid, List, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { PROJECT_TYPES, SECTORS } from "@/data/taxonomy";
import { visible } from "@/lib/content";
import { readHistory } from "@/lib/recommend";
import { track } from "@/lib/track";
import type { Project } from "@/lib/types";
import { Recommendations } from "./Recommendations";
import { ImageSlot } from "../ui/ImageSlot";
import { siteConfig } from "@/data/profile";

const STATUS = { completed: ["Completed", "pill-done"], ongoing: ["Ongoing", "pill-live"], proposed: ["Proposed", "pill-plan"], upcoming: ["Upcoming", "pill-next"] } as const;
const ALL_SKILLS = Array.from(new Set(projects.flatMap((p) => p.skills))).sort();

type Filters = { type: string; sector: string; skill: string; q: string };
const EMPTY: Filters = { type: "", sector: "", skill: "", q: "" };

function readUrl(): Filters {
  const u = new URLSearchParams(window.location.search);
  return { type: u.get("type") ?? "", sector: u.get("sector") ?? "", skill: u.get("skill") ?? "", q: u.get("q") ?? "" };
}

function Facet({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const count = (o: string) =>
    projects.filter((p) => (label === "Type" ? p.type === o : label === "Sector" ? p.sectors.includes(o as never) : p.skills.includes(o))).length;
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <p className="text-xs font-semibold uppercase tracking-eyebrow muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(value === o ? "" : o)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${value === o ? "is-on" : "hairline hover:border-orange-500"}`}
          >
            {o} <span className="ml-1 text-xs opacity-60">{count(o)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ p, layout, open, onToggle }: { p: Project; layout: "grid" | "list"; open: boolean; onToggle: () => void }) {
  const [label, cls] = STATUS[p.status];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`card group flex flex-col overflow-hidden ${open ? "shadow-lift ring-1 ring-[rgb(var(--accent)/0.4)]" : "hover:shadow-lift"} ${layout === "grid" && open ? "md:col-span-2" : ""}`}
    >
      {p.cover && (p.cover.src || siteConfig.reviewMode) && layout === "grid" && (
        <Link href={`/work/${p.id}`} tabIndex={-1} aria-hidden className="block overflow-hidden">
          <ImageSlot image={p.cover} className="aspect-[16/8] !rounded-none !border-0 transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" showCaption={false} sizes="(min-width: 768px) 600px, 100vw" />
        </Link>
      )}
      <div className={`flex flex-1 flex-col p-6 md:p-7 ${layout === "list" ? "md:flex-row md:items-start md:gap-8" : ""}`}>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cls}>{label}</span>
            <span className="text-xs font-semibold uppercase tracking-wider muted">{p.type}</span>
          </div>
          <h2 className="mt-3 text-xl font-medium leading-snug md:text-2xl">
            <Link href={`/work/${p.id}`} className="hover:text-orange-700 dark:hover:text-orange-300">{p.title}</Link>
          </h2>
          <p className="mt-1 text-sm muted">{p.year} · {p.scope}</p>
          <p className="mt-3 leading-relaxed muted">{p.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
            {p.skills.slice(0, open ? 10 : 3).map((s) => <li key={s} className="chip">{s}</li>)}
            {!open && p.skills.length > 3 && <li className="chip muted">+{p.skills.length - 3}</li>}
          </ul>
        </div>
        {p.headline && (
          <div className={`mt-6 flex-none ${layout === "list" ? "md:mt-0 md:w-44 md:text-right" : ""}`}>
            <p className="font-serif text-4xl text-teal-700 dark:text-teal-300">{p.headline.value}</p>
            <p className="text-sm muted">{p.headline.label}</p>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`qv-${p.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t hairline bg-[rgb(var(--tint))]"
          >
            <div className="grid gap-6 p-6 md:grid-cols-3 md:p-7">
              <div className="md:col-span-1">
                <p className="eyebrow">The challenge</p>
                <p className="mt-2 text-sm leading-relaxed">{p.challenge}</p>
              </div>
              <div>
                <p className="eyebrow">What I did</p>
                <ul className="mt-2 space-y-1 text-sm">{visible(p.role).map((r) => <li key={r} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--accent))]" aria-hidden /><span>{r}</span></li>)}</ul>
              </div>
              <div>
                {p.beforeAfter ? (
                  <>
                    <p className="eyebrow">What changes</p>
                    <p className="mt-2 text-sm muted"><span className="font-semibold text-[rgb(var(--text))]">{p.beforeAfter.before.label}: </span>{p.beforeAfter.before.text}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold text-teal-700 dark:text-teal-300">{p.beforeAfter.after.label}: </span>{p.beforeAfter.after.text}</p>
                  </>
                ) : (
                  <>
                    <p className="eyebrow">Sectors</p>
                    <p className="mt-2 text-sm">{p.sectors.join(" · ")}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 border-t hairline px-6 py-3.5 md:px-7">
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`qv-${p.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold">
          {open ? "Hide details" : "Quick view"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
          <span className="sr-only">: {p.shortTitle}</span>
        </button>
        <Link href={`/work/${p.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-300">
          Full case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          <span className="sr-only">: {p.title}</span>
        </Link>
      </div>
    </motion.article>
  );
}

/** Work showcase: filter by type, sector and skill; search; grid/list; quick view; filters kept in the URL. */
export function Showcase() {
  const [f, setF] = useState<Filters>(EMPTY);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [openId, setOpenId] = useState<string | null>(null);
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    setF(readUrl());
    setHasHistory(readHistory().length > 0);
  }, []);

  // Keep filters in the URL so filtered views can be shared.
  useEffect(() => {
    const u = new URLSearchParams();
    (Object.keys(f) as (keyof Filters)[]).forEach((k) => f[k] && u.set(k, f[k]));
    const qs = u.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [f]);

  const set = (k: keyof Filters) => (v: string) => {
    setF((x) => ({ ...x, [k]: v }));
    if (v && k !== "q") track("work_filter", { facet: k, value: v });
  };

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (!f.type || p.type === f.type) &&
        (!f.sector || p.sectors.includes(f.sector as never)) &&
        (!f.skill || p.skills.includes(f.skill)) &&
        (!q || [p.title, p.summary, p.challenge, p.scope, ...p.skills, ...p.sectors, p.type].join(" ").toLowerCase().includes(q)),
    );
  }, [f]);

  const active = Object.values(f).filter(Boolean).length;

  return (
    <div>
      <div className="card space-y-6 p-5 md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search work</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 muted" aria-hidden />
            <input
              type="search"
              value={f.q}
              onChange={(e) => set("q")(e.target.value)}
              placeholder="Search by keyword, skill or country…"
              className="w-full rounded-full border hairline bg-[rgb(var(--bg))] py-3 pl-11 pr-4 text-sm focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Skill</span>
              <select value={f.skill} onChange={(e) => set("skill")(e.target.value)} className="rounded-full border hairline bg-[rgb(var(--bg))] px-4 py-2.5 text-sm focus:border-teal-700 focus:outline-none">
                <option value="">Any skill</option>
                {ALL_SKILLS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <div role="group" aria-label="Layout" className="hidden rounded-full border hairline p-1 md:inline-flex">
              <button type="button" aria-pressed={layout === "grid"} onClick={() => setLayout("grid")} className={`rounded-full p-2 ${layout === "grid" ? "is-on" : ""}`} aria-label="Grid view"><LayoutGrid className="h-4 w-4" aria-hidden /></button>
              <button type="button" aria-pressed={layout === "list"} onClick={() => setLayout("list")} className={`rounded-full p-2 ${layout === "list" ? "is-on" : ""}`} aria-label="List view"><List className="h-4 w-4" aria-hidden /></button>
            </div>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Facet label="Type" options={PROJECT_TYPES} value={f.type} onChange={set("type")} />
          <Facet label="Sector" options={SECTORS} value={f.sector} onChange={set("sector")} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm" aria-live="polite">
          <span className="font-semibold">{list.length}</span> of {projects.length} case studies
        </p>
        {active > 0 && (
          <button type="button" onClick={() => setF(EMPTY)} className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-orange-500 underline-offset-4">
            <X className="h-3.5 w-3.5" aria-hidden /> Clear {active} filter{active > 1 ? "s" : ""}
          </button>
        )}
      </div>

      <LayoutGroup>
        <motion.div layout className={`mt-4 grid gap-5 ${layout === "grid" ? "md:grid-cols-2" : ""}`}>
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <Card key={p.id} p={p} layout={layout} open={openId === p.id} onToggle={() => setOpenId((o) => (o === p.id ? null : p.id))} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {list.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed hairline p-10 text-center">
          <p className="font-serif text-2xl">No case studies match those filters.</p>
          <p className="mt-2 muted">Try removing a filter, or tell me about your project directly.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => setF(EMPTY)} className="btn-ghost">Clear filters</button>
            <Link href="/work-with-me" data-cta="work-empty" className="btn-primary">Work with me <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      )}

      {hasHistory && (
        <div className="mt-16">
          <Recommendations currentId={null} title="Picked for you" />
        </div>
      )}
    </div>
  );
}
