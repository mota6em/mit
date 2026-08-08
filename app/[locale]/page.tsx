import EventsSection from "@/components/Events/EventsSection";
import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import WhoWeAre from "@/components/Home/WhoWeAre";

const page = () => {
  return (
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
  );
};

export default page;
