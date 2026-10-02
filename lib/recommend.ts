import { projects } from "@/data/projects";
import type { Project } from "@/lib/types";

const overlap = <T,>(a: T[], b: T[]) => a.filter((x) => b.includes(x));

export interface Recommendation {
  project: Project;
  score: number;
  reasons: string[];
}

/** Explainable similarity between two projects. */
export function similarity(a: Project, b: Project) {
  const skills = overlap(a.skills, b.skills);
  const sectors = overlap(a.sectors, b.sectors);
  const tags = overlap(a.tags, b.tags);
  let score = skills.length * 2 + sectors.length + tags.length * 0.5;
  if (a.type === b.type) score += 1;
  if (a.related?.includes(b.id) || b.related?.includes(a.id)) score += 4;
  const reasons = [
    ...(a.related?.includes(b.id) ? ["Same body of work"] : []),
    ...skills.slice(0, 2).map((s) => `Also uses ${s.toLowerCase()}`),
    ...(sectors[0] ? [`Same sector: ${sectors[0]}`] : []),
  ];
  return { score, reasons };
}

/**
 * Recommends work related to what the visitor is viewing now, boosted by what they
 * viewed earlier in this browser (history is stored only in their browser).
 */
export function recommend(currentId: string | null, history: string[] = [], limit = 3): Recommendation[] {
  const current = projects.find((p) => p.id === currentId) ?? null;
  const seen = history.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[];
  return projects
    .filter((p) => p.id !== currentId)
    .map((p) => {
      const base = current ? similarity(current, p) : { score: 0, reasons: [] as string[] };
      const hist = seen.filter((h) => h.id !== p.id).reduce((acc, h) => acc + similarity(h, p).score * 0.4, 0);
      const unseenBonus = history.includes(p.id) ? -2 : 0.5;
      const featured = p.homeOrder ? 0.5 : 0;
      const reasons = base.reasons.length ? base.reasons : hist > 0 ? ["Similar to work you viewed"] : ["Featured work"];
      return { project: p, score: base.score + hist + unseenBonus + featured, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

const KEY = "cc-viewed";
/** Per-visitor viewing history (browser only; failures are ignored). */
export function readHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
export function pushHistory(id: string) {
  try {
    const h = [id, ...readHistory().filter((x) => x !== id)].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(h));
  } catch {}
}
