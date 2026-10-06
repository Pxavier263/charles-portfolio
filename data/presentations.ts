import type { Presentation } from "@/lib/types";

/**
 * PRESENTATIONS & PROFESSIONAL ENGAGEMENTS
 * Newest first by `sortDate`. Use `status` to distinguish upcoming from delivered.
 */
export const presentations: Presentation[] = [
  {
    id: "icid-2026",
    event: "21st International Congress on Infectious Diseases (ICID 2026)",
    organiser: "International Society for Infectious Diseases (ISID)",
    location: "Madrid, Spain",
    date: "10–13 November 2026",
    sortDate: "2026-11-10",
    kind: "Poster",
    title:
      "Building Pan-African Youth Capacity for One Health AMR Action Through a Structured Internship and Mentorship Programme",
    status: "upcoming",
    statusLabel: "Upcoming · Accepted poster",
    description:
      "Accepted poster presenting the structured internship and mentorship model used to build Pan-African youth capacity for One Health AMR action.",
    tags: ["amr", "one-health", "youth", "capacity", "research"],
    image: { alt: "Poster presentation at ICID 2026", caption: "ICID 2026 poster", src: "/images/presentations/icid-2026-poster.jpg" },
  },
  {
    id: "nicd-course-2026",
    event: "AMR in Bacterial Pathogens – Africa Course",
    organiser: "NICD / Wellcome Connecting Science (WCS)",
    location: "Johannesburg, South Africa",
    date: "8–13 March 2026",
    sortDate: "2026-03-08",
    kind: "Course participation",
    status: "attended",
    statusLabel: "Participant",
    description:
      "Participated in an intensive regional course on antimicrobial resistance in bacterial pathogens, including an oral presentation.",
    tags: ["amr", "research", "capacity"],
    image: { alt: "Oral presentation during the NICD/WCS course", caption: "NICD/WCS course", src: "/images/presentations/nicd-course-2026.jpg" },
  },
  {
    id: "wcs-genomic-amr-2026",
    event: "Genomic Surveillance of AMR across the Human-Animal-Environmental Interface Symposium",
    organiser: "Wellcome Connecting Science",
    location: "Johannesburg, South Africa",
    date: "6–7 March 2026",
    sortDate: "2026-03-06",
    kind: "Poster",
    title:
      "Leveraging a digital AMR engagement platform to strengthen community awareness and generate behavioural insights relevant to antimicrobial resistance surveillance in Nigeria",
    status: "delivered",
    statusLabel: "Poster presented",
    description:
      "Presented a poster on how a digital AMR engagement platform can raise community awareness in Nigeria and generate behavioural insights that inform AMR surveillance.",
    tags: ["amr", "one-health", "research"],
    image: {
      alt: "Charles presenting his poster at the Genomic Surveillance of AMR Symposium, Johannesburg",
      caption: "Genomic Surveillance of AMR Symposium: poster presentation",
      src: "/images/presentations/wcs-genomic-amr-2026.jpg",
    },
  },
  {
    id: "cphia-2025",
    event: "4th International Conference on Public Health in Africa (CPHIA 2025)",
    organiser: "Africa CDC",
    location: "Durban, South Africa",
    date: "22–25 October 2025",
    sortDate: "2025-10-22",
    kind: "Conference participation",
    title: "Tackling Antimicrobial Resistance (AMR) Across Borders Through Mentorship and Capacity Building",
    status: "delivered",
    statusLabel: "Abstract presented",
    description: "Presented an abstract on tackling AMR across borders through mentorship and capacity building.",
    tags: ["amr", "one-health", "research"],
    image: { alt: "Charles at CPHIA 2025", caption: "CPHIA 2025", src: "/images/presentations/cphia-2025.jpg" },
  },
  {
    id: "wa-review-2025",
    event: "West Africa AMS & AMR Surveillance Regional Review",
    location: "Abuja, Nigeria",
    date: "14–18 July 2025",
    sortDate: "2025-07-14",
    kind: "Organisational presentation",
    title: "Role of CSOs in AMR Response",
    status: "delivered",
    statusLabel: "Ducit Blue Foundation presentation",
    description:
      "Ducit Blue Foundation presented on the role of civil-society organisations in the AMR response. Charles' specific involvement is to be confirmed.",
    tags: ["amr", "policy"],
    image: { alt: "Regional review meeting, Abuja", caption: "West Africa regional review", src: "/images/presentations/wa-review-2025.jpg" },
  },
];
