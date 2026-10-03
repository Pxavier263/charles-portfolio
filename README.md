# Ogu Charles Chukwudi — Public-Health Impact Portfolio

This is the personal portfolio site of **Pharm. Ogu Charles Chukwudi**. It is built with **Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion and Lucide icons**, is statically generated, and is ready to deploy on Vercel.

> **Before launch:** work through [`CONTENT_TO_VERIFY.md`](./CONTENT_TO_VERIFY.md), then set `reviewMode: false` in `data/profile.ts`.

---

## 1. Quick start

**Requirements:** Node.js 18.17 or newer (Node 20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also runs lint and type-check)
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript only
```

Optional environment variables: copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, used for Open Graph and the sitemap, e.g. `https://ogu-charles.vercel.app` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact-form endpoint, e.g. a Formspree URL. Leave empty to use the email fallback. |

---

## 2. Architecture

The site is built to turn visitors into clients. Every page ends in one next step, **Work with me**, and the full strategy is in the "Portfolio Strategy — Structure & Positioning" doc.

### Pages

| Route | Job | Key file |
|---|---|---|
| `/` | Proposition → who I help → services → proof → numbers → process → credentials → about → ask | `app/page.tsx`, `components/home/*` |
| `/work` | All case studies with the Impact Explorer filter, and impact stories | `components/work/WorkIndex.tsx` |
| `/work/[project]` | One page per case study, 7-part template (see below) | `app/work/[slug]/page.tsx` |
| `/services` | Four services, each with deliverables, outcome and proof; ways to work together | `app/services/page.tsx` |
| `/work-with-me` | Conversion page: enquiry form, what happens next, who I work with, FAQ | `app/work-with-me/page.tsx` |
| `/about` | Story, experience, leadership, education, recognition, presentations, research, footprint map, activities, toolkit | `app/about/page.tsx` |
| `/data-lab` | Future dashboards (placeholders only) | `app/data-lab/page.tsx` |

### Interactive work showcase

**Home.** The "Selected work" section is a tabbed showcase. Choosing a case study animates in its headline figure, the before/after comparison, the skills used and a link through.

**`/work`.** The showcase page offers:

- **Filters** by **type**, **sector** and **skill**, with a result count for each option.
- **Keyword search.**
- **Grid or list layout.**
- **Quick view:** each card expands inline to show the challenge, your role and what changed.
- **Shareable filters:** filter choices are kept in the URL, so a filtered view can be shared, e.g. `/work?sector=One%20Health`.
- **"Picked for you":** appears for returning visitors.

**Smart recommendations** (`lib/recommend.ts`):

- **Scoring.** Every other case study is scored against the one being viewed:
  - shared skills (×2)
  - shared sectors
  - shared themes (×0.5)
  - same type (+1)
  - explicit `related` links (+4)
- **Viewing history.** What the visitor viewed earlier adds to the score. That history is kept only in their own browser, never sent anywhere.
- **Reasons shown.** Each recommendation says why it was suggested, for example "Also uses facilitation".
- **Tracking.** Clicks are recorded as `recommendation_click`.

**Before / after** (`beforeAfter` in `data/projects.ts`):

- **Label.** Each comparison declares what it compares:
  - `design`: what the work is designed to change
  - `output`: the starting point and what the work produced
  - `plan`: the current situation and a proposed plan
  - `measured`: real before/after data
- **Honest captions.** The label is shown on the page, so a design comparison is never read as a measured result.
- **Photo slider.** Add a photo to both sides and the comparison becomes a draggable slider (keyboard accessible).

**Gallery.** Each case study shows its own `media` photos plus photos from any activity in `data/gallery.ts` that links to it through `projectId`. Clicking a photo opens a full-screen lightbox:

- arrow keys, swipe and thumbnails to move between photos
- Esc to close

**Expandable details.** An accordion holds five sections: full role, approach in detail, outputs, skills and methods, and sectors and partners. It has an "Expand all" control.

**Testimonials.** Add them in `data/testimonials.ts`:

- Only entries with `permission: true` are shown.
- Each appears on the case studies it names in `projectIds`, and in a homepage section.
- With none added, nothing shows at launch; review mode shows a labelled slot.

