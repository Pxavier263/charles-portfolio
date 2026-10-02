"use client";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { profile, siteConfig } from "@/data/profile";
import { withBase } from "@/lib/paths";

const NODES = [
  { id: "data", label: "Data", note: "Evidence on what is happening" },
  { id: "policy", label: "Policy", note: "Rules and priorities that shape action" },
  { id: "people", label: "People", note: "Communities, youth and professionals" },
  { id: "programmes", label: "Programmes", note: "Where plans become delivery" },
  { id: "onehealth", label: "One Health", note: "Human, animal and environmental health together" },
];

const SIZE = 440;
const C = SIZE / 2;
const R = 158;
const pos = NODES.map((_, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180);
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
});

/**
 * Signature interaction: five practice areas connected around public-health impact.
 * Nodes drift gently toward the pointer (off when reduced motion is on); hover/focus highlights links.
 * If profile.headshot is set, the portrait sits in the centre.
 */
export function EcosystemGraphic({ showNote = true }: { showNote?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  const shift = (i: number) => {
    const depth = 5 + (i % 3) * 3;
    return { x: tilt.x * depth, y: tilt.y * depth };
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="eco-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R + 36} fill="none" stroke="rgb(var(--line) / 0.07)" />
        <circle cx={C} cy={C} r={R - 40} fill="url(#eco-glow)" />
        {pos.map((p, i) =>
          pos.slice(i + 1).map((q, k) => {
            const j = i + 1 + k;
            const lit = active !== null && (active === i || active === j);
            const a = shift(i), b = shift(j);
            return (
              <line
                key={`${i}-${j}`}
                x1={p.x + a.x} y1={p.y + a.y} x2={q.x + b.x} y2={q.y + b.y}
                stroke={lit ? "rgb(var(--accent))" : "rgb(var(--line) / 0.12)"}
                strokeWidth={lit ? 1.4 : 1}
                style={{ transition: "stroke 0.3s, x1 0.4s, y1 0.4s, x2 0.4s, y2 0.4s" }}
              />
            );
          }),
        )}
        {pos.map((p, i) => {
          const s = shift(i);
          return (
            <line
              key={`s-${i}`}
              x1={C} y1={C} x2={p.x + s.x} y2={p.y + s.y}
              stroke="rgb(var(--accent))"
              strokeOpacity={active === null || active === i ? 0.7 : 0.15}
              strokeWidth={1.4}
              strokeDasharray="3 6"
              className="eco-flow"
            />
          );
        })}
        <circle cx={C} cy={C} r={62} fill="rgb(var(--surface))" stroke="rgb(var(--accent))" strokeWidth={1.5} />
        <circle cx={C} cy={C} r={70} fill="none" stroke="rgb(var(--highlight))" strokeOpacity={0.5} strokeDasharray="1 5" />
        {!profile.headshot && !siteConfig.reviewMode && (
          <>
            <text x={C} y={C - 6} textAnchor="middle" className="fill-current font-sans" style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 600 }}>PUBLIC HEALTH</text>
            <text x={C} y={C + 12} textAnchor="middle" className="fill-current font-sans" style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 600 }}>IMPACT</text>
          </>
        )}
      </svg>

      {!profile.headshot && siteConfig.reviewMode && (
        <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-dashed border-[rgb(var(--accent)/0.5)] text-center" aria-hidden>
          <ImagePlus className="h-5 w-5 text-teal-700 dark:text-teal-300" />
          <span className="mt-1 text-[0.6rem] font-semibold leading-tight">Headshot<br />images/headshot.jpg</span>
        </div>
      )}

      {profile.headshot && (
        <div className="absolute left-1/2 top-1/2 h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <Image src={withBase(profile.headshot)} alt={`Portrait of ${profile.name}`} fill sizes="120px" className="object-cover" priority />
        </div>
      )}

      {NODES.map((n, i) => {
        const s = shift(i);
        return (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`absolute rounded-full border px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] shadow-soft transition-[background-color,border-color,color,transform] duration-300 sm:text-xs ${
              active === i ? "is-on scale-105" : "hairline bg-[rgb(var(--surface))]"
            }`}
            style={{
              left: `${(pos[i].x / SIZE) * 100}%`,
              top: `${(pos[i].y / SIZE) * 100}%`,
              transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px))`,
            }}
            aria-describedby={showNote ? "eco-note" : undefined}
          >
            {n.label}
          </button>
        );
      })}

      {showNote && (
        <p id="eco-note" className="absolute inset-x-0 -bottom-2 text-center text-xs muted" aria-live="polite">
          {active === null ? "Data · Policy · People · Programmes · One Health" : NODES[active].note}
        </p>
      )}
      <style>{`@keyframes eco{to{stroke-dashoffset:-18}}.eco-flow{animation:eco 1.6s linear infinite}@media (prefers-reduced-motion: reduce){.eco-flow{animation:none}}`}</style>
    </div>
  );
}
