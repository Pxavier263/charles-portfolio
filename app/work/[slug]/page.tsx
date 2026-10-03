import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Visual } from "@/components/work/Visual";
import { Reveal } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/TagChip";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { BeforeAfter } from "@/components/work/BeforeAfter";
import { EvidenceTracker } from "@/components/work/EvidenceTracker";
import { ExpandableDetails, type DetailItem } from "@/components/work/ExpandableDetails";
import { Gallery } from "@/components/work/Gallery";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Recommendations } from "@/components/work/Recommendations";
import { Reviews } from "@/components/contact/Reviews";
import { activities } from "@/data/gallery";
import { publishedTestimonials } from "@/data/testimonials";
import { Stepper } from "@/components/work/Stepper";
import { projects } from "@/data/projects";
import { visible } from "@/lib/content";
import { siteConfig } from "@/data/profile";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.id === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/work/${p.id}` } };
}

const STATUS = { completed: ["Completed", "pill-done"], ongoing: ["Ongoing", "pill-live"], proposed: ["Proposed · not yet implemented", "pill-plan"], upcoming: ["Upcoming", "pill-next"] } as const;

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((x) => x.id === params.slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const orgs = visible(p.organisations);
  const collaborators = visible(p.collaborators);
  // Gallery = the case study's own photos + photos from linked activities (data/gallery.ts)
  const photos = [...p.media, ...activities.filter((a) => a.enabled && a.projectId === p.id).flatMap((a) => a.photos)].filter(
    (m, k, arr) => (m.src || siteConfig.reviewMode) && arr.findIndex((x) => (x.src ?? x.suggested) === (m.src ?? m.suggested)) === k,
  );
  const hasTestimonials = publishedTestimonials(p.id).length > 0 || siteConfig.reviewMode;
  const details: DetailItem[] = [
    { id: "role", title: "My full role", summary: `${visible(p.role).length} responsibilities`, items: visible(p.role) },
    { id: "approach", title: "Approach in detail", summary: "Every step of the work", items: visible(p.approach) },
    { id: "outputs", title: "Outputs", summary: "What was produced", items: visible(p.outputs) },
    { id: "skills", title: "Skills & methods applied", summary: p.skills.slice(0, 3).join(", "), items: [...p.skills, ...visible(p.methods).filter((m) => !p.skills.includes(m))] },
    { id: "context", title: "Sectors, partners & scope", summary: p.sectors.join(" · "), items: [`Type: ${p.type}`, `Sectors: ${p.sectors.join(", ")}`, `Scope: ${p.scope}`, ...collaborators.map((c) => `Collaborator: ${c}`)] },
  ].filter((d) => d.items.length > 0);
  const [statusLabel, statusCls] = STATUS[p.status];

  return (
    <article>
      {/* Header */}
      <header className="band-canvas relative overflow-hidden pb-12 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 grain opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container relative">
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-orange-700 dark:hover:text-orange-300">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All work
          </Link>
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className={statusCls}>{statusLabel}</span>
              <span className="chip">{p.year}</span>
              <VerifyBadge note={p.verify} />
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.05] md:text-[3.4rem]">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed muted">{p.summary}</p>
          </Reveal>

          {p.cover && <ImageSlot image={p.cover} className="mt-10 aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />}

          {/* 1 · Snapshot bar */}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/0.08)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Organisations", v: orgs.join(" · ") || "Not listed" },
              { k: "My role", v: visible(p.role).slice(0, 2).join(" · ") },
              { k: "Where", v: p.scope },
              { k: "Headline", v: p.headline ? `${p.headline.value} ${p.headline.label}` : statusLabel },
            ].map((x) => (
              <div key={x.k} className="bg-[rgb(var(--surface))] p-5">
                <dt className="text-xs uppercase tracking-wider muted">{x.k}</dt>
                <dd className="mt-1.5 text-sm font-semibold leading-snug">{x.v}</dd>
              </div>
            ))}
          </dl>
          {p.credit && <p className="mt-3 text-xs muted">{p.credit}</p>}
        </div>
      </header>

      {/* 2 · Challenge + 3 · What I did */}
      <section className="band-tint py-16 md:py-24" aria-labelledby="challenge-t">
        <div className="container grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="eyebrow">The challenge</p>
            <h2 id="challenge-t" className="sr-only">The challenge</h2>
            <p className="mt-4 font-serif text-2xl leading-snug md:text-3xl">{p.challenge}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="eyebrow">What I did</h2>
            <ul className="mt-4 space-y-2.5">
              {visible(p.role).map((r) => (
                <li key={r} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--accent))]" aria-hidden />{r}</li>
              ))}
            </ul>
            {p.facts && (
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {p.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs muted">{f.label}</dt>
                    <dd className="font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </section>

      {/* Before / after */}
      {p.beforeAfter && (
        <section className="band-canvas pt-16 md:pt-24" aria-labelledby="ba-t">
          <div className="container">
            <p className="eyebrow">Before &amp; after</p>
            <h2 id="ba-t" className="mt-3 text-3xl font-medium">What changes</h2>
            <div className="mt-8"><BeforeAfter ba={p.beforeAfter} /></div>
          </div>
        </section>
      )}

      {/* 4 · Approach */}
      <section className="band-canvas py-16 md:py-24" aria-labelledby="approach-t">
        <div className="container">
          <p className="eyebrow">Approach</p>
          <h2 id="approach-t" className="mt-3 text-3xl font-medium">How the work was done</h2>
          <div className="mt-8"><Stepper steps={visible(p.approach)} /></div>
          <div className="mt-8"><TagList tags={p.tags} /></div>
          <div className="mt-12">
            <h3 className="font-sans text-lg font-semibold">The details</h3>
            <p className="mt-1 text-sm muted">Expand any section for the full picture.</p>
            <div className="mt-4"><ExpandableDetails sections={details} /></div>
          </div>
        </div>
      </section>

      {/* 5 · Evidence */}
      <section className="band-accent py-16 md:py-24" aria-labelledby="evidence-t">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">{p.status === "proposed" ? "Status" : "Evidence"}</p>
            <h2 id="evidence-t" className="mt-3 text-3xl font-medium">{p.status === "proposed" ? "Where it stands" : "What the evidence shows"}</h2>
            <ul className="mt-6 space-y-3">
              {visible(p.impact).map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--highlight))]" aria-hidden />{x}</li>
              ))}
            </ul>
            {visible(p.outputs).length > 0 && (
              <>
                <h3 className="mt-8 font-sans text-sm font-semibold">Outputs</h3>
                <ul className="mt-2 space-y-1.5 text-sm muted">
                  {visible(p.outputs).map((o) => <li key={o} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--accent))]" aria-hidden /><span>{o}</span></li>)}
                </ul>
              </>
            )}
          </Reveal>
          {p.visual && (
            <EvidenceTracker project={p.id}>
              <div className="card p-6 md:p-8"><Visual kind={p.visual} /></div>
            </EvidenceTracker>
          )}
        </div>
      </section>

      {/* 6 · Reflection */}
      {p.reflection && p.reflection.length > 0 && (
        <section className="band-canvas py-16 md:py-24" aria-labelledby="learn-t">
          <div className="container max-w-4xl">
            <p className="eyebrow">What I learned</p>
            <h2 id="learn-t" className="mt-3 text-3xl font-medium">What the data suggests next</h2>
            <div className="mt-6 space-y-5">
              {p.reflection.map((r) => <p key={r} className="font-serif text-xl leading-relaxed">{r}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="band-tint py-16 md:py-24" aria-labelledby="gallery-t">
          <div className="container">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-t" className="mt-3 text-3xl font-medium">In pictures</h2>
            <div className="mt-8"><Gallery photos={photos} title={p.shortTitle} /></div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {hasTestimonials && (
        <section className="band-canvas py-16 md:py-20" aria-labelledby="testi-t">
          <div className="container">
            <p className="eyebrow">What partners say</p>
            <h2 id="testi-t" className="sr-only">Testimonials</h2>
            <div className="mt-6"><Reviews projectId={p.id} /></div>
          </div>
        </section>
      )}

      {/* Smart recommendations */}
      <section className="band-canvas pb-20 pt-4 md:pb-24" aria-label="Recommended case studies">
        <div className="container"><Recommendations currentId={p.id} /></div>
      </section>

      {/* 7 · CTA + next */}
      <section className="band-ink py-16 md:py-24" aria-labelledby="case-cta-t">
        <div className="container grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="case-cta-t" className="text-3xl font-medium leading-tight md:text-5xl">Running something similar? Let&apos;s talk.</h2>
            <Link href="/work-with-me" data-cta={`case-${p.id}`} className="btn mt-8 bg-orange-600 !px-6 !py-3 text-base text-white hover:bg-orange-700">
              Work with me <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="space-y-3">
            <Link href={`/work/${next.id}`} className="group block rounded-2xl border border-white/15 p-5 transition-colors hover:border-orange-300">
              <span className="text-xs uppercase tracking-eyebrow text-white/60">Next case study</span>
              <span className="mt-1 flex items-center justify-between gap-3 font-serif text-xl">
                {next.shortTitle} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
