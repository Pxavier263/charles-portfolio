import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { siteConfig } from "@/data/profile";
import type { ImagePlaceholder } from "@/lib/types";
import { withBase } from "@/lib/paths";

/**
 * Renders a real photo when `src` is set, otherwise a labelled placeholder.
 * In review mode the placeholder also shows where to save the file.
 * With reviewMode off, empty placeholders are hidden entirely (unless `keepEmpty`),
 * so the public site never shows "photo coming soon" boxes.
 * Only use photos that genuinely show the activity described in the caption.
 */
export function ImageSlot({
  image,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  keepEmpty = false,
  showCaption = true,
  fit = "cover",
}: {
  image: ImagePlaceholder;
  className?: string;
  sizes?: string;
  keepEmpty?: boolean;
  showCaption?: boolean;
  fit?: "cover" | "contain";
}) {
  if (image.src) {
    return (
      <figure className={`relative overflow-hidden rounded-2xl bg-paper-100 dark:bg-ink-800 ${className}`}>
        <Image src={withBase(image.src)} alt={image.alt} fill sizes={sizes} className={fit === "contain" ? "object-contain p-2" : "object-cover"} />
        {showCaption && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent" aria-hidden />
            <figcaption className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white">{image.caption}</figcaption>
          </>
        )}
      </figure>
    );
  }
  if (!siteConfig.reviewMode && !keepEmpty) return null;
  return (
    <figure
      className={`relative flex min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-teal-500/40 bg-paper-100 p-4 text-center dark:bg-ink-900/60 grain ${className}`}
      role="img"
      aria-label={`${image.caption} (photo not yet added)`}
    >
      <ImagePlus className="h-6 w-6 text-teal-600 dark:text-teal-300" aria-hidden />
      <figcaption className="text-xs font-medium">{image.caption}</figcaption>
      {siteConfig.reviewMode && image.suggested && (
        <code className="max-w-full truncate rounded bg-[rgb(var(--surface))] px-2 py-0.5 text-[0.65rem] muted" title={`Save as public${image.suggested}`}>
          public{image.suggested}
        </code>
      )}
    </figure>
  );
}
