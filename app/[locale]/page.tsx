import Hero from "@/components/Home/Hero";
import LatestProgramsIG from "@/components/Home/latestPrograms";
import QuranQuote from "@/components/Home/QuranQuote";
import WhoWeAre from "@/components/Home/WhoWeAre";
import NavBar from "@/components/NavBar/NavBar";

const Page = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
      <QuranQuote />
      <WhoWeAre />
      <LatestProgramsIG />
    </div>
  );
};

export default Page;