### Case-study template

Each `/work/[project]` page has seven parts:

1. **Snapshot bar:** organisations, role, place, headline figure.
2. **The challenge.**
3. **What I did.**
4. **Approach:** an interactive stepper, navigable with the arrow keys.
5. **Evidence:** the interactive visual (for example the Ghana/Kenya toggle on the toolkit charts), which fires the `evidence_view` event.
6. **What I learned:** only evidence-based observations, from `reflection` in `data/projects.ts`.
7. **Call to action:** "Running something similar? Let's talk.", plus the next case study and related ones.

### Conversion paths

- **Header:** a "Work with me" button on every page.
- **Phones:** a sticky bottom bar with the same button.
- **Service cards:** "Ask about this" links to `/work-with-me?service=<id>`, which pre-selects that service in the form.

### Folder layout

```
app/                 pages (see table above), layout, template.tsx (page transitions), sitemap, robots, OG image
components/home/     homepage sections
components/work/     WorkIndex, Stepper, EvidenceTracker, Visual
components/sections/ About-page sections, ContactForm, ImpactSnapshot, Activities…
components/viz/      Ecosystem graphic (signature interaction), charts, map, network
components/ui/       Section, PageHeader, Reveal, Counter, ImageSlot, CvButton, Analytics…
data/                ← ALL CONTENT (profile, services, projects, gallery, education…)
lib/                 types, content helpers (review mode), seo, track (analytics)
```

### Analytics (conversion events)

Vercel Web Analytics loads automatically on Vercel. Enable it in **Project → Analytics**; custom events require a Pro plan. If you add Plausible's script instead, it receives the same events.

| Event | Fired when |
|---|---|
| `cta_click` | Any element with `data-cta="…"` is clicked (header, hero, service cards, case-study ends, mobile bar) |
| `enquiry_submit` | The enquiry form is submitted (records the chosen service and timeline) |
| `evidence_view` | A case study's evidence section is at least half visible |
| `download` | The CV or capability statement is downloaded |
| `enquiry_submit` / `booking_submit` | A form is submitted successfully past validation |
| `estimate_use` | "Use this estimate" is clicked (records service, size and timeline) |
| `booking_slot_select` | A consultation slot is chosen |
| `work_filter` | A type, sector or skill filter is chosen on `/work` |
| `recommendation_click` | A recommended case study is clicked (records rank and source) |
| `outbound` | LinkedIn, ORCID and other external links are clicked |

## 3. Colour theme

The site uses one palette, defined once as CSS variables at the top of `app/globals.css`. Change a value there and every section follows, in both light and dark mode.

| Role | Colour | Used for |
|---|---|---|
| Brand navy | `#0B1530` | Text, and the two dark bands (numbers at the top, contact at the bottom) |
| Accent teal | `#0F6454` / `#127D67` | All buttons, links, icons, charts and selected states |
| Highlight gold | `#B8963F` | Sparing accents: "Pharm.", upcoming events, awards |
| Warm neutrals | `#F7F5F0` canvas, `#F1EEE7` tint, `#FFFFFF` cards | Section backgrounds and cards |
| Soft teal wash | `#E9F4F0` | The philosophy section only |

**Section rhythm.** Sections alternate between canvas and tint, with the teal wash for the philosophy section and the navy bands at the top and bottom of the page. The only background classes used are `band-canvas`, `band-tint`, `band-accent` and `band-ink`.

**Shared classes.** These keep the same meaning wherever they appear:

- Buttons: `btn-primary` (teal) for main actions, `btn-ghost` (outline) for secondary actions.
- Selected filters and tabs: `is-on`.
- Status pills, the same across projects, presentations and activities:
  - `pill-done`: completed or delivered
  - `pill-live`: ongoing or attended
  - `pill-plan`: proposed
  - `pill-next`: upcoming

The amber "To confirm" markers are review tools only. They disappear when `reviewMode` is `false`.

## 4. Updating content (no redesign needed)

