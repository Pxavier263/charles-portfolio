import { siteConfig, TBC } from "@/data/profile";

/** true if a string still contains the "[DETAIL TO BE CONFIRMED]" marker */
export const isTbc = (s?: string | null) => !!s && s.includes(TBC);

/**
 * In review mode everything is shown (so gaps are visible).
 * With reviewMode = false, any text still containing the TBC marker is hidden
 * automatically, so no placeholder ever reaches the public site.
 */
export const show = (s?: string | null): s is string => !!s && (siteConfig.reviewMode || !isTbc(s));
export const visible = (items: string[]) => items.filter(show);
