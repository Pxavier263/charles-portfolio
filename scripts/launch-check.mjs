#!/usr/bin/env node
/**
 * LAUNCH CHECK — reads your content files and lists what is still unfinished.
 *
 *   npm run check:launch            → report only (always finishes)
 *   npm run check:launch -- --strict → fails if any "must fix" item remains
 *
 * On GitHub it runs automatically before every deployment; the report appears on the
 * workflow run's summary page (Actions tab → the run → "Summary").
 * It only reads files. It never changes anything.
 */
import { existsSync, readFileSync, readdirSync, statSync, appendFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const strict = process.argv.includes("--strict");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
/** Remove comments so example templates in comments are not mistaken for real settings. */
const code = (p) =>
  read(p)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !/^\s*\/\//.test(l))
    .map((l) => l.replace(/\s\/\/(?!\/).*$/, ""))
    .join("\n");

const must = [], should = [], info = [], ok = [];
const MB = (b) => (b / 1024).toFixed(0) + " KB";

/* ------------------------------------------------------------------ profile */
const profile = code("data/profile.ts");
const val = (src, key) => {
  const m = src.match(new RegExp(`\\b${key}:\\s*(null|true|false|"[^"]*"|\\{[^}]*\\})`));
  return m ? m[1] : undefined;
};
const isNull = (v) => v === undefined || v === "null";
const str = (v) => (v && v.startsWith('"') ? v.slice(1, -1) : null);

if (val(profile, "reviewMode") === "true")
  must.push("**Review mode is still ON.** In `data/profile.ts` change `reviewMode: true` to `reviewMode: false` (do this last, after the items below).");
else ok.push("Review mode is off (placeholders and \"To confirm\" badges are hidden; search engines may index the site).");

const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const email = str(val(profile, "email"));
if (formEndpoint) ok.push("Form endpoint is set, so enquiry and booking forms will deliver to Formspree.");
else if (email) should.push(`No form endpoint found here, so forms will open the visitor's email app instead (to ${email}). For proper delivery add your Formspree URL — on GitHub: Settings → Secrets and variables → Actions → Variables → \`FORM_ENDPOINT\`.`);
else must.push("**Forms cannot deliver anywhere.** Add your Formspree URL (GitHub: Settings → Secrets and variables → Actions → Variables → `FORM_ENDPOINT`) and/or set `email` in `data/profile.ts`.");
if (!process.env.GITHUB_ACTIONS && !formEndpoint)
  info.push("Running on your computer: the Formspree URL lives in GitHub/Vercel settings, so it can't be seen here. The check on GitHub shows the real status.");

if (email) ok.push(`Public email set: ${email}`);
else should.push("No public email in `data/profile.ts` (`email:`). The Email contact tile and button stay hidden.");

const linkedin = str(val(profile, "linkedin"));
if (linkedin) ok.push("LinkedIn link set.");
else should.push("No LinkedIn link in `data/profile.ts` (`linkedin:`). LinkedIn buttons stay hidden.");

const headshot = str(val(profile, "headshot"));
const cvUrl = str(val(profile, "cvUrl"));
if (!headshot) should.push("No headshot yet: save it as `public/images/headshot.jpg` and set `headshot: \"/images/headshot.jpg\"` in `data/profile.ts`. (Until then your initials show.)");
if (!str(val(profile, "heroPortrait")))
  info.push("No hero cut-out yet (`heroPortrait` in `data/profile.ts`). For the floating look on the home page, save a photo with the background removed as `public/images/hero-portrait.png` and set `heroPortrait: \"/images/hero-portrait.png\"`. Until then the hero uses your headshot in a round frame (or your initials).");
if (!cvUrl) should.push("No CV yet: save the PDF in `public/cv/` and set `cvUrl: \"/cv/your-file.pdf\"` in `data/profile.ts`. (Until then buttons say \"Request CV\".)");

/* ------------------------------------------------------------------ files referenced by content */
const dataFiles = readdirSync(join(ROOT, "data")).filter((f) => f.endsWith(".ts")).map((f) => "data/" + f);
const refs = [];
for (const f of dataFiles) {
  const c = code(f);
  for (const m of c.matchAll(/\b(src|cvUrl|headshot|heroPortrait|capabilityUrl|photo|image):\s*"(\/[^"]+)"/g)) refs.push({ file: f, path: m[2] });
}
const missing = refs.filter((r) => !existsSync(join(ROOT, "public", r.path)));
if (missing.length) must.push(`**${missing.length} file(s) are referenced but not found in \`public/\`** (check spelling, capital letters and the .jpg/.png ending):\n${missing.map((m) => `   - \`${m.path}\` (set in \`${m.file}\`)`).join("\n")}`);
else if (refs.length) ok.push(`All ${refs.length} photo/document paths you've set point to real files.`);

/* empty photo slots */
let slots = 0, filled = 0;
for (const f of dataFiles) {
  const c = code(f);
  for (const m of c.matchAll(/\{[^{}]*suggested:\s*"[^"]+"[^{}]*\}/g)) { slots++; if (/\bsrc:\s*"/.test(m[0])) filled++; }
}
if (slots) (filled < slots ? info : ok).push(`Photo slots filled: ${filled} of ${slots}. Empty slots are hidden on the live site; add photos whenever you have them (\`public/images/README.md\`).`);

