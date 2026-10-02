"use client";
import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/**
 * Sends a conversion event. Works with Vercel Web Analytics out of the box and with
 * Plausible if its script is added (window.plausible). No-ops locally.
 */
export function track(event: string, props: Props = {}) {
  try {
    vercelTrack(event, props);
  } catch {}
  try {
    const w = window as unknown as { plausible?: (e: string, o?: { props: Props }) => void };
    w.plausible?.(event, { props });
  } catch {}
}
