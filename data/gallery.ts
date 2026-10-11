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
    id: "comwatch-stakeholder-meeting",
    title: "Com-WATCH Baseline Findings: Stakeholder Meeting",
    date: "24 September 2026",
    sortDate: "2026-09-24",
    location: "Nigeria",
    category: "Stakeholder engagement",
    description:
      "Stakeholder meeting convened with the Nigeria Centre for Disease Control and Prevention and Jhpiego to review baseline findings from Com-WATCH, a project using digital community reporting of suspected substandard and falsified antibiotics, alongside Nigeria's wider AMR surveillance priorities and plans for the 5th High-Level Ministerial Conference on AMR.",
    photos: [
      {
        alt: "Group photo of participants at the Com-WATCH stakeholder meeting, with Com-WATCH and Jhpiego banners on either side",
        caption: "Com-WATCH stakeholder meeting",
        src: "/images/activities/comwatch-stakeholder-meeting-2026.jpg",
      },
    ],
    enabled: true,
  },
  {
    id: "nicade-amr-dialogue",
    title: "NiCaDe AMR Stakeholder Dialogue: Hub-and-Spoke Model for Surveillance and Stewardship",
    date: "9–10 July 2026",
    sortDate: "2026-07-09",
    location: "Abuja, Nigeria",
    category: "Workshop",
    description:
      "Two-day dialogue convened by the Nigeria Centre for Disease Control and Prevention with the Robert Koch Institute, reviewing ten years of AMR surveillance in Nigeria and shaping a hub-and-spoke model for AMR surveillance, diagnostic stewardship and antimicrobial use. Attended as part of Ducit Blue Solutions, whose support for the National Antimicrobial Stewardship Essay Competition was acknowledged at the event.",
    photos: [
      {
        alt: "Group photo of workshop participants beside the Implementing Sustainable Stewardship Programmes banner, Abuja",
        caption: "Stakeholder dialogue participants, Abuja",
        src: "/images/activities/nicade-amr-dialogue-2026-group.jpg",
      },
      {
        alt: "Participants in a small-group discussion around a table during the stakeholder dialogue",
        caption: "Group work session",
        src: "/images/activities/nicade-amr-dialogue-2026-session.jpg",
      },
    ],
    enabled: true,
  },
  {
    id: "nap2-development-workshops",
    title: "Nigeria AMR National Action Plan 2.0: development workshops",
    date: "August to November 2023",
    sortDate: "2023-11-06",
    location: "Akwanga (Nasarawa State) and Abuja, Nigeria",
    category: "Workshop",
    description:
      "Contributed, with Ducit Blue Foundation, to the multisectoral workshops that developed Nigeria's One Health AMR National Action Plan 2.0 (2024–2028): stakeholder mapping (virtual), situational analysis and SWOT, strategic and operational planning with M&E, and budgeting and costing. Listed among contributors in Annex 2 of the published plan.",
    photos: [
      {
        alt: "Participants holding certificates at the AMR NAP 2.0 budgeting and costing workshop in Abuja, in front of the workshop banner",
        caption: "Budgeting & costing workshop, Abuja, November 2023",
        src: "/images/activities/nap2-costing-2023.jpg",
      },
      {
        alt: "Group photo of participants at the AMR NAP 2.0 situational analysis and SWOT workshop in Akwanga, Nasarawa State",
        caption: "Situational analysis & SWOT workshop, Akwanga, September 2023",
        src: "/images/activities/nap2-situational-analysis-2023.jpg",
        fit: "contain",
      },
      {
        alt: "Group photo of participants at the AMR NAP 2.0 strategic plan, operational plan and M&E workshop in Abuja",
        caption: "Strategic plan, operational plan & M&E workshop, Abuja, October 2023",
        src: "/images/activities/nap2-strategic-plan-2023.jpg",
        fit: "contain",
      },
    ],
    projectId: "nigeria-amr-nap-2",
    enabled: true,
  },
  {
    id: "cwpams-closeout-2025",
    title: "CwPAMS 2.5 Nigeria Close-Out & Sustainability Event",
    date: "10 December 2025",
    sortDate: "2025-12-10",
    location: "Abuja, Nigeria",
    category: "Stakeholder engagement",
    description:
      "Close-out of the Commonwealth Partnerships for Antimicrobial Stewardship (CwPAMS 2.5) in Nigeria, organised by Ducit Blue Solutions with Global Health Partnerships and the Commonwealth Pharmacists Association. The five Nigerian Health Partnerships, national agencies and partners reviewed results and agreed how to sustain antimicrobial stewardship beyond the funding period.",
    photos: [
      {
        alt: "Group photo of participants at the CwPAMS 2.5 Nigeria Close-Out and Sustainability Event in Abuja, in front of the event banners",
        caption: "CwPAMS 2.5 close-out, Abuja",
        src: "/images/activities/cwpams-closeout-2025.jpg",
      },
    ],
    enabled: true,
  },
  {
    id: "cwpams2-sharing-learning",
    title: "CwPAMS 2 Nigeria Sharing & Learning Event",
    date: "March 2025",
    sortDate: "2025-03",
    location: "Nigeria",
    category: "Stakeholder engagement",
    description:
      "National event marking the end of CwPAMS 2, held with the Nigeria Centre for Disease Control and Prevention and the Pharmaceutical Society of Nigeria, with in-country coordination by Ducit Blue Solutions. The five Health Partnerships shared their results and five pharmacists graduated from the Africa Leadership Fellowship in antimicrobial stewardship.",
    photos: [
      {
        alt: "Participants standing beneath the CwPAMS 2 Grant Nigeria Sharing and Learning Event banner",
        caption: "CwPAMS 2 sharing & learning event",
        src: "/images/activities/cwpams2-sharing-learning-2025.jpg",
      },
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
