"use client";
import { animate, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { pricing, TIMELINES, type Size } from "@/data/conversion";
import { siteConfig } from "@/data/profile";
import { services } from "@/data/services";
import { track } from "@/lib/track";
import { VerifyBadge } from "../ui/VerifyBadge";
import type { EstimatePayload } from "./EnquiryForm";

/** Smoothly animated number. */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduce) return setShown(value);
    const c = animate(prev.current, value, { duration: 0.5, ease: [0.22, 1, 0.36, 1], onUpdate: setShown });
    prev.current = value;
    return () => c.stop();
  }, [value, reduce]);
  return <>{format(shown)}</>;
}

export function estimate(service: string, size: Size, addOns: Record<string, number>, timeline: string) {
  const base = pricing.effort[service]?.[size] ?? [0, 0];
  let low = base[0];
  let high = base[1];
  const lines: { label: string; low: number; high: number }[] = [{ label: `${services.find((s) => s.id === service)?.title}, ${pricing.sizes.find((z) => z.id === size)?.label.toLowerCase()}`, low: base[0], high: base[1] }];
  for (const a of pricing.addOns) {
    const n = addOns[a.id] ?? 0;
    if (!n) continue;
    lines.push({ label: `${a.label}${n > 1 ? ` × ${n}` : ""}`, low: a.perUnit[0] * n, high: a.perUnit[1] * n });
    low += a.perUnit[0] * n;
    high += a.perUnit[1] * n;
  }
  const factor = pricing.timelineFactor[timeline] ?? 1;
  const hasRate = pricing.dayRate.low !== null && pricing.dayRate.high !== null;
  const round = (n: number) => Math.round(n / 50) * 50;
  const cost = hasRate ? { low: round(low * pricing.dayRate.low! * factor), high: round(high * pricing.dayRate.high! * factor) } : null;
  const weeks = { low: Math.max(1, Math.ceil(low / pricing.daysPerWeek)), high: Math.max(1, Math.ceil(high / pricing.daysPerWeek)) };
  return { low, high, lines, factor, cost, weeks };
}

/**
 * Project estimator: scope (service + size + add-ons) and timeline → indicative effort,
 * duration and, once a day rate is configured, approximate cost.
 * Hidden on the live site until pricing.confirmed is true.
 */
