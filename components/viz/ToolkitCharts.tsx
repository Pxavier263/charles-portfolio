"use client";
import { useState } from "react";
import { toolkitResults, toolkitSamples } from "@/data/projects";

type View = "both" | "ghana" | "kenya";

const Bar = ({ value, className, label, dim }: { value: number; className: string; label: string; dim: boolean }) => (
  <div className={`flex items-center gap-3 transition-opacity duration-300 ${dim ? "opacity-20" : ""}`}>
    <span className="w-14 flex-none text-xs muted">{label}</span>
    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[rgb(var(--line)/0.08)]">
      <div className={`h-full rounded-full transition-[width] duration-700 ${className}`} style={{ width: `${value}%` }} />
    </div>
    <span className="w-12 flex-none text-right text-sm font-semibold tabular-nums">{value}%</span>
  </div>
);

/** Interactive paired bars: toggle Ghana / Kenya / both. Percentages as reported in the 2025 feedback analysis. */
export function ToolkitCharts() {
  const [view, setView] = useState<View>("both");
  const n = (base: "toolkit" | "workshop") => toolkitSamples[base];
  const opts: { id: View; label: string }[] = [
    { id: "both", label: "Both" },
    { id: "ghana", label: "Ghana" },
    { id: "kenya", label: "Kenya" },
  ];
  return (
    <figure>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">2025 feedback — Ghana vs Kenya</p>
        <div role="group" aria-label="Show country" className="inline-flex rounded-full border hairline p-1">
          {opts.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={view === o.id}
              onClick={() => setView(o.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${view === o.id ? "is-on" : ""}`}
            >
              {o.id !== "both" && <span className={`h-2 w-2 rounded-full ${o.id === "ghana" ? "bg-teal-600" : "bg-gold-500"}`} aria-hidden />}
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["toolkit", "workshop"] as const).map((b) => (
          <div key={b} className="rounded-xl bg-[rgb(var(--tint))] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider muted">{b === "toolkit" ? "Toolkit respondents" : "Workshop respondents"}</p>
            <p className="mt-1 font-serif text-3xl">{view === "both" ? n(b).total : n(b)[view]}</p>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full" aria-hidden>
              <div className={`bg-teal-600 transition-opacity ${view === "kenya" ? "opacity-20" : ""}`} style={{ width: `${(n(b).ghana / n(b).total) * 100}%` }} />
              <div className={`bg-gold-500 transition-opacity ${view === "ghana" ? "opacity-20" : ""}`} style={{ width: `${(n(b).kenya / n(b).total) * 100}%` }} />
            </div>
            <p className="mt-2 text-xs muted">Ghana {n(b).ghana} · Kenya {n(b).kenya}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-5" aria-hidden>
        {toolkitResults.map((r) => (
          <div key={r.label}>
            <p className="text-sm font-medium">
              {r.label} <span className="text-xs muted">({r.base} respondents)</span>
            </p>
            <div className="mt-2 space-y-1.5">
              <Bar value={r.ghana} className="bg-teal-600" label="Ghana" dim={view === "kenya"} />
              <Bar value={r.kenya} className="bg-gold-500" label="Kenya" dim={view === "ghana"} />
            </div>
          </div>
        ))}
      </div>

      <div className="sr-only">
        <table>
          <caption>Sustainability toolkit feedback, 2025</caption>
          <thead><tr><th scope="col">Indicator</th><th scope="col">Ghana</th><th scope="col">Kenya</th></tr></thead>
          <tbody>
            {toolkitResults.map((r) => (
              <tr key={r.label}><th scope="row">{r.label}</th><td>{r.ghana}%</td><td>{r.kenya}%</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-4 text-xs muted">Percentages as reported in the 2025 feedback analysis; bases are respondents to each question.</figcaption>
    </figure>
  );
}
