const topics = ["Planning Checklist", "Resource Mobilisation", "Diagnostics", "Exit & Continuity", "Prioritising sustainability recommendations"];
export function WorkshopAgenda() {
  return (
    <div>
      <p className="eyebrow">Workshop focus · 24, 25 & 28 August 2026</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {topics.map((t, i) => (
          <li key={t} className="flex items-center gap-2 rounded-full border hairline px-3.5 py-2 text-sm">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-600 text-[0.65rem] font-bold text-white dark:bg-teal-400 dark:text-ink-950" aria-hidden>{i + 1}</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
