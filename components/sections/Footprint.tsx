"use client";
import { useMemo, useState } from "react";
import { footprint, programmeReach } from "@/data/footprint";
import type { FootprintType } from "@/lib/types";
import { LAND_DOTS, MAP_BOUNDS } from "../viz/landDots";
import { Reveal } from "../ui/Reveal";
import { VerifyBadge } from "../ui/VerifyBadge";

const W = 600;
const H = Math.round(W * ((MAP_BOUNDS.lat1 - MAP_BOUNDS.lat0) / (MAP_BOUNDS.lon1 - MAP_BOUNDS.lon0)));
const project = (lon: number, lat: number) => ({
  x: ((lon - MAP_BOUNDS.lon0) / (MAP_BOUNDS.lon1 - MAP_BOUNDS.lon0)) * W,
  y: ((MAP_BOUNDS.lat1 - lat) / (MAP_BOUNDS.lat1 - MAP_BOUNDS.lat0)) * H,
});

const TYPES: { id: FootprintType; color: string; shape: "circle" | "square" | "diamond" | "triangle" | "ring" }[] = [
  // Colours come from the site palette (globals.css); shapes carry the meaning too.
  { id: "Project Delivery", color: "rgb(var(--accent))", shape: "circle" },
  { id: "Conference", color: "rgb(var(--highlight))", shape: "diamond" },
  { id: "Training", color: "rgb(var(--slate))", shape: "square" },
  { id: "Presentation", color: "rgb(var(--text))", shape: "triangle" },
  { id: "Regional Programme", color: "rgb(var(--accent))", shape: "ring" },
];

function Marker({ shape, color, size = 7 }: { shape: string; color: string; size?: number }) {
  if (shape === "square") return <rect x={-size} y={-size} width={size * 2} height={size * 2} fill={color} rx={2} />;
  if (shape === "diamond") return <rect x={-size} y={-size} width={size * 2} height={size * 2} fill={color} transform="rotate(45)" />;
  if (shape === "triangle") return <polygon points={`0,${-size - 2} ${size + 1},${size} ${-size - 1},${size}`} fill={color} />;
  if (shape === "ring") return <circle r={size} fill="none" stroke={color} strokeWidth={3} />;
  return <circle r={size} fill={color} />;
}

const primaryType = (types: FootprintType[]) => TYPES.find((t) => types.includes(t.id)) ?? TYPES[0];
const presence = (v: boolean | null, upcoming?: boolean) =>
  upcoming ? "Upcoming" : v === true ? "In person" : v === false ? "Remote / programme reach" : "Presence to be confirmed";

export function Footprint() {
  const [filter, setFilter] = useState<FootprintType | "all">("all");
  const [active, setActive] = useState<string>("abuja");
  const shown = useMemo(() => footprint.filter((f) => filter === "all" || f.types.includes(filter)), [filter]);
  const sel = footprint.find((f) => f.id === active);

  return (
    <section id="footprint" aria-labelledby="footprint-title" className="band-canvas py-20 md:py-28">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">International engagement</p>
          <h2 id="footprint-title" className="mt-3 text-3xl font-medium md:text-[2.6rem]">My professional footprint</h2>
          <p className="mt-4 text-lg muted">
            Where programmes, workshops, training and presentations have taken place. Physical presence is only shown where confirmed.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter locations by activity type">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={`chip !py-1.5 ${filter === "all" ? "is-on" : ""}`}>
            All
          </button>
          {TYPES.map((t) => (
            <button key={t.id} type="button" aria-pressed={filter === t.id} onClick={() => setFilter(t.id)} className={`chip gap-2 !py-1.5 ${filter === t.id ? "is-on" : ""}`}>
              <svg width="14" height="14" viewBox="-8 -8 16 16" aria-hidden><Marker shape={t.shape} color={t.color} size={5} /></svg>
              {t.id}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card relative overflow-hidden p-3 sm:p-5">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Map of Africa and southern Europe showing professional activity locations. The same information is listed alongside.">
              {LAND_DOTS.map(([lon, lat], i) => {
                const p = project(lon, lat);
                return <circle key={i} cx={p.x} cy={p.y} r={2.4} fill="rgb(var(--line) / 0.14)" />;
              })}
              {/* Regional programme reach — a soft halo over the continent, not a travel marker */}
              {(filter === "all" || filter === "Regional Programme") && (() => {
                const c = project(18, 2);
                return (
                  <g>
                    <ellipse cx={c.x} cy={c.y} rx={W * 0.36} ry={H * 0.38} fill="none" stroke="rgb(var(--accent))" strokeWidth={2} strokeDasharray="4 7" opacity={0.7} />
                    <text x={c.x} y={c.y + H * 0.38 + 16} textAnchor="middle" style={{ fontSize: 11, fontWeight: 600 }} fill="rgb(var(--accent))">
                      Programme reach: 14 countries
                    </text>
                  </g>
                );
              })()}
              {shown.map((f) => {
                const p = project(f.lon, f.lat);
                const t = primaryType(f.types);
                const isActive = active === f.id;
                return (
                  <g key={f.id} transform={`translate(${p.x} ${p.y})`} className="cursor-pointer" onClick={() => setActive(f.id)}>
                    {isActive && <circle r={16} fill={t.color} opacity={0.18} />}
                    <g opacity={f.upcoming ? 0.75 : 1}>
                      <Marker shape={t.shape} color={t.color} size={isActive ? 8 : 6.5} />
                    </g>
                    {f.upcoming && <circle r={12} fill="none" stroke={t.color} strokeDasharray="2 3" />}
                    <text x={11} y={4} style={{ fontSize: 12, fontWeight: isActive ? 700 : 500 }} className="fill-current">
                      {f.city ?? f.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div>
            <ul className="space-y-2" aria-label="Locations">
              {shown.map((f) => {
                const t = primaryType(f.types);
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(f.id)}
                      aria-expanded={active === f.id}
                      className={`w-full rounded-2xl border p-4 text-left transition ${active === f.id ? "border-teal-500 bg-[rgb(var(--surface))] shadow-soft" : "hairline hover:border-teal-500/50"}`}
                    >
                      <span className="flex items-center gap-3">
                        <svg width="16" height="16" viewBox="-9 -9 18 18" aria-hidden><Marker shape={t.shape} color={t.color} size={6} /></svg>
                        <span className="font-semibold">{f.city ? `${f.city}, ${f.country}` : f.country}</span>
                        <span className="ml-auto text-xs muted">{presence(f.inPerson, f.upcoming)}</span>
                      </span>
                      {active === f.id && sel && (
                        <span className="mt-3 block">
                          <span className="block text-xs muted">{f.types.join(" · ")}</span>
                          <span className="mt-2 block space-y-1">
                            {f.activities.map((a) => (
                              <span key={a} className="block text-sm">— {a}</span>
                            ))}
                          </span>
                          <VerifyBadge note={f.verify} className="mt-2" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 rounded-2xl border border-dashed border-teal-500/50 p-4">
              <p className="text-sm font-semibold">{programmeReach.label}</p>
              <p className="mt-1 text-sm muted">{programmeReach.text}</p>
              <VerifyBadge note={programmeReach.verify} className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
