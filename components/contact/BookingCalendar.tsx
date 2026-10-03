"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, ExternalLink, Globe2, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { availability } from "@/data/conversion";
import { siteConfig } from "@/data/profile";
import { canSubmit, rules, submitForm, validate, type Values } from "@/lib/forms";
import { track } from "@/lib/track";
import { ErrorSummary, Honeypot, SelectField, TextArea, TextField } from "../forms/Fields";
import { VerifyBadge } from "../ui/VerifyBadge";
import { SuccessPanel } from "./SuccessPanel";

/* ---------- time-zone helpers (no libraries) ---------- */
const partsIn = (tz: string, t: number) => {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const o: Record<string, number> = {};
  for (const p of f.formatToParts(new Date(t))) if (p.type !== "literal") o[p.type] = Number(p.value);
  return o;
};
/** Converts a wall-clock time in `tz` to a UTC timestamp. */
export function zonedToUtc(date: string, time: string, tz: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const p = partsIn(tz, guess);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return guess - (asUtc - guess);
}
const ymdIn = (tz: string, t: number) => {
  const p = partsIn(tz, t);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
};
const addDays = (ymd: string, n: number) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};
const dow = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
};

interface Slot { date: string; time: string; utc: number }

/** All bookable slots from the weekly pattern, minus blackout dates and short-notice slots. */
export function buildSlots(now: number) {
  const tz = availability.timeZone;
  const today = ymdIn(tz, now);
  const minTime = now + availability.minNoticeHours * 3600e3;
  const days: { date: string; slots: Slot[] }[] = [];
  for (let i = 0; i <= availability.daysAhead; i++) {
    const date = addDays(today, i);
    const times = availability.blackout.includes(date) ? [] : availability.weekly[dow(date)] ?? [];
    const slots = times.map((time) => ({ date, time, utc: zonedToUtc(date, time, tz) })).filter((s) => s.utc >= minTime);
    days.push({ date, slots });
  }
  return days;
}

const LABELS: Record<string, string> = { name: "Name", email: "Email", topic: "Topic", notes: "Notes" };
const SCHEMA = {
  name: [rules.required("Please enter your name.")],
  email: [rules.required("Please enter your email address."), rules.email()],
  topic: [rules.required("Please choose a topic.")],
  notes: [rules.max(500)],
};

/**
 * Availability calendar with consultation slots.
 * Slots come from data/conversion.ts (your time zone) and are shown in the visitor's time zone.
 * Without a scheduling service this sends a booking REQUEST (confirmed by email): the page says so.
 */
