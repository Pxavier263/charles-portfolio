import { services } from "@/data/services";

/**
 * CONTACT & CONVERSION SETTINGS
 * ------------------------------------------------------------------
 * ⚠ Every number in PRICING and AVAILABILITY below is a PLACEHOLDER written so the
 * features can be demonstrated. None of it is your real rate or diary.
 * Replace the values, then set `confirmed: true`. Until then:
 *   - in review mode the estimator and calendar show with a "To confirm" marker
 *   - with reviewMode: false they are hidden automatically (nothing unconfirmed goes live)
 */

/* ---------------- Project types (enquiry form + estimator) ---------------- */
export const PROJECT_TYPES = [
  ...services.map((s) => ({ id: s.id, label: s.title })),
  { id: "role", label: "Hiring for a role" },
  { id: "speaking", label: "Speaking / facilitation invitation" },
  { id: "research", label: "Research collaboration" },
  { id: "other", label: "Something else" },
];

/* ---------------- Budget brackets (visitor self-reports; not your prices) ---------------- */
export const BUDGETS = ["Under $2,000", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000 or more", "Not sure yet / to discuss"];

export const TIMELINES = [
  { id: "urgent", label: "Urgent (under 3 weeks)" },
  { id: "standard", label: "Standard (3 to 8 weeks)" },
  { id: "flexible", label: "Flexible (8 weeks or more)" },
  { id: "exploring", label: "Just exploring" },
];

/* ---------------- Estimator pricing ---------------- */
export type Size = "small" | "medium" | "large";

export const pricing = {
  /** Set true once every value below is yours. */
  confirmed: true,
  currency: "USD",
  locale: "en-US",
  /** Your day rate range. Leave null to show effort in days only (no money). */
  // Independent consultant range for NGO / development-sector work from Nigeria (USD, per day).
  dayRate: { low: 150 as number | null, high: 250 as number | null },
  /** Effort in working days per service and size: [low, high]. */
  effort: {
    me: { small: [3, 5], medium: [8, 12], large: [15, 25] },
    data: { small: [2, 4], medium: [6, 10], large: [12, 20] },
    sustainability: { small: [2, 3], medium: [4, 6], large: [8, 12] },
    youth: { small: [5, 8], medium: [12, 20], large: [25, 40] },
  } as Record<string, Record<Size, [number, number]>>,
  sizes: [
    { id: "small" as Size, label: "Focused", hint: "A review, a single analysis or a short engagement" },
    { id: "medium" as Size, label: "Standard", hint: "A complete piece of work with one main deliverable" },
    { id: "large" as Size, label: "Comprehensive", hint: "Multi-component or multi-country work" },
  ],
  /** Add-ons, each in days: [low, high] per unit. */
  addOns: [
    { id: "facilitation", label: "Facilitation day (incl. preparation)", perUnit: [1.5, 2] as [number, number], max: 5 },
    { id: "report", label: "Written report", perUnit: [2, 3] as [number, number], max: 1 },
    { id: "dashboard", label: "Power BI dashboard", perUnit: [3, 5] as [number, number], max: 1 },
  ],
  /** Timeline multipliers on cost: only urgent work carries a premium. */
  timelineFactor: { urgent: 1.25, standard: 1, flexible: 1, exploring: 1 } as Record<string, number>,
  /** Working days per week you can give one client: used for the duration estimate.
   *  Kept at 2 because consulting runs alongside a full-time role. */
  daysPerWeek: 2,
  disclaimer:
    "Indicative only. A firm quote follows a short call about your programme, data and deliverables.",
};

/* ---------------- Consultation availability (calendar) ---------------- */
export const availability = {
  /** Set true once these hours are your real consultation hours. */
  confirmed: true,
  /** Your time zone (IANA). */
  timeZone: "Africa/Lagos",
  timeZoneLabel: "WAT",
  slotMinutes: 30,
  /** Weekly consultation slots in YOUR time zone. 1 = Monday … 6 = Saturday, 0 = Sunday. */
  weekly: {
    // Saturdays, 9am–4pm WAT: 30-minute slots, last one starts 15:30
    6: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  } as Record<number, string[]>,
  /** How far ahead visitors can pick, and the minimum notice. */
  daysAhead: 21,
  minNoticeHours: 24,
  /** Dates you are unavailable (YYYY-MM-DD, your time zone). */
  blackout: [] as string[],
  /**
   * Optional real booking link (Cal.com / Calendly). When set, visitors can book instantly;
   * otherwise the calendar sends a booking REQUEST that you confirm by email.
   */
  bookingUrl: null as string | null,
  topics: ["Discuss a project", "Monitoring & evaluation advice", "Data / dashboard needs", "Hiring conversation", "Other"],
};

/* ---------------- Contact channels ---------------- */
export const channels = {
  /** International format, digits only, e.g. "2348000000000". Only add a number you want public. */
  whatsapp: null as string | null,
};
