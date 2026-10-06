import type { Experience } from "@/lib/types";

/**
 * EXPERIENCE TIMELINE
 * Dates are intentionally omitted: none were supplied. Add them in `period`
 * (e.g. "2023 – Present") once confirmed. Do not estimate.
 */
export const experience: Experience[] = [
  {
    id: "dbf",
    role: "Programme & Data Officer",
    organisation: "Ducit Blue Solutions / Ducit Blue Foundation",
    period: "Nov 2025 – Present",
    current: true,
    previousTitle: "Programme Assistant (Data Analyst Expertise), promoted 1 November 2025",
    summary:
      "Coordinates and monitors AMR and public-health programmes, turning programme data into reporting and decisions.",
    responsibilities: [
      "Programme coordination",
      "Data analysis",
      "Project implementation",
      "Monitoring and evaluation",
      "Reporting",
      "Stakeholder engagement",
      "Quality assurance",
      "Workshop support",
      "Research support",
    ],
    tags: ["programme", "data", "amr", "one-health", "research", "sustainability"],
  },
  {
    id: "cop",
    role: "Chairman / Lead",
    organisation: "Nigerian Youth AMR Community of Practice",
    period: "Current",
    current: true,
    summary: "Leads a national youth network of 500+ members engaging with the AMR response.",
    responsibilities: [
      "Coordination",
      "Youth AMR engagement",
      "Partnerships",
      "National stakeholder engagement",
      "Strategic planning",
      "Advocacy",
      "Bioinformatics and data analysis support",
    ],
    tags: ["youth", "amr", "policy", "one-health", "capacity"],
  },
  {
    id: "thet",
    role: "Administrative Assistant",
    organisation: "Global Health Partnership (formerly THET) In-Country Coordinator",
    period: "[DETAIL TO BE CONFIRMED]",
    summary: "Supported the In-Country Coordinator with administration, coordination and documentation.",
    responsibilities: [
      "Global Health Workforce Programme support",
      "AMR internship activities",
      "Administration",
      "Coordination",
      "Documentation",
    ],
    tags: ["programme", "amr", "capacity"],
  },
];
