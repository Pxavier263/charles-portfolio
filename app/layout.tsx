import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ReviewBanner } from "@/components/ReviewBanner";
import { Providers } from "@/components/ui/Providers";
import { Analytics } from "@/components/ui/Analytics";
import { profile, siteConfig } from "@/data/profile";
import { personJsonLd, SEO } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: SEO.title, template: `%s · ${profile.name}` },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "/",
    siteName: profile.name,
    title: SEO.title,
    description: SEO.description,
    firstName: "Charles",
    lastName: "Ogu",
    // Static share image so it works on every host (replace public/og.png with your own 1200×630 image anytime)
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — public-health impact portfolio` }],
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description, images: ["/og.png"] },
  robots: { index: !siteConfig.reviewMode, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#070d1c" },
  ],
};

// Sets the theme class before first paint to avoid a light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      </head>
      <body className="pb-[76px] sm:pb-0">
        <Providers>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <ReviewBanner />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
