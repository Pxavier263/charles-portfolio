"use client";
import { CalendarDays, Camera, Images, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { activities } from "@/data/gallery";
import { siteConfig } from "@/data/profile";
import type { Activity, ActivityCategory } from "@/lib/types";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { VerifyBadge } from "../ui/VerifyBadge";
import { withBase } from "@/lib/paths";

const CATS: ActivityCategory[] = ["Workshop", "Conference", "Training", "Programme", "Community", "Stakeholder engagement", "Award"];

function PhotoViewer({ activity, onClose }: { activity: Activity | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (activity && !d.open) d.showModal();
    if (!activity && d.open) d.close();
  }, [activity]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="viewer-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-[rgb(var(--text))] md:m-auto md:h-auto md:max-h-[90vh] md:max-w-5xl"
    >
      {activity && (
        <div className="min-h-full overflow-y-auto bg-[rgb(var(--bg))] p-6 md:max-h-[90vh] md:rounded-3xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{activity.category} · {activity.date}</p>
              <h3 id="viewer-title" className="mt-1 text-2xl font-medium">{activity.title}</h3>
              <p className="mt-1 text-sm muted">{activity.location}</p>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 flex-none place-items-center rounded-full border hairline" aria-label="Close photos">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed muted">{activity.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {activity.photos.map((ph) => (
              <ImageSlot key={ph.caption + (ph.src ?? ph.suggested)} image={ph} className="aspect-[3/2]" sizes="(min-width: 768px) 480px, 100vw" />
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Activities() {
  const [cat, setCat] = useState<ActivityCategory | "All">("All");
  const [open, setOpen] = useState<Activity | null>(null);
  const list = useMemo(
    () =>
      activities
        .filter((a) => a.enabled && (cat === "All" || a.category === cat))
        .sort((a, b) => b.sortDate.localeCompare(a.sortDate)),
    [cat],
  );
  const usedCats = CATS.filter((c) => activities.some((a) => a.enabled && a.category === c));

  return (
    <section id="activities" aria-labelledby="activities-title" className="band-tint py-20 md:py-28">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Activities & gallery</p>
          <h2 id="activities-title" className="mt-3 text-3xl font-medium leading-[1.1] md:text-[2.6rem]">In the room, on the ground</h2>
          <p className="mt-4 text-lg leading-relaxed muted">
            Workshops, conferences, training and community sessions. Photos are shown only from the events they describe.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter activities by type">
          {(["All", ...usedCats] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`chip !py-1.5 ${cat === c ? "is-on" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => {
            const cover = a.photos[0];
            const realCount = a.photos.filter((p) => p.src).length;
            const hasVisual = Boolean(cover && (cover.src || siteConfig.reviewMode));
            return (
              <Reveal as="li" key={a.id} delay={(i % 3) * 0.05} className="card group flex min-w-0 flex-col overflow-hidden">
                {hasVisual ? (
                  <div className="relative">
                    <ImageSlot image={cover} className="aspect-[3/2] !rounded-none !border-0 border-b" showCaption={false} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                    {a.upcoming && <span className="pill-next absolute left-3 top-3">Upcoming</span>}
                  </div>
                ) : (
                  <div className="flex h-1.5 bg-[rgb(var(--accent))]" aria-hidden />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{a.category}</span>
                    <VerifyBadge note={a.verify} />
                  </div>
                  <h3 className="mt-3 text-lg font-medium leading-snug">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed muted">{a.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-teal-600 dark:text-teal-300" aria-hidden />{a.date}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal-600 dark:text-teal-300" aria-hidden />{a.location}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                    {(realCount > 0 || siteConfig.reviewMode) && (
                      <button type="button" onClick={() => setOpen(a)} className="btn-ghost !px-4 !py-2 text-xs" aria-haspopup="dialog">
                        {realCount > 0 ? <Images className="h-4 w-4" aria-hidden /> : <Camera className="h-4 w-4" aria-hidden />}
                        {realCount > 0 ? `View ${realCount} photo${realCount > 1 ? "s" : ""}` : `${a.photos.length} photo slot${a.photos.length > 1 ? "s" : ""}`}
                        <span className="sr-only">: {a.title}</span>
                      </button>
                    )}
                    {a.projectId && (
                      <a href={withBase(`/work/${a.projectId}`)} className="text-xs font-semibold underline decoration-orange-500 underline-offset-4">
                        Case study<span className="sr-only">: {a.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
      <PhotoViewer activity={open} onClose={() => setOpen(null)} />
    </section>
  );
}
