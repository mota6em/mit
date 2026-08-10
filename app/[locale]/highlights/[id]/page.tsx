import type { Metadata } from "next";

import HighlightClientPage from "@/components/Highlights/HighlightClientPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  getHighlightServerSide,
  getHighlightMetadata,
  getAllHighlights,
} from "@/lib/highlightService";
import { LOCALE_META, localizedField, toLocale } from "@/lib/i18n";
import {
  ORGANIZATION_ID,
  SITE_NAME,
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  metaDescription,
  localeAlternates,
} from "@/lib/seo";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const highlights = await getAllHighlights();
  return highlights
    .map((highlight) => ({ id: highlight.slug || highlight._id }))
    .filter((param): param is { id: string } => Boolean(param.id));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const highlight = await getHighlightMetadata(id);

  if (!highlight) return { title: "Highlight not found" };

  const title = localizedField(highlight, "title", locale);
  const description = localizedField(highlight, "desc", locale);
  const image = highlight.images?.[0] || "/imgs/icons/mit-logo-full-resized.png";
  const alternates = localeAlternates(
    locale,
    `/highlights/${highlight.slug || id}`
  );

  return {
    title,
    description: metaDescription(description),
    alternates,
    openGraph: {
      type: "article",
      title,
      description: metaDescription(description),
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: LOCALE_META[locale].openGraph,
      publishedTime: highlight.date ?? highlight.createdAt,
      modifiedTime: highlight.updatedAt,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription(description),
      images: [image],
    },
  };
}

export default async function HighlightPageServer({ params }: Props) {
  const { id, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const highlight = await getHighlightServerSide(id);

  if (!highlight) return <HighlightClientPage initialHighlight={null} />;

  const title = localizedField(highlight, "title", locale);
  const description = localizedField(highlight, "desc", locale);
  const slug = highlight.slug || id;
  const url = localeAlternates(locale, `/highlights/${slug}`).canonical;
  const published =
    highlight.date ?? (highlight as { createdAt?: string }).createdAt;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbJsonLd([
            { name: SITE_NAME, path: `/${locale}` },
            { name: "Highlights", path: `/${locale}/highlights` },
            { name: title, path: `/${locale}/highlights/${slug}` },
          ]),
          {
            "@type": "NewsArticle",
            headline: title,
            description,
            url,
            mainEntityOfPage: url,
            inLanguage: locale,
            datePublished: published,
            dateModified:
              (highlight as { updatedAt?: string }).updatedAt ?? published,
            image: highlight.images?.length
              ? highlight.images.map((src) => absoluteUrl(src))
              : [absoluteUrl("/imgs/icons/mit-logo-full-resized.png")],
            author: { "@id": ORGANIZATION_ID },
            publisher: { "@id": ORGANIZATION_ID },
          },
        ])}
      />
      <HighlightClientPage initialHighlight={highlight} />
    </>
  );
}
