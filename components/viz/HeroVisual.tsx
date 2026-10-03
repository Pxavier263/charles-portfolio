"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { BarChart3, ClipboardCheck, ImagePlus, Leaf, ScrollText, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { profile, siteConfig } from "@/data/profile";
import { withBase } from "@/lib/paths";
import { LAND_DOTS, MAP_BOUNDS } from "./landDots";

/**
 * HERO VISUAL: your portrait with five floating, glowing labels.
 *  - Labels float gently on their own (each at its own pace).
 *  - They drift with the mouse at different depths (spring-smoothed parallax), and the
 *    portrait, orbit and glow layers move too, so the scene feels 3-D.
 *  - Hovering or focusing a label lifts and brightens it, shows what it means, and tints
 *    the glow behind the portrait in that label's colour.
 *  - All motion stops for visitors who ask their device to reduce motion.
 *
 * Portrait, in order of preference (data/profile.ts):
 *  1. heroPortrait: a cut-out PNG with a transparent background (the floating, frameless look)
 *  2. headshot    : a normal photo, shown in a glowing round frame
 *  3. nothing     : your initials (live site) or a labelled placeholder (review mode)
 */

type Label = {
  id: string;
  text: string;
  note: string;
  icon: ComponentType<{ className?: string }>;
  /** RGB triplet for this label's glow */
  rgb: string;
  /** Position of the label's centre, % of the visual */
  x: number;
  y: number;
  /** Parallax depth in px at full mouse travel (bigger = closer to the viewer) */
  depth: number;
  tilt: number;
};

const LABELS: Label[] = [
  { id: "data", text: "Data", note: "Evidence on what is happening", icon: BarChart3, rgb: "42 139 163", x: 30, y: 13, depth: 26, tilt: -6 },
  { id: "onehealth", text: "One Health", note: "Human, animal and environmental health together", icon: Leaf, rgb: "47 143 131", x: 18, y: 42, depth: 18, tilt: 5 },
  { id: "programmes", text: "Programmes", note: "Where plans become delivery", icon: ClipboardCheck, rgb: "227 100 20", x: 20, y: 70, depth: 30, tilt: -5 },
  { id: "policy", text: "Policy", note: "Rules and priorities that shape action", icon: ScrollText, rgb: "21 95 113", x: 86, y: 33, depth: 22, tilt: -7 },
  { id: "people", text: "People", note: "Communities, youth and professionals", icon: Users, rgb: "236 130 64", x: 84, y: 68, depth: 28, tilt: -5 },
];

const DEFAULT_GLOW = "42 139 163";

/**
 * Reduced-motion preference, read only after the page has loaded. The server can't know it,
 * so reading it during the first render would make the server and browser disagree (a React hydration error).
 */
function useCalmMotion() {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}

/** A layer that follows the (spring-smoothed) mouse by `depth` px. Negative depth moves the opposite way. */
function Layer({ sx, sy, depth, className, children }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; className?: string; children: React.ReactNode }) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}

