import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { audiences } from "@/data/services";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function WhoIHelp() {
  return (
    <Section id="who" eyebrow="Who I help" title="If this sounds like your programme, we should talk." tone="tint">
      <div className="grid gap-5 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06}>
            <article className="card group flex h-full flex-col p-7">
              <p className="font-serif text-4xl text-teal-700 dark:text-teal-300" aria-hidden>0{i + 1}</p>
              <h3 className="mt-4 text-xl font-medium">{a.title}</h3>
              <p className="mt-3 leading-relaxed">{a.problem}</p>
              <p className="mt-4 text-sm muted">{a.help}</p>
              <Link href={`/services#${a.serviceId}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-teal-700 dark:text-teal-300">
                How I help <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                <span className="sr-only">{a.title}</span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
