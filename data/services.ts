import type { Tag } from "@/lib/types";

/**
 * SERVICES, AUDIENCES, PROCESS & FAQ: the "hire me" content.
 * Every service links to proof (projectIds). Edit freely; no prices are shown on the site.
 */

export const proposition = {
  headline: "I help African AMR and One Health programmes prove and sustain their impact.",
  sub: "Clinical pharmacist and Programme & Data Officer. I design monitoring, analyse programme data and facilitate sustainability planning for AMR and One Health initiatives in Nigeria, Ghana, Kenya and across Africa.",
  availability: "Available for consulting engagements and selected roles",
};

/** Shown under the hero. Only verified or supplied facts. */
export const proofStrip = [
  { value: "500+", label: "member youth AMR network led" },
  { value: "14", label: "countries in a programme I coordinated" },
  { value: "138", label: "feedback responses analysed, Ghana & Kenya" },
  { value: "ICID 2026", label: "accepted poster, Madrid" },
  { value: "PCN", label: "licensed pharmacist" },
];

export interface Audience {
  id: string;
  title: string;
  problem: string;
  help: string;
  serviceId: string;
}

export const audiences: Audience[] = [
  {
    id: "ngos",
    title: "NGOs & programme teams",
    problem: "You're running an AMR or One Health programme and need to show what it is achieving, and keep it going after funding ends.",
    help: "Monitoring frameworks, feedback analysis and sustainability planning.",
    serviceId: "me",
  },
  {
    id: "partners",
    title: "Development partners & funders",
    problem: "You want youth and communities genuinely involved in AMR work, with evidence that the investment builds capacity.",
    help: "Youth programme design, capacity building and evaluation support.",
    serviceId: "youth",
  },
  {
    id: "research",
    title: "Universities & research groups",
    problem: "You have survey or programme data that needs careful analysis, or you need a partner with reach into African youth AMR networks.",
    help: "Quantitative and thematic analysis, dashboards and research collaboration.",
    serviceId: "data",
  },
];

export interface Service {
  id: string;
  title: string;
  short: string;
  outcome: string;
  deliverables: string[];
  proof: string;
  projectIds: string[];
  tags: Tag[];
}

export const services: Service[] = [
  {
    id: "me",
    title: "Monitoring, evaluation & impact measurement",
    short: "Know what your programme is achieving, and be able to show it.",
    outcome: "A monitoring approach your team can run, and evidence your funders can trust.",
    deliverables: [
      "Indicator frameworks and monitoring plans",
      "Attendance, compliance and participation tracking",
      "Feedback and post-programme impact surveys",
      "Donor-ready programme reporting",
    ],
    proof: "Monitored the 10-week Cohort 4 programme across 25 interns from 14 countries.",
    projectIds: ["cohort-4", "sustainability-toolkit"],
    tags: ["data", "programme", "research"],
  },
  {
    id: "data",
    title: "Programme data analysis & dashboards",
    short: "Turn surveys and programme records into clear decisions.",
    outcome: "Findings, charts and dashboards that decision-makers actually read.",
    deliverables: [
      "Survey analysis (quantitative and qualitative thematic)",
      "Power BI dashboards",
      "Geospatial mapping (QGIS)",
      "Data-quality checks and cleaning (Python, SQL, SPSS, Excel)",
    ],
    proof: "Supported analysis and synthesis of 138 toolkit and workshop feedback responses from Ghana and Kenya.",
    projectIds: ["sustainability-toolkit"],
    tags: ["data", "research"],
  },
  {
    id: "sustainability",
    title: "Sustainability planning & facilitation",
    short: "Plan for continuity before the funding ends.",
    outcome: "Prioritised, owned actions for resource mobilisation, continuity and exit.",
    deliverables: [
      "Sustainability planning workshops",
      "Diagnostics and planning checklists",
      "Resource mobilisation and exit & continuity sessions",
      "Prioritised recommendations and follow-up",
    ],
    proof: "Facilitated sustainability workshop activities in Nairobi (Aug 2026).",
    projectIds: ["kenya-workshop", "sustainability-toolkit"],
    tags: ["sustainability", "programme", "capacity"],
  },
  {
    id: "youth",
    title: "Youth engagement & capacity-building design",
    short: "Build young AMR professionals who can act, not just attend.",
    outcome: "Structured internship, mentorship and network programmes with applied outputs.",
    deliverables: [
      "Internship and mentorship programme design",
      "Capstone and assessment coordination",
      "Mentor and expert engagement",
      "Youth network activation and onboarding",
    ],
    proof: "Coordinated Cohort 4 (25 interns, 20 mentors, 39 experts) and lead a 500+ member youth network.",
    projectIds: ["cohort-4", "youth-cop"],
    tags: ["youth", "capacity", "amr", "one-health"],
  },
];

export const formats = [
  { title: "Advisory call", text: "A focused review of an M&E framework, a survey tool or an evaluation plan." },
  { title: "Fixed-scope project", text: "An evaluation, a dashboard, or a feedback analysis with a clear deliverable." },
  { title: "Facilitation days", text: "Workshops, validation meetings and prioritisation sessions." },
  { title: "Ongoing support", text: "Regular M&E and data support alongside your team." },
];

export const process = [
  { step: "Understand", text: "A short call to understand your programme, data and decision." },
  { step: "Design", text: "A scoped proposal: approach, deliverables and timeline." },
  { step: "Deliver", text: "Analysis, tools or facilitation, shared early and iterated with your team." },
  { step: "Measure", text: "Evidence of what changed, and a handover your team can keep using." },
];

/** Leave `responseTime` null until you decide a reply commitment you can keep. */
export const contactConfig = {
  responseTime: null as string | null,
  /** Optional booking link, e.g. Calendly. */
  bookingUrl: null as string | null,
  /** One-page capability statement PDF in /public (e.g. "/cv/capability-statement.pdf"). */
  capabilityUrl: null as string | null,
};

export const faqs = [
  {
    q: "What happens after I get in touch?",
    a: "I'll arrange a short call to understand your programme and what you need, then send a short proposal with approach, deliverables and timeline.",
  },
  {
    q: "Do you work with organisations outside Nigeria?",
    a: "Yes. My work has included programmes in Ghana and Kenya and a Pan-African cohort with participants from 14 countries.",
  },
  {
    q: "How are fees set?",
    a: "Fees depend on scope and format. You'll get a clear quote in the proposal before any work starts.",
  },
  {
    q: "Are you open to full-time or contract roles?",
    a: "Yes. I'm open to selected roles in AMR, One Health, programme management and M&E. Download my CV or get in touch.",
  },
  {
    q: "Can you work remotely?",
    a: "[DETAIL TO BE CONFIRMED]",
  },
];
