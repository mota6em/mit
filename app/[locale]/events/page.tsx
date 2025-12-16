import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Events/Hero";

export default function EventsHero() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <EventsSection type="upcoming" />
      <EventsSection type="past" />
    </div>
  );
}
