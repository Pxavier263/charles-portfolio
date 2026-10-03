#!/usr/bin/env node
/**
 * SITE CHECK — inspects the finished website (the `out` folder made by `npm run build:static`)
 * before it is published:
 *   - every internal link, image, CV/PDF download, stylesheet and script points to a real file
 *   - every #section link lands on a section that exists
 *   - when review mode is off: no "[DETAIL TO BE CONFIRMED]", "To confirm" badges,
 *     empty photo boxes or file-path hints have leaked onto any page
 *
 * If anything is broken it stops the deployment, so the previous (working) version stays live.
 *   npm run check:site
 */
import { existsSync, readFileSync, readdirSync, statSync, appendFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "out");
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

if (!existsSync(OUT)) {
  console.error("No `out` folder found. Run `npm run build:static` first.");
  process.exit(1);
}

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(OUT).filter((p) => p.endsWith(".html"));
const visibleHtml = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");

/** Map a site URL path to a file in `out`. */
function fileFor(pathname) {
  let p = decodeURIComponent(pathname);
  if (BASE && (p === BASE || p.startsWith(BASE + "/"))) p = p.slice(BASE.length) || "/";
  else if (BASE) return { escaped: true };
  const candidates = p.endsWith("/") ? [p + "index.html"] : [p, p + ".html", p + "/index.html"];
  for (const c of candidates) { const f = join(OUT, c); if (existsSync(f) && statSync(f).isFile()) return { file: f }; }
  return { file: null };
}

const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

const problems = [];
let checked = 0;
let reviewModeOn = false;

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const vis = visibleHtml(html);
  if (vis.includes("Review mode.")) reviewModeOn = true;
  const pageUrl = "/" + relative(OUT, page).replace(/\\/g, "/").replace(/index\.html$/, "").replace(/\.html$/, "");
  const urls = [
    ...[...vis.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...vis.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of urls) {
    const u = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(u)) continue;
    checked++;
    if (u.startsWith("#")) {
      if (u.length > 1 && !idsOf(page).has(u.slice(1))) problems.push(`${pageUrl}: link to missing section \`${u}\``);
      continue;
    }
    const url = new URL(u, "https://site.invalid" + (BASE || "") + pageUrl);
    const r = fileFor(url.pathname);
    if (r.escaped) { problems.push(`${pageUrl}: \`${u}\` points outside the site folder (\`${BASE}\`)`); continue; }
    if (!r.file) { problems.push(`${pageUrl}: \`${u}\` → file not found`); continue; }
    if (url.hash.length > 1 && r.file.endsWith(".html") && !idsOf(r.file).has(url.hash.slice(1)))
      problems.push(`${pageUrl}: \`${u}\` → section \`${url.hash}\` not found on that page`);
  }
  if (!reviewModeOn) {
    for (const [needle, what] of [
      ["[DETAIL TO BE CONFIRMED]", "an unconfirmed-detail placeholder"],
      ["To confirm", "a \"To confirm\" badge"],
      ["photo not yet added", "an empty photo box"],
      ["public/images/", "a photo file-path hint"],
    ]) if (vis.includes(needle)) problems.push(`${pageUrl}: shows ${what} on the live site`);
  }
}

const unique = [...new Set(problems)];
const report = [
  "## 🔎 Site check",
  "",
  `Checked ${pages.length} pages and ${checked} links/images/files${BASE ? ` (site folder \`${BASE}\`)` : ""}.`,
  reviewModeOn ? "ℹ️ Review mode is ON, so placeholder text is expected and was not checked." : "Placeholder check: on (review mode is off).",
  "",
  unique.length ? `### ❌ ${unique.length} problem(s) — deployment stopped, your previous version stays live\n${unique.map((p) => `- ${p}`).join("\n")}` : "### ✅ No broken links, missing files or leaked placeholders",
].join("\n");
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
process.exit(unique.length ? 1 : 0);
