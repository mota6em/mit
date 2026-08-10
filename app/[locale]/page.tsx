import EventsSection from "@/components/Events/EventsSection";
import HighlightsSection from "@/components/Highlights/HighlightsSection";
import AyahBand from "@/components/Home/AyahBand";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import WhoWeAre from "@/components/Home/WhoWeAre";
import DataPreload from "@/components/providers/DataPreload";
import JoinCtaBand from "@/components/reusable/JoinCtaBand";
import { getAllEvents } from "@/lib/eventService";
import { getAllHighlights } from "@/lib/highlightService";
import { SWR_KEYS } from "@/lib/swrKeys";

export const revalidate = 3600;

export default async function HomePage() {
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
      <div className="w-full">
        <Hero />
        <WhoWeAre />
        <AyahBand />

        <div className="border-b border-ink-200 bg-paper-tint">
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
        <JoinCtaBand />
      </div>
    </DataPreload>
  );
}
