"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface DetailItem {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

/** Accordion of case-study details. Animated height; one or more panels can be open. */
export function ExpandableDetails({ sections }: { sections: DetailItem[] }) {
  const [open, setOpen] = useState<string[]>([sections[0]?.id].filter(Boolean) as string[]);
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  const allOpen = open.length === sections.length;
  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button type="button" onClick={() => setOpen(allOpen ? [] : sections.map((s) => s.id))} className="text-sm font-semibold underline decoration-teal-500 underline-offset-4">
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ul className="divide-y hairline overflow-hidden rounded-2xl border hairline bg-[rgb(var(--surface))]">
        {sections.map((s) => {
          const isOpen = open.includes(s.id);
          return (
            <li key={s.id}>
              <h3>
                <button
                  type="button"
                  id={`d-${s.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`p-${s.id}`}
                  onClick={() => toggle(s.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-sans transition-colors hover:bg-[rgb(var(--tint))]"
                >
                  <span>
                    <span className="block font-sans font-semibold">{s.title}</span>
                    <span className="block text-sm muted">{s.summary}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 flex-none transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`p-${s.id}`}
                    role="region"
                    aria-labelledby={`d-${s.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 px-6 pb-6">
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-3 text-sm leading-relaxed"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--accent))]" aria-hidden />{it}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
