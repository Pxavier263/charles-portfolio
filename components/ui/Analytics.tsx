"use client";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Tracks the conversion events defined in the strategy:
 * - any element with data-cta="<name>" → "cta_click"
 * - downloads (a[download], .pdf links) → "download"
 * - outbound LinkedIn/ORCID/etc. links → "outbound"
 * - case-study evidence reached → "evidence_view" (fired from the case-study page)
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a,button") as HTMLAnchorElement | null;
      if (!el) return;
      const cta = el.getAttribute("data-cta");
      if (cta) track("cta_click", { cta, path: location.pathname });
      const href = el.getAttribute("href") ?? "";
      if (el.hasAttribute("download") || href.endsWith(".pdf")) track("download", { file: href });
      else if (/^https?:/.test(href) && !href.includes(location.host)) track("outbound", { href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  // The Vercel script only exists on Vercel deployments; skip it locally to avoid a 404.
  return process.env.NEXT_PUBLIC_VERCEL_ENV ? <VercelAnalytics /> : null;
}
