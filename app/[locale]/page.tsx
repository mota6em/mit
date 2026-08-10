import EventsSection from "@/components/Events/EventsSection";
import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import WhoWeAre from "@/components/Home/WhoWeAre";
import DataPreload from "@/components/providers/DataPreload";
import { getAllEvents } from "@/lib/eventService";
import { getAllHighlights } from "@/lib/highlightService";
import { SWR_KEYS } from "@/lib/swrKeys";

/** Cached reads mean this render is served from the ISR cache, not Mongo. */
export const revalidate = 3600;

export default async function HomePage() {
  // Both lists come from the tagged cache; on a warm cache this is free.
  const [events, highlights] = await Promise.all([
    getAllEvents(),
    getAllHighlights(),
  ]);

  return (
    <DataPreload
      fallback={{
        [SWR_KEYS.events]: events,
        [SWR_KEYS.highlights]: highlights,
      }}
    >
      <div className="block w-full overflow-hidden">
        <Hero />
        <WhoWeAre />

        {/* Tinted band sets the announcement + events run apart from the
            white intro and stats sections above and below it. */}
        <div className="border-y border-ink-200 bg-ink-50">
          <HighlightsSection limit={1} />
          <div className="mx-auto max-w-6xl px-6">
            <div className="rule-fade" />
          </div>
          <EventsSection type="upcoming" limit={3} />
          <div className="mx-auto max-w-6xl px-6">
            <div className="rule-fade" />
          </div>
          <EventsSection type="past" limit={3} />
        </div>

        <Statistics />
      </div>
    </DataPreload>
  );
}
