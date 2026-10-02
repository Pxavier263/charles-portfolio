"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/profile";

/** Visible only while siteConfig.reviewMode is true. Dismissible for the current visit. */
export function ReviewBanner() {
  const [open, setOpen] = useState(true);
  if (!siteConfig.reviewMode || !open) return null;
  return (
    <div role="note" className="fixed bottom-24 left-1/2 z-40 sm:bottom-4 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-start gap-3 rounded-2xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lift dark:bg-[#2a2211] dark:text-amber-200">
      <p>
        <strong>Review mode.</strong> Items marked <span className="font-semibold">● To confirm</span> need checking (see CONTENT_TO_VERIFY.md).
        Set <code className="rounded bg-amber-100 px-1 dark:bg-amber-400/20">reviewMode: false</code> in data/profile.ts before launch.
      </p>
      <button type="button" onClick={() => setOpen(false)} className="grid h-7 w-7 flex-none place-items-center rounded-full hover:bg-amber-100 dark:hover:bg-amber-400/20" aria-label="Dismiss review notice">
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
