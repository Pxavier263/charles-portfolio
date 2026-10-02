/**
 * Base path for hosting in a sub-folder, e.g. GitHub Pages project sites
 * (https://username.github.io/charles-portfolio/). Empty everywhere else.
 * next/link and Next's own assets add it automatically; plain <a> tags,
 * downloads and next/image `src` strings need withBase().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase<T extends string | null | undefined>(path: T): T {
  if (!path || !BASE_PATH) return path;
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith(BASE_PATH + "/")) return path;
  return (BASE_PATH + path) as T;
}
