import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Focus } from "@/components/sections/Focus";
import { Footprint } from "@/components/sections/Footprint";
import { Leadership } from "@/components/sections/Leadership";
import { Presentations } from "@/components/sections/Presentations";
import { Recognition } from "@/components/sections/Recognition";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, experience, leadership, education, presentations, recognition and activities of Pharm. Ogu Charles Chukwudi, clinical pharmacist and Programme & Data Officer in Abuja, Nigeria.",
  alternates: { canonical: "/about" },
};

const JUMP = [
  ["Story", "#about"],
  ["Experience", "#experience"],
  ["Leadership", "#leadership"],
  ["Education", "#education"],
  ["Recognition", "#recognition"],
  ["Presentations", "#presentations"],
  ["Research", "#research"],
  ["Footprint", "#footprint"],
  ["Activities", "#activities"],
  ["Toolkit", "#skills"],
  ["Now", "#focus"],
] as const;

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About Ogu Charles Chukwudi</h1>
      <div className="pt-16" />
      <nav aria-label="On this page" className="sticky top-16 z-30 border-b hairline bg-[rgb(var(--bg)/0.9)] backdrop-blur-md">
        <ul className="container flex gap-1 overflow-x-auto py-2.5 text-sm">
          {JUMP.map(([label, href]) => (
            <li key={href}><a href={href} className="block whitespace-nowrap rounded-full px-3 py-1.5 font-medium hover:bg-[rgb(var(--tint))] hover:text-teal-700 dark:hover:text-teal-300">{label}</a></li>
          ))}
        </ul>
      </nav>
      <About />
      <Experience />
      <Leadership />
      <Education />
      <Recognition />
      <Presentations />
      <Research />
      <Footprint />
      <Activities />
      <Skills />
      <Focus />
      <ClosingCTA title="Like what you see? Let's work together." />
    </>
  );
}
