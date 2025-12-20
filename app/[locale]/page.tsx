import EventsSection from "@/components/Events/EventsSection";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
 import Testimonials from "@/components/Home/Testimonials";
import WhoWeAre from "@/components/Home/WhoWeAre";
import { getImages } from "@/lib/get-images";

 

const page = () => {
  const heroImages = getImages("/public/imgs/home/hero");
  return (
    <div className="block w-full overflow-hidden md:px-10">
      <Hero images={heroImages} />
      <WhoWeAre />
      <EventsSection type="upcoming" limit={3} />
      <EventsSection type="past" limit={3} />
      <Statistics />
    </div>
  );
};

export default page;
