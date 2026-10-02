"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/track";

/** Fires "evidence_view" once when the evidence section is half visible. */
export function EvidenceTracker({ project, children }: { project: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("evidence_view", { project });
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project]);
  return <div ref={ref}>{children}</div>;
}
