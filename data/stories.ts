import type { Story } from "@/lib/types";

/** Short impact narratives. Keep every claim traceable to data in projects.ts. */
export const stories: Story[] = [
  {
    id: "youth-capacity",
    title: "Building African youth capacity",
    lede: "25 young professionals. 14 countries. One governance question.",
    body:
      "Cohort 4 paired structured learning from 39 technical experts with mentorship and an applied capstone. Each intern worked towards an AMR Youth Governance Innovation Dossier: a governance diagnostic, a policy translation product, an implementation plan and a pitch. Charles coordinated the programme's monitoring, capstone process and reviewer panel.",
    projectId: "cohort-4",
    tags: ["youth", "capacity", "policy", "amr"],
  },
  {
    id: "feedback-tools",
    title: "Turning feedback into better tools",
    lede: "138 responses, analysed for what to keep and what to fix.",
    body:
      "Feedback from 80 toolkit users and 58 workshop participants in Ghana and Kenya was analysed to understand how the sustainability tools were working. Technical content was rated highly (97.8% in Ghana, 94.4% in Kenya), while ease of use (81.8% and 80.5%) showed where the tools could be simpler. That synthesis became recommendations for improving them.",
    projectId: "sustainability-toolkit",
    tags: ["data", "sustainability", "research"],
  },
  {
    id: "youth-national",
    title: "Connecting youth to national AMR structures",
    lede: "A 500+ member network looking outward.",
    body:
      "As Chairman of the Nigerian Youth AMR Community of Practice, Charles leads onboarding, knowledge exchange and collaboration discussions with national stakeholders, so that youth engagement is organised around the same themes as the national AMR response.",
    projectId: "youth-cop",
    tags: ["youth", "policy", "one-health"],
    verify: "Add named outcomes of stakeholder engagement once they can be shared publicly.",
  },
  {
    id: "data-decisions",
    title: "From data to decisions",
    lede: "Attendance logs, survey ratings and stakeholder notes are all evidence.",
    body:
      "Across his work, Charles uses routine programme data (attendance and compliance records, feedback surveys and monitoring indicators) to support monitoring, reporting and programme decisions.",
    tags: ["data", "programme"],
  },
];
