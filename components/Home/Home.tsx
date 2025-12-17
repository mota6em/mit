import Hero from "./Hero";
import EventsSection from "../Events/EventsSection";
import Testimonials from "./Testimonials";
import WhoWeAre from "./WhoWeAre";
import { getImages } from "@/lib/get-images";

const Home = () => {
  const heroImages = getImages("/public/imgs/hero");
  return (
    <div className="overflow-hidden md:mx-10">
      <Hero images={heroImages} />
      <WhoWeAre />
      <EventsSection type="upcoming" limit={3} />
      <EventsSection type="past" limit={3} />
      <Testimonials />
    </div>
  );
};

export default Home;
