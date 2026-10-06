import type { ImagePlaceholder } from "@/lib/types";

/**
 * SITE PHOTOS: every page-level photo slot in one place.
 * ------------------------------------------------------------------
 * 1. Save the photo at the `suggested` path (under /public).
 * 2. Copy that path into `src` (without "public"), e.g. src: "/images/site/speaking.jpg".
 * 3. Make the `alt` text describe what is actually in the photo.
 *
 * Empty slots appear as labelled placeholders in review mode only; on the live site
 * they are hidden automatically, so no "photo coming soon" boxes are ever published.
 * Your headshot itself is set in data/profile.ts → profile.headshot.
 */
export const sitePhotos = {
  /** Hero (mobile) + portrait crops use the headshot from profile.ts. */
  workingPortrait: {
    alt: "Charles at work, facilitating or presenting",
    caption: "Working portrait (you in action)",
    src: "/images/site/working-portrait.jpg",
  },
  howIWork: {
    alt: "Charles facilitating a workshop session",
    caption: "Facilitating a workshop",
    src: "/images/site/facilitating.jpg",
  },
  leadership: {
    alt: "Members of the Nigerian Youth AMR Community of Practice",
    caption: "Community of Practice members / session",
    src: "/images/site/cop-group.jpg",
  },
  speaking: {
    alt: "Charles presenting at a conference",
    caption: "Presenting at a conference",
    src: "/images/site/speaking.jpg",
  },
  contact: {
    alt: "Portrait of Charles, smiling",
    caption: "Friendly portrait for the contact page",
    suggested: "/images/site/contact-portrait.jpg",
  },
  services: {
    me: { alt: "Reviewing programme monitoring data", caption: "M&E / monitoring work", src: "/images/site/service-me.jpg" },
    data: { alt: "Working on a data dashboard", caption: "Data analysis / dashboards", src: "/images/site/service-data.jpg" },
    sustainability: { alt: "Sustainability planning workshop", caption: "Sustainability workshop", src: "/images/site/service-sustainability.jpg" },
    youth: { alt: "Mentoring young professionals", caption: "Youth programme / mentoring", src: "/images/site/service-youth.jpg" },
  } as Record<string, ImagePlaceholder>,
} satisfies Record<string, ImagePlaceholder | Record<string, ImagePlaceholder>>;
