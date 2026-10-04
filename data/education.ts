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
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/google-data-analytics.jpg" },
    enabled: true,
    verify: "Confirm exact certificate title, issuer/platform, year and credential link.",
  },
  {
    id: "advanced-da",
    name: "Advanced Data Analytics",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/advanced-data-analytics.jpg" },
    enabled: true,
    verify: "Confirm exact certificate title and issuer.",
  },
  {
    id: "ibm",
    name: "IBM analytics training",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/ibm-analytics.jpg" },
    enabled: true,
    verify: "Confirm whether this is a completed certificate, and its exact title.",
  },
  {
    id: "pm",
    name: "Project Management",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/project-management.jpg" },
    enabled: true,
    verify:
      "Confirm exact title and issuer. Only use 'Project Management Professional (PMP)' if the PMI credential is held.",
  },
  {
    id: "cert-5",
    name: "[DETAIL TO BE CONFIRMED]",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/cert-5.jpg" },
    enabled: true,
    verify: "Add exact certificate title, issuer, year and credential link.",
  },
  {
    id: "cert-6",
    name: "[DETAIL TO BE CONFIRMED]",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/cert-6.jpg" },
    enabled: true,
    verify: "Add exact certificate title, issuer, year and credential link.",
  },
  {
    id: "cert-7",
    name: "[DETAIL TO BE CONFIRMED]",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/cert-7.jpg" },
    enabled: true,
    verify: "Add exact certificate title, issuer, year and credential link.",
  },
  {
    id: "cert-8",
    name: "[DETAIL TO BE CONFIRMED]",
    issuer: "[DETAIL TO BE CONFIRMED]",
    image: { alt: "Certificate image", caption: "Certificate image", suggested: "/images/certificates/cert-8.jpg" },
    enabled: true,
    verify: "Add exact certificate title, issuer, year and credential link.",
  },
];
