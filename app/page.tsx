import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar/NavBar";

const page = () => {
  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <Hero />
    </div>
  );
};

export default page;
