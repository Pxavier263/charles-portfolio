import { BarChart3, ClipboardCheck, HeartPulse, KanbanSquare, LineChart, Map } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const ICONS = { chart: LineChart, bar: BarChart3, map: Map, clipboard: ClipboardCheck, kanban: KanbanSquare, health: HeartPulse };

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Data & technical toolkit"
      title="Capabilities, grouped by what they're for"
      intro="Tools are listed by the job they do in public-health work, with no self-rated percentages."
      tone="tint"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = ICONS[g.icon];
          return (
            <Reveal key={g.id} delay={(i % 3) * 0.05}>
              <article className="card group h-full p-6 transition-shadow hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-teal-400/10 dark:text-teal-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-medium">{g.title}</h3>
                <p className="mt-1 text-sm muted">{g.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((x) => (
                    <li key={x} className="chip">{x}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
