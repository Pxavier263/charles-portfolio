import type { Certification, Education, ImagePlaceholder } from "@/lib/types";

export const education: Education[] = [
  {
    id: "msc",
    qualification: "MSc Public Health",
    institution: "Ahmadu Bello University",
    period: "In progress · expected 2026",
    status: "in-progress",
  },
  {
    id: "bpharm",
    qualification: "Bachelor of Pharmacy (B.Pharm)",
    institution: "University of Port Harcourt",
    period: "2018",
    status: "completed",
    detail: "CGPA 3.44 / 4.0",
  },
  {
    id: "pcn",
    qualification: "Pharmacist Licensure",
    institution: "Pharmacists Council of Nigeria",
    period: "Licensed pharmacist",
    status: "active",
    // Licence numbers are intentionally not displayed.
  },
];

/**
 * CERTIFICATIONS: every entry needs its exact name and issuer confirmed before launch.
 * Names below are the working labels from the brief, NOT verified certificate titles.
 * Set `enabled: false` for anything that cannot be confirmed.
 */
/** Optional photos for degree certificates / licence (blur numbers before uploading). */
export const educationImages: Record<string, ImagePlaceholder> = {
  msc: { alt: "Ahmadu Bello University", caption: "MSc: Practicum session", src: "/images/education/abu.jpg" },
  bpharm: { alt: "B.Pharm graduation", caption: "B.Pharm graduation", src: "/images/education/bpharm-graduation.jpg" },
  pcn: { alt: "Pharmacist licensure / induction", caption: "Licensure or induction", src: "/images/education/pcn-induction.jpg" },
};

export const certifications: Certification[] = [
  {
    id: "google-da",
    name: "Google Data Analytics",
    issuer: "Google / Coursera",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/google-data-analytics.jpg" },
    enabled: true,
  },
  {
    id: "advanced-da",
    name: "Advanced Data Analytics",
    issuer: "Google / Coursera",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/advanced-data-analytics.jpg" },
    enabled: true,
  },
  {
    id: "ibm",
    name: "Data and AI Ethics",
    issuer: "Maven Analytics",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/data-ai-ethics.jpg" },
    enabled: true,
  },
  {
    id: "pm",
    name: "Project Management",
    issuer: "Google / Coursera",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/project-management.jpg" },
    enabled: true,
  },
  {
    id: "cert-5",
    name: "Monitoring and Evaluation in Global Health",
    issuer: "University of Washington",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/cert-5.jpg" },
    enabled: true,
  },
  {
    id: "cert-6",
    name: "Academic Research Writing",
    issuer: "Coursera / University of California, Irvine",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/cert-6.jpg" },
    enabled: true,
  },
  {
    id: "cert-7",
    name: "Research Methodology",
    issuer: "Udemy",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/cert-7.jpg" },
    enabled: true,
  },
  {
    id: "cert-8",
    name: "Leadership and Management in Health",
    issuer: "University of Washington",
    image: { alt: "Certificate image", caption: "Certificate image", src: "/images/certificates/cert-8.jpg" },
    enabled: true,
  },
];
