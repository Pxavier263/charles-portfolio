import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, ClipboardList, Gauge, LineChart, Map, PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Lab",
  description: "Upcoming showcase of public-health dashboards, survey analyses and geospatial work by Ogu Charles Chukwudi.",
  alternates: { canonical: "/data-lab" },
};

const slots = [
  { icon: Gauge, title: "Power BI dashboards", text: "Programme performance and monitoring dashboards." },
  { icon: LineChart, title: "Public-health visualisations", text: "Charts that make trends and gaps easy to read." },
  { icon: ClipboardList, title: "Survey analyses", text: "Feedback and assessment survey findings." },
  { icon: BarChart3, title: "Interactive charts", text: "Explorable views of programme data." },
  { icon: Map, title: "Geospatial analyses", text: "QGIS maps of reach, resources and risk." },
  { icon: PieChart, title: "Monitoring dashboards", text: "Indicator tracking for programme teams." },
];

/** Layout placeholders only: no data is shown and nothing here represents real results. */
function DemoSkeleton({ i }: { i: number }) {
  const heights = [40, 65, 50, 80, 55, 70, 45];
  return (
    <div className="relative mt-5 h-32 overflow-hidden rounded-xl bg-paper-100 p-4 dark:bg-ink-800/60" aria-hidden>
      {i % 2 === 0 ? (
        <div className="flex h-full items-end gap-2">
          {heights.map((h, k) => <div key={k} className="flex-1 rounded-t bg-[rgb(var(--line)/0.1)]" style={{ height: `${h}%` }} />)}
        </div>
      ) : (
        <div className="grid h-full grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, k) => <div key={k} className="rounded bg-[rgb(var(--line)/0.08)]" />)}
        </div>
      )}
      <span className="absolute right-2 top-2 rounded-full bg-[rgb(var(--surface))] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider muted">
        Layout preview · no data
      </span>
    </div>
  );
}

export default function DataLab() {
  return (
    <div className="container pb-24 pt-32">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-orange-700 dark:hover:text-orange-300">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to portfolio
      </Link>
      <p className="eyebrow mt-10">Data Lab</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">Where programme data becomes something people can use.</h1>
      <p className="mt-5 max-w-2xl text-lg muted">
        This space will showcase dashboards, analyses and maps as they are cleared for public sharing. The panels below are
        layout previews only. They contain no data and do not represent real results.
      </p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((s, i) => (
          <li key={s.title} className="card p-6">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-teal-600 dark:text-teal-300" aria-hidden />
              <span className="chip text-[0.65rem]">Coming soon</span>
            </div>
            <h2 className="mt-4 font-serif text-xl">{s.title}</h2>
            <p className="mt-1 text-sm muted">{s.text}</p>
            <DemoSkeleton i={i} />
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm muted">
        Adding a real dashboard: publish it (e.g. Power BI “Publish to web” only for non-sensitive, approved data), then add an entry
        with its embed URL (see README → “Data Lab”).
      </p>
    </div>
  );
}
