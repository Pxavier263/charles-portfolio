import type { Metric } from "@/lib/types";

/**
 * IMPACT SNAPSHOT METRICS
 * ------------------------------------------------------------------
 * All figures were supplied by Charles (programme records) — see CONTENT_TO_VERIFY.md.
 * Items marked `updatePeriodically: true` change over time: refresh them and
 * update `lastUpdated` at least once per quarter.
 */
export const metrics: Metric[] = [
  {
    id: "cop-members",
    value: 500,
    suffix: "+",
    label: "Youth members",
    context: "within the Nigerian Youth AMR Community of Practice network",
    tags: ["youth", "amr", "capacity"],
    updatePeriodically: true,
    lastUpdated: "2026-09",
    verify: "Confirm current membership count and date of count.",
  },
  {
    id: "c4-countries",
    value: 14,
    label: "African countries",
    context: "represented in the 2026 AMR Policy & Governance Programme cohort (Cohort 4)",
    tags: ["youth", "policy", "one-health"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-participants",
    value: 25,
    label: "Youth participants",
    context: "in Cohort 4 of the Pan-African AMR programme",
    tags: ["youth", "capacity", "amr"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-hours",
    value: 72,
    suffix: "+",
    label: "Hours of learning",
    context: "structured learning delivered through Cohort 4 (approximate)",
    tags: ["capacity", "programme"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-sessions",
    value: 40,
    label: "Learning sessions",
    context: "delivered across the 10-week Cohort 4 programme (approximate)",
    tags: ["capacity", "programme"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-mentors",
    value: 20,
    label: "Mentors",
    context: "supporting Cohort 4 participants",
    tags: ["youth", "capacity"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-experts",
    value: 39,
    label: "Technical experts",
    context: "engaged across Cohort 4 sessions",
    tags: ["one-health", "policy", "capacity"],
    lastUpdated: "2026-09",
  },
  {
    id: "c4-orgs",
    value: 35,
    label: "Organisations",
    context: "represented by participating experts, across 14 countries (approximate)",
    tags: ["one-health", "policy"],
    lastUpdated: "2026-09",
  },
];
