import Hero from "@/components/Home/Hero";
import WhoWeAre from "@/components/Home/WhoWeAre";
import NavBar from "@/components/NavBar/NavBar";

const Page = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
      <WhoWeAre />
    </div>
  );
};

export default Page;
