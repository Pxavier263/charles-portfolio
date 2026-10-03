import { GraduationCap, BadgeCheck, Briefcase, Users } from "lucide-react";
import { bio, profile, siteConfig } from "@/data/profile";
import { journey } from "@/data/ecosystem";
import { Portrait } from "../ui/Portrait";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const facts = [
  { icon: Briefcase, label: "Programme & Data Officer", sub: "Ducit Blue Solutions / Foundation" },
  { icon: Users, label: "Chairman / Lead", sub: "Nigerian Youth AMR Community of Practice" },
  { icon: BadgeCheck, label: "Licensed pharmacist", sub: "Pharmacists Council of Nigeria" },
  { icon: GraduationCap, label: "B.Pharm · MSc Public Health (in progress)", sub: "UniPort · Ahmadu Bello University" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>Data, programmes, policy and people, <em className="text-orange-600 dark:text-orange-400">in one practice.</em></>}
      intro={profile.centralMessage}
    >
      <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <Portrait />
          <ul className="mt-6 space-y-4">
            {facts.map((f) => (
              <li key={f.label} className="flex gap-3">
                <f.icon className="mt-0.5 h-5 w-5 flex-none text-teal-600 dark:text-teal-300" aria-hidden />
                <span>
                  <span className="block text-sm font-semibold">{f.label}</span>
                  <span className="block text-sm muted">{f.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-serif text-2xl leading-snug">{bio.lead}</p>
            {bio.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 leading-relaxed muted">{p}</p>
            ))}
          </Reveal>

          <Reveal className="mt-10 card p-6">
            <h3 className="font-sans text-sm font-semibold">Stakeholders engaged through programmes and events</h3>
            <p className="mt-1 text-sm muted">{bio.engagementIntro}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {bio.engagementPartners.map((p) => (
                <li key={p} className="chip">{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs muted">{bio.engagementDisclaimer}</p>
          </Reveal>

          {/* Career journey */}
          <Reveal className="mt-14">
            <h3 className="text-2xl font-medium">A connected career, not a series of pivots</h3>
            <p className="mt-2 max-w-2xl muted">
              Each step builds on the last. Pharmacy grounds the understanding of medicines and resistance; public health and data
              widen the lens; programmes, governance and youth leadership put that understanding to work.
            </p>
          </Reveal>
          <ol className="relative mt-8 space-y-0 border-l-2 border-teal-500/30 pl-8 xl:grid xl:grid-cols-7 xl:gap-3 xl:border-l-0 xl:border-t-2 xl:pl-0 xl:pt-8">
            {journey.map((j, idx) => (
              <li key={j.step} className="relative pb-7 xl:pb-0">
                <span
                  className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-teal-500 bg-[rgb(var(--bg))] text-[0.6rem] font-bold xl:-top-[43px] xl:left-0"
                  aria-hidden
                >
                  {idx + 1}
                </span>
                <Reveal delay={idx * 0.05}>
                  <p className="text-sm font-semibold">{j.step}</p>
                  <p className="mt-1 text-xs leading-relaxed muted">{j.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
