# Editing your site and verifying the launch checklist

This guide covers four things:

1. **How to make edits.** You can work in your web browser or on your computer.
2. **How to edit the content files safely**, so the site doesn't break.
3. **Which file to change for each launch item**, and what checks it.
4. **How to verify the items a computer can't check for you.**

There are two automatic checks:

- **🚀 Launch check** reads your content files and lists anything unfinished: review mode, contact details, photo paths, placeholder text, `verify:` notes, the reply time and form delivery.
- **🔎 Site check** inspects the finished website before it is published. It confirms every link, photo and download works, and that no placeholder text is visible. **If anything is broken, it stops the update and your previous version stays live.**

On GitHub, both run automatically every time you upload a change. To see the results, open the **Actions** tab, click the latest run, and look on its **Summary** page.

---

## Part 1 — Two ways to edit

### Option A: in your web browser on GitHub (no installs)

This is best for changing text and adding a few photos.

**To change text in a file:**

1. Open your repository on github.com and click into the folder, e.g. `data`, then the file, e.g. `profile.ts`.
2. Click the **pencil icon** ("Edit this file") at the top right of the file.
3. Make your change. Click **Preview** to see exactly what changed.
4. Click **Commit changes…**, type a short message such as "Add LinkedIn link", keep **Commit directly to the `main` branch** selected, and click **Commit changes**.
5. Open the **Actions** tab. In 2–4 minutes the run shows a green ✓, and the change is live.

**To upload photos or your CV:**

1. Go into the right folder, e.g. `public` → `images` → `site`.
2. Click **Add file → Upload files** and drag the files in. GitHub allows up to 25 MB per file and 100 files per upload. Compress photos to under about 400 KB first.
3. Commit as above.
4. Then edit the matching data file so the site uses the photo (Part 2, example 3).

`CONTENT_TO_VERIFY.md` is deliberately **not** on GitHub. Open it from the copy on your computer.

### Option B: on your computer (GitHub Desktop + a text editor)

This is best for many changes at once. It also lets you **preview the site before anyone else sees it**.

**One-time setup:**

