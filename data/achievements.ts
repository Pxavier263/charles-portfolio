import type { Achievement } from "@/lib/types";

/**
 * RECOGNITION
 * `recipientType` must stay accurate: organisational awards are never presented
 * as personal awards. Use `enabled: false` to hide an entry without deleting it.
 */
export const achievements: Achievement[] = [
  {
    id: "antibiotic-guardian-2025",
    title: "2025 Antibiotic Guardian Award — Winner, Multi-Country Collaboration category",
    awardingBody: "Antibiotic Guardian campaign, UK Health Security Agency",
    date: "June 2025",
    recipient: "Ducit Blue Foundation",
    recipientType: "organisation",
    description:
      "Awarded to Ducit Blue Foundation for its Pan-African AMR One Health Internship & Mentorship Programme. This is an organisational award; Charles contributes to the programme through his role at the Foundation.",
    enabled: true,
    sourceUrl: "https://antibioticguardian.com/ag-awards-winners-2025/",
    tags: ["amr", "one-health", "youth", "capacity"],
    image: { alt: "Antibiotic Guardian Award 2025", caption: "Award — Antibiotic Guardian 2025", suggested: "/images/awards/antibiotic-guardian-2025.jpg" },
  },
  {
    id: "trinity-2025",
    title: "Best Digital Innovative Solution",
    awardingBody: "Trinity Challenge Abuja Workshop",
    date: "19 March 2025",
    recipient: "[DETAIL TO BE CONFIRMED]",
    recipientType: "to-confirm",
    description: "Recognition certificate presented during the Trinity Challenge workshop in Abuja.",
    enabled: true,
    tags: ["data", "research"],
    image: { alt: "Best Digital Innovative Solution certificate", caption: "Certificate — Trinity Challenge 2025", suggested: "/images/awards/trinity-challenge-2025.jpg" },
    verify: "Confirm whether the recognition was to Charles individually or to a team, and the solution's name.",
  },
  {
    id: "nicd-oral-2026",
    title: "Oral Presentation Recognition",
    awardingBody: "NICD / WCS AMR in Bacterial Pathogens – Africa Course",
    date: "March 2026",
    recipient: "Ogu Charles Chukwudi",
    recipientType: "individual",
    description: "Recognised for an oral presentation during the course in Johannesburg.",
    /** Set to false to hide this entry if it cannot be confirmed. */
    enabled: true,
    tags: ["amr", "research"],
    image: { alt: "Oral presentation recognition", caption: "Recognition — NICD/WCS course", suggested: "/images/awards/nicd-oral-2026.jpg" },
    verify: "Confirm exact wording of the recognition (e.g. 'Best Oral Presentation') and supporting evidence.",
  },
];
