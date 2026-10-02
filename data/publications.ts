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
    id: "icid-poster",
    category: "Posters",
    title:
      "Building Pan-African Youth Capacity for One Health AMR Action Through a Structured Internship and Mentorship Programme",
    authors: "[DETAIL TO BE CONFIRMED]",
    venue: "21st International Congress on Infectious Diseases (ICID 2026), Madrid",
    year: "2026",
    status: "Accepted · to be presented November 2026",
    verify: "Add the author list as it appears on the acceptance.",
  },
];
