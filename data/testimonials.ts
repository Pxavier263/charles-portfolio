import type { Testimonial } from "@/lib/types";

/**
 * TESTIMONIALS
 * Add real quotes only, with the person's written permission (permission: true).
 * Entries without permission are never shown. Link each to case studies via projectIds.
 *
 * TEMPLATE:
 * {
 *   id: "jane-doe",
 *   quote: "Their exact words, lightly edited only with their approval.",
 *   name: "Jane Doe",
 *   role: "Programme Manager",
 *   organisation: "Organisation name",
 *   projectIds: ["sustainability-toolkit"],
 *   photo: "/images/testimonials/jane-doe.jpg", // optional
 *   rating: 5,        // optional — only if they gave a rating
 *   date: "2026-08",  // optional
 *   permission: true,
 * },
 */
export const testimonials: Testimonial[] = [];

export const publishedTestimonials = (projectId?: string) =>
  testimonials.filter((t) => t.permission && (!projectId || t.projectIds.includes(projectId)));
