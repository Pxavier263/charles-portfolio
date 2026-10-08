import type { Metadata } from "next";
import Link from "next/link";
import { withBase } from "@/lib/paths";
import { ArrowLeft, BarChart3, ClipboardList, ExternalLink, Gauge, LineChart, Map, PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Lab",
  description: "Public-health dashboards, survey analyses and geospatial work by Ogu Charles Chukwudi.",
  alternates: { canonical: "/data-lab" },
};

/**
 * Live dashboards (Power BI "Publish to web" links). Publish to web makes the data fully public:
 * only add dashboards built on non-sensitive, approved data.
 */
const dashboards = [
  {
    id: "powerbi-1",
    title: "Empowering Education in Northern Nigeria: A Comprehensive Monitoring and Evaluation (M&E) Dashboard",
    text: "An interactive Power BI dashboard. Use the page tabs along the bottom of the report to explore each view.",
    src: "https://app.powerbi.com/view?r=eyJrIjoiMjUxMDNmYjAtYjg3OS00MzFhLWE2MjktODc1OTAzZTFjMjEyIiwidCI6Ijg3OTAxZTBhLWViOTctNDA5YS1hNWE0LTdjNjEyZDFjOTQ3NiJ9",
  },
  {
    id: "powerbi-2",
    title: "HR Healthcare Analytic Report",
    text: "An interactive Power BI dashboard. Use the page tabs along the bottom of the report to explore each view.",
    src: "https://app.powerbi.com/view?r=eyJrIjoiOTRjOWY4MzItYzAzMy00ZDU0LTkzYWUtOTJkMTg4ODFkMTU2IiwidCI6Ijg3OTAxZTBhLWViOTctNDA5YS1hNWE0LTdjNjEyZDFjOTQ3NiJ9",
  },
];

/** Static maps (exported from QGIS). Images live in public/images/data-lab/. */
const maps = [
  {
    id: "rwanda-hiv-2010",
    title: "Rwanda: HIV prevalence by sex versus total HIV prevalence among adults aged 15 to 49, by district, 2010",
    text:
      "A choropleth map made in QGIS. District shading shows total HIV prevalence in five equal intervals (0.9% to 8.3%), and the paired bars compare female and male prevalence in each district. Prevalence is highest in the three central Kigali City districts, and female prevalence exceeds male prevalence in most districts.",
    source: "Data: Rwanda DHS 2010. Boundaries: Rwanda Ministry of Health, Health Facility Database (April 2011).",
    src: "/images/data-lab/rwanda-hiv-prevalence-2010.jpg",
    alt: "Choropleth map of Rwanda's districts shaded by total HIV prevalence among adults aged 15 to 49 in 2010, ranging from 0.9% to 8.3%, with the darkest shading in the central Kigali City districts. Small paired bars in each district show female prevalence higher than male in most districts.",
    width: 2000,
    height: 1414,
  },
];

const slots = [
  { icon: LineChart, title: "Public-health visualisations", text: "Charts that make trends and gaps easy to read." },
  { icon: ClipboardList, title: "Survey analyses", text: "Feedback and assessment survey findings." },
  { icon: BarChart3, title: "Interactive charts", text: "Explorable views of programme data." },
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
        Dashboards, analyses and maps, added as they are cleared for public sharing.
      </p>

      <section aria-labelledby="dashboards-title" className="mt-12">
        <h2 id="dashboards-title" className="flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-eyebrow text-teal-700 dark:text-teal-300">
          <Gauge className="h-4 w-4" aria-hidden /> Power BI dashboards
        </h2>
        <div className="mt-5 space-y-8">
          {dashboards.map((d) => (
            <article key={d.id} className="card overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-4 p-6 md:p-7">
                <div className="max-w-2xl">
                  <h3 className="font-serif text-2xl">{d.title}</h3>
                  <p className="mt-1 text-sm muted">{d.text}</p>
                </div>
                <a href={d.src} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 text-sm">
                  Open full screen <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
              <div className="relative aspect-[4/5] w-full border-t hairline bg-paper-100 dark:bg-ink-800/60 sm:aspect-[16/10]">
                <iframe
                  title={`${d.title} (interactive Power BI report)`}
                  src={d.src}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="maps-title" className="mt-16">
        <h2 id="maps-title" className="flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-eyebrow text-teal-700 dark:text-teal-300">
          <Map className="h-4 w-4" aria-hidden /> Geospatial analyses
        </h2>
        <div className="mt-5 space-y-8">
          {maps.map((m) => (
            <article key={m.id} className="card overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-4 p-6 md:p-7">
                <div className="max-w-3xl">
                  <h3 className="font-serif text-2xl">{m.title}</h3>
                  <p className="mt-1 text-sm muted">{m.text}</p>
                </div>
                <a href={withBase(m.src)} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 text-sm">
                  View full size <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
              <figure className="border-t hairline bg-white">
                <a href={withBase(m.src)} target="_blank" rel="noopener noreferrer" aria-label={`${m.title}: open full size`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(m.src)} alt={m.alt} width={m.width} height={m.height} loading="lazy" className="h-auto w-full" />
                </a>
                <figcaption className="border-t hairline bg-[rgb(var(--surface))] px-6 py-3 text-xs muted md:px-7">{m.source}</figcaption>
              </figure>
            </article>
          ))}
        </div>
      </section>

      <h2 className="mt-16 font-sans text-sm font-semibold uppercase tracking-eyebrow text-teal-700 dark:text-teal-300">Coming soon</h2>
      <p className="mt-2 max-w-2xl text-sm muted">Layout previews only. They contain no data and do not represent real results.</p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((s, i) => (
          <li key={s.title} className="card p-6">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-teal-600 dark:text-teal-300" aria-hidden />
              <span className="chip text-[0.65rem]">Coming soon</span>
            </div>
            <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
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
