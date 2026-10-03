"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pushHistory, readHistory, recommend, type Recommendation } from "@/lib/recommend";
import { track } from "@/lib/track";

/**
 * "You might also like": ranks other case studies by shared skills, sectors, type and
 * explicit links, boosted by what the visitor viewed earlier (stored only in their browser).
 * Each card says why it was recommended.
 */
export function Recommendations({ currentId, title = "You might also like" }: { currentId: string | null; title?: string }) {
  const [recs, setRecs] = useState<Recommendation[]>(() => recommend(currentId, [], 3));
  const [personal, setPersonal] = useState(false);

  useEffect(() => {
    const h = readHistory().filter((id) => id !== currentId);
    setRecs(recommend(currentId, h, 3));
    setPersonal(h.length > 0);
    if (currentId) pushHistory(currentId);
  }, [currentId]);

  if (recs.length === 0) return null;
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-medium md:text-3xl">{title}</h2>
        <p className="inline-flex items-center gap-1.5 text-xs muted">
          <Sparkles className="h-3.5 w-3.5 text-teal-700 dark:text-teal-300" aria-hidden />
          {personal ? "Based on this case study and what you viewed before" : "Based on shared skills, sectors and themes"}
        </p>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {recs.map((r, i) => (
          <motion.li key={r.project.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
            <Link
              href={`/work/${r.project.id}`}
              onClick={() => track("recommendation_click", { from: currentId ?? "work", to: r.project.id, rank: i + 1 })}
              className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider muted">{r.project.type}</span>
                <ArrowUpRight className="h-5 w-5 flex-none text-teal-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-teal-300" aria-hidden />
              </div>
              <h3 className="mt-3 text-lg font-medium leading-snug group-hover:text-orange-700 dark:group-hover:text-orange-300">{r.project.shortTitle}</h3>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Why recommended">
                {r.reasons.slice(0, 2).map((x) => (
                  <li key={x} className="rounded-full bg-[rgb(var(--accent-wash))] px-2.5 py-1 text-[0.7rem] font-medium text-teal-800 dark:text-teal-300">{x}</li>
                ))}
              </ul>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
