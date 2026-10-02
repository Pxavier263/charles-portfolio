import type { ReactNode } from "react";
import { withBase } from "@/lib/paths";

/**
 * Renders a real link when `href` exists; otherwise a non-interactive placeholder chip
 * (avoids shipping broken "#" links). Placeholders are visible in review mode only.
 */
export function ExternalOrPlaceholder({
  href,
  label,
  children,
  className = "",
  showPlaceholder = true,
}: {
  href: string | null | undefined;
  label: string;
  children: ReactNode;
  className?: string;
  showPlaceholder?: boolean;
}) {
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={withBase(href)} className={className} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  if (!showPlaceholder) return null;
  return (
    <span className={`${className} cursor-not-allowed opacity-75 italic`} aria-label={`${label} (link to be added)`} title="Link to be added">
      {children}
    </span>
  );
}
