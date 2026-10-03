import type { FootprintLocation } from "@/lib/types";

/**
 * PROFESSIONAL FOOTPRINT
 * `inPerson`: true = confirmed physical presence; null = not yet confirmed;
 * false = remote / programme reach only. The map never implies travel unless true.
 */
export const footprint: FootprintLocation[] = [
  {
    id: "abuja",
    country: "Nigeria",
    city: "Abuja",
    lat: 9.08,
    lon: 7.4,
    types: ["Home base", "Project Delivery", "Presentation", "Training"],
    inPerson: true,
    activities: [
      "Home base",
      "Nigerian Youth AMR Community of Practice",
      "Proposed FCT One Health / AMR pilot",
      "West Africa AMS & AMR Surveillance Regional Review (July 2025)",
      "Trinity Challenge workshop (March 2025)",
    ],
  },
  {
    id: "ghana",
    country: "Ghana",
    lat: 5.6,
    lon: -0.19,
    types: ["Project Delivery"],
    inPerson: null,
    activities: ["Sustainable Impact & AMR Toolkit: implementation and feedback analysis (2025)"],
    verify: "Confirm whether work in Ghana was in person or remote.",
  },
  {
    id: "nairobi",
    country: "Kenya",
    city: "Nairobi",
    lat: -1.29,
    lon: 36.82,
    types: ["Project Delivery", "Training"],
    inPerson: true,
    activities: [
      "Kenya Sustainable Impact & AMR Workshop (Aug 2026): attended and facilitated",
      "Sustainable Impact & AMR Toolkit feedback (2025)",
      "Science Day discussions and ICARS Africa launch",
    ],
  },
  {
    id: "johannesburg",
    country: "South Africa",
    city: "Johannesburg",
    lat: -26.2,
    lon: 28.05,
    types: ["Training", "Presentation"],
    inPerson: null,
    activities: ["AMR in Bacterial Pathogens – Africa Course, NICD/WCS (March 2026)"],
    verify: "Confirm in-person attendance.",
  },
  {
    id: "durban",
    country: "South Africa",
    city: "Durban",
    lat: -29.86,
    lon: 31.03,
    types: ["Conference"],
    inPerson: null,
    activities: ["CPHIA 2025: participation and abstract/session presentation"],
    verify: "Confirm in-person vs virtual participation.",
  },
  {
    id: "madrid",
    country: "Spain",
    city: "Madrid",
    lat: 40.42,
    lon: -3.7,
    types: ["Conference", "Presentation"],
    inPerson: null,
    upcoming: true,
    activities: ["ICID 2026: accepted poster (10–13 November 2026)"],
  },
];

export const programmeReach = {
  label: "Regional Programme reach",
  text:
    "The Pan-African Youth AMR Programme (Cohort 4) engaged participants from 14 African countries and experts across 14 countries. This is programme reach, not travel.",
  verify: "List the 14 participant countries if you want them shown on the map.",
};
