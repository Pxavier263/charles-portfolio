"use client";
import { useState } from "react";
import { copWorkingGroups } from "@/data/projects";

/** Radial network of the Community of Practice's thematic working areas. */
export function NetworkViz() {
  const [hover, setHover] = useState<number | null>(null);
  const W = 760, H = 380, cx = W / 2, cy = H / 2, rx = 190, ry = 135;
  const nodes = copWorkingGroups.map((g, i) => {
    const a = (-90 + (360 / copWorkingGroups.length) * i) * (Math.PI / 180);
    return { g, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return (
    <figure>
      <p className="eyebrow">Thematic working areas</p>
      {/* Desktop / tablet: network */}
      <div className="relative mt-4 hidden sm:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Network of ${copWorkingGroups.length} thematic working areas around the Community of Practice: ${copWorkingGroups.join(", ")}`}>
          {nodes.map((n, i) => (
            <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="rgb(var(--accent))" strokeOpacity={hover === null || hover === i ? 0.55 : 0.12} strokeWidth={1.3} />
          ))}
          {nodes.map((n, i) => {
            const j = (i + 1) % nodes.length;
            return <line key={`r${i}`} x1={n.x} y1={n.y} x2={nodes[j].x} y2={nodes[j].y} stroke="rgb(var(--line) / 0.1)" />;
          })}
          <circle cx={cx} cy={cy} r={50} fill="rgb(var(--accent))" />
          <text x={cx} y={cy - 4} textAnchor="middle" fill="white" style={{ fontSize: 20, fontWeight: 700 }}>500+</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="white" style={{ fontSize: 9, letterSpacing: "0.12em" }}>MEMBERS</text>
          {nodes.map((n, i) => (
            <g key={n.g} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <circle cx={n.x} cy={n.y} r={hover === i ? 9 : 6} fill={hover === i ? "rgb(var(--highlight))" : "rgb(var(--surface))"} stroke="rgb(var(--accent))" strokeWidth={2} className="transition-all" />
              <text
                x={n.x + (n.x < cx - 5 ? -14 : n.x > cx + 5 ? 14 : 0)}
                y={n.y + (Math.abs(n.x - cx) < 6 ? -14 : 4)}
                textAnchor={n.x < cx - 5 ? "end" : n.x > cx + 5 ? "start" : "middle"}
                className="fill-current"
                style={{ fontSize: 12, fontWeight: hover === i ? 700 : 500 }}
              >
                {n.g}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {/* Mobile: simplified list */}
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:hidden">
        {copWorkingGroups.map((g) => (
          <li key={g} className="flex items-center gap-3 rounded-xl bg-paper-100 px-4 py-3 text-sm dark:bg-ink-800/60">
            <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden /> {g}
          </li>
        ))}
      </ul>
    </figure>
  );
}
