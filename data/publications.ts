import type { Publication, PublicationCategory } from "@/lib/types";

export const publicationCategories: PublicationCategory[] = [
  "Published",
  "Under Review",
  "Conference Abstracts",
  "Posters",
  "Technical Reports",
  "Policy Products",
];

export const EMPTY_PUBLICATIONS_MESSAGE =
  "Selected publications and technical outputs will be added as they become publicly available.";

/** Only confirmed outputs. Never add a journal article until it has a DOI or accepted status. */
export const publications: Publication[] = [
  {
    id: "ipc-guidelines-ke-tz-ng",
    category: "Published",
    title:
      "A comparative analysis of infection prevention and control guidelines across Kenya, Tanzania, and Nigeria",
    authors:
      "Riziki SM, Olojo MO, Chandipwisa C, … Ogu CC, Iziomo PM, Majekodunmi AO, Mbadiwe E",
    venue: "Antimicrobial Stewardship & Healthcare Epidemiology (Cambridge University Press), 6, e92",
    year: "2026",
    status: "Peer-reviewed article",
    doi: "10.1017/ash.2026.10350",
    url: "https://doi.org/10.1017/ash.2026.10350",
  },
  {
    id: "ams-preservice-readiness",
    category: "Published",
    title:
      "From classrooms to practice: does pre-service training for One Health professions provide readiness for antimicrobial stewardship?",
    authors:
      "Ade-Yusuf OR, Chikezie NC, Abdussalam BO, … Ogu CC, Iziomo PM, Majekodunmi AO, Mbadiwe E",
    venue: "BMC Medical Education, 26, 1550",
    year: "2026",
    status: "Peer-reviewed article",
    doi: "10.1186/s12909-026-09843-y",
    url: "https://doi.org/10.1186/s12909-026-09843-y",
  },
  {
    id: "icid-poster",
    category: "Posters",
    title:
      "Building Pan-African Youth Capacity for One Health AMR Action Through a Structured Internship and Mentorship Programme",
    venue: "21st International Congress on Infectious Diseases (ICID 2026), Madrid",
    year: "2026",
    status: "Accepted · to be presented November 2026",
  },
  {
    id: "wcs-genomic-amr-poster",
    category: "Posters",
    title:
      "Leveraging a digital AMR engagement platform to strengthen community awareness and generate behavioural insights relevant to antimicrobial resistance surveillance in Nigeria",
    venue:
      "Genomic Surveillance of AMR across the Human-Animal-Environmental Interface Symposium, Wellcome Connecting Science, Johannesburg",
    year: "2026",
    status: "Presented · 6–7 March 2026",
  },
  {
    id: "cphia-2025-abstract",
    category: "Conference Abstracts",
    title: "Tackling Antimicrobial Resistance (AMR) Across Borders Through Mentorship and Capacity Building",
    venue: "4th International Conference on Public Health in Africa (CPHIA 2025), Africa CDC, Durban",
    year: "2025",
    status: "Presented · October 2025",
  },
];
