import { Award, BadgeCheck, GraduationCap, Mic, Microscope } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";

const items = [
  { icon: BadgeCheck, title: "Licensed pharmacist", sub: "Pharmacists Council of Nigeria" },
  { icon: GraduationCap, title: "B.Pharm · MSc Public Health (in progress)", sub: "University of Port Harcourt · Ahmadu Bello University" },
  { icon: Mic, title: "ICID 2026: accepted poster", sub: "Madrid, 10–13 November 2026" },
  { icon: Microscope, title: "AMR in Bacterial Pathogens – Africa Course", sub: "NICD / WCS, Johannesburg, 2026" },
  { icon: Award, title: "2025 Antibiotic Guardian Award", sub: "Won by Ducit Blue Foundation's Pan-African youth AMR programme, which I contribute to" },
];

export function Credentials() {
  return (
    <section aria-labelledby="cred-title" className="band-canvas py-16 md:py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="cred-title" className="text-2xl font-medium md:text-3xl">Credentials &amp; recognition</h2>
          <Link href="/about#recognition" className="text-sm font-semibold underline decoration-orange-500 underline-offset-4">Full profile</Link>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.04} className="rounded-2xl border hairline p-5">
              <c.icon className="h-5 w-5 text-teal-700 dark:text-teal-300" aria-hidden />
              <p className="mt-3 text-sm font-semibold leading-snug">{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed muted">{c.sub}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
