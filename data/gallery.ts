import type { Activity } from "@/lib/types";

/**
 * ACTIVITIES & PHOTO GALLERY
 * ------------------------------------------------------------------
 * HOW TO ADD PHOTOS
 *  1. Save the photo in /public/images/activities/ (JPG or WebP, ideally ≤ 400 KB,
 *     landscape about 1600×1000 px). Use lowercase names with hyphens.
 *  2. Set `src` on the matching photo, e.g. src: "/images/activities/nairobi-workshop-1.jpg".
 *  3. Write a real `alt` text describing what is in the picture.
 *  4. Add more photos to an activity by adding more items to `photos` (the first is the cover).
 *
 * HOW TO ADD A NEW ACTIVITY
 *  Copy the TEMPLATE at the bottom, give it a unique `id`, fill it in, set enabled: true.
 *
 * RULES
 *  - Only use photos that genuinely come from the activity described.
 *  - Ask permission before publishing photos where other people are clearly identifiable,
 *    and never post photos of minors or patients.
 *  - Empty placeholders are shown only in review mode; they vanish when reviewMode is false.
 */
export const activities: Activity[] = [
  {
    id: "icid-2026",
    title: "ICID 2026: accepted poster presentation",
    date: "10–13 November 2026",
    sortDate: "2026-11-10",
    location: "Madrid, Spain",
    category: "Conference",
    upcoming: true,
    description: "Poster on building Pan-African youth capacity for One Health AMR action through structured internship and mentorship.",
    photos: [
      { alt: "Charles presenting his poster at ICID 2026", caption: "Poster presentation, ICID 2026", src: "/images/activities/icid-2026-posters.jpg" },
    ],
    enabled: true,
  },
  {
    id: "nairobi-workshop",
    title: "Kenya Sustainable Impact & AMR Workshop",
    date: "24, 25 & 28 August 2026",
    sortDate: "2026-08-24",
    location: "Nairobi, Kenya",
    category: "Workshop",
    description: "Facilitating sessions on sustainability planning, resource mobilisation, diagnostics and exit & continuity.",
    photos: [
      { alt: "Charles facilitating a workshop session in Nairobi", caption: "Workshop facilitation, Nairobi", src: "/images/activities/nairobi-workshop-1.jpg" },
      { alt: "Workshop participants in group work", caption: "Group work session, Nairobi", src: "/images/activities/nairobi-workshop-2.jpg" },
    ],
    projectId: "kenya-workshop",
    enabled: true,
  },
  {
    id: "science-day-icars",
    title: "Science Day discussions & ICARS Africa launch",
    date: "27 August 2026",
    sortDate: "2026-08-27",
    location: "Nairobi, Kenya",
    category: "Stakeholder engagement",
    description:
      "Science Day discussions and the launch of ICARS Africa, bringing together the Kenya Ministry of Health, ReAct Africa, Africa CDC, Amref and the ICARS Africa team.",
    photos: [{ alt: "ICARS Africa launch event", caption: "ICARS Africa launch", src: "/images/activities/icars-africa-launch.jpg" }],
    enabled: true,
  },
  {
    id: "cohort-4",
    title: "AMR Policy & Governance Programme: Cohort 4",
    date: "2026",
    sortDate: "2026-06",
    location: "Pan-African (programme reach)",
    category: "Programme",
    description: "Learning sessions, mentorship and capstone pitches with 25 interns from 14 African countries.",
    photos: [
      { alt: "Screenshot of a Cohort 4 learning session", caption: "Cohort 4 learning session", src: "/images/activities/cohort4-session.jpg" },
      { alt: "Capstone pitch presentations", caption: "Capstone pitches", src: "/images/activities/cohort4-capstone.jpg" },
    ],
    projectId: "cohort-4",
    enabled: true,
  },
  {
    id: "nicd-course",
    title: "AMR in Bacterial Pathogens – Africa Course",
    date: "8–13 March 2026",
    sortDate: "2026-03-08",
    location: "Johannesburg, South Africa",
    category: "Training",
    description: "Regional training course on antimicrobial resistance in bacterial pathogens (NICD / WCS), including an oral presentation.",
    photos: [
      { alt: "Course participants in Johannesburg", caption: "Course cohort, Johannesburg", src: "/images/activities/nicd-course-group.jpg" },
      { alt: "Charles giving an oral presentation", caption: "Oral presentation", src: "/images/activities/nicd-course-presentation.jpg" },
    ],
    enabled: true,
  },
  {
    id: "cphia-2025",
    title: "CPHIA 2025",
    date: "22–25 October 2025",
    sortDate: "2025-10-22",
    location: "Durban, South Africa",
    category: "Conference",
    description: "Attended in person and presented an abstract on tackling AMR across borders through mentorship and capacity building at the 4th International Conference on Public Health in Africa.",
    photos: [{ alt: "Charles at CPHIA 2025", caption: "CPHIA 2025", src: "/images/activities/cphia-20251.jpg" }],
    enabled: true,
  },
  {
    id: "wa-review",
    title: "West Africa AMS & AMR Surveillance Regional Review",
    date: "14–18 July 2025",
    sortDate: "2025-07-14",
    location: "Abuja, Nigeria",
    category: "Stakeholder engagement",
    description: "Regional review meeting where Ducit Blue Foundation presented on the role of CSOs in the AMR response.",
    photos: [{ alt: "Regional review meeting in Abuja", caption: "Regional review, Abuja", src: "/images/activities/wa-regional-review.jpg" }],
    enabled: true,
  },
  {
    id: "antibiotic-guardian",
    title: "Antibiotic Guardian Award: Ducit Blue Foundation",
    date: "June 2025",
    sortDate: "2025-06-09",
    location: "UK Health Security Agency (hybrid event)",
    category: "Award",
    description: "Ducit Blue Foundation won the Multi-country Collaboration category for its Pan-African youth AMR programme (organisational award).",
    photos: [{ alt: "Antibiotic Guardian Award certificate or trophy", caption: "Antibiotic Guardian Award 2025", src: "/images/awards/winner.jpg" }],
    enabled: true,
  },
  {
    id: "trinity-challenge",
    title: "Trinity Challenge Abuja Workshop",
    date: "19 March 2025",
    sortDate: "2025-03-19",
    location: "Abuja, Nigeria",
    category: "Workshop",
    description: "Workshop at which the Best Digital Innovative Solution recognition certificate was presented.",
    photos: [
      { alt: "Trinity Challenge workshop, Abuja", caption: "Trinity Challenge workshop", src: "/images/activities/trinity-challenge-2025.jpg" },
      { alt: "Trinity Challenge workshop participants, Abuja", caption: "Trinity Challenge workshop, Abuja", src: "/images/activities/trinity-challenge-2025-2.jpg" },
    ],
    enabled: true,
  },
  {
    id: "cop-onboarding",
    title: "Nigerian Youth AMR Community of Practice: onboarding & knowledge exchange",
    date: "Ongoing",
    sortDate: "2026-09",
    location: "Nigeria",
    category: "Community",
    description: "National onboarding and knowledge-exchange sessions with members of the 500+ youth network.",
    photos: [{ alt: "Community of Practice onboarding session", caption: "CoP onboarding session", src: "/images/activities/cop-onboarding.jpg" }],
    projectId: "youth-cop",
    enabled: true,
  },
  {
    id: "fct-pilot-engagement",
    title: "FCT One Health / AMR pilot: stakeholder engagement",
    date: "2026",
    sortDate: "2026-07",
    location: "Federal Capital Territory, Nigeria",
    category: "Stakeholder engagement",
    description: "Engagement meetings for the proposed pilot with Ducit Blue Foundation and EcoMed Nexus Foundation.",
    photos: [{ alt: "Stakeholder engagement meeting for the FCT pilot", caption: "Pilot stakeholder engagement", src: "/images/activities/fct-pilot-engagement.jpg" }],
    projectId: "fct-pilot",
    enabled: true,
  },

  /* ---------------------------------------------------------------
   * TEMPLATE: copy, fill in, set enabled: true
   * ---------------------------------------------------------------
  {
    id: "unique-id",
    title: "Activity title",
    date: "12 May 2026",
    sortDate: "2026-05-12",
    location: "City, Country",
    category: "Workshop", // Workshop | Conference | Training | Programme | Community | Award | Stakeholder engagement
    description: "One or two sentences on what happened and your role.",
    photos: [
      { src: "/images/activities/your-photo.jpg", alt: "What the photo shows", caption: "Short caption" },
    ],
    projectId: undefined, // optional: id from projects.ts
    enabled: true,
  },
  */
];
