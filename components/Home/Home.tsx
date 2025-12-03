import NavBar from "../NavBar/NavBar";
import Hero from "./Hero";
import LatestPrograms from "./latestPrograms";
import Testimonials from "./Testimonials";
import WhoWeAre from "./WhoWeAre";

const Home = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
      <WhoWeAre />
      <LatestPrograms />
      <Testimonials />
    </div>
  );
};

export default Home;
