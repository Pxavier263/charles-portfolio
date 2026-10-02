import { currentFocus } from "@/data/focus";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Focus() {
  return (
    <Section id="focus" eyebrow={`Now · updated ${currentFocus.updated}`} title="What I'm working on">
      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {currentFocus.items.map((f, i) => (
          <Reveal as="li" key={f.title} delay={(i % 3) * 0.04} className="flex gap-4 border-t hairline py-5">
              <span className="relative mt-2 flex h-2.5 w-2.5 flex-none" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-40 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
              </span>
              <span>
                <span className="block font-semibold">{f.title}</span>
                <span className="block text-sm muted">{f.note}</span>
              </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
