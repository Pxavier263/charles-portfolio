# Deploying your portfolio — step by step

Checked 30 September 2026. Plans and prices change, so confirm on each provider's site.

---

## 0. Choose where to host (read this first)

Your site advertises paid consulting, so it counts as a **commercial** site. That matters for Vercel:

> "Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan." One of Vercel's examples of commercial use is "Advertising the sale of a product or service." ([Vercel fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage))

| Option | Cost | What you get | Build command |
|---|---|---|---|
| **A. Vercel Pro** (recommended) | $20/month ([Vercel pricing](https://vercel.com/pricing)) | Everything works exactly as built: optimised images, Vercel Analytics and conversion events, automatic previews | `npm run build` (automatic) |
| **C. GitHub Pages** (free) — **see [`DEPLOY-GITHUB-PAGES.md`](./DEPLOY-GITHUB-PAGES.md)** | Free; the repository must be **public** | Same as option B. Deploys automatically through the included GitHub Actions workflow. GitHub says Pages must not be used to "run your online business". | automatic (`.github/workflows/deploy-github-pages.yml`) |
| **B. Static host** (e.g. Cloudflare Pages) | Free tier available | The whole site as plain files. Images are served full-size, so compress them first. No Vercel Analytics; you can add Plausible later. | `npm run build:static` → folder `out` |

I could not confirm from the Cloudflare Pages or Netlify pricing pages whether their free plans allow commercial sites. Read their terms before relying on option B.

You can build and test on Vercel's free Hobby plan while the site is private. Upgrade before launching publicly. If you are unsure, ask Vercel support.

---

## 1. Get the content ready (about an hour)

Open the project folder and do these steps in order:

1. **`CONTENT_TO_VERIFY.md`** — work through every checkbox.
2. **`data/profile.ts`**
   - `email`: an address you are happy to publish
   - `links.linkedin`, and `orcid` if you have one
   - `cvUrl`: put your CV at `public/cv/Ogu-Charles-Chukwudi-CV.pdf`, then set `cvUrl: "/cv/Ogu-Charles-Chukwudi-CV.pdf"`
   - `headshot`: put your photo at `public/images/headshot.jpg`, then set `headshot: "/images/headshot.jpg"`
3. **Photos** — follow `public/images/README.md`. Compress them first with [squoosh.app](https://squoosh.app) to under about 400 KB each; this matters most on option B.
4. **`data/conversion.ts`** — enter your real estimator values and consultation hours, then set `confirmed: true`. Or leave them unconfirmed and they stay hidden.
5. **`data/services.ts`** — set `responseTime`, for example `"3 working days"`.
6. **Last of all**, in `data/profile.ts`, set `reviewMode: false`. This hides every remaining placeholder and lets Google index the site.

---

## 2. Create free accounts

1. **GitHub** — [github.com/signup](https://github.com/signup). This stores your website's files.
2. **Vercel** (option A) — [vercel.com/signup](https://vercel.com/signup). Choose **Continue with GitHub**. Or **Cloudflare** (option B) — [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
3. **Formspree** — [formspree.io](https://formspree.io). This delivers your contact and booking forms to your email. The free plan is 50 submissions a month and is described as "for testing and development" ([Formspree plans](https://formspree.io/plans)); upgrade when enquiries grow.

---

## 3. Put the project on GitHub

**Use GitHub Desktop.** The project has about 124 files, and GitHub's website uploads at most 100 files at a time.

1. Unzip `charles-portfolio.zip` somewhere easy to find, such as `Documents/charles-portfolio`.
2. Install **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)) and sign in.
3. Go to **File → Add local repository…** and choose the `charles-portfolio` folder. When it says "this directory does not appear to be a Git repository", click **create a repository**. Then:
   - Name: `charles-portfolio`
   - Leave the other settings as they are
   - Click **Create repository**
4. Click **Publish repository**. Leave **"Keep this code private"** ticked, then click **Publish**.

The included `.gitignore` already leaves out `node_modules` and build folders, so you upload only what is needed.

---

## 4A. Deploy on Vercel (option A)

1. Go to [vercel.com/new](https://vercel.com/new) and find `charles-portfolio` under **Import Git Repository**. Click **Import**.
2. Vercel detects **Next.js** automatically. Don't change any build settings.
3. Open **Environment Variables** and add:
   - `NEXT_PUBLIC_SITE_URL` = `https://charles-portfolio.vercel.app`. Use your custom domain here later.
   - `NEXT_PUBLIC_FORM_ENDPOINT` = your Formspree form URL, which looks like `https://formspree.io/f/abcdwxyz` (see step 5).
4. Click **Deploy** and wait 1–2 minutes. You get a live link such as `charles-portfolio.vercel.app`.
5. **Analytics:** in the project, open the **Analytics** tab and click **Enable**. Custom conversion events need a paid plan.
6. When you are ready to go public, open **Settings → Billing** and upgrade to **Pro**.

## 4B. Deploy on Cloudflare Pages (option B)

1. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git**. Choose `charles-portfolio`.
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build:static`
   - Build output directory: `out`
3. Open **Environment variables** and add:
   - `NEXT_PUBLIC_SITE_URL` = your Pages address, for example `https://charles-portfolio.pages.dev`
   - `NEXT_PUBLIC_FORM_ENDPOINT` = your Formspree URL
   - `NODE_VERSION` = `20`
4. Click **Save and Deploy**.

---

## 5. Switch on the forms (Formspree)

1. In Formspree, click **+ New Form** and name it "Portfolio enquiries". Set the email to the address where you want enquiries to arrive.
2. Copy the form's endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. Paste it as `NEXT_PUBLIC_FORM_ENDPOINT` in Vercel or Cloudflare. It goes under **Settings → Environment Variables**.
4. **Redeploy.** In Vercel: **Deployments → ⋯ → Redeploy**. Variables only take effect after a new build.
5. **Test the enquiry form** on your live site and check it arrives in your inbox:
   - Your first submission may ask you to confirm your email with Formspree.
   - Messages show the form type (`enquiry` or `booking`) and a clear subject line.
6. **Test the booking calendar** the same way.

---

## 6. Add your own domain (optional, recommended)

1. Buy a domain, for example `charlesogu.com`, from a registrar such as Cloudflare Registrar or Namecheap. A `.ng` or `.com.ng` domain comes from a NiRA-accredited registrar.
2. Connect it to your host:
   - **Vercel:** go to **Settings → Domains → Add** and type your domain. Vercel shows the exact DNS records to add at your registrar. Copy them exactly. It usually works within minutes, but can take up to a day or two.
   - **Cloudflare:** go to **Custom domains → Set up a custom domain** and follow the prompts.
3. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and **redeploy**. Canonical links, the sitemap and share previews all use it.
4. HTTPS (the padlock) is set up automatically.

---

## 7. Launch checklist

- [ ] `reviewMode: false` is set, and the site has been redeployed.
- [ ] The live site shows no amber "To confirm" badges or empty photo boxes.
- [ ] The enquiry form and booking calendar deliver to your inbox.
- [ ] The CV downloads, and the LinkedIn and email links work.
- [ ] You checked the site on your phone and in dark mode.
- [ ] You pasted your URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and the share preview looks right.
- [ ] You added the site to [Google Search Console](https://search.google.com/search-console) and submitted `https://yourdomain.com/sitemap.xml`.
- [ ] You ran [PageSpeed Insights](https://pagespeed.web.dev) on the live URL.
- [ ] You added the link to your LinkedIn profile, email signature and CV.

---

## 8. Updating the site later

Every change follows the same four steps:

1. Edit a file in the project folder, for example add a project in `data/projects.ts` or a photo in `public/images/`.
2. In GitHub Desktop, type a short summary such as "Add Nairobi photos", then click **Commit to main**.
3. Click **Push origin**.
4. Vercel or Cloudflare rebuilds automatically. Your change is live in about 2 minutes.

**If a build fails:** open the failed deployment and read the red error line near the bottom.

- It usually points to a typo in a data file, such as a missing comma or quote mark.
- Fix it, then commit and push again.
- The previous version stays live until the new one succeeds, so visitors never see a broken site.

**Optional — preview on your own computer before pushing:**

1. Install Node.js 20 LTS from [nodejs.org](https://nodejs.org).
2. In the project folder, run `npm install`, then `npm run dev`.
3. Open http://localhost:3000.
