# Free hosting on GitHub Pages — step by step

Checked 2 October 2026. Rules can change, so re-read the linked GitHub pages before you launch.

---

## 0. Read this first: GitHub's two conditions

**1. Your repository must be public.**

> "GitHub Pages is available in public repositories with GitHub Free … and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server." ([About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages))

This means anyone can read your site's source files, including everything in `data/`. Two things are already handled:

- `CONTENT_TO_VERIFY.md` is listed in `.gitignore`, so it stays on your computer and is never uploaded.
- The `verify:` notes in the data files are never shown on the live site. They **are** readable in the source, so tidy or delete them once each item is confirmed.

Never add files you would not want public, such as certificate scans showing numbers or private documents.

**2. Not for running an online business.**

> "GitHub Pages is not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS)." ([GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits))

My reading: your site is a personal professional portfolio. It takes no payments, sells nothing on the page, and its contact form only sends messages. That looks closer to a personal site than to a site "primarily directed at facilitating commercial transactions". **I cannot confirm how GitHub would judge it.**

To keep it clearly a portfolio, leave the estimator showing days rather than prices: keep `pricing.dayRate` as `null` in `data/conversion.ts`. If clients start booking regularly through the site, move it to Vercel Pro or another paid host. See `DEPLOY.md`.

**Limits:** published site up to 1 GB, a soft bandwidth limit of 100 GB per month, and deployments time out after 10 minutes ([source](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)). Your site is far below all of these.

**What is different from Vercel:**

- Photos are served at their original size, so compress every image first. Use [squoosh.app](https://squoosh.app) and aim for under about 400 KB each.
- Vercel Analytics does not work here.

Everything else was tested in a GitHub Pages–style build and works: all 11 pages, photos, the gallery viewer, filters, estimator, booking calendar, forms (through Formspree), CV download, dark mode, and the share image.

---

## 1. Choose your web address

Pick the address before creating the repository, because the repository name decides it:

| Repository name | Your site's address |
|---|---|
| `YOUR-USERNAME.github.io` (recommended) | `https://YOUR-USERNAME.github.io` |
| anything else, e.g. `charles-portfolio` | `https://YOUR-USERNAME.github.io/charles-portfolio/` |

Both work: the included workflow adjusts every link and image automatically. Your GitHub username appears in the address, so choose a professional one, such as `charlesogu`. You can add your own domain later (step 7).

---

## 2. Prepare the content

Do these in the project folder:

1. Work through `CONTENT_TO_VERIFY.md`.
2. In `data/profile.ts`, add `email`, `links.linkedin`, `cvUrl` (PDF in `public/cv/`) and `headshot` (in `public/images/`).
3. Add your compressed photos, following `public/images/README.md`.
4. **Last:** set `reviewMode: false` in `data/profile.ts`.

---

## 3. Put the project on GitHub (public)

1. Create a free account at [github.com/signup](https://github.com/signup).
2. Install **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)) and sign in.
3. Unzip `charles-portfolio.zip`.
   - The folder contains a hidden `.github` folder. Don't delete it: it holds the automatic deployment.
4. In GitHub Desktop, go to **File → Add local repository…** and choose the folder. When it asks, click **create a repository** and set the **Name** from step 1, e.g. `charlesogu.github.io`. Click **Create repository**.
5. Click **Publish repository**. **Untick "Keep this code private"**, because Pages is free only for public repositories. Then click **Publish**.

---

## 4. Switch on GitHub Pages

1. Open your repository on github.com and go to **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

---

## 5. Run the first deployment

1. Open the **Actions** tab. You will probably see a failed run with a red ✕. That is expected: it ran before Pages was switched on.
2. Click **Deploy to GitHub Pages** in the left list, then **Run workflow → Run workflow**.
3. Wait 2–4 minutes for the green ✓.
4. Your live address appears in **Settings → Pages** and in the run's **deploy** step. Open it.

---

## 6. Switch on the forms (Formspree)

1. Create a free account at [formspree.io](https://formspree.io), then a form named "Portfolio enquiries".
   - The free plan is 50 submissions a month and is described as being "for testing and development" ([plans](https://formspree.io/plans)).
2. Copy the form's endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. On GitHub, go to **Settings → Secrets and variables → Actions → Variables** tab and click **New repository variable**:
   - Name: `FORM_ENDPOINT`
   - Value: your Formspree URL
4. Open **Actions → Deploy to GitHub Pages → Run workflow** to rebuild with the forms switched on.
5. Send yourself a test enquiry and a test booking request, and check both arrive.

This URL is not a secret, because every visitor's browser uses it. A variable is fine here.

---

## 7. Your own domain (optional)

1. Buy a domain, for example `charlesogu.com`, from a registrar such as Cloudflare Registrar or Namecheap. A `.ng` or `.com.ng` domain comes from a NiRA-accredited registrar.
2. On GitHub, go to **Settings → Pages → Custom domain**, type the domain and click **Save**.
3. At your registrar, add the DNS records listed in GitHub's guide: [Configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. When the DNS check passes, tick **Enforce HTTPS**.
5. Re-run the workflow (**Actions → Run workflow**). It picks up the new address automatically for share previews and the sitemap.

---

## 8. Launch checklist

- [ ] The live site shows no amber "To confirm" badges or empty photo boxes (`reviewMode: false` was set before pushing).
- [ ] All photos load and are compressed.
- [ ] The enquiry form and booking request reach your inbox.
- [ ] The CV downloads, and the LinkedIn and email links work.
- [ ] You checked the site on your phone and in dark mode.
- [ ] The share preview looks right in the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- [ ] The site is added to [Google Search Console](https://search.google.com/search-console) and `sitemap.xml` is submitted.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev) looks good. Large photos are the most likely problem.

---

## 9. Updating the site later

1. Edit files in the folder.
2. In GitHub Desktop, write a short summary, then click **Commit to main** and **Push origin**.
3. The site rebuilds automatically. It is live in 2–4 minutes; watch progress in the **Actions** tab.

**If a run shows a red ✕:**

- Open it and read the error near the bottom. It is usually a typo in a data file, such as a missing comma or quote mark.
- Fix the file, then commit and push again.
- The previous version stays online until a new build succeeds.

**Moving to paid hosting later is easy:** the same repository can be imported into Vercel at any time (see `DEPLOY.md`), and nothing needs rewriting.