| To change… | Edit |
|---|---|
| Name, roles, links, email, CV, headshot, site switches | `data/profile.ts` |
| Impact snapshot numbers | `data/metrics.ts` (see `updatePeriodically` and `lastUpdated`) |
| Case studies, toolkit figures, CoP working areas | `data/projects.ts` |
| Experience timeline | `data/experience.ts` |
| Presentations and engagements | `data/presentations.ts` |
| Awards and recognition (use `enabled` to hide one) | `data/achievements.ts` |
| Degrees and certifications | `data/education.ts` |
| Toolkit / skills | `data/skills.ts` |
| Publications (six categories) | `data/publications.ts` |
| Impact stories | `data/stories.ts` |
| "What I'm working on" | `data/focus.ts` |
| Services, proposition, proof strip, audiences, process, FAQ, reply time, booking link, capability PDF | `data/services.ts` |
| Showcase filters (types, sectors), before/after caption wording | `data/taxonomy.ts` |
| Testimonials / reviews (ratings optional) | `data/testimonials.ts` |
| Estimator pricing, consultation hours, project types, budget ranges, WhatsApp | `data/conversion.ts` |
| Map locations | `data/footprint.ts` |
| Activities & photo gallery | `data/gallery.ts` |
| Pillars and career journey | `data/ecosystem.ts` |

**Content rules built into the code**

- `verify: "…"` on any item shows an amber **To confirm** marker while `reviewMode` is on.
- Any text containing `[DETAIL TO BE CONFIRMED]` is hidden automatically when `reviewMode` is off.
- Links left as `null` render as non-clickable placeholders, never as broken `#` links.
- `recipientType` on awards keeps organisational awards (such as the Antibiotic Guardian Award) from being shown as personal ones.
- `inPerson` on map locations means travel is only claimed where it is confirmed.
- `tags` drive the **Explore my impact** filters. The available tags are listed in `TAGS` in `profile.ts`.

**Adding photos, activities and certificates**

Every photo slot on the site shows, in review mode, the exact file path it expects (e.g. `public/images/activities/nairobi-workshop-1.jpg`). Save your photo there, then set `src` on that entry. Full folder guide: [`public/images/README.md`](./public/images/README.md).

| Photo slot | Folder | Set `src` in |
|---|---|---|
| Headshot | `public/images/headshot.jpg` | `data/profile.ts` → `profile.headshot` |
| **Activities & gallery** (new section, several photos per activity) | `public/images/activities/` | `data/gallery.ts` |
| Presentation photos | `public/images/presentations/` | `data/presentations.ts` → `image` |
| Award photos / certificates | `public/images/awards/` | `data/achievements.ts` → `image` |
| Professional certificates | `public/images/certificates/` | `data/education.ts` → `certifications[].image` |
| Graduation / induction (optional) | `public/images/education/` | `data/education.ts` → `educationImages` |
| Case-study pop-up photos | `public/images/projects/` | `data/projects.ts` → `media` |

- **New activity:** copy the TEMPLATE at the bottom of `data/gallery.ts`, fill it in and set `enabled: true`. Add as many photos as you like to `photos`; the first is the cover.
- **Launch behaviour:** with `reviewMode: false`, any slot without a real photo disappears, so the public site never shows empty boxes.
- Only use photos that genuinely come from the activity in the caption, get consent where other people are identifiable, and blur certificate numbers/QR codes before uploading certificates.

---

## 5. Contact & conversion system

Everything lives on **`/work-with-me`**. The settings are in **`data/conversion.ts`**.

| Feature | What it does | Settings |
|---|---|---|
| **Contact options** | One tile per channel: enquiry, book a call, estimate, email, LinkedIn, WhatsApp, CV. Any channel without a link is hidden on the live site. | `profile.ts` (email, links, CV), `channels.whatsapp` |
| **Enquiry form** | See the list below this table. | `PROJECT_TYPES`, `BUDGETS`, `TIMELINES` |
| **Project estimator** | Service + scope + add-ons + timeline → effort in days, duration in weeks, and an approximate cost once a day rate is set. Values animate as they change. "Use this estimate" attaches the estimate to the enquiry form. | `pricing` |
| **Availability calendar** | Weekly consultation slots, set in your time zone and shown in the visitor's. Minimum notice, days ahead and blackout dates are all settable. The chosen slot goes into a short booking form. | `availability` |
| **Client reviews** | Star ratings (1–5, including half stars) and an average computed only from reviews that have a rating. Shown on `/work-with-me`, the homepage and linked case studies. | `data/testimonials.ts` |
| **Calls to action** | The closing band on every page offers Work with me · Book a free call · Estimate a project · CV. | — |

