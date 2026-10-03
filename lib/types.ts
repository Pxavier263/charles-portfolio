/**
 * Shared content types for the portfolio.
 *
 * Every content item can carry a `verify` note. When `siteConfig.reviewMode` is true,
 * items with a `verify` note display a small "To confirm" marker so Charles can review
 * them in the browser before publishing. Set `reviewMode: false` in data/site.ts for launch.
 */

export type Tag =
  | "amr"
  | "one-health"
  | "data"
  | "policy"
  | "research"
  | "programme"
  | "youth"
  | "capacity"
  | "sustainability";

export type PillarId = "amr-oh" | "data" | "programmes" | "policy" | "youth";

export type Status = "completed" | "ongoing" | "proposed" | "upcoming";

export interface Verifiable {
  /** Plain-language note describing what still needs confirmation. Omit when fully confirmed. */
  verify?: string;
}

export interface Metric extends Verifiable {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  context: string;
  tags: Tag[];
  /** true = figure changes over time and should be refreshed periodically */
  updatePeriodically?: boolean;
  lastUpdated: string;
}

export interface ImagePlaceholder {
  /** Path under /public, e.g. "/images/activities/cohort4-session.jpg". Leave undefined until a real photo exists. */
  src?: string;
  alt: string;
  caption: string;
  /** Suggested file path shown on the placeholder in review mode, so you know where to save the photo. */
  suggested?: string;
}

export type ActivityCategory = "Workshop" | "Conference" | "Training" | "Programme" | "Community" | "Award" | "Stakeholder engagement";

export interface Activity extends Verifiable {
  id: string;
  title: string;
  date: string;
  /** YYYY-MM(-DD) for sorting; newest first */
  sortDate: string;
  location: string;
  category: ActivityCategory;
  description: string;
  /** Add several photos per activity; the first is used as the cover. */
  photos: ImagePlaceholder[];
  /** Optional link to a related case study id in projects.ts */
  projectId?: string;
  /** Hide without deleting */
  enabled: boolean;
  upcoming?: boolean;
}

export type ProjectType =
  | "Capacity-building programme"
  | "Evaluation & analysis"
  | "Workshop & facilitation"
  | "Pilot design"
  | "Network leadership";

export type Sector =
  | "Global health & AMR"
  | "One Health"
  | "Environmental health"
  | "Education & youth development"
  | "International development";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  organisation: string;
  projectIds: string[];
  photo?: string;
  /** Optional star rating 1–5, only if the person gave one. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Optional date the review was given, e.g. "2026-08". */
  date?: string;
  /** Must be true: only publish with the person's written permission. */
  permission: boolean;
}

export interface ProjectStat {
  label: string;
  ghana: number;
  kenya: number;
}

export interface Project extends Verifiable {
  id: string;
  title: string;
  shortTitle: string;
  year: string;
  status: Status;
  organisations: string[];
  scope: string;
  summary: string;
  challenge: string;
  role: string[];
  approach: string[];
  collaborators: string[];
  outputs: string[];
  impact: string[];
  methods: string[];
  facts?: { label: string; value: string }[];
  tags: Tag[];
  pillars: PillarId[];
  media: ImagePlaceholder[];
  /** Cover photo: shown on showcase cards and at the top of the case study. */
  cover?: ImagePlaceholder;
  /** Optional visual rendered inside the case study */
  visual?: "pipeline" | "toolkit-charts" | "network" | "pilot-roadmap" | "workshop-agenda";
  featured?: boolean;
  /** Order on the homepage "Selected work" (lower = first). Omit to hide from the homepage. */
  homeOrder?: number;
  /** Credit line for the organisation that led the work. */
  credit?: string;
  /** "What I learned / would do next": only evidence-based observations. */
  reflection?: string[];
  /** One headline figure shown on hover/preview cards. */
  headline?: { value: string; label: string };
  /** Related case studies (ids). */
  related?: string[];
  /** Showcase taxonomy: values come from data/taxonomy.ts */
  type: ProjectType;
  sectors: Sector[];
  skills: string[];
  /**
   * Before/after comparison. `kind` says honestly what is compared:
   *  "design"   = the problem vs what the work was designed to do (not a measured result)
   *  "output"   = starting point vs what was actually produced
   *  "plan"     = current situation vs a proposed plan (no outcomes yet)
   *  "measured" = measured before/after data (only when real data exists)
   * Add `image` on both sides to switch to a draggable photo slider.
   */
  beforeAfter?: {
    kind: "design" | "output" | "plan" | "measured";
    before: { label: string; text: string; image?: ImagePlaceholder };
    after: { label: string; text: string; image?: ImagePlaceholder };
  };
}

export interface Experience extends Verifiable {
  id: string;
  role: string;
  organisation: string;
  period: string;
  current?: boolean;
  previousTitle?: string;
  summary: string;
  responsibilities: string[];
  tags: Tag[];
}

export type PresentationKind = "Poster" | "Oral / session" | "Course participation" | "Organisational presentation" | "Conference participation";

export interface Presentation extends Verifiable {
  id: string;
  event: string;
  organiser?: string;
  location: string;
  date: string;
  sortDate: string;
  kind: PresentationKind;
  title?: string;
  status: "upcoming" | "delivered" | "attended";
  statusLabel: string;
  description: string;
  tags: Tag[];
  /** Photo from the event (poster, podium, session) */
  image?: ImagePlaceholder;
}

export interface Achievement extends Verifiable {
  id: string;
  title: string;
  awardingBody: string;
  date: string;
  recipient: string;
  /** Distinguishes organisational awards from personal ones: important for accuracy */
  recipientType: "organisation" | "individual" | "team" | "to-confirm";
  /** Photo of the award, certificate or ceremony */
  image?: ImagePlaceholder;
  description: string;
  /** Toggle visibility without deleting the entry */
  enabled: boolean;
  sourceUrl?: string;
  tags: Tag[];
}

export interface Education extends Verifiable {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  status: "completed" | "in-progress" | "active";
  detail?: string;
}

export interface Certification extends Verifiable {
  id: string;
  /** Name exactly as it appears on the certificate: do not paraphrase */
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  /**
   * Scan/photo of the certificate. Before uploading, blur or crop out certificate
   * numbers, QR codes and personal details you don't want public.
   */
  image?: ImagePlaceholder;
  enabled: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: "chart" | "bar" | "map" | "clipboard" | "kanban" | "health";
  items: string[];
  tags: Tag[];
}

export type PublicationCategory =
  | "Published"
  | "Under Review"
  | "Conference Abstracts"
  | "Posters"
  | "Technical Reports"
  | "Policy Products";

export interface Publication extends Verifiable {
  id: string;
  category: PublicationCategory;
  title: string;
  authors?: string;
  venue: string;
  year: string;
  status: string;
  url?: string;
  doi?: string;
}

export interface Story extends Verifiable {
  id: string;
  title: string;
  lede: string;
  body: string;
  projectId?: string;
  tags: Tag[];
}

export type FootprintType = "Project Delivery" | "Conference" | "Training" | "Presentation" | "Regional Programme" | "Home base";

export interface FootprintLocation extends Verifiable {
  id: string;
  country: string;
  city?: string;
  lat: number;
  lon: number;
  types: FootprintType[];
  /** true = in-person presence confirmed; false = remote/programme reach; null = not yet confirmed */
  inPerson: boolean | null;
  upcoming?: boolean;
  activities: string[];
}
