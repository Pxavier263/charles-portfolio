import { metrics } from "@/data/metrics";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";
import { VerifyBadge } from "../ui/VerifyBadge";

export function ImpactSnapshot() {
  const [lead, ...rest] = metrics;
  return (
    <section aria-labelledby="snapshot-title" className="band-ink py-16 md:py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow !text-orange-300">Results in numbers</p>
            <h2 id="snapshot-title" className="mt-2 text-2xl font-medium md:text-3xl">
              Scale I have worked at
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/65">
            Figures from programme records. Cohort 4 refers to the 2026 AMR Policy &amp; Governance Programme for African Youth.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
          <Reveal className="col-span-2 tile-ink p-6 lg:row-span-2 lg:p-8">
            <div className="flex h-full flex-col justify-between gap-6">
              <p className="font-serif text-6xl font-medium text-orange-300 md:text-7xl">
                <Counter value={lead.value} suffix={lead.suffix} />
              </p>
              <div>
                <p className="text-lg font-semibold">{lead.label}</p>
                <p className="mt-1 text-white/70">{lead.context}</p>
                <VerifyBadge note={lead.verify} className="mt-3" />
              </div>
            </div>
          </Reveal>
          {rest.map((m, idx) => (
            <Reveal
              key={m.id}
              delay={idx * 0.04}
              className={`tile-ink p-5 sm:p-6 ${idx === rest.length - 1 && rest.length % 2 === 1 ? "col-span-2" : ""}`}
            >
              <p className="font-serif text-3xl font-medium sm:text-4xl">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-3 text-sm font-semibold">{m.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/65">{m.context}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
