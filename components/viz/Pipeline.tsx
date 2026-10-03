import { cohortPipeline } from "@/data/projects";

/** Recruitment → … → Policy/Advocacy Action. Horizontal on desktop, vertical on mobile. */
export function Pipeline() {
  return (
    <div>
      <p className="eyebrow">Programme pathway (intended logic)</p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {cohortPipeline.map((s, i) => (
          <li key={s.step} className="flex gap-3 rounded-xl bg-[rgb(var(--surface))] p-3 ring-1 ring-[rgb(var(--line)/0.06)]">
            <span
              className={`grid h-7 w-7 flex-none place-items-center rounded-full text-xs font-bold ${
                i === cohortPipeline.length - 1 ? "bg-orange-500 text-ink-950" : "bg-teal-600 text-white dark:bg-teal-400 dark:text-ink-950"
              }`}
              aria-hidden
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold">
                {s.step}
                {i < cohortPipeline.length - 1 && <span className="ml-1 text-teal-600 dark:text-teal-300" aria-hidden>→</span>}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed muted">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-xl border border-dashed hairline p-4">
        <p className="text-sm font-semibold">Post-programme impact survey</p>
        <p className="mt-1 text-sm muted">Findings will be published here once the survey has been completed and analysed.</p>
      </div>
    </div>
  );
}
