import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Events/Hero";
import DataPreload from "@/components/providers/DataPreload";
import JoinCtaBand from "@/components/reusable/JoinCtaBand";
import JsonLd from "@/components/seo/JsonLd";
import { getAllEvents } from "@/lib/eventService";
import { localizedField, toLocale } from "@/lib/i18n";
import { SWR_KEYS } from "@/lib/swrKeys";
import { graph, localeAlternates } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export default async function EventsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const events = await getAllEvents();

  const listItems = events.slice(0, 30).map((event, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: localizedField(event, "title", locale),
    url: localeAlternates(locale, `/events/${event.slug || event._id}`)
      .canonical,
  }));

  return (
    <DataPreload fallback={{ [SWR_KEYS.events]: events }}>
      <JsonLd
        data={graph([
          {
            "@type": "CollectionPage",
            name: "MIT Events",
            url: localeAlternates(locale, "/events").canonical,
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
        <div className="border-y border-ink-200 bg-paper-tint">
          <EventsSection type="upcoming" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="rule-fade" />
          </div>
          <EventsSection type="past" searchable />
        </div>
        <JoinCtaBand />
      </div>
    </DataPreload>
  );
}
