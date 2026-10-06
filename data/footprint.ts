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
      "Science Day discussions and ICARS Africa launch (27 Aug 2026)",
    ],
  },
  {
    id: "johannesburg",
    country: "South Africa",
    city: "Johannesburg",
    lat: -26.2,
    lon: 28.05,
    types: ["Training", "Presentation"],
    inPerson: true,
    activities: [
      "Genomic Surveillance of AMR Symposium, Wellcome Connecting Science: poster presentation (6–7 March 2026)",
      "AMR in Bacterial Pathogens – Africa Course, NICD/WCS (March 2026)",
    ],
  },
  {
    id: "durban",
    country: "South Africa",
    city: "Durban",
    lat: -29.86,
    lon: 31.03,
    types: ["Conference", "Presentation"],
    inPerson: true,
    activities: ["CPHIA 2025: abstract presentation (Oct 2025)"],
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
  /** Participant countries, plotted at an approximate country centre (not a city). */
  countries: [
    { country: "Botswana", lat: -22.3, lon: 24.0 },
    { country: "Cameroon", lat: 5.7, lon: 12.4 },
    { country: "Egypt", lat: 26.5, lon: 30.0 },
    { country: "Ethiopia", lat: 8.6, lon: 39.6 },
    { country: "Ghana", lat: 7.9, lon: -1.0 },
    { country: "Kenya", lat: 0.2, lon: 37.9 },
    { country: "Malawi", lat: -13.3, lon: 34.3 },
    { country: "Nigeria", lat: 9.6, lon: 8.1 },
    { country: "Rwanda", lat: -2.0, lon: 29.9 },
    { country: "Senegal", lat: 14.4, lon: -14.5 },
    { country: "South Africa", lat: -29.0, lon: 24.7 },
    { country: "Tanzania", lat: -6.4, lon: 34.9 },
    { country: "Uganda", lat: 1.3, lon: 32.4 },
    { country: "Zambia", lat: -13.5, lon: 27.8 },
  ],
};
