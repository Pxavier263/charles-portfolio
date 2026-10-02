import { siteConfig } from "@/data/profile";
const steps = [
  { t: "Concept & partnership", s: "In progress" },
  { t: "Stakeholder engagement", s: "In progress" },
  { t: "Frontline-led risk assessment", s: "Planned" },
  { t: "Prioritisation", s: "Planned" },
  { t: "M&E and evidence generation", s: "Planned" },
];
/** Clearly marks what is in progress vs planned; no outcomes are implied. */
export function PilotRoadmap() {
  return (
    <div>
      <p className="eyebrow">Pilot roadmap</p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-5">
        {steps.map((x) => (
          <li
            key={x.t}
            className={`rounded-xl border p-3 text-sm ${x.s === "In progress" ? "border-teal-500 bg-teal-50 dark:bg-teal-400/10" : "border-dashed hairline"}`}
          >
            <span className="block font-medium">{x.t}</span>
            <span className={`mt-1 block text-xs ${x.s === "In progress" ? "text-teal-700 dark:text-teal-300" : "muted"}`}>{x.s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs muted">Stage statuses reflect the proposal phase and will be updated as the pilot progresses.{siteConfig.reviewMode && " [Stage statuses to be confirmed]"}</p>
    </div>
  );
}
