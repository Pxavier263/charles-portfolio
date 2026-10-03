import { CalendarDays, MapPin } from "lucide-react";
import { presentations } from "@/data/presentations";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { VerifyBadge } from "../ui/VerifyBadge";
import { show } from "@/lib/content";
import { ImageSlot } from "../ui/ImageSlot";
import { sitePhotos } from "@/data/photos";

const tone = {
  upcoming: "pill-next",
  delivered: "pill-done",
  attended: "pill-live",
};

export function Presentations() {
  const list = [...presentations].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return (
    <Section id="presentations" eyebrow="Research & presentations" title="Selected presentations and professional engagements">
      <ImageSlot image={sitePhotos.speaking} className="mb-8 aspect-[21/9]" sizes="(min-width: 1024px) 1200px, 100vw" />
      <ol className="grid gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 2) * 0.06} className={`card flex h-full min-w-0 flex-col p-6 md:p-7 ${p.status === "upcoming" ? "ring-1 ring-orange-400/60" : ""}`}>
              {p.image && <ImageSlot image={p.image} className="mb-5 aspect-[16/9]" sizes="(min-width: 768px) 560px, 100vw" />}
              <div className="flex flex-wrap items-center gap-2">
                <span className={tone[p.status]}>{p.statusLabel}</span>
                <span className="chip">{p.kind}</span>
                <VerifyBadge note={p.verify} />
              </div>
              <h3 className="mt-4 text-xl font-medium leading-snug">{p.event}</h3>
              {p.organiser && <p className="mt-1 text-sm muted">{p.organiser}</p>}
              {show(p.title) && (
                <p className="mt-4 border-l-2 border-teal-500 pl-4 font-serif text-lg italic leading-snug">&ldquo;{p.title}&rdquo;</p>
              )}
              <p className="mt-4 text-sm leading-relaxed muted">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5 text-sm">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-teal-600 dark:text-teal-300" aria-hidden />{p.date}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-teal-600 dark:text-teal-300" aria-hidden />{p.location}</span>
              </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
