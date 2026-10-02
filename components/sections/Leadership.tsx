import { Users } from "lucide-react";
import { projects } from "@/data/projects";
import { NetworkViz } from "../viz/NetworkViz";
import { sitePhotos } from "@/data/photos";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Leadership() {
  const cop = projects.find((p) => p.id === "youth-cop")!;
  return (
    <Section
      id="leadership"
      tone="tint"
      eyebrow="Leadership"
      title="Chairman, Nigerian Youth AMR Community of Practice"
      intro="Organising young people across disciplines so that youth engagement lines up with the national AMR response."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-600 text-white dark:bg-teal-400 dark:text-ink-950">
              <Users className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-serif text-4xl">500+</p>
              <p className="text-sm muted">active members nationally</p>
            </div>
          </div>
          <h3 className="mt-8 font-sans text-sm font-semibold">What the network does</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              "National onboarding",
              "Knowledge exchange",
              "AMR awareness",
              "Youth advocacy",
              "One Health engagement",
              "Collaboration discussions with national stakeholders",
            ].map((x) => (
              <li key={x} className="flex gap-2 text-sm"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" aria-hidden />{x}</li>
            ))}
          </ul>
          <h3 className="mt-8 font-sans text-sm font-semibold">Charles&apos; leadership focus</h3>
          <p className="mt-2 text-sm leading-relaxed muted">{cop.role.slice(1).join(" · ")}</p>
        </Reveal>
        <Reveal className="space-y-6">
          <ImageSlot image={sitePhotos.leadership} className="aspect-[16/9]" sizes="(min-width: 1024px) 640px, 100vw" />
          <div className="card p-6 md:p-8"><NetworkViz /></div>
        </Reveal>
      </div>
    </Section>
  );
}
