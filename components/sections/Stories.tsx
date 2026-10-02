import { stories } from "@/data/stories";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { VerifyBadge } from "../ui/VerifyBadge";
import { withBase } from "@/lib/paths";

export function Stories() {
  return (
    <Section id="stories" tone="tint" eyebrow="Impact stories" title="Beyond the numbers" intro="Four short accounts of how the work comes together in practice.">
      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((s, i) => (
          <Reveal key={s.id} delay={(i % 2) * 0.06}>
            <article className="card h-full p-7 md:p-8">
              <p className="font-serif text-5xl leading-none text-teal-600 dark:text-teal-300" aria-hidden>0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-medium">{s.title}</h3>
              <p className="mt-2 font-medium text-teal-700 dark:text-teal-300">{s.lede}</p>
              <p className="mt-4 leading-relaxed muted">{s.body}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {s.projectId && (
                  <a href={withBase(`/work/${s.projectId}`)} className="text-sm font-semibold underline decoration-teal-500 underline-offset-4">
                    See the related case study<span className="sr-only">: {s.title}</span>
                  </a>
                )}
                <VerifyBadge note={s.verify} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