**Enquiry form:**

- **Fields:** name, email, project type, budget and details are required; organisation and timeline are optional; consent is required.
- **Validation:** checks run when a visitor leaves a field and again on submit. The details box has a character counter.
- **Errors:** an error summary appears at the top of the form and receives focus, and each message sits next to its field. The form uses `aria-invalid` and `aria-describedby` for screen readers.
- **Spam:** a hidden honeypot field blocks bots.
- **Sending:** a loading state shows while the enquiry sends.
- **Success:** an animated success screen repeats what was sent and explains what happens next.
- **Pre-filling:** the form fills itself from a `?service=` link or from the estimator.

### ⚠ Placeholder settings. Nothing unconfirmed goes live.

The estimator's effort days, multipliers and add-ons, and the calendar's consultation hours, are **placeholders written to demonstrate the features. They are not your rates or your diary.**

- In review mode both show with an amber "To confirm" marker.
- With `reviewMode: false` they are **hidden automatically** until you set `pricing.confirmed = true` and `availability.confirmed = true`.
- The estimator shows **days only** until you set `pricing.dayRate`. It then shows an approximate cost in `pricing.currency`, with the timeline multiplier applied and amounts rounded to the nearest 50.

### How bookings work (honest mode)

The calendar sends a **booking request**. The success message says plainly that the time is *not yet confirmed*. The request includes:

- the slot in both time zones
- the UTC timestamp
- the visitor's time zone

**For instant, confirmed booking** (with automatic calendar invites and double-booking protection):

