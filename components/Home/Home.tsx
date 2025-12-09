import Hero from "./Hero";
import EventsSection from "../Events/EventsSection";
import Testimonials from "./Testimonials";
import WhoWeAre from "./WhoWeAre";

const Home = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <Hero />
      <WhoWeAre />
      <EventsSection type="upcoming" limit={3} />
      <EventsSection type="past" limit={3} />
      <Testimonials />
    </div>
  );
};

export default Home;
