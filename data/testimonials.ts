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
export const testimonials: Testimonial[] = [
  {
    id: "chioma-ikenwe",
    quote:
      "Charles handled my data analysis with real care. He cleaned a messy dataset, explained every step in plain language and turned the results into clear insights I could act on. Beyond the project, he mentored me through my transition into tech: he helped me choose the right skills to focus on, reviewed my practice projects and kept me accountable. His patience and encouragement made a career change that felt overwhelming feel achievable. I would recommend him to anyone who needs solid analysis or a mentor who genuinely invests in their growth.",
    name: "Chioma Ikenwe",
    role: "Assistant Manager",
    organisation: "Bedmate Furniture",
    projectIds: [],
    rating: 5,
    date: "2026-10",
    permission: true,
  },
];

export const publishedTestimonials = (projectId?: string) =>
  testimonials.filter((t) => t.permission && (!projectId || t.projectIds.includes(projectId)));
