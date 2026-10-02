import type { PillarId } from "@/lib/types";

export const pillars: { id: PillarId; title: string; short: string; text: string }[] = [
  {
    id: "amr-oh",
    title: "AMR & One Health",
    short: "AMR",
    text: "Antimicrobial resistance programming, stewardship, surveillance, policy, governance and One Health engagement.",
  },
  {
    id: "data",
    title: "Data & Evidence",
    short: "Data",
    text: "Data analysis, dashboards, quantitative and qualitative analysis, monitoring, reporting and evidence translation.",
  },
  {
    id: "programmes",
    title: "Programmes",
    short: "Programmes",
    text: "Programme design, implementation, coordination, monitoring, evaluation and sustainability planning.",
  },
  {
    id: "policy",
    title: "Policy & Governance",
    short: "Policy",
    text: "Policy translation, stakeholder engagement, governance strengthening and public-health advocacy.",
  },
  {
    id: "youth",
    title: "Youth & Capacity Building",
    short: "Youth",
    text: "Mentorship programmes, internships, youth networks, professional development and knowledge translation.",
  },
];

export const journey = [
  { step: "Pharmacy", text: "Clinical training in medicines, patient safety and rational antimicrobial use." },
  { step: "Public Health", text: "A population lens: prevention, systems and equity (MSc in progress)." },
  { step: "Data Analytics", text: "The tools to measure what programmes are actually achieving." },
  { step: "Programme Implementation", text: "Coordinating, monitoring and reporting on real programmes." },
  { step: "AMR & One Health", text: "Where pharmacy, data and systems thinking meet a defining health threat." },
  { step: "Policy & Governance", text: "Translating evidence into governance action." },
  { step: "African Youth Leadership", text: "Building the next generation of AMR leaders across the continent." },
];
