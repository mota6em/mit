import type { Metadata } from "next";

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, toLocale } from "@/lib/i18n";
import { SITE_NAME, TITLE_SUFFIX, localeAlternates } from "@/lib/seo";

type MetadataKey = "root" | "events" | "join" | "about" | "highlights";

async function loadMetadataMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default.metadata;
  } catch {
    return (await import(`../messages/${DEFAULT_LOCALE}.json`)).default
      .metadata;
  }
}

export async function buildPageMetadata({
  locale: rawLocale,
  path,
  key,
  keywords,
  image,
}: {
  locale: string;
  path: string;
  key: MetadataKey;
  keywords?: string[];
  image?: string;
}): Promise<Metadata> {
  const locale = toLocale(rawLocale);
  const messages = await loadMetadataMessages(locale);
  const t = messages[key] ?? messages.root;

  const alternates = localeAlternates(locale, path);
  const ogImage = image ?? "/imgs/icons/mit-logo-full-resized.png";

  return {
    title: {
      absolute: t.title,
      template: `%s | ${TITLE_SUFFIX[locale]}`,
    },
    description: t.description,
    keywords,
    alternates,
    openGraph: {
      title: t.title,
      description: t.description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: LOCALE_META[locale].openGraph,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].openGraph
      ),
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [ogImage],
    },
  };
}
