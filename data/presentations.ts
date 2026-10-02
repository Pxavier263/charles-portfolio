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
    image: { alt: "Poster presentation at ICID 2026", caption: "ICID 2026 poster", suggested: "/images/presentations/icid-2026-poster.jpg" },
    verify: "Confirm author list and whether Charles is presenting author.",
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
    image: { alt: "Oral presentation during the NICD/WCS course", caption: "NICD/WCS course — oral presentation", suggested: "/images/presentations/nicd-course-2026.jpg" },
    verify: "Confirm the WCS expansion (Wellcome Connecting Science) and the oral presentation title.",
  },
  {
    id: "cphia-2025",
    event: "4th International Conference on Public Health in Africa (CPHIA 2025)",
    organiser: "Africa CDC",
    location: "Durban, South Africa",
    date: "22–25 October 2025",
    sortDate: "2025-10-22",
    kind: "Conference participation",
    title: "[DETAIL TO BE CONFIRMED]",
    status: "delivered",
    statusLabel: "Participant · Abstract / session presentation",
    description: "Participated in CPHIA 2025 and presented an abstract/session contribution.",
    tags: ["amr", "one-health", "research"],
    image: { alt: "Charles at CPHIA 2025", caption: "CPHIA 2025", suggested: "/images/presentations/cphia-2025.jpg" },
    verify:
      "Brief said 'December 2025'; Africa CDC lists CPHIA 2025 as 22–25 Oct 2025 in Durban. Confirm, and add abstract title and presentation format.",
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
    image: { alt: "Regional review meeting, Abuja", caption: "West Africa regional review", suggested: "/images/presentations/wa-review-2025.jpg" },
    verify: "Confirm organiser and Charles' role (presenter, co-author, preparation support, or attendee).",
  },
];
