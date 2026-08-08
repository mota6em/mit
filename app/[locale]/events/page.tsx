import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Events/Hero";

export default function EventsHero() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="border-t border-ink-200 bg-ink-50">
        <EventsSection type="upcoming" searchable />
        <div className="mx-auto max-w-6xl px-6">
          <div className="rule-fade" />
        </div>
        <EventsSection type="past" searchable />
      </div>
    </div>
  );
}
