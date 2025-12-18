import Hero from "./Hero";
import EventsSection from "../Events/EventsSection";
import Testimonials from "./Testimonials";
import WhoWeAre from "./WhoWeAre";
import { getImages } from "@/lib/get-images";
import { AuroraBackground } from "@/src/components/ui/aurora-background";

const Home = () => {
  const heroImages = getImages("/public/imgs/home/hero");
  return (
    <AuroraBackground className="overflow-hidden md:px-10">
      <Hero images={heroImages} />
      <WhoWeAre />
      <EventsSection type="upcoming" limit={3} />
      <EventsSection type="past" limit={3} />
      <Testimonials />
    </AuroraBackground>
  );
};

export default Home;
