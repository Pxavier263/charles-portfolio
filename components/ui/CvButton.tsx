import { Download } from "lucide-react";
import { profile, siteConfig } from "@/data/profile";
import { withBase } from "@/lib/paths";

export function CvButton({ className = "btn-primary", compact = false }: { className?: string; compact?: boolean }) {
  const label = compact ? "CV" : "Download CV";
  if (profile.cvUrl) {
    return (
      <a href={withBase(profile.cvUrl)} download className={className} aria-label="Download CV (PDF)">
        <Download className="h-4 w-4" aria-hidden /> {label}
      </a>
    );
  }
  // No CV uploaded yet: point to the contact section rather than a broken download.
  return (
    <a href={withBase("/work-with-me")} className={className} title={siteConfig.reviewMode ? "Add your CV PDF and set profile.cvUrl" : undefined}>
      <Download className="h-4 w-4" aria-hidden /> {compact ? "CV" : "Request CV"}
    </a>
  );
}
