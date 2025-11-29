import Hero from "@/components/Home/Hero";
import ImpactSection from "@/components/Home/ImpactSection";
import NavBar from "@/components/NavBar/NavBar";

const Page = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
      <ImpactSection />
    </div>
  );
};

export default Page;
