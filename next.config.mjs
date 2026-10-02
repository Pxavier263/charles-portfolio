/**
 * Three ways to deploy:
 *  - Vercel (default): full Next.js, optimised images, Vercel Analytics.
 *  - Static export (STATIC_EXPORT=1): plain HTML/CSS/JS in /out for any static host
 *    (GitHub Pages, Cloudflare Pages, Netlify). Images are served unoptimised.
 *  - GitHub Pages project site: static export + NEXT_PUBLIC_BASE_PATH="/repo-name"
 *    (set automatically by .github/workflows/deploy-github-pages.yml).
 * @type {import('next').NextConfig}
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStatic ? { output: "export", trailingSlash: true, ...(basePath ? { basePath } : {}) } : {}),
  images: isStatic ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
