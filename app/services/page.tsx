import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { SERVICE_ICONS } from "@/components/home/ServicesGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { sitePhotos } from "@/data/photos";
import { projects } from "@/data/projects";
import { formats, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "M&E and impact measurement, programme data analysis and dashboards, sustainability planning and facilitation, and youth capacity-building design for AMR and One Health programmes in Africa.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Practical support for AMR and One Health programmes."
        intro="Four services, each built on work I have already delivered. Choose one, or ask for a combination."
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip !py-1.5 hover:border-teal-500">{s.title}</a>
          ))}
        </nav>
      </PageHeader>

      {services.map((s, i) => {
        const Icon = SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS];
        const proof = projects.filter((p) => s.projectIds.includes(p.id));
        return (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className={`scroll-mt-20 py-16 md:py-24 ${i % 2 === 0 ? "band-tint" : "band-canvas"}`}>
            <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <Reveal>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"><Icon className="h-5 w-5" aria-hidden /></span>
                <p className="mt-6 font-serif text-sm muted">Service 0{i + 1}</p>
                <h2 id={`${s.id}-t`} className="mt-1 text-3xl font-medium leading-tight md:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg text-teal-700 dark:text-teal-300">{s.short}</p>
                <p className="mt-4 leading-relaxed muted"><span className="font-semibold text-[rgb(var(--text))]">Outcome: </span>{s.outcome}</p>
                <Link href={`/work-with-me?service=${s.id}`} data-cta={`services-page-${s.id}`} className="btn-primary mt-8">
                  Ask about this service <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>
              <Reveal delay={0.08} className="space-y-5">
                {sitePhotos.services[s.id] && <ImageSlot image={sitePhotos.services[s.id]} className="aspect-[16/9]" sizes="(min-width: 1024px) 560px, 100vw" />}
                <div className="card p-6">
                  <h3 className="font-sans text-sm font-semibold">What you get</h3>
                  <ul className="mt-4 space-y-3">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 flex-none text-teal-600 dark:text-teal-300" aria-hidden />{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[rgb(var(--highlight)/0.5)] p-6">
                  <h3 className="font-sans text-sm font-semibold">Proof</h3>
                  <p className="mt-2 text-sm leading-relaxed">{s.proof}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {proof.map((p) => (
                      <li key={p.id}><Link href={`/work/${p.id}`} className="chip !py-1.5 hover:border-teal-500">{p.shortTitle} →</Link></li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="formats-t" className="band-accent py-16 md:py-24">
        <div className="container">
          <h2 id="formats-t" className="text-3xl font-medium">Ways to work together</h2>
          <p className="mt-3 max-w-2xl muted">No fixed packages. Pick the format that fits your need; you get a clear quote before any work starts.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f) => (
              <li key={f.title} className="rounded-2xl bg-[rgb(var(--surface))] p-6 shadow-soft">
                <p className="font-semibold">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA title="Not sure which service fits? Describe the problem instead." />
    </>
  );
}
