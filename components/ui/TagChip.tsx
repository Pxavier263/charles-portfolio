import { TAGS } from "@/data/profile";
import type { Tag } from "@/lib/types";

export const tagLabel = (t: Tag) => TAGS.find((x) => x.id === t)?.label ?? t;

export function TagList({ tags, max }: { tags: Tag[]; max?: number }) {
  const shown = max ? tags.slice(0, max) : tags;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
      {shown.map((t) => (
        <li key={t} className="chip muted">{tagLabel(t)}</li>
      ))}
    </ul>
  );
}
