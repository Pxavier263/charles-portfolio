"use client";
import { ChevronLeft, ChevronRight, Linkedin, Quote } from "lucide-react";
import Papa from "papaparse";
import { useCallback, useEffect, useRef, useState } from "react";
import { REVIEWS_AUTOPLAY_MS, REVIEWS_CSV_URL, REVIEWS_MAX_CHARS } from "@/lib/config";
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

/** One card per view on phones, two on tablets, three on desktop (gap is 1.25rem). */
const SLIDE = "w-full flex-none snap-start md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]";

/** Shortens text to at most `max` characters, ending on a whole word. */
function truncateWords(text: string, max: number) {
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?-]+$/, "");
}

function ReviewCard({ r }: { r: LiveReview }) {
  const byline = [r.role, r.organisation].filter(Boolean).join(", ");
  const isLong = r.feedback.length > REVIEWS_MAX_CHARS;
  const [open, setOpen] = useState(false);
  const text = isLong && !open ? `${truncateWords(r.feedback, REVIEWS_MAX_CHARS)}…` : r.feedback;
  return (
    <li className={`card flex flex-col p-7 ${SLIDE}`}>
      <div className="flex items-center justify-between gap-3">
        <Quote className="h-6 w-6 text-teal-700 dark:text-teal-300" aria-hidden />
        {r.rating !== null && <Stars value={r.rating} />}
      </div>
      <blockquote className="mt-4 whitespace-pre-line font-serif text-lg leading-snug">&ldquo;{text}&rdquo;</blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 self-start text-sm font-semibold text-teal-700 underline decoration-orange-500 underline-offset-4 hover:text-orange-600 dark:text-teal-300 dark:hover:text-orange-300"
        >
          {open ? "See less" : "See more"}
          <span className="sr-only"> of {r.name}&apos;s review</span>
        </button>
      )}
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
    <li className={`card flex animate-pulse flex-col p-7 ${SLIDE}`} aria-hidden>
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
 * Shown as a single-row carousel: 3 cards on desktop, 2 on tablet, 1 on phones.
 * It advances one card at a time, pauses on hover, focus or touch, and stays still
 * for visitors who prefer reduced motion.
 */
export function LiveReviews() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [reviews, setReviews] = useState<LiveReview[]>([]);
  const [paused, setPaused] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const on = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Only move (and show arrows) when there are more reviews than fit in one row.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reviews, state]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      const card = el?.querySelector("li");
      if (!el || !card) return;
      const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const atStart = el.scrollLeft <= 4;
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
      else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
      else el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior });
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (!overflowing || paused || reduceMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, REVIEWS_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [overflowing, paused, reduceMotion, step]);

  // Fail quietly: no section at all if the sheet can't be reached.
  if (state === "error") return null;

  const track = "mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <section id="reviews" aria-labelledby="reviews-title" aria-busy={state === "loading"} className="band-canvas scroll-mt-20 py-16 md:py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-title" className="mt-3 text-2xl font-medium md:text-3xl">What clients and mentees say</h2>
          </div>
          {overflowing && (
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border hairline transition-colors hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-300">
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border hairline transition-colors hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-300">
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          )}
        </div>

        {state === "loading" ? (
          <ul className={track}>
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </ul>
        ) : reviews.length === 0 ? (
          <p className="mt-6 muted">New reviews will appear here soon.</p>
        ) : (
          <ul
            ref={trackRef}
            className={track}
            aria-label="Reviews"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
            }}
            onTouchStart={() => setPaused(true)}
          >
            {reviews.map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} />)}
          </ul>
        )}
      </div>
    </section>
  );
}
