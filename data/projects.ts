import type { Project, ProjectStat } from "@/lib/types";
import { TBC } from "@/data/profile";

/**
 * PROJECTS / CASE STUDIES
 * ------------------------------------------------------------------
 * Wording rule: describe Charles' contribution precisely and never claim outcomes
 * that have not been documented. Use `TBC` for anything unknown, and add a `verify`
 * note so it appears in review mode.
 */

/** Toolkit feedback figures (2025) as supplied from the feedback analysis. */
export const toolkitSamples = {
  toolkit: { total: 80, ghana: 44, kenya: 36 },
  workshop: { total: 58, ghana: 26, kenya: 32 },
};

export const toolkitResults: (ProjectStat & { base: "toolkit" | "workshop" })[] = [
  { label: "Technical content rated Very Good / Good", ghana: 97.8, kenya: 94.4, base: "toolkit" },
  { label: "Ease of use rated Easy / Very Easy", ghana: 81.8, kenya: 80.5, base: "toolkit" },
  { label: "Workshop rated Very Useful / Useful", ghana: 100, kenya: 100, base: "workshop" },
  { label: "Confident to apply the tools", ghana: 96.2, kenya: 97, base: "workshop" },
];

export const cohortPipeline = [
  { step: "Recruitment", text: "Open call and selection of 25 interns from 14 African countries" },
  { step: "Learning", text: "≈72 hours across ≈40 structured sessions with 39 technical experts" },
  { step: "Mentorship", text: "20 mentors guiding interns through the 10-week programme" },
  { step: "Capstone", text: "AMR Youth Governance Innovation Dossier, reviewed and pitched" },
  { step: "Alumni", text: "Graduates continue as programme alumni" },
  { step: "Policy / Advocacy Action", text: "Intended outcome: alumni apply governance learning in national and regional AMR work" },
];

export const copWorkingGroups = [
  "Governance & Coordination",
  "Antimicrobial Stewardship",
  "Surveillance & Laboratory",
  "IPC / WASH / Vaccines",
  "Research & Development",
  "Awareness & Advocacy",
  "One Health Engagement",
];

