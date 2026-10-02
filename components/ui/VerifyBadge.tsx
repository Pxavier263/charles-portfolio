import { siteConfig } from "@/data/profile";

/** Amber marker shown only in review mode, for items that still need confirmation. */
export function VerifyBadge({ note, className = "" }: { note?: string; className?: string }) {
  if (!siteConfig.reviewMode || !note) return null;
  return (
    <span
      className={`inline-flex w-fit self-start items-center gap-1 rounded-full border border-amber-400/60 bg-amber-50 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-800 dark:bg-amber-400/10 dark:text-amber-300 ${className}`}
      title={note}
    >
      <span aria-hidden>●</span> To confirm
      <span className="sr-only">: {note}</span>
    </span>
  );
}