1. Create a free [Cal.com](https://cal.com) or Calendly event.
2. Set `availability.bookingUrl` to its link.

An "Instant booking" button then appears. If you never set `confirmed: true`, that link is the only booking option shown on the live site.

### Delivering form submissions (no secret keys in the code)

**Formspree (recommended):**

1. Create a form at formspree.io.
2. In Vercel, set `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx`.
3. Redeploy.

Both forms then POST JSON to that address:

- `formType: "enquiry"` or `"booking"`
- `_subject`, which Formspree uses as the email subject line

This was tested with a mocked endpoint.

**Fallback:** with no endpoint but `profile.email` set, the forms open the visitor's email app with the message filled in, and the success screen says so.

**Neither set:** the submit buttons are disabled and a polite note explains why.

**Resend or another provider needing a secret key:** create `app/api/contact/route.ts`, read the server-only key there, and point `NEXT_PUBLIC_FORM_ENDPOINT` to `/api/contact`.

## 6. Data Lab

`/data-lab` currently shows **layout previews only**. Each one is labelled "Layout preview · no data", so nothing can be mistaken for real results.

To add real work:

1. Export a chart as an image, or publish a dashboard. For Power BI, use "Publish to web" **only for non-sensitive, approved data**.
2. Replace a slot in `app/data-lab/page.tsx` with an `<iframe title="…">` embed or an image.
3. Add a one-line description of the data source and date.

---

## 7. Checks and editing

**How to edit content and verify the launch checklist: [`EDITING-GUIDE.md`](./EDITING-GUIDE.md).**

| Command | What it does |
|---|---|
| `npm run check:launch` | Reads the content files and lists unfinished items: review mode, contact details, missing or oversized photos, placeholders, `verify:` notes, reply time, form delivery. Add `-- --strict` to fail when must-fix items remain. |
| `npm run build:static` | Builds the static site into `out/`. Works on Windows, Mac and Linux. |
| `npm run check:site` | Checks the built site for broken links, sections, images and downloads, and for placeholders left visible when review mode is off. Fails on any problem. |
| `npm run check` | Runs all three in order. |

The GitHub Pages workflow runs the launch check (as a report) and the site check (which blocks a broken deployment) on every push. Both reports appear on the run's Summary page.

## 8. Deploying

**Full step-by-step guide: [`DEPLOY.md`](./DEPLOY.md)**

- **Vercel:** `npm run build`. Vercel detects Next.js automatically. A site that offers paid services needs the **Pro** plan under Vercel's fair-use terms.
- **GitHub Pages (free):** see [`DEPLOY-GITHUB-PAGES.md`](./DEPLOY-GITHUB-PAGES.md). The included workflow `.github/workflows/deploy-github-pages.yml` builds and publishes on every push, and sets the sub-folder path automatically (`NEXT_PUBLIC_BASE_PATH`). Use `withBase()` from `lib/paths.ts` for any new plain `<a href="/…">` link or image `src`.
- **Any static host** (e.g. Cloudflare Pages): `npm run build:static` → publish the `out` folder. Images are served unoptimised, and Vercel Analytics is not included.

All three were tested — including a GitHub Pages sub-folder build with real photos, CV download and form submission — with no missing files, broken links or accessibility violations. The social share image is a static file, `public/og.png`; replace it with your own 1200×630 image whenever you like.

## 9. Quality review (performed on this build)

### Automated checks

- `next build` passes with **no ESLint or TypeScript errors**. Every page is statically pre-rendered. The homepage first-load JS is about 163 kB.
- **axe-core accessibility audit** (WCAG 2.0 A/AA and 2.1 AA) on `/` and `/data-lab`, in light and dark modes: **0 violations** after fixes.
- **Internal links:** every anchor link resolves to an existing section (40 links on the homepage). There are no `#` placeholder links.
- **Responsiveness:** there is no horizontal overflow at 390 px (mobile) or 1440 px (desktop).
- **Console:** no runtime errors in the browser console on desktop, mobile or dark mode.
- **Launch mode:** building with `reviewMode: false` produces **zero** "[DETAIL TO BE CONFIRMED]" strings and zero review markers, and enables indexing.

### Accessibility features

- Skip link and a semantic landmark structure.
- The case-study dialog uses native `<dialog>`, which provides focus trapping and closes with Esc.
- Pillars use the tablist pattern with arrow-key navigation.
- Filter buttons expose `aria-pressed`, and result counts are announced through an `aria-live` region.
- Charts include screen-reader data tables.
- All motion honours `prefers-reduced-motion`.

### Fixes made during review

| Problem found | Fix |
|---|---|
| Mobile overflow caused by a hidden data table | Wrapped the table so it no longer affects layout |
| Empty grid cells in the stats block and case-study fact grids | Adjusted the grid spans |
| Programme pathway was cramped | Reflowed into a 2 × 3 or 3 × 2 grid |
| Network labels were clipped | Widened the canvas |
| Low-contrast decorative numerals and gold badges | Darkened the colours |
| "Ongoing · Ongoing" and a duplicated organisation line on the CoP card | Removed the duplicates |
| An unsupported "available for in-person and remote collaboration" line | Removed it |
| Story wording implied more than the data shows | Tightened it to the supplied figures |

### Four-audience review

- **Recruiter:** role, employer and scope are visible within five seconds. Large case-study cards now list Charles' specific role, and CV buttons are in three places.
- **International public-health organisation:** stakeholder engagement is listed with an explicit no-affiliation disclaimer. Organisational awards are attributed correctly and link to the official source.
- **Research collaborator:** outputs are separated by category, the ICID poster is clearly marked as accepted and upcoming, and nothing unpublished is listed. ORCID and Scholar slots are ready.
- **AMR / One Health programme partner:** there are case studies with real figures and paired Ghana/Kenya charts, the proposed pilot is clearly marked "not yet implemented", and the map separates presence from programme reach.

### Known limitations

- The map is a stylised dot projection (Natural Earth, public domain) rather than a tile map. This keeps the site fast and offline-safe.
- Visual QA was done in Chromium. Test in Safari and Firefox before launch.
- Lighthouse was not run in this environment. Run it against the Vercel preview.
