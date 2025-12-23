import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import WhoWeAre from "@/components/Home/WhoWeAre";

const page = () => {
  return (
    <div className="block w-full overflow-hidden md:px-10">
      <Hero />
      <WhoWeAre />
      <EventsSection type="upcoming" limit={3} />
      <EventsSection type="past" limit={3} />
      <Statistics />
    </div>
  );
};

export default page;
