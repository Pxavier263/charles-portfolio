import { experience } from "@/data/experience";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { VerifyBadge } from "../ui/VerifyBadge";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where the work happens">
      <ol className="relative ml-3 border-l-2 border-teal-500/25 md:ml-[11.5rem]">
        {experience.map((e, i) => (
          <li key={e.id} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            <span
              className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-teal-500 ${e.current ? "bg-teal-500" : "bg-[rgb(var(--bg))]"}`}
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 md:absolute md:-left-[11.5rem] md:top-1 md:w-36 md:text-right">
              {e.current ? "Current" : e.period.startsWith("[") ? "Earlier role" : e.period}
            </p>
            <Reveal delay={i * 0.05}>
              <article className="card mt-2 p-6 md:mt-0 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-medium">{e.role}</h3>
                    <p className="mt-0.5 font-medium muted">{e.organisation}</p>
                  </div>
                  <VerifyBadge note={e.verify} />
                </div>
                {e.previousTitle && <p className="mt-2 text-sm muted">Previously: {e.previousTitle}</p>}
                <p className="mt-4 leading-relaxed">{e.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Responsibilities">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="chip">{r}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
