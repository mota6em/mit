import NavBar from "../NavBar/NavBar";
import Hero from "./Hero";
import LatestPrograms from "./latestPrograms";
import WhoWeAre from "./WhoWeAre";

const Home = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
      <WhoWeAre />
      <LatestPrograms />
    </div>
  );
};

export default Home;
