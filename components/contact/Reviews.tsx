import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { siteConfig } from "@/data/profile";
import { publishedTestimonials } from "@/data/testimonials";
import { withBase } from "@/lib/paths";

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Rated ${value.toFixed(1).replace(/\.0$/, "")} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className={`relative ${size}`} aria-hidden>
            <Star className={`absolute inset-0 ${size} text-[rgb(var(--line)/0.2)]`} fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} text-orange-500`} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Client reviews with star ratings and an average.
 * Only real testimonials with permission: true are shown (data/testimonials.ts).
 * The average is computed only from reviews that include a rating.
 */
export function Reviews({ projectId }: { projectId?: string }) {
  const list = publishedTestimonials(projectId);
  if (list.length === 0) {
    if (!siteConfig.reviewMode) return null;
    return (
      <div className="rounded-2xl border border-dashed border-[rgb(var(--accent)/0.4)] p-8 text-center">
        <div className="flex justify-center"><Stars value={0} size="h-5 w-5" /></div>
        <p className="mt-3 font-semibold">Client reviews will appear here</p>
        <p className="mx-auto mt-1 max-w-md text-sm muted">
          Add real reviews, with written permission and an optional 1–5 rating, in data/testimonials.ts. The average rating and review cards are generated automatically. Nothing is shown on the live site until you add one.
        </p>
      </div>
    );
  }
  const rated = list.filter((t) => t.rating);
  const avg = rated.length ? rated.reduce((a, t) => a + (t.rating ?? 0), 0) / rated.length : null;
  return (
    <div>
      {avg !== null && (
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="font-serif text-5xl">{avg.toFixed(1)}</p>
          <div>
            <Stars value={avg} size="h-5 w-5" />
            <p className="mt-1 text-sm muted">Average from {rated.length} rated review{rated.length > 1 ? "s" : ""}</p>
          </div>
        </div>
      )}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <li key={t.id} className="card flex flex-col p-7">
            <div className="flex items-center justify-between gap-3">
              <Quote className="h-6 w-6 text-teal-700 dark:text-teal-300" aria-hidden />
              {t.rating && <Stars value={t.rating} />}
            </div>
            <blockquote className="mt-4 font-serif text-lg leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-auto flex items-center gap-3 pt-6">
              {t.photo && (
                <span className="relative h-11 w-11 flex-none overflow-hidden rounded-full">
                  <Image src={withBase(t.photo)} alt="" fill sizes="44px" className="object-cover" />
                </span>
              )}
              <p className="text-sm">
                <span className="block font-semibold">{t.name}</span>
                <span className="block muted">{t.role}, {t.organisation}{t.date ? ` · ${t.date}` : ""}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