export function BookingCalendar() {
  const [now, setNow] = useState<number | null>(null);
  const [visitorTz, setVisitorTz] = useState("");
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [v, setV] = useState<Values>({ name: "", email: "", organisation: "", topic: availability.topics[0], notes: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tried, setTried] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(Date.now());
    setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const days = useMemo(() => (now ? buildSlots(now) : []), [now]);

  // Arrange into Monday-first weeks
  const weeks = useMemo(() => {
    if (!days.length) return [];
    const lead = (dow(days[0].date) + 6) % 7;
    const cells: ({ date: string; slots: Slot[] } | null)[] = [...Array(lead).fill(null), ...days];
    while (cells.length % 7) cells.push(null);
    const out = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [days]);

  // Open on the first week that has a free slot
  useEffect(() => {
    const first = weeks.findIndex((w) => w.some((c) => c && c.slots.length));
    if (first > 0) setWeek(first);
  }, [weeks]);

  if (!availability.confirmed && !siteConfig.reviewMode) {
    return availability.bookingUrl ? (
      <div className="card flex flex-col items-start gap-4 p-8">
        <CalendarCheck className="h-8 w-8 text-teal-700 dark:text-teal-300" aria-hidden />
        <h3 className="text-2xl font-medium">Book a consultation</h3>
        <a href={availability.bookingUrl} target="_blank" rel="noopener noreferrer" data-cta="booking-external" className="btn-primary">Open the booking calendar <ExternalLink className="h-4 w-4" aria-hidden /></a>
      </div>
    ) : null;
  }

  const fmt = (t: number, tz: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...o }).format(new Date(t));
  const dayLabel = (d: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(new Date(`${d}T12:00:00Z`));
  const sameTz = visitorTz === availability.timeZone;
  const slotText = (s: Slot) =>
    `${fmt(s.utc, visitorTz || availability.timeZone, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}${visitorTz && !sameTz ? ` (${visitorTz.replace(/_/g, " ")}), which is ${fmt(s.utc, availability.timeZone, { hour: "2-digit", minute: "2-digit" })} ${availability.timeZoneLabel}` : ` ${availability.timeZoneLabel}`}`;
  const selectedDay = days.find((d) => d.date === day);
  const set = (k: string) => (val: string) => { const n = { ...v, [k]: val }; setV(n); if (tried) setErrors(validate(n, SCHEMA)); };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (v.company || !slot) return;
    const errs = validate(v, SCHEMA);
    setErrors(errs);
    setTried(true);
    if (Object.keys(errs).length) return setTimeout(() => summaryRef.current?.focus(), 0);
    setState("sending");
    const res = await submitForm("booking", `Consultation request: ${slotText(slot)}`, {
      name: v.name.trim(),
      email: v.email.trim(),
      organisation: v.organisation.trim(),
      topic: v.topic,
      requestedSlot: slotText(slot),
      requestedSlotUtc: new Date(slot.utc).toISOString(),
      visitorTimeZone: visitorTz,
      notes: v.notes.trim(),
    });
    setState(res === "sent" ? "sent" : res === "mailto" ? "mailto" : "error");
  }

  if (state === "sent" || state === "mailto") {
    return (
      <SuccessPanel title={state === "sent" ? "Request received" : "Your email is ready to send"} onReset={() => { setSlot(null); setDay(null); setState("idle"); }} resetLabel="Request another time">
        {state === "sent" ? (
          <>
            <p>You asked for <strong className="text-[rgb(var(--text))]">{slot && slotText(slot)}</strong>.</p>
            <p className="mt-2">This time is <strong>not yet confirmed</strong>. You&apos;ll get an email confirming it, or suggesting another time.</p>
          </>
        ) : (
          <p>Your email app should have opened with the requested time filled in. Press send there to reach me.</p>
        )}
      </SuccessPanel>
    );
  }

  const w = weeks[week] ?? [];

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b hairline p-5 md:px-8">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-medium"><CalendarCheck className="h-5 w-5 text-teal-700 dark:text-teal-300" aria-hidden /> Book a free consultation</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm muted"><Clock className="h-3.5 w-3.5" aria-hidden /> {availability.slotMinutes}-minute video call</p>
        </div>
        <div className="flex items-center gap-2">
          {!availability.confirmed && <VerifyBadge note="Consultation hours in data/conversion.ts are placeholders. Set your real hours, then availability.confirmed = true." />}
          {availability.bookingUrl && (
            <a href={availability.bookingUrl} target="_blank" rel="noopener noreferrer" data-cta="booking-external" className="btn-ghost !py-2 text-sm">Instant booking <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.1fr_1fr]">
        {/* Calendar */}
        <div className="border-b hairline p-5 md:border-b-0 md:border-r md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold" aria-live="polite">
              {w.find(Boolean) ? new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(`${(w.find(Boolean) as { date: string }).date}T12:00:00Z`)) : "Loading…"}
            </p>
            <div className="flex gap-1">
              <button type="button" onClick={() => setWeek((x) => Math.max(0, x - 1))} disabled={week === 0} aria-label="Previous week" className="grid h-9 w-9 place-items-center rounded-full border hairline disabled:opacity-40"><ChevronLeft className="h-4 w-4" aria-hidden /></button>
              <button type="button" onClick={() => setWeek((x) => Math.min(weeks.length - 1, x + 1))} disabled={week >= weeks.length - 1} aria-label="Next week" className="grid h-9 w-9 place-items-center rounded-full border hairline disabled:opacity-40"><ChevronRight className="h-4 w-4" aria-hidden /></button>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold uppercase tracking-wider muted" aria-hidden>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={week} role="group" aria-label="Choose a day" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="mt-2 grid grid-cols-7 gap-1.5">
                {w.map((c, k) =>
                  c ? (
                    <span key={c.date}>
                      <button
                        type="button"
                        disabled={!c.slots.length}
                        aria-pressed={day === c.date}
                        aria-label={`${dayLabel(c.date)}: ${c.slots.length ? `${c.slots.length} slot${c.slots.length > 1 ? "s" : ""} available` : "no slots"}`}
                        onClick={() => { setDay(c.date); setSlot(null); }}
                        className={`relative flex aspect-square w-full flex-col items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                          day === c.date ? "is-on" : c.slots.length ? "bg-[rgb(var(--accent-wash))] text-teal-800 hover:ring-2 hover:ring-orange-500 dark:text-teal-200" : "cursor-not-allowed opacity-35"
                        }`}
                      >
                        {Number(c.date.slice(8))}
                        {c.slots.length > 0 && <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-current" aria-hidden />}
                      </button>
                    </span>
                  ) : (
                    <span key={`e${k}`} aria-hidden />
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs muted"><Globe2 className="h-3.5 w-3.5" aria-hidden /> Times shown in your time zone{visitorTz ? `: ${visitorTz.replace(/_/g, " ")}` : ""}.</p>
        </div>

        {/* Slots + form */}
        <div className="p-5 md:p-8">
          {!selectedDay ? (
            <div className="grid h-full min-h-[220px] place-items-center text-center text-sm muted">
              <p>Choose a highlighted day to see available times.</p>
            </div>
          ) : !slot ? (
            <div>
              <p className="font-semibold">{dayLabel(selectedDay.date)}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {selectedDay.slots.map((s) => (
                  <li key={s.utc}>
                    <button type="button" onClick={() => { setSlot(s); track("booking_slot_select", { date: s.date }); }} className="w-full rounded-xl border hairline px-4 py-3 text-left transition-colors hover:border-orange-500 hover:bg-[rgb(var(--accent-wash))]">
                      <span className="block font-semibold">{fmt(s.utc, visitorTz || availability.timeZone, { hour: "2-digit", minute: "2-digit" })}</span>
                      {!sameTz && <span className="block text-xs muted">{s.time} {availability.timeZoneLabel}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="rounded-xl bg-[rgb(var(--accent-wash))] p-4 text-sm">
                <p className="font-semibold">{slotText(slot)}</p>
                <button type="button" onClick={() => setSlot(null)} className="mt-1 text-xs font-semibold underline">Change time</button>
              </div>
              {tried && <ErrorSummary errors={errors} labels={LABELS} innerRef={summaryRef} />}
              <TextField id="b-name" label="Name" required value={v.name} onChange={set("name")} autoComplete="name" error={tried ? errors.name : undefined} />
              <TextField id="b-email" label="Email" type="email" required value={v.email} onChange={set("email")} autoComplete="email" error={tried ? errors.email : undefined} />
              <TextField id="b-org" label="Organisation" value={v.organisation} onChange={set("organisation")} autoComplete="organization" />
              <SelectField id="b-topic" label="Topic" required value={v.topic} onChange={set("topic")} options={availability.topics.map((t) => ({ value: t, label: t }))} error={tried ? errors.topic : undefined} />
              <TextArea id="b-notes" label="Anything I should know?" rows={3} max={500} value={v.notes} onChange={set("notes")} error={tried ? errors.notes : undefined} />
              <Honeypot value={v.company} onChange={set("company")} />
              <button type="submit" disabled={state === "sending" || !canSubmit()} className="btn-primary w-full !py-3 disabled:cursor-not-allowed disabled:opacity-60">
                {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {state === "sending" ? "Sending…" : "Request this time"}
              </button>
              <p className="text-xs muted" role="status" aria-live="polite">
                {state === "error" ? <span className="text-red-700 dark:text-red-400">Couldn&apos;t send the request. Please try again or use another contact option.</span> : !canSubmit() ? "Booking requests will be activated shortly." : "You'll get an email confirming the time."}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
