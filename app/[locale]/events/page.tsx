import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Events/Hero";

export const dynamic = "force-dynamic";

export default function EventsHero() {
  return (
    <div className="flex flex-col gap-8 mb-16">
      <Hero />
      <EventsSection type="upcoming" />
      <EventsSection type="past" />
    </div>
  );
}