export const projects: Project[] = [
  {
    id: "nigeria-amr-nap-2",
    cover: {
      alt: "Workshop participants in front of the AMR NAP 2.0 Workshop 3 banner (Strategic and Operational Plan and M&E Framework) in Abuja",
      caption: "AMR NAP 2.0 Workshop 3: Strategic and Operational Plan & M&E Framework, Abuja, October 2023",
      src: "/images/projects/nap2-workshop3-cover.jpg",
    },
    type: "Policy development",
    sectors: ["Global health & AMR", "One Health"],
    skills: ["Policy development", "Stakeholder engagement", "Strategic planning", "M&E design", "Costing"],
    beforeAfter: {
      kind: "output",
      before: {
        label: "NAP 1.0 (2017–2023)",
        text: "Nigeria's first AMR plan ended with gaps in governance, funding and implementation at state level, and no dedicated governance objective.",
      },
      after: {
        label: "NAP 2.0 (2024–2028)",
        text: "A costed One Health plan with a new governance objective, an operational plan of 451 sub-activities and a monitoring and evaluation framework.",
      },
    },
    homeOrder: 2,
    credit:
      "Led by NCDC and Nigeria's One Health ministries with support from WHO, FAO, WOAH and UNEP. Charles contributed as a workshop participant representing Ducit Blue Foundation.",
    headline: { value: "6 · 451", label: "objectives · costed sub-activities" },
    related: ["youth-cop", "cohort-4"],
    title: "Nigeria's One Health AMR National Action Plan 2.0 (2024–2028)",
    shortTitle: "National Action Plan on AMR 2.0",
    year: "2024",
    status: "completed",
    organisations: [
      "Nigeria Centre for Disease Control and Prevention (NCDC)",
      "Federal Ministries of Agriculture and Food Security, Environment, and Health and Social Welfare",
    ],
    scope: "National, Nigeria · Development workshops August to November 2023 · Published April 2024",
    summary:
      "Nigeria's five-year, costed One Health plan for tackling antimicrobial resistance across human, animal, plant and environmental health. Charles contributed through the multisectoral development workshops.",
    challenge:
      "Nigeria ranks 19th of 204 countries for age-standardised AMR mortality, with 64,500 deaths attributable to AMR in 2019. The first national plan left gaps in governance, funding and state-level implementation that the new plan had to close.",
    role: [
      "Represented Ducit Blue Foundation in the national NAP 2.0 development workshops",
      "Took part in stakeholder mapping, the situational and SWOT analysis, strategic and operational planning with M&E, and budgeting and costing",
      "Listed among contributors in Annex 2 of the published plan",
      "Took part in the August 2025 Smart Choice Process workshop in Lagos, which prioritised 18 of the plan's activities for implementation",
    ],
    approach: [
      "Review of NAP 1.0 and a One Health situational analysis of AMR in Nigeria",
      "Stakeholder mapping: 145 stakeholder groups mapped by interest and influence",
      "SWOT analysis and prioritisation of 157 recommendations across six strategic objectives",
      "Strategic and operational planning with a monitoring and evaluation framework",
      "Costing every sub-activity with the WHO NAP Costing and Budgeting Tool",
    ],
    collaborators: [
      "Nigeria Centre for Disease Control and Prevention",
      "Federal Ministries of Agriculture and Food Security, Environment, and Health and Social Welfare",
      "WHO, FAO, WOAH and UNEP",
      "USAID MTaPS and the One Health Trust",
      "Academia, regulators, professional councils, civil society and the private sector",
    ],
    outputs: [
      "Published national plan: 6 strategic objectives, 40 intervention areas, 143 activities and 451 costed sub-activities",
      "Monitoring and evaluation framework with impact and outcome indicators",
      "Indicative five-year budget of ₦62.3 billion (USD 77.6 million)",
    ],
    impact: [
      "The plan sets Nigeria's national AMR priorities across the One Health sectors for 2024 to 2028.",
      "Progress will be measured through the plan's mid-term and end-term evaluations; no implementation results are claimed here.",
    ],
    methods: ["Stakeholder mapping", "SWOT analysis", "Strategic and operational planning", "M&E framework design", "Costing"],
    facts: [
      { label: "Published", value: "April 2024" },
      { label: "Period", value: "2024–2028" },
      { label: "Scope", value: "6 objectives · 451 sub-activities" },
      { label: "Budget", value: "USD 77.6 million (indicative)" },
    ],
    document: {
      label: "Read the plan (NCDC, PDF)",
      href: "https://ncdc.gov.ng/themes/common/files/establishment/1f38432a65b71d397a2384dee3d87bd3.pdf",
    },
    tags: ["amr", "one-health", "policy"],
    pillars: ["policy", "amr-oh"],
    media: [
      { alt: "Group photo at the AMR NAP 2.0 situational analysis and SWOT workshop in Akwanga, Nasarawa State", caption: "Situational analysis & SWOT workshop, Akwanga, September 2023", src: "/images/activities/nap2-situational-analysis-2023.jpg", fit: "contain" },
      { alt: "Group photo at the AMR NAP 2.0 strategic plan, operational plan and M&E workshop in Abuja", caption: "Strategic & operational plan workshop, Abuja, October 2023", src: "/images/activities/nap2-strategic-plan-2023.jpg", fit: "contain" },
    ],
  },
  {
    id: "cohort-4",
    cover: { alt: "Cohort 4 participants and mentors", caption: "Cohort 4 cover photo", src: "/images/projects/cohort-4-cover.jpg" },
    type: "Capacity-building programme",
    sectors: ["Global health & AMR", "One Health", "Education & youth development"],
    skills: ["Programme coordination", "M&E", "Data management", "Stakeholder engagement", "Assessment coordination", "Reporting"],
    beforeAfter: {
      kind: "output",
      before: { label: "At the start", text: "25 young professionals from 14 African countries and several disciplines join to learn how AMR governance works in practice.", image: { alt: "Cohort 4 opening session", caption: "Opening session", suggested: "/images/projects/cohort4-before.jpg" } },
      after: { label: "By the capstone", text: "Each intern works towards an AMR Youth Governance Innovation Dossier: a governance diagnostic, a policy translation product, an implementation plan and a pitch.", image: { alt: "Capstone pitch presentations", caption: "Capstone pitches", suggested: "/images/projects/cohort4-after.jpg" } },
    },
    homeOrder: 3,
    credit: "Delivered by Ducit Blue Foundation in collaboration with One Health Society.",
    headline: { value: "25 · 14", label: "interns · countries" },
    reflection: [
      "Routine attendance and compliance monitoring made it possible to follow participation across ≈40 sessions rather than relying on end-of-programme recall.",
      "Post-programme impact survey results will show which capstone ideas moved into practice. This is the next step in measuring impact.",
    ],
    related: ["youth-cop", "sustainability-toolkit"],
    title: "AMR Policy & Governance Programme for African Youth (Cohort 4)",
    shortTitle: "Pan-African Youth AMR Programme · Cohort 4",
    year: "2026",
    status: "completed",
    featured: true,
    organisations: ["Ducit Blue Foundation", "One Health Society"],
    scope: "Pan-African: participants from 14 countries (programme reach)",
    summary:
      "A 10-week policy and governance programme equipping young African professionals to analyse and act on antimicrobial resistance through a One Health lens.",
    challenge:
      "AMR governance across Africa needs a pipeline of young professionals who understand policy, coordination and implementation, not only the science of resistance. Opportunities for structured, multidisciplinary exposure to real governance problems remain limited.",
    role: [
      "Programme coordination",
      "Data management and programme monitoring",
      "Attendance and compliance monitoring",
      "Stakeholder engagement",
      "Capstone coordination",
      "Reviewer / judge coordination",
      "Reporting",
    ],
    approach: [
      "Structured weekly learning sessions delivered by technical experts from multiple sectors",
      "One-to-one and group mentorship across the 10 weeks",
      "Applied capstone: the AMR Youth Governance Innovation Dossier, comprising governance diagnostics, a policy translation product, an implementation plan and a pitch presentation",
      "Routine monitoring of attendance and compliance to support participant completion",
    ],
    collaborators: ["Ducit Blue Foundation", "One Health Society", "Programme mentors and technical experts"],
    outputs: [
      "AMR Youth Governance Innovation Dossiers (capstone)",
      "Programme monitoring and attendance records",
      "Programme reporting",
      "Accepted poster for ICID 2026 on the programme model",
    ],
    impact: [
      "25 young professionals from 14 African countries engaged in structured AMR governance learning",
      "≈72 hours of learning across ≈40 sessions",
      "39 technical experts from ≈35 organisations engaged",
      "Post-programme impact survey findings will be added when available",
    ],
    methods: ["Programme monitoring", "Attendance & compliance tracking", "Stakeholder coordination", "Capstone assessment coordination"],
    facts: [
      { label: "Duration", value: "10 weeks" },
      { label: "Interns", value: "25" },
      { label: "Countries", value: "14" },
      { label: "Learning", value: "≈72 hrs · ≈40 sessions" },
      { label: "Mentors", value: "20" },
      { label: "Experts", value: "39 · ≈35 organisations" },
    ],
    tags: ["amr", "one-health", "policy", "youth", "capacity", "programme", "data"],
    pillars: ["amr-oh", "policy", "youth", "programmes", "data"],
    visual: "pipeline",
    media: [
      { alt: "Cohort 4 virtual learning session", caption: "Cohort 4 learning session", src: "/images/activities/cohort4-session.jpg" },
      { alt: "Capstone pitch presentations", caption: "Capstone pitches", src: "/images/activities/cohort4-capstone.jpg" },
    ],
    verify: "Confirm the programme has concluded (status 'completed') and whether the alumni network is formally established.",
  },
  {
    id: "sustainability-toolkit",
    cover: { alt: "Sustainability toolkit workshop participants", caption: "Toolkit work cover photo", src: "/images/projects/sustainability-toolkit-cover.jpg" },
    type: "Evaluation & analysis",
    sectors: ["Global health & AMR", "International development"],
    skills: ["Data analysis", "Survey analysis", "Thematic synthesis", "Facilitation", "Sustainability planning"],
    beforeAfter: {
      kind: "design",
      before: { label: "Without a plan", text: "Continuity, resource mobilisation and exit are left until funding is about to end, and programmes lose momentum." },
      after: { label: "With the toolkit", text: "Teams work through the planning checklist, diagnostics, resource mobilisation and exit & continuity tools, and leave with prioritised recommendations." },
    },
    homeOrder: 1,
    headline: { value: "138", label: "feedback responses analysed" },
    reflection: [
      "Technical content was rated highly in both countries (97.8% Ghana, 94.4% Kenya), while ease of use trailed (81.8% and 80.5%). The clearest lever for the next version is simplification, not more content.",
      "Workshop usefulness was rated 100% in both countries, suggesting facilitated sessions help teams apply the tools.",
    ],
    related: ["kenya-workshop", "cohort-4"],
    title: "Sustainable Impact & AMR Toolkit: Ghana and Kenya",
    shortTitle: "Sustainability Toolkit · Ghana & Kenya",
    year: "2025",
    status: "completed",
    featured: true,
    organisations: [TBC],
    scope: "Ghana and Kenya",
    summary:
      "Supporting AMR programmes to plan for sustainability using a practical toolkit, and analysing user and workshop feedback to strengthen it.",
    challenge:
      "Many AMR initiatives lose momentum when initial funding ends. Programme teams need practical tools to plan for continuity, mobilise resources and prepare responsible exits.",
    role: ["Data analysis", "Feedback synthesis", "Workshop facilitation", "Toolkit implementation support", "Sustainability analysis"],
    approach: [
      "Toolkit components applied: Planning Checklist, Diagnostics, Resource Mobilisation, Exit & Continuity, and a Sustainability Logic Model / Theory of Change where applicable",
      "Structured feedback collected from toolkit users and workshop participants in both countries",
      "Quantitative analysis of ratings, with synthesis of qualitative feedback into improvement recommendations",
    ],
    collaborators: [TBC],
    outputs: ["Feedback analysis (80 toolkit respondents; 58 workshop respondents)", "Recommendations for improving the sustainability tools"],
    impact: [
      "Technical content rated Very Good/Good by 97.8% (Ghana) and 94.4% (Kenya) of toolkit respondents",
      "Workshop rated Very Useful/Useful by 100% of respondents in both countries",
      "96.2% (Ghana) and 97% (Kenya) of workshop respondents reported confidence to apply the tools",
    ],
    methods: ["Survey analysis", "Descriptive statistics", "Qualitative thematic synthesis", "Facilitation"],
    facts: [
      { label: "Toolkit respondents", value: "80 (Ghana 44 · Kenya 36)" },
      { label: "Workshop respondents", value: "58 (Ghana 26 · Kenya 32)" },
    ],
    tags: ["amr", "sustainability", "data", "programme", "research"],
    pillars: ["data", "programmes", "amr-oh"],
    visual: "toolkit-charts",
    media: [{ alt: "Sustainability toolkit workshop", caption: "Toolkit workshop", suggested: "/images/projects/toolkit-workshop.jpg" }],
    verify:
      "Confirm implementing/funding organisations; confirm whether Ghana facilitation was in person; check percentage denominators (see CONTENT_TO_VERIFY.md).",
  },
  {
    id: "kenya-workshop",
    cover: { alt: "Workshop session in Nairobi", caption: "Nairobi workshop cover photo", src: "/images/projects/kenya-workshop-cover.jpg" },
    type: "Workshop & facilitation",
    sectors: ["Global health & AMR", "International development"],
    skills: ["Facilitation", "Sustainability planning", "Prioritisation"],
    related: ["sustainability-toolkit"],
    title: "Kenya Sustainable Impact & AMR Workshop",
    shortTitle: "Kenya Workshop · Nairobi",
    year: "2026",
    status: "completed",
    organisations: [TBC],
    scope: "Nairobi, Kenya · 24, 25 & 28 August 2026",
    summary:
      "A multi-day workshop in Nairobi working through sustainability tools with AMR stakeholders and prioritising recommendations.",
    challenge:
      "Turning sustainability principles into concrete, prioritised actions that AMR programme teams can own after external support ends.",
    role: ["Attended and facilitated workshop activities"],
    approach: [
      "Sessions on the Planning Checklist, Resource Mobilisation, Diagnostics and Exit & Continuity tools",
      "Facilitated prioritisation of sustainability recommendations",
    ],
    collaborators: [TBC],
    outputs: ["Prioritised sustainability recommendations", `Workshop report: ${TBC}`],
    impact: [`Outcomes and follow-up actions: ${TBC}`],
    methods: ["Facilitation", "Participatory prioritisation"],
    facts: [
      { label: "Dates", value: "24, 25 & 28 Aug 2026" },
      { label: "Location", value: "Nairobi, Kenya" },
      { label: "Associated", value: "Science Day discussions · ICARS Africa launch (27 Aug 2026)" },
    ],
    tags: ["amr", "sustainability", "programme", "capacity"],
    pillars: ["programmes", "amr-oh"],
    visual: "workshop-agenda",
    media: [{ alt: "Workshop facilitation in Nairobi", caption: "Nairobi workshop facilitation", suggested: "/images/projects/nairobi-workshop.jpg" }],
    verify:
      "Confirm workshop organisers, participant numbers, and your role at the Science Day / ICARS Africa launch.",
  },
  {
    id: "fct-pilot",
    cover: { alt: "FCT One Health pilot stakeholder meeting", caption: "FCT pilot cover photo", src: "/images/projects/fct-pilot-cover.jpg" },
    type: "Pilot design",
    sectors: ["One Health", "Environmental health", "Global health & AMR"],
    skills: ["Stakeholder engagement", "M&E design", "Risk assessment design"],
    beforeAfter: {
      kind: "plan",
      before: { label: "Today", text: "Local AMR and environmental-health risks are assessed far from the people who see them daily." },
      after: { label: "Proposed pilot", text: "Frontline-led risk assessment and prioritisation, with monitoring, evaluation and evidence generation built in from the start." },
    },
    credit: "A proposed collaboration between Ducit Blue Foundation and EcoMed Nexus Foundation.",
    related: ["youth-cop"],
    title: "Proposed FCT One Health / AMR Pilot",
    shortTitle: "FCT One Health / AMR Pilot",
    year: "2026",
    status: "proposed",
    organisations: ["Ducit Blue Foundation", "EcoMed Nexus Foundation"],
    scope: "Federal Capital Territory, Nigeria",
    summary:
      "A proposed pilot to bring frontline-led One Health risk assessment and prioritisation to AMR and environmental-health challenges in the FCT.",
    challenge:
      "Local AMR and environmental-health risks are often assessed far from the people who see them daily. Frontline insight is rarely fed into structured prioritisation and monitoring.",
    role: [`Contribution to design and stakeholder engagement: ${TBC}`],
    approach: [
      "Frontline-led risk assessment and prioritisation",
      "Stakeholder engagement across health, environment and AMR coordination actors",
      "Monitoring, evaluation and evidence generation built into the design",
    ],
    collaborators: [
      "Ducit Blue Foundation",
      "EcoMed Nexus Foundation",
      "Stakeholders engaged or proposed: FCT health and environment authorities, area councils, national AMR coordination actors, environmental-health stakeholders",
    ],
    outputs: ["Pilot concept and stakeholder engagement (in progress)"],
    impact: ["This initiative is proposed/ongoing. No implementation outcomes are reported yet."],
    methods: ["Risk assessment design", "M&E framework design", "Stakeholder mapping"],
    facts: [
      { label: "Status", value: "Proposed / in development" },
      { label: "Location", value: "FCT, Nigeria" },
    ],
    tags: ["one-health", "amr", "policy", "programme", "research"],
    pillars: ["amr-oh", "policy", "programmes"],
    visual: "pilot-roadmap",
    media: [{ alt: "Stakeholder engagement meeting", caption: "Stakeholder engagement", suggested: "/images/projects/fct-pilot.jpg" }],
    verify: "Confirm Charles' specific role and which stakeholders have been engaged versus proposed.",
  },
  {
    id: "youth-cop",
    cover: { alt: "Nigerian Youth AMR Community of Practice members", caption: "Community of Practice cover photo", src: "/images/projects/youth-cop-cover.jpg" },
    type: "Network leadership",
    sectors: ["Global health & AMR", "Education & youth development", "One Health"],
    skills: ["Network leadership", "Partnerships", "Advocacy", "Facilitation", "Strategic planning"],
    beforeAfter: {
      kind: "output",
      before: { label: "The gap", text: "Young people affected by and working on AMR, with no structured way to contribute to the national response." },
      after: { label: "The network", text: "A national community of 500+ members organised around the themes of the national AMR response." },
    },
    homeOrder: 4,
    headline: { value: "500+", label: "active members" },
    related: ["cohort-4", "fct-pilot"],
    title: "Nigerian Youth AMR Community of Practice",
    shortTitle: "Nigerian Youth AMR CoP",
    year: "Ongoing",
    status: "ongoing",
    featured: true,
    organisations: ["Nigerian Youth AMR Community of Practice"],
    scope: "Nigeria: national network",
    summary:
      "A national youth network of 500+ members supporting youth engagement in the response to antimicrobial resistance.",
    challenge:
      "Young people are affected by AMR and active in health, agriculture and environment, yet often lack a structured way to contribute to national AMR efforts.",
    role: ["Chairman / Lead", "Coordination and strategic planning", "Partnerships and national stakeholder engagement", "Advocacy"],
    approach: [
      "National onboarding and knowledge exchange for members",
      "Thematic working areas aligned with the AMR response: governance and coordination, antimicrobial stewardship, surveillance and laboratory engagement, IPC/WASH/vaccines, research and development",
      "AMR awareness and youth advocacy using a One Health approach",
      "Collaboration discussions with national stakeholders",
    ],
    collaborators: [`National AMR / One Health stakeholders: ${TBC}`],
    outputs: ["National onboarding sessions", "Knowledge-exchange activities", "AMR awareness activities"],
    impact: ["500+ active members in a national youth AMR network"],
    methods: ["Network coordination", "Facilitation", "Advocacy", "Partnership development"],
    facts: [
      { label: "Members", value: "500+" },
      { label: "Role", value: "Chairman / Lead" },
    ],
    tags: ["youth", "amr", "one-health", "policy", "capacity"],
    pillars: ["youth", "amr-oh", "policy"],
    visual: "network",
    media: [{ alt: "Community of Practice onboarding session", caption: "CoP onboarding", suggested: "/images/projects/cop-onboarding.jpg" }],
    verify: "Confirm whether the working areas are formal working groups, and list any national stakeholders that can be named publicly.",
  },
];