function FloatingLabel({ l, i, sx, sy, active, setActive }: { l: Label; i: number; sx: MotionValue<number>; sy: MotionValue<number>; active: string | null; setActive: (id: string | null) => void }) {
  const reduce = useCalmMotion();
  const x = useTransform(sx, (v) => v * l.depth);
  const y = useTransform(sy, (v) => v * l.depth);
  const rotate = useTransform(sx, (v) => l.tilt + v * 3);
  const isOn = active === l.id;
  const dimmed = active !== null && !isOn;
  const Icon = l.icon;
  return (
    <motion.div className="absolute z-20" style={{ left: `${l.x}%`, top: `${l.y}%`, x, y }}>
     <div className="-translate-x-1/2 -translate-y-1/2" style={{ "--c": l.rgb } as React.CSSProperties}>
      {/* idle float: each label at its own pace */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0, 5, 0] }}
        transition={{ duration: 6 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
      >
        <motion.button
          type="button"
          onMouseEnter={() => setActive(l.id)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(l.id)}
          onBlur={() => setActive(null)}
          aria-describedby={`hv-note-${l.id}`}
          style={{ rotate }}
          animate={{ scale: isOn ? 1.08 : 1, opacity: dimmed ? 0.55 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group relative whitespace-nowrap rounded-full border bg-white/80 py-2 pl-2 pr-5 shadow-[0_8px_30px_-10px_rgb(var(--c)/0.6),0_0_0_1px_rgb(var(--c)/0.25)] backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 [border-color:rgb(var(--c)/0.55)] hover:shadow-[0_10px_40px_-6px_rgb(var(--c)/0.85),0_0_24px_rgb(var(--c)/0.45)] focus-visible:shadow-[0_10px_40px_-6px_rgb(var(--c)/0.85),0_0_24px_rgb(var(--c)/0.45)] dark:bg-ink-950/55 sm:pl-2.5 sm:pr-6"
        >
          <span className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl text-[rgb(var(--c))] [background:rgb(var(--c)/0.14)] sm:h-10 sm:w-10" aria-hidden>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-900 dark:text-white sm:text-sm xl:text-base">{l.text}</span>
          </span>
          {/* what it means: appears on hover / focus */}
          <span
            id={`hv-note-${l.id}`}
            className={`pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-ink-950/90 px-3 py-1.5 text-center text-xs font-medium normal-case tracking-normal text-white shadow-lift transition-all duration-300 ${isOn ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
          >
            {l.note}
          </span>
        </motion.button>
      </motion.div>
     </div>
    </motion.div>
  );
}

function PortraitImage() {
  // Read defensively so older copies of data/profile.ts (without heroPortrait) still build.
  const heroPortrait = (profile as { heroPortrait?: string | null }).heroPortrait ?? null;
  if (heroPortrait) {
    // Cut-out: transparent PNG standing in the scene, fading into the waves at the bottom
    return (
      <div className="absolute inset-x-[12%] bottom-0 top-[8%] [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]">
        <Image src={withBase(heroPortrait)} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 520px, 80vw" className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
      </div>
    );
  }
  const ring = "absolute left-1/2 top-[48%] aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full";
  if (profile.headshot) {
    return (
      <div className={`${ring} ring-2 ring-[rgb(var(--accent)/0.6)] ring-offset-4 ring-offset-transparent`}>
        <Image src={withBase(profile.headshot)} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 340px, 60vw" className="object-cover" />
      </div>
    );
  }
  if (siteConfig.reviewMode) {
    return (
      <div className="absolute inset-x-[22%] bottom-[6%] top-[14%] flex flex-col items-center justify-center rounded-t-full border-2 border-dashed border-[rgb(var(--accent)/0.55)] bg-[rgb(var(--surface)/0.35)] px-6 text-center" aria-hidden>
        <ImagePlus className="h-7 w-7 text-teal-700 dark:text-teal-300" />
        <p className="mt-2 text-sm font-semibold">Your portrait</p>
        <p className="mt-1 text-xs muted">Best: photo with background removed (transparent PNG)</p>
        <code className="mt-2 rounded bg-[rgb(var(--surface))] px-2 py-0.5 text-[0.65rem] muted">public/images/hero-portrait.png</code>
      </div>
    );
  }
  return (
    <div className={`${ring} grid place-items-center bg-teal-700`} role="img" aria-label={profile.name}>
      <span className="font-serif text-6xl text-white">{profile.initials}</span>
    </div>
  );
}

export function HeroVisual() {
  const reduce = useCalmMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 16, mass: 0.6 });
  const [active, setActive] = useState<string | null>(null);
  const glow = LABELS.find((l) => l.id === active)?.rgb ?? DEFAULT_GLOW;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2)));
    my.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2)));
  };
  const reset = () => { mx.set(0); my.set(0); };

  // Faint dotted Africa behind the portrait
  const dots = useMemo(() => {
    const lon0 = -19, lon1 = 52, lat0 = -36, lat1 = 37;
    return LAND_DOTS.filter(([lon, lat]) => lon >= lon0 && lon <= lon1 && lat >= lat0 && lat <= lat1 && !(lon > 33 && lat > 13)).map(([lon, lat]) => ({
      x: ((lon - lon0) / (lon1 - lon0)) * 100,
      y: ((lat1 - lat) / (lat1 - lat0)) * 100,
    }));
  }, []);
  void MAP_BOUNDS;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto aspect-[1/1.02] w-full max-w-[600px] select-none"
    >
      {/* colour glows (behind everything; react to the hovered label) */}
      <Layer sx={sx} sy={sy} depth={-18} className="pointer-events-none absolute inset-0">
        <div aria-hidden className="absolute left-1/2 top-[46%] h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[background] duration-700" style={{ background: `radial-gradient(circle, rgb(${glow} / 0.62) 0%, rgb(${glow} / 0.22) 38%, transparent 66%)` }} />
        <div aria-hidden className="absolute right-[-6%] top-[18%] h-[45%] w-[38%] rounded-full bg-orange-400/20 blur-3xl" />
        <div aria-hidden className="absolute bottom-[4%] left-[2%] h-[35%] w-[40%] rounded-full bg-teal-400/20 blur-3xl" />
      </Layer>

      {/* dotted Africa */}
      <Layer sx={sx} sy={sy} depth={-8} className="pointer-events-none absolute inset-[6%_0_14%_30%]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full opacity-40 dark:opacity-30" aria-hidden>
          {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={0.55} fill="rgb(var(--accent))" />)}
        </svg>
      </Layer>

      {/* orbit rings with travelling lights */}
      <Layer sx={sx} sy={sy} depth={10} className="pointer-events-none absolute inset-0 z-10">
        <svg viewBox="0 0 600 612" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="hv-orbit" x1="0" x2="1">
              <stop offset="0" stopColor="rgb(42 139 163)" stopOpacity="0.8" />
              <stop offset="0.5" stopColor="rgb(227 100 20)" stopOpacity="0.6" />
              <stop offset="1" stopColor="rgb(15 76 92)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path id="hv-orbit-a" d="M300,70 C110,70 70,260 110,380 C150,500 250,470 300,470" fill="none" stroke="url(#hv-orbit)" strokeWidth="1.4" strokeDasharray="2 7" opacity="0.8" />
          <path id="hv-orbit-b" d="M300,90 C470,80 560,200 520,320 C490,410 420,440 380,450" fill="none" stroke="url(#hv-orbit)" strokeWidth="1.2" strokeDasharray="2 7" opacity="0.6" />
          {[[300, 70], [110, 380], [520, 320]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r="3.5" fill="rgb(42 139 163)" />)}
          {!reduce && (
            <>
              <circle r="4" fill="rgb(227 100 20)"><animateMotion dur="9s" repeatCount="indefinite"><mpath href="#hv-orbit-a" /></animateMotion></circle>
              <circle r="3.5" fill="rgb(42 139 163)"><animateMotion dur="12s" repeatCount="indefinite" begin="-4s"><mpath href="#hv-orbit-b" /></animateMotion></circle>
            </>
          )}
        </svg>
      </Layer>

      {/* halo ring: glows in the hovered label's colour */}
      <Layer sx={sx} sy={sy} depth={-4} className="pointer-events-none absolute inset-0 z-[5]">
        <div
          aria-hidden
          className="absolute left-1/2 top-[38%] aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[border-color,box-shadow] duration-700"
          style={{ borderColor: `rgb(${glow} / 0.55)`, boxShadow: `0 0 60px 6px rgb(${glow} / 0.35), inset 0 0 60px rgb(${glow} / 0.25)` }}
        />
      </Layer>

      {/* portrait */}
      <Layer sx={sx} sy={sy} depth={-6} className="absolute inset-0 z-10">
        <PortraitImage />
      </Layer>

      {/* flowing light waves at the bottom */}
      <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-2%] z-10 h-[26%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]" aria-hidden>
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="hv-waves h-full w-[200%]">
          <defs>
            <linearGradient id="hv-wave" x1="0" x2="1">
              <stop offset="0" stopColor="rgb(42 139 163)" />
              <stop offset="0.35" stopColor="rgb(15 76 92)" />
              <stop offset="0.7" stopColor="rgb(236 130 64)" />
              <stop offset="1" stopColor="rgb(42 139 163)" />
            </linearGradient>
            <filter id="hv-wave-glow" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>
          {[0, 1, 2].map((k) => {
            const d = `M0,${90 + k * 14} C150,${40 + k * 18} 300,${140 - k * 10} 600,${90 + k * 14} S900,${40 + k * 18} 1200,${90 + k * 14}`;
            return (
              <g key={k} opacity={0.9 - k * 0.22}>
                <path d={d} fill="none" stroke="url(#hv-wave)" strokeWidth={k === 0 ? 8 : 5} filter="url(#hv-wave-glow)" opacity={0.6} />
                <path d={d} fill="none" stroke="url(#hv-wave)" strokeWidth={k === 0 ? 2.4 : 1.4} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* floating labels */}
      {LABELS.map((l, i) => (
        <FloatingLabel key={l.id} l={l} i={i} sx={sx} sy={sy} active={active} setActive={setActive} />
      ))}

      <style>{`@keyframes hv-flow{to{transform:translateX(-50%)}}.hv-waves{animation:hv-flow 16s linear infinite}@media (prefers-reduced-motion: reduce){.hv-waves{animation:none}}`}</style>
    </div>
  );
}
