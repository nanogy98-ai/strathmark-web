import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies-data";
import { notes } from "@/lib/notes-data";
import { getNoteSeoData } from "@/lib/notes-seo-data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-04-07T00:00:00.000Z");
const INSIGHTS_LAST_MODIFIED = new Date("2026-07-17T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: INSIGHTS_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const insightRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${SITE_URL}/insights/${note.slug}`,
    lastModified: new Date(getNoteSeoData(note.slug).lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...insightRoutes];
}