export function Estimator() {
  const [service, setService] = useState(services[0].id);
  const [size, setSize] = useState<Size>("medium");
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [timeline, setTimeline] = useState("standard");
  const r = useMemo(() => estimate(service, size, addOns, timeline), [service, size, addOns, timeline]);

  if (!pricing.confirmed && !siteConfig.reviewMode) return null;

  const money = (n: number) => new Intl.NumberFormat(pricing.locale, { style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }).format(n);
  const days = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  const step = (id: string, d: number, max: number) => setAddOns((a) => ({ ...a, [id]: Math.min(max, Math.max(0, (a[id] ?? 0) + d)) }));

  const summary = () =>
    `${r.lines.map((l) => l.label).join(" + ")}; ${TIMELINES.find((t) => t.id === timeline)?.label.toLowerCase()}; ≈${days(r.low)}–${days(r.high)} working days` +
    (r.cost ? `; indicative ${money(r.cost.low)}–${money(r.cost.high)}` : "");

  const apply = () => {
    track("estimate_use", { service, size, timeline });
    window.dispatchEvent(new CustomEvent<EstimatePayload>("estimate:apply", { detail: { projectType: service, summary: summary() } }));
  };

  return (
    <div className="grid overflow-hidden rounded-3xl border hairline bg-[rgb(var(--surface))] shadow-soft lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-7 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-2xl font-medium"><Calculator className="h-5 w-5 text-teal-700 dark:text-teal-300" aria-hidden /> Estimate your project</h3>
          {!pricing.confirmed && <VerifyBadge note="Estimator values in data/conversion.ts are placeholders. Set your own effort, day rate and multipliers, then pricing.confirmed = true." />}
        </div>

        <fieldset>
          <legend className="text-sm font-semibold">1 · What do you need?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <label key={s.id} className={`cursor-pointer rounded-xl border p-3.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${service === s.id ? "is-on" : "hairline hover:border-orange-500"}`}>
                <input type="radio" name="est-service" value={s.id} checked={service === s.id} onChange={() => setService(s.id)} className="sr-only" />
                <span className="block font-semibold leading-snug">{s.title}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">2 · How big is the scope?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {pricing.sizes.map((z) => (
              <label key={z.id} className={`cursor-pointer rounded-xl border p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${size === z.id ? "is-on" : "hairline hover:border-orange-500"}`}>
                <input type="radio" name="est-size" value={z.id} checked={size === z.id} onChange={() => setSize(z.id)} className="sr-only" />
                <span className="block text-sm font-semibold">{z.label}</span>
                <span className="mt-0.5 block text-xs opacity-80">{z.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">3 · Add-ons</legend>
          <ul className="mt-3 divide-y hairline rounded-xl border hairline">
            {pricing.addOns.map((a) => {
              const n = addOns[a.id] ?? 0;
              return (
                <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <span id={`addon-${a.id}`}>{a.label}</span>
                  <span className="flex items-center gap-2" role="group" aria-labelledby={`addon-${a.id}`}>
                    <button type="button" onClick={() => step(a.id, -1, a.max)} disabled={n === 0} aria-label={`Remove one: ${a.label}`} className="grid h-8 w-8 place-items-center rounded-full border hairline disabled:opacity-40"><Minus className="h-3.5 w-3.5" aria-hidden /></button>
                    <output className="w-5 text-center font-semibold tabular-nums" aria-live="polite">{n}</output>
                    <button type="button" onClick={() => step(a.id, 1, a.max)} disabled={n >= a.max} aria-label={`Add one: ${a.label}`} className="grid h-8 w-8 place-items-center rounded-full border hairline disabled:opacity-40"><Plus className="h-3.5 w-3.5" aria-hidden /></button>
                  </span>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">4 · Timeline</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMELINES.filter((t) => t.id !== "exploring").map((t) => (
              <label key={t.id} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${timeline === t.id ? "is-on" : "hairline hover:border-orange-500"}`}>
                <input type="radio" name="est-timeline" value={t.id} checked={timeline === t.id} onChange={() => setTimeline(t.id)} className="sr-only" />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="band-ink p-6 md:p-8">
       <div className="flex flex-col lg:sticky lg:top-24" aria-live="polite">
        <p className="eyebrow !text-orange-300">Indicative estimate</p>
        {r.cost ? (
          <p className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            <AnimatedNumber value={r.cost.low} format={money} /> – <AnimatedNumber value={r.cost.high} format={money} />
          </p>
        ) : (
          <p className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            <AnimatedNumber value={r.low} format={(n) => days(Math.round(n * 2) / 2)} />–<AnimatedNumber value={r.high} format={(n) => days(Math.round(n * 2) / 2)} /> <span className="text-2xl">days</span>
          </p>
        )}
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-white/60">Effort</dt>
            <dd className="mt-0.5 font-semibold">{days(r.low)}–{days(r.high)} working days</dd>
          </div>
          <div>
            <dt className="text-white/60">Duration</dt>
            <dd className="mt-0.5 font-semibold">About {r.weeks.low === r.weeks.high ? r.weeks.low : `${r.weeks.low}–${r.weeks.high}`} week{r.weeks.high > 1 ? "s" : ""}</dd>
          </div>
        </dl>
        <ul className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
          {r.lines.map((l) => (
            <li key={l.label} className="flex justify-between gap-3"><span className="text-white/75">{l.label}</span><span className="flex-none tabular-nums">{days(l.low)}–{days(l.high)} d</span></li>
          ))}
          {r.cost && r.factor !== 1 && <li className="flex justify-between gap-3"><span className="text-white/75">Timeline adjustment</span><span className="tabular-nums">× {r.factor}</span></li>}
        </ul>
        {!r.cost && siteConfig.reviewMode && (
          <p className="mt-4 rounded-lg bg-white/10 p-3 text-xs text-white/80">Set <code>pricing.dayRate</code> in data/conversion.ts to show an approximate cost in {pricing.currency}.</p>
        )}
        <p className="mt-4 text-xs text-white/60">{pricing.disclaimer}</p>
        <button type="button" onClick={apply} data-cta="estimate-use" className="btn mt-6 w-full bg-orange-600 !py-3 text-base text-white hover:bg-orange-700">
          Use this estimate in my enquiry <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
       </div>
      </div>
    </div>
  );
}