1. Install [Node.js 20 LTS](https://nodejs.org) and [Visual Studio Code](https://code.visualstudio.com), a free text editor.
2. In GitHub Desktop, choose **Repository → Open in Visual Studio Code**.
3. In VS Code, open **Terminal → New Terminal** and run this once:

   ```
   npm install
   ```

**Each time you edit:**

1. In GitHub Desktop, click **Fetch origin**, then **Pull** if it appears. This brings in any changes you made on the website, which avoids conflicts.
2. Edit files in VS Code.
3. Preview: run `npm run dev` in the terminal and open http://localhost:3000. The page refreshes as you save. Press `Ctrl + C` in the terminal to stop it.
4. Run all checks exactly as GitHub will:

   ```
   npm run check
   ```

   This runs the launch check, builds the finished site, then runs the site check.
5. In GitHub Desktop, write a short summary, then click **Commit to main** and **Push origin**. The site updates in 2–4 minutes.

---

## Part 2 — Editing content files safely

All your content lives in the `data/` folder. The files look technical, but you only ever change **the text inside quotes**.

### The five rules

1. **Change only what is inside the quote marks** `"…"`.
2. **Keep every quote mark, comma, bracket `[ ]` and brace `{ }`** exactly where it is.
3. **To fill an empty setting, replace `null` with your text in quotes.** For example, `null` becomes `"text"`.
4. **Inside text, use ’ (a curly apostrophe) or `\"` for quotation marks.** A plain `"` in the middle of text ends it early and breaks the build. A plain apostrophe `'` is fine.
5. **To clear a `verify:` note** after you've confirmed the item, delete that whole line, including its trailing comma.

### Examples (before → after)

**1. Contact details** (`data/profile.ts`)

```ts
email: null as string | null,
email: "charles@yourdomain.com" as string | null,

linkedin: null as string | null,
linkedin: "https://www.linkedin.com/in/your-profile" as string | null,
```

**2. CV** (save the PDF as `public/cv/Ogu-Charles-Chukwudi-CV.pdf` first)

```ts
cvUrl: null as string | null,
cvUrl: "/cv/Ogu-Charles-Chukwudi-CV.pdf" as string | null,
```

Paths start with `/` and leave out the word `public`.

**3. A photo** (save it as `public/images/site/facilitating.jpg` first; `data/photos.ts`)

```ts
howIWork: {
  alt: "Charles facilitating a workshop session",
  ...
howIWork: {
  src: "/images/site/facilitating.jpg",
  alt: "Charles facilitating a workshop session",
  ...
```

Spelling and capital letters must match the file name exactly: `Facilitating.JPG` is not the same as `facilitating.jpg`. The launch check catches this.

**4. Replacing a placeholder** (`data/projects.ts`)

```ts
organisations: [TBC],
organisations: ["First organisation name", "Second organisation name"],
```

**5. Clearing a confirmed item:** delete the whole line, for example:

```ts
    verify: "Confirm start date and date of promotion from Programme Assistant.",
```

**6. Going live** (`data/profile.ts`, do this **last**):

```ts
reviewMode: true,
reviewMode: false,
```

### If a change breaks the build

The Actions run shows a red ✕, and **your previous version stays online**.

1. Open the failed run and click the red step.
2. Look for the file name and a line number, e.g. `data/profile.ts:57`. The mistake is on or just next to the highlighted lines.
3. Most editing mistakes produce **`Syntax Error` … `Expected ',', got '…'`**. The word after `got` is where the build got confused.

| What you see | Usual cause | Fix |
|---|---|---|
| `Expected ',', got 'links'` (the next setting's name) | A comma deleted at the end of the line above | Put the `,` back |
| `Expected ',', got 'work'` (a word from your own text) | A plain `"` inside your text | Use ’ or `\"` instead, e.g. `"my ’work’ email"` |
| Site check: `file not found` | The photo or PDF name doesn't match, or the file isn't uploaded | Fix the spelling or capitals, or upload the file |
| Site check: `points outside the site folder` | A plain HTML link with a `/` path was added | Use the existing patterns in the data files instead |

I tested the first two by making the mistakes on purpose; those are the exact messages the build shows.

---

## Part 3 — Each launch item: where to edit, and what checks it

**Key:** 🚀 = launch check (automatic) · 🔎 = site check (automatic) · 👤 = you (Part 4)

| # | Launch item | Where to edit | Checked by |
|---|---|---|---|
| 1 | Facts are true and complete | Work through `CONTENT_TO_VERIFY.md` on your computer. Edit the matching `data/*.ts` file. Replace each `[DETAIL TO BE CONFIRMED]` / `TBC`, and delete each `verify:` line once confirmed. | 🚀 counts what's left per file · 👤 proofread (4.3) |
| 2 | Public email and LinkedIn (plus ORCID / Scholar if you have them) | `data/profile.ts` → `email`, `links.*` | 🚀 · 👤 click them (4.5) |
| 3 | CV download | Upload the PDF to `public/cv/`, then set `data/profile.ts` → `cvUrl` | 🚀 file exists · 🔎 link works · 👤 open it (4.5) |
| 4 | Headshot **and** hero cut-out | Upload `public/images/headshot.jpg` and set `headshot`. For the floating home-page hero, also upload a background-removed PNG as `public/images/hero-portrait.png` and set `heroPortrait` (both in `data/profile.ts`) | 🚀 file exists and size · 🔎 loads · 👤 looks right (4.4) |
| 5 | Photos (pages, case studies, activities, awards, certificates) | Upload to the folder listed in `public/images/README.md`, then add `src:` in the matching data file | 🚀 exists, under 400 KB, slots filled count · 🔎 loads · 👤 consent obtained, numbers blurred |
| 6 | Reply time | `data/services.ts` → `responseTime` | 🚀 |
| 7 | Estimator / booking calendar (optional) | `data/conversion.ts` → your values, then `confirmed: true`; or `bookingUrl` | 🚀 reports shown or hidden |
| 8 | Testimonials (optional, real and with permission) | `data/testimonials.ts` → `permission: true` | 🚀 |
| 9 | Forms deliver | GitHub → **Settings → Secrets and variables → Actions → Variables** → `FORM_ENDPOINT` | 🚀 endpoint set · 👤 test messages arrive (4.2) |
| 10 | Review mode off | `data/profile.ts` → `reviewMode: false` | 🚀 · 🔎 no placeholders, badges or empty boxes on any page |
| 11 | No broken links, images or downloads | — | 🔎 every build, blocks the deploy if broken |
| 12 | Works on phones and in dark mode | — | 👤 (4.4) |
| 13 | LinkedIn / WhatsApp share preview | `public/og.png` (replace with your own 1200×630 image if you like) | 👤 (4.6) |
| 14 | Found by Google | — | 👤 Search Console (4.7) |
| 15 | Speed and accessibility | Compress photos | 👤 PageSpeed (4.8) |

**Suggested order:** 1 → 2 → 3 → 4 → 5 → 6 → 9, then optionally 7 and 8, then **10 last**. After each batch of edits, check the run's Summary page.

---

## Part 4 — Verifying what the computer can't

Do these on the **live** site after review mode is off. Record results in Part 5.

### 4.1 Read the automatic reports (every update)

1. On GitHub, open **Actions**, click the latest **Deploy to GitHub Pages** run, and scroll the **Summary** page.
2. **🚀 Launch check:** the ❌ section must be empty. ⚠️ items are recommendations; decide on each one.
3. **🔎 Site check:** it must say "✅ No broken links, missing files or leaked placeholders".
4. **Pass:** the run has a green ✓ and both reports are clean.

### 4.2 Forms really reach you

1. On the live site, go to **Work with me** and send an enquiry using your real details. Use a second email address if you have one.
2. Send a booking request too, if the calendar is switched on.
3. Check your inbox and spam folder. The first time, Formspree may ask you to confirm your address.
4. **Pass:** both arrive, with clear subjects ("New enquiry: …", "Consultation request: …"), and all the fields are filled in.

### 4.3 Proofread every page

Open each page and read it aloud. Compare names, dates and figures against `CONTENT_TO_VERIFY.md`.

| Page | Address (add your site address in front) |
|---|---|
| Home | `/` |
| Work | `/work/` |
| Case studies | `/work/cohort-4/`, `/work/sustainability-toolkit/`, `/work/kenya-workshop/`, `/work/fct-pilot/`, `/work/youth-cop/` |
| Services | `/services/` |
| About | `/about/` |
| Work with me | `/work-with-me/` |
| Data Lab | `/data-lab/` |

**Pass:** no wrong facts, no typos, and nothing claims more than you can evidence.

### 4.4 Phone and dark mode

1. Open the site on your phone. Tap the menu and visit every page.
2. Check:
   - the sticky **Work with me** bar at the bottom
   - the photo gallery: tap a photo, swipe, close
   - the filters on **Work**
3. Tap the moon icon to switch to dark mode, and look at each page again.
4. **Pass:** nothing is cut off, overlapping or unreadable; photos look right; nothing scrolls sideways.

### 4.5 Links and downloads

1. Click every contact option: email, LinkedIn and any others.
2. Download the CV and open it.
3. **Pass:** each one opens the right place, and the CV is the current version.

### 4.6 Share preview

1. Paste your site address into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
2. **Pass:** your name, the description and the share image appear.
3. You can also paste the link into a WhatsApp chat with yourself.

### 4.7 Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) and add a **URL prefix** property with your exact site address.
2. Follow Google's on-screen verification steps. If you choose the **HTML file** method:
   - Download the file Google gives you.
   - Upload it to the `public/` folder (Part 1, Option A).
   - Wait for the green ✓, then click **Verify**.
3. Open **Sitemaps** and submit `sitemap.xml`. On a sub-folder address the full link is, for example, `https://username.github.io/charles-portfolio/sitemap.xml`.
4. **Pass:** the property is verified, and the sitemap status is "Success". This can take a few days.

Google's own guide: [Verify your site ownership](https://support.google.com/webmasters/answer/9008080).

### 4.8 Speed and accessibility

1. Run your address through [PageSpeed Insights](https://pagespeed.web.dev) and look at the **Mobile** tab.
2. **Pass:** no red scores.
   - **Performance** problems are almost always large photos; compress them and re-run.
   - **Accessibility** should already score well; I tested every page with an automated accessibility checker.

---

## Part 5 — Sign-off record

Copy this table into a note and fill it in at launch. Repeat it after any big update.

| Check | Date | Result | Notes |
|---|---|---|---|
| 4.1 Automatic reports clean | | | |
| 4.2 Enquiry and booking received | | | |
| 4.3 All pages proofread | | | |
| 4.4 Phone and dark mode | | | |
| 4.5 Links and CV | | | |
| 4.6 Share preview | | | |
| 4.7 Search Console and sitemap | | | |
| 4.8 PageSpeed (mobile) | | | |
