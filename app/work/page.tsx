import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Stories } from "@/components/sections/Stories";
import { PageHeader } from "@/components/ui/PageHeader";
import { Showcase } from "@/components/work/Showcase";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in AMR and One Health programmes: M&E, feedback analysis, sustainability facilitation and youth capacity building across Africa.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Case studies"
        intro="Filter by type, sector or skill, search, or open a quick view. Each case study shows the problem, what changed and the evidence."
      />
      <section className="band-canvas pb-20 md:pb-28" aria-label="Case studies">
        <div className="container"><Showcase /></div>
      </section>
      <Stories />
      <ClosingCTA />
    </>
  );
}
