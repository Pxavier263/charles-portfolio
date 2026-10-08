import type { Tag } from "@/lib/types";

/**
 * SITE CONFIGURATION & PROFILE
 * ------------------------------------------------------------------
 * Edit this file to update identity, links and site-wide switches.
 * Any link left as `null` is rendered as a clearly labelled placeholder
 * instead of a broken link.
 */

export const TBC = "[DETAIL TO BE CONFIRMED]";

export const siteConfig = {
  /**
   * REVIEW MODE — keep `true` while checking content. Items that still need
   * confirmation show a small amber "To confirm" marker and a review banner appears.
   * Set to `false` before public launch.
   */
  reviewMode: false,

  /** Public URL, used for canonical/OG. Prefer setting NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ogu-charles.vercel.app",

  /** Optional contact-form endpoint (e.g. Formspree). Empty = mailto fallback. */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",

  /** Show B.Pharm CGPA publicly? */
  showCgpa: true,
};

export const profile = {
  name: "Ogu Charles Chukwudi",
  honorific: "Pharm.",
  shortName: "Charles",
  initials: "OC",
  location: "Abuja, Nigeria",
  roles: [
    "Clinical Pharmacist",
    "Public Health Professional",
    "Programme & Data Officer",
    "Data Analyst",
    "AMR & One Health Advocate",
  ],
  footerLine: "Clinical Pharmacist | Public Health | Data | AMR | One Health",
  positioning: "Transforming data, programmes and partnerships into public-health impact.",
  centralMessage:
    "Charles works at the intersection of data, programmes, policy and people to translate evidence into meaningful public-health action.",
  heroCopy:
    "Clinical pharmacist and public-health professional working at the intersection of antimicrobial resistance, One Health, programme implementation, data analytics, policy, governance and youth engagement across Africa.",

  /** Headshot: save as /public/images/headshot.jpg (portrait, ~1000×1250 px) and set "/images/headshot.jpg" here. */
  headshot: "/images/site/headshot.jpg" as string | null,
  heroPortrait: "/images/site/hero-portrait.png" as string | null,

  /** CV: add the PDF to /public/cv/ and set the path here, e.g. "/cv/Ogu-Charles-Chukwudi-CV.pdf". */
  cvUrl: null as string | null,

  /** Contact — only publish details Charles has approved for public display. */
  email: null as string | null,

  links: {
    linkedin: "https://www.linkedin.com/in/ogucharles/" as string | null,
    orcid: "https://orcid.org/0009-0007-5440-6611" as string | null,
    googleScholar: null as string | null,
    researchGate: null as string | null,
  },
};

export const bio = {
  lead:
    "Ogu Charles Chukwudi is a Nigerian clinical pharmacist, public-health professional, data analyst and programme professional based in Abuja, Nigeria.",
  paragraphs: [
    "He holds a Bachelor of Pharmacy degree from the University of Port Harcourt, is a licensed pharmacist in Nigeria, and is currently undertaking an MSc in Public Health at Ahmadu Bello University.",
    "His work spans antimicrobial resistance, One Health, public-health programming, health systems, policy and governance, programme monitoring, data analytics, stakeholder engagement, capacity strengthening and youth engagement.",
    "He currently works as a Programme and Data Officer with Ducit Blue Solutions / Ducit Blue Foundation, where his work includes programme coordination, data analysis, project implementation, monitoring and reporting, stakeholder engagement and quality assurance. He also serves as Chairman/Lead of the Nigerian Youth AMR Community of Practice.",
  ],
  engagementIntro:
    "Through programme delivery, workshops, technical meetings and events, he has supported engagements involving national and international stakeholders, including:",
  engagementPartners: [
    "Nigeria Centre for Disease Control and Prevention",
    "Federal Ministry of Health and Social Welfare",
    "Federal Ministry of Environment",
    "World Health Organization (WHO)",
    "Africa CDC",
    "Food and Agriculture Organization (FAO)",
    "ICARS",
    "West African Health Organisation",
    "One Health Society",
    "Commonwealth Pharmacists Association / CwPAMS",
    "National Institute for Communicable Diseases (NICD)",
    "Universities, civil-society organisations and other public-health partners",
  ],
  /** Required accuracy disclaimer — keeps collaboration distinct from employment/affiliation. */
  engagementDisclaimer:
    "Organisations are listed to show the range of stakeholders involved in programmes and engagements Charles has supported. Listing does not indicate employment by, formal affiliation with, or endorsement from any organisation.",
};

export const philosophy = {
  lines: [
    "Data tells us what is happening.",
    "People help us understand why.",
    "Good programmes turn that understanding into action.",
  ],
  principles: [
    { title: "Evidence", text: "Decisions start from data that is collected well, checked, and honestly reported." },
    { title: "Collaboration", text: "Public-health problems cross sectors, so the work does too." },
    { title: "Systems thinking", text: "Human, animal and environmental health are one connected system." },
    { title: "Youth engagement", text: "Young professionals are part of today's response, not only tomorrow's." },
    { title: "Sustainability", text: "Programmes are designed with continuity and exit in mind from day one." },
    { title: "Implementation", text: "Plans matter when they are carried through, monitored and improved." },
  ],
};

/** Impact Explorer filter definitions */
export const TAGS: { id: Tag; label: string }[] = [
  { id: "amr", label: "AMR" },
  { id: "one-health", label: "One Health" },
  { id: "data", label: "Data" },
  { id: "policy", label: "Policy" },
  { id: "research", label: "Research" },
  { id: "programme", label: "Programme Management" },
  { id: "youth", label: "Youth Engagement" },
  { id: "capacity", label: "Capacity Building" },
  { id: "sustainability", label: "Sustainability" },
];

export const NAV = {
  /** Header links; the "Work with me" button is always added after these. */
  primary: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Data Lab", href: "/data-lab" },
  ],
  cta: { label: "Work with me", href: "/work-with-me" },
  footer: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/about#research" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Data Lab", href: "/data-lab" },
    { label: "Work with me", href: "/work-with-me" },
  ],
} as const;
