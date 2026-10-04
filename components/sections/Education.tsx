import { BadgeCheck, GraduationCap, ScrollText } from "lucide-react";
import { certifications, education, educationImages } from "@/data/education";
import { ImageSlot } from "../ui/ImageSlot";
import { siteConfig } from "@/data/profile";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { VerifyBadge } from "../ui/VerifyBadge";
import { show } from "@/lib/content";

const icon = { completed: GraduationCap, "in-progress": GraduationCap, active: BadgeCheck };
const statusText = { completed: "Completed", "in-progress": "In progress", active: "Active" };

export function Education() {
  const certs = certifications.filter((c) => c.enabled && show(c.name));
  return (
    <Section id="education" eyebrow="Education & training" title="Qualifications">
      <div className="grid gap-5 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = icon[e.status];
          return (
            <Reveal key={e.id} delay={i * 0.06} className="min-w-0">
              <article className="card flex h-full flex-col p-6">
                {educationImages[e.id] && <ImageSlot image={educationImages[e.id]} className="-mx-2 -mt-2 mb-5 aspect-[16/9]" sizes="(min-width: 768px) 360px, 100vw" />}
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" aria-hidden />
                  <span className="text-xs font-semibold muted">{statusText[e.status]}</span>
                </div>
                <h3 className="mt-5 text-xl font-medium">{e.qualification}</h3>
                <p className="mt-1 text-sm font-medium">{e.institution}</p>
                <p className="mt-3 text-sm muted">{e.period}</p>
                {e.detail && (siteConfig.showCgpa || !e.detail.startsWith("CGPA")) && <p className="mt-1 text-sm muted">{e.detail}</p>}
                <VerifyBadge note={e.verify} className="mt-3" />
              </article>
            </Reveal>
          );
        })}
      </div>

      {certs.length > 0 && (
        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-sans text-sm font-semibold">
            <ScrollText className="h-4 w-4 text-teal-600 dark:text-teal-300" aria-hidden /> Professional training & certifications
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((c) => (
              <li key={c.id} className="flex flex-col rounded-2xl border hairline p-4">
                {c.image && <ImageSlot image={c.image} fit="contain" showCaption={false} className="mb-4 aspect-[4/3]" sizes="(min-width: 1024px) 280px, 50vw" />}
                <p className="font-semibold">{c.name}</p>
                {show(c.issuer) ? <p className="mt-1 text-xs muted">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p> : null}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold underline underline-offset-4">
                    Verify credential<span className="sr-only">: {c.name} (opens in a new tab)</span>
                  </a>
                )}
                <VerifyBadge note={c.verify} className="mt-2" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
