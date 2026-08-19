import type { MetadataRoute } from "next";

import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getAllEvents } from "@/lib/eventService";
import { getAllHighlights } from "@/lib/highlightService";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

function withAlternates(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: Entry["changeFrequency"];
    priority?: number;
  } = {}
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? "weekly",
    priority: options.priority ?? 0.7,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      },
    },
  }));
}

function toDate(value: unknown): Date | undefined {
  if (typeof value !== "string") return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, highlights] = await Promise.all([
    getAllEvents().catch(() => []),
    getAllHighlights().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    ...withAlternates("", { changeFrequency: "daily", priority: 1 }),
    ...withAlternates("/events", { changeFrequency: "daily", priority: 0.9 }),
    ...withAlternates("/highlights", {
      changeFrequency: "daily",
      priority: 0.9,
    }),
    ...withAlternates("/about", { changeFrequency: "monthly", priority: 0.8 }),
    ...withAlternates("/join-mit", {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ];

  const eventPages = events.flatMap((event) => {
    const id = event.slug || event._id;
    if (!id) return [];
    return withAlternates(`/events/${id}`, {
      lastModified:
        toDate((event as { updatedAt?: string }).updatedAt) ??
        toDate(event.date),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  const highlightPages = highlights.flatMap((highlight) => {
    const id = highlight.slug || highlight._id;
    if (!id) return [];
    return withAlternates(`/highlights/${id}`, {
      lastModified:
        toDate((highlight as { updatedAt?: string }).updatedAt) ??
        toDate(highlight.date),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  return [...staticPages, ...eventPages, ...highlightPages];
}
