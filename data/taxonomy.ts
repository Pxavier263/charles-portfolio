import type { ProjectType, Sector } from "@/lib/types";

/** Filter facets for the work showcase. Add a value here before using it in projects.ts. */
export const PROJECT_TYPES: ProjectType[] = [
  "Capacity-building programme",
  "Evaluation & analysis",
  "Workshop & facilitation",
  "Pilot design",
  "Network leadership",
];

export const SECTORS: Sector[] = [
  "Global health & AMR",
  "One Health",
  "Environmental health",
  "Education & youth development",
  "International development",
];

/** Human-readable label for each kind of before/after comparison — shown on the slider. */
export const BEFORE_AFTER_NOTE = {
  design: "What the work is designed to change — not a measured result.",
  output: "Starting point and what the work produced.",
  plan: "Current situation and the proposed plan. No outcomes yet.",
  measured: "Measured before and after.",
} as const;
