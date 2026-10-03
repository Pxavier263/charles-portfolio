import { ArrowRight, BarChart3, ClipboardCheck, RefreshCcw, Users } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export const SERVICE_ICONS = { me: ClipboardCheck, data: BarChart3, sustainability: RefreshCcw, youth: Users } as const;

export function ServicesGrid() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Four ways I can help"
      intro="Each service is built on work I've already delivered. Every card links to the proof."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => {
          const Icon = SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS];
          return (
            <Reveal key={s.id} delay={(i % 2) * 0.06}>
              <article className="card group relative flex h-full flex-col overflow-hidden p-7 transition-shadow hover:shadow-lift md:p-8">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[rgb(var(--accent))] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" aria-hidden />
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-serif text-sm muted">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-2xl font-medium leading-tight">{s.title}</h3>
                <p className="mt-2 font-medium text-teal-700 dark:text-teal-300">{s.short}</p>
                <ul className="mt-5 space-y-1.5">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex gap-2 text-sm muted"><span className="mt-2 h-1 w-1 flex-none rounded-full bg-teal-500" aria-hidden />{d}</li>
                  ))}
                </ul>
                <p className="mt-5 border-l-2 border-[rgb(var(--highlight))] pl-3 text-sm"><span className="font-semibold">Proof: </span>{s.proof}</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                  <Link href={`/work-with-me?service=${s.id}`} data-cta={`service-${s.id}`} className="btn-primary !py-2">
                    Ask about this <span className="sr-only">service: {s.title}</span>
                  </Link>
                  <Link href={`/services#${s.id}`} className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-orange-500 underline-offset-4">
                    Details<span className="sr-only">: {s.title}</span> <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
