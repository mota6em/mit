import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Highlights/Hero";
import ArchiveNote from "@/components/Highlights/ArchiveNote";
import DataPreload from "@/components/providers/DataPreload";
import JsonLd from "@/components/seo/JsonLd";
import { getAllHighlights } from "@/lib/highlightService";
import { localizedField, toLocale } from "@/lib/i18n";
import { SWR_KEYS } from "@/lib/swrKeys";
import { graph, localeAlternates } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export default async function HighlightsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const highlights = await getAllHighlights();

  const listItems = highlights.slice(0, 30).map((highlight, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: localizedField(highlight, "title", locale),
    url: localeAlternates(
      locale,
      `/highlights/${highlight.slug || highlight._id}`
    ).canonical,
  }));

  return (
    <DataPreload fallback={{ [SWR_KEYS.highlights]: highlights }}>
      <JsonLd
        data={graph([
          {
            "@type": "CollectionPage",
            name: "MIT Highlights & Announcements",
            url: localeAlternates(locale, "/highlights").canonical,
            inLanguage: locale,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: listItems.length,
              itemListElement: listItems,
            },
          },
        ])}
      />
      <div className="flex flex-col">
        <Hero />
        <div className="border-t border-ink-200 bg-ink-50">
          <HighlightsSection />
          <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
            <ArchiveNote />
          </div>
        </div>
      </div>
    </DataPreload>
  );
}
