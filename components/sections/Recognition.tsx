import { Award, ExternalLink } from "lucide-react";
import { achievements } from "@/data/achievements";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { VerifyBadge } from "../ui/VerifyBadge";
import { show } from "@/lib/content";

const recipientLabel = { organisation: "Organisational award", individual: "Individual recognition", team: "Team recognition", "to-confirm": "Recognition" };

export function Recognition() {
  const list = achievements.filter((a) => a.enabled);
  return (
    <Section id="recognition" eyebrow="Recognition" title="Recognition" tone="tint">
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06} className={i === 0 ? "min-w-0 md:col-span-2" : "min-w-0"}>
            <article className={`card flex h-full flex-col overflow-hidden ${i === 0 ? "md:grid md:grid-cols-[1.4fr_1fr]" : ""}`}>
              {i !== 0 && a.image && <ImageSlot image={a.image} className="m-4 mb-0 aspect-[16/9]" sizes="(min-width: 768px) 560px, 100vw" />}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 pill-plan gap-1.5">
                    <Award className="h-3.5 w-3.5" aria-hidden /> {recipientLabel[a.recipientType]}
                  </span>
                  <span className="text-xs muted">{a.date}</span>
                  <VerifyBadge note={a.verify} />
                </div>
                <h3 className={`mt-4 font-medium leading-snug ${i === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>{a.title}</h3>
                <p className="mt-1 text-sm font-medium text-teal-700 dark:text-teal-300">{a.awardingBody}</p>
                {a.recipientType === "organisation" && show(a.recipient) && <p className="mt-3 text-sm"><span className="font-semibold">Recipient:</span> {a.recipient}</p>}
                <p className="mt-3 text-sm leading-relaxed muted">{a.description}</p>
                {a.sourceUrl && (
                  <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-teal-500 underline-offset-4">
                    View official announcement <ExternalLink className="h-3.5 w-3.5" aria-hidden /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
              {i === 0 && a.image && <ImageSlot image={a.image} className="m-4 min-h-[220px] md:m-6" sizes="(min-width: 768px) 480px, 100vw" />}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