/* ------------------------------------------------------------------ image weight + certificate reminder */
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const slash = (p) => p.replace(/\\/g, "/");
const imgs = walk(join(ROOT, "public")).filter((p) => /\.(jpe?g|png|webp|avif)$/i.test(p) && !p.endsWith("og.png"));
const heavy = imgs.filter((p) => statSync(p).size > 400 * 1024);
if (heavy.length) should.push(`**${heavy.length} image(s) are over 400 KB** and will slow the site (compress at squoosh.app):\n${heavy.map((p) => `   - \`${slash(relative(ROOT, p))}\` — ${MB(statSync(p).size)}`).join("\n")}`);
else if (imgs.length) ok.push(`All ${imgs.length} images are under 400 KB.`);
const certs = imgs.filter((p) => slash(p).includes("/certificates/") || slash(p).includes("/awards/"));
if (certs.length) info.push(`${certs.length} certificate/award image(s) found — confirm certificate numbers, QR codes and signatures are blurred.`);

/* ------------------------------------------------------------------ incomplete content */
const tbc = [];
for (const f of dataFiles) {
  const c = code(f).replace(/export const TBC\s*=.*$/m, "");
  const n = (c.match(/\[DETAIL TO BE CONFIRMED\]/g) || []).length + (c.match(/(?<![\w"])TBC\b(?!\s*=)/g) || []).length - (c.match(/import\s*\{[^}]*\bTBC\b/g) || []).length;
  if (n > 0) tbc.push(`\`${f}\`: ${n}`);
}
if (tbc.length) should.push(`**Details still marked [DETAIL TO BE CONFIRMED]** (hidden on the live site, but the content is incomplete): ${tbc.join(" · ")}`);
else ok.push("No [DETAIL TO BE CONFIRMED] placeholders left.");

const verify = [];
for (const f of dataFiles) {
  const n = (code(f).match(/\bverify:\s*["`]/g) || []).length;
  if (n) verify.push(`\`${f}\`: ${n}`);
}
if (verify.length) should.push(`**Items still flagged \`verify:\`** — once confirmed, delete the \`verify: "…"\` line (on GitHub Pages these notes are readable in your public files): ${verify.join(" · ")}`);
else ok.push("No open `verify:` notes.");

const dashes = [];
for (const f of dataFiles) {
  // code() strips comments, so only text that can appear on the site is checked
  code(f).split("\n").forEach((l) => {
    const i = l.indexOf("—");
    if (i >= 0) dashes.push(`\`${f}\`: "…${l.slice(Math.max(0, i - 35), i + 35).trim()}…"`);
  });
}
if (dashes.length) should.push(`**Em dashes (—) found in your content.** The site's house style avoids them; use a comma, colon, full stop or brackets instead. Search the file for the words shown:\n${dashes.map((d) => `   - ${d}`).join("\n")}`);
else ok.push("No em dashes in your content (house style).");

/* ------------------------------------------------------------------ conversion settings */
const conv = code("data/conversion.ts");
const confirmedFlags = [...conv.matchAll(/\bconfirmed:\s*(true|false)/g)].map((m) => m[1]);
const [pricingConfirmed, availConfirmed] = confirmedFlags;
const dayRateSet = /dayRate:\s*\{\s*low:\s*\d/.test(conv);
const bookingUrl = str(val(conv, "bookingUrl"));
if (pricingConfirmed === "true") ok.push("Estimator values confirmed — the estimator is shown.");
else info.push("Estimator not confirmed (`pricing.confirmed: false` in `data/conversion.ts`) — it stays hidden on the live site. Fine if you don't want it yet.");
if (availConfirmed === "true" || bookingUrl) ok.push(bookingUrl ? "Booking link set (instant booking)." : "Consultation hours confirmed — the booking calendar is shown.");
else info.push("Booking calendar not confirmed (`availability.confirmed: false`, no `bookingUrl`) — it stays hidden on the live site.");
if (dayRateSet && process.env.GITHUB_ACTIONS) should.push("A day rate is set, so the estimator shows prices. GitHub Pages must not be used to run an online business; to stay clearly a portfolio, keep `dayRate` as `null` (see DEPLOY-GITHUB-PAGES.md).");

const services = code("data/services.ts");
if (str(val(services, "responseTime"))) ok.push(`Reply time set: "${str(val(services, "responseTime"))}".`);
else should.push("No reply time: set `responseTime` in `data/services.ts` (e.g. \"3 working days\").");

const testimonials = code("data/testimonials.ts");
const tCount = (testimonials.match(/permission:\s*true/g) || []).length;
if (tCount) ok.push(`${tCount} testimonial(s) published.`);
else info.push("No testimonials yet — the reviews sections stay hidden until you add one with `permission: true`.");

if (existsSync(join(ROOT, "public/og.png"))) ok.push("Share image `public/og.png` present.");
else must.push("`public/og.png` (the LinkedIn/WhatsApp share image) is missing.");

/* ------------------------------------------------------------------ report */
const lines = [
  "## 🚀 Launch check",
  "",
  must.length ? `**${must.length} must-fix item(s)** before you call the site launched.` : "**No must-fix items.** ✅",
  "",
  ...(must.length ? ["### ❌ Must fix", ...must.map((x) => `- ${x}`), ""] : []),
  ...(should.length ? ["### ⚠️ Recommended", ...should.map((x) => `- ${x}`), ""] : []),
  ...(info.length ? ["### ℹ️ For your information", ...info.map((x) => `- ${x}`), ""] : []),
  ...(ok.length ? ["### ✅ Done", ...ok.map((x) => `- ${x}`), ""] : []),
  "_Things a script can't check — forms arriving in your inbox, phone view, LinkedIn preview, Google Search Console — are in EDITING-GUIDE.md, Part 4._",
];
const report = lines.join("\n");
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
if (strict && must.length) process.exit(1);
