"use client";
import { Linkedin, Quote } from "lucide-react";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { REVIEWS_CSV_URL, REVIEWS_INITIAL_COUNT } from "@/lib/config";
import { Stars } from "../contact/Reviews";

interface LiveReview {
  name: string;
  role: string;
  organisation: string;
  relationship: string;
  rating: number | null;
  feedback: string;
  linkedin: string | null;
  photoId: string | null;
}

type Row = Record<string, string | undefined>;

const clean = (s?: string) => (s ?? "").trim();

/** Rating clamped to 1–5; null when the cell is empty or not a number. */
function parseRating(s?: string): number | null {
  const n = Number.parseFloat(clean(s));
  if (!Number.isFinite(n)) return null;
  return Math.min(5, Math.max(1, Math.round(n)));
}

/** Drive file id from "...?id=FILE_ID" or ".../d/FILE_ID/..." links. */
export function driveFileId(url?: string): string | null {
  const u = clean(url);
  const m = u.match(/[?&]id=([\w-]{10,})/) ?? u.match(/\/d\/([\w-]{10,})/);
  return m ? m[1] : null;
}

/** LinkedIn URL only if it is one; adds https:// when missing. */
function linkedinUrl(s?: string): string | null {
  const u = clean(s);
  if (!u.toLowerCase().includes("linkedin.com")) return null;
  return /^https?:\/\//i.test(u) ? u : `https://${u.replace(/^\/+/, "")}`;
}

export function parseReviews(csv: string): LiveReview[] {
  const { data } = Papa.parse<Row>(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim().toLowerCase(),
  });
  return data
    .map((r) => ({
      name: clean(r.name),
      role: clean(r.role),
      organisation: clean(r.organisation),
      relationship: clean(r.relationship),
      rating: parseRating(r.rating),
      feedback: clean(r.feedback),
      linkedin: linkedinUrl(r.linkedin),
      photoId: driveFileId(r.photo),
    }))
    .filter((r) => r.name && r.feedback);
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

/** Drive photo with two fallbacks, then an initials avatar. */
function Avatar({ name, photoId }: { name: string; photoId: string | null }) {
  const sources = photoId
    ? [`https://lh3.googleusercontent.com/d/${photoId}`, `https://drive.google.com/thumbnail?id=${photoId}&sz=w400`]
    : [];
  const [attempt, setAttempt] = useState(0);

  if (attempt >= sources.length) {
    return (
      <span
        className="grid h-12 w-12 flex-none place-items-center rounded-full bg-teal-700 text-sm font-semibold text-white dark:bg-teal-300 dark:text-ink-950"
        aria-hidden
      >
        {initials(name)}
      </span>
    );
  }
  return (
    // Plain <img>: static export has no image optimiser, and these are remote Drive URLs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={sources[attempt]}
      src={sources[attempt]}
      alt={`Photo of ${name}`}
      width={48}
      height={48}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setAttempt((a) => a + 1)}
      className="h-12 w-12 flex-none rounded-full object-cover"
    />
  );
}

function ReviewCard({ r }: { r: LiveReview }) {
  const byline = [r.role, r.organisation].filter(Boolean).join(", ");
  return (
    <li className="card flex flex-col p-7">
      <div className="flex items-center justify-between gap-3">
        <Quote className="h-6 w-6 text-teal-700 dark:text-teal-300" aria-hidden />
        {r.rating !== null && <Stars value={r.rating} />}
      </div>
      <blockquote className="mt-4 whitespace-pre-line font-serif text-lg leading-snug">&ldquo;{r.feedback}&rdquo;</blockquote>
      <div className="mt-auto flex items-center gap-3 pt-6">
        <Avatar name={r.name} photoId={r.photoId} />
        <div className="min-w-0 flex-1 text-sm">
          <h3 className="font-sans text-sm font-semibold">{r.name}</h3>
          {byline && <p className="muted">{byline}</p>}
          {r.relationship && <p className="mt-0.5 text-xs muted">{r.relationship}</p>}
        </div>
        {r.linkedin && (
          <a
            href={r.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${r.name} on LinkedIn (opens in a new tab)`}
            className="grid h-9 w-9 flex-none place-items-center rounded-full border hairline text-teal-700 transition-colors hover:border-orange-500 hover:text-orange-600 dark:text-teal-300 dark:hover:text-orange-300"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}

function SkeletonCard() {
  return (
    <li className="card flex animate-pulse flex-col p-7" aria-hidden>
      <div className="h-4 w-24 rounded bg-[rgb(var(--line)/0.12)]" />
      <div className="mt-5 space-y-2">
        <div className="h-3.5 rounded bg-[rgb(var(--line)/0.12)]" />
        <div className="h-3.5 rounded bg-[rgb(var(--line)/0.12)]" />
        <div className="h-3.5 w-2/3 rounded bg-[rgb(var(--line)/0.12)]" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgb(var(--line)/0.12)]" />
        <div className="h-3.5 w-32 rounded bg-[rgb(var(--line)/0.12)]" />
      </div>
    </li>
  );
}

/**
 * Live reviews pulled in the browser from the published Google Sheet (lib/config.ts),
 * so new approved reviews appear without rebuilding the site.
 */
export function LiveReviews() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [reviews, setReviews] = useState<LiveReview[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(REVIEWS_CSV_URL, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((csv) => {
        setReviews(parseReviews(csv));
        setState("ready");
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return;
        console.error("Reviews: could not load the reviews sheet.", err);
        setState("error");
      });
    return () => ctrl.abort();
  }, []);

  // Fail quietly: no section at all if the sheet can't be reached.
  if (state === "error") return null;

  const shown = expanded ? reviews : reviews.slice(0, REVIEWS_INITIAL_COUNT);
  const hidden = reviews.length - shown.length;

  return (
    <section id="reviews" aria-labelledby="reviews-title" aria-busy={state === "loading"} className="band-canvas scroll-mt-20 py-16 md:py-20">
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h2 id="reviews-title" className="mt-3 text-2xl font-medium md:text-3xl">What clients and mentees say</h2>

        {state === "loading" ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </ul>
        ) : reviews.length === 0 ? (
          <p className="mt-6 muted">New reviews will appear here soon.</p>
        ) : (
          <>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} />)}
            </ul>
            {hidden > 0 && (
              <div className="mt-8 text-center">
                <button type="button" onClick={() => setExpanded(true)} className="btn-ghost">
                  Show more ({hidden})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
