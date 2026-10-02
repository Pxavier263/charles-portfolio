"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/** Interactive step-through of a case study's approach. Keyboard: arrow keys move between steps. */
export function Stepper({ steps }: { steps: string[] }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + steps.length) % steps.length);
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <div role="tablist" aria-label="Approach steps" aria-orientation="vertical" className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {steps.map((_, k) => (
          <button
            key={k}
            id={`step-tab-${k}`}
            role="tab"
            aria-selected={i === k}
            aria-controls="step-panel"
            tabIndex={i === k ? 0 : -1}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (["ArrowDown", "ArrowRight"].includes(e.key)) { e.preventDefault(); go(k + 1); document.getElementById(`step-tab-${(k + 1) % steps.length}`)?.focus(); }
              if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(k - 1); document.getElementById(`step-tab-${(k - 1 + steps.length) % steps.length}`)?.focus(); }
            }}
            className={`flex flex-none items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${i === k ? "is-on" : "hairline hover:border-teal-500"}`}
          >
            <span className="font-serif text-lg">0{k + 1}</span> Step {k + 1}
          </button>
        ))}
      </div>
      <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${i}`} className="relative min-h-[140px] rounded-2xl bg-[rgb(var(--surface))] p-6 shadow-soft md:p-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="font-serif text-xl leading-relaxed md:text-2xl"
          >
            {steps[i]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden>
            {steps.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-[rgb(var(--accent))]" : "w-1.5 bg-[rgb(var(--line)/0.2)]"}`} />)}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(i - 1)} className="btn-ghost !px-3 !py-1.5 text-xs" aria-label="Previous step">←</button>
            <button type="button" onClick={() => go(i + 1)} className="btn-ghost !px-3 !py-1.5 text-xs" aria-label="Next step">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
