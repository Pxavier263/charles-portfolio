# Where to put your photos

| Folder | What goes here | Referenced from |
|---|---|---|
| `images/headshot.jpg` | Professional portrait (≈1000×1250 px). Appears in the hero graphic, the hero on phones, the homepage About section and the About page | `data/profile.ts` → `profile.headshot` |
| `images/hero-portrait.png` | **Home-page hero:** the same portrait with the **background removed** (transparent PNG, ≈1000×1200 px, head-and-shoulders, under ~500 KB). The labels float around it. Make one free with remove.bg, Canva or Adobe Express "Remove background" | `data/profile.ts` → `profile.heroPortrait` |
| `images/site/` | Page photos: working portrait, facilitating, CoP group, speaking, contact portrait, one per service | `data/photos.ts` |
| `images/projects/<id>-cover.jpg` | One cover photo per case study (showcase cards, home showcase, top of case study) | `data/projects.ts` → `cover` |
| `images/activities/` | Workshops, conferences, training, community sessions | `data/gallery.ts` |
| `images/presentations/` | You presenting, posters, session photos | `data/presentations.ts` → `image` |
| `images/awards/` | Award certificates, trophies, ceremonies | `data/achievements.ts` → `image` |
| `images/certificates/` | Professional certificates (Google, IBM, PM…) | `data/education.ts` → `certifications[].image` |
| `images/education/` | Graduation / induction photos (optional) | `data/education.ts` → `educationImages` |
| `images/projects/` | Photos inside the case-study pop-ups | `data/projects.ts` → `media` |

Each placeholder on the site (in review mode) shows the exact file path it expects.
After saving a file, set its `src`, e.g. `src: "/images/activities/nairobi-workshop-1.jpg"`.

Tips
- JPG or WebP, under ~400 KB each (use squoosh.app to compress). Next.js resizes them automatically.
- Lowercase file names with hyphens, no spaces.
- Blur/crop certificate numbers, QR codes and signatures before uploading certificates.
- Get consent before publishing photos where other people are clearly identifiable.
