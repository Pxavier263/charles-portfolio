import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [["/", 1], ["/work", 0.9], ["/services", 0.9], ["/work-with-me", 0.9], ["/about", 0.7], ["/data-lab", 0.4]];
  return [
    ...pages.map(([p, priority]) => ({ url: `${siteConfig.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/work/${p.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
