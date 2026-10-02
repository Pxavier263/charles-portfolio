import { bio, profile, siteConfig } from "@/data/profile";

export const SEO = {
  title: `${profile.name} — AMR & One Health M&E, Data and Programme Consultant`,
  description:
    "Pharm. Ogu Charles Chukwudi (Charles Ogu) helps African AMR and One Health programmes prove and sustain their impact — M&E, programme data analysis, sustainability facilitation and youth capacity building. Based in Abuja, Nigeria.",
  keywords: [
    "Ogu Charles Chukwudi",
    "Charles Ogu",
    "Pharm Charles Ogu",
    "Public Health Nigeria",
    "AMR Nigeria",
    "One Health Nigeria",
    "Data Analyst Public Health",
    "AMR Africa",
    "Public Health Data Analyst",
    "AMR Youth Leadership",
    "Antimicrobial Resistance Africa",
  ],
};

/** schema.org Person — only confirmed facts; sameAs is populated from supplied links only. */
export function personJsonLd() {
  const sameAs = Object.values(profile.links).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: ["Charles Ogu", "Pharm. Charles Ogu"],
    honorificPrefix: profile.honorific,
    jobTitle: "Programme & Data Officer",
    description: bio.lead,
    url: siteConfig.url,
    address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
    worksFor: { "@type": "Organization", name: "Ducit Blue Solutions / Ducit Blue Foundation" },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "University of Port Harcourt" }],
    hasCredential: [{ "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Bachelor of Pharmacy" }],
    knowsAbout: ["Antimicrobial resistance", "One Health", "Public health", "Data analytics", "Monitoring and evaluation", "Programme management", "Health policy"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}
