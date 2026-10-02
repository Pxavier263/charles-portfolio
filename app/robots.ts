import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  // While in review mode the site asks search engines not to index it.
  return siteConfig.reviewMode
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.url}/sitemap.xml` };
}
