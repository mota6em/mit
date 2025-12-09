const HeroSection = () => {
  return (
    <section className="py-18 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent mb-8">
          Who We Are
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 font-normal max-w-4xl mx-auto">
          The Youth Muslims of Hungary (MIT) is a volunteer-driven organization
          dedicated to uniting and empowering Muslim youth across Hungary. We
          provide a space for learning, collaboration, and personal growth,
          where young Muslims can strengthen their faith and leadership skills.
          Rooted in the Islamic principles of sincerity, community, and
          excellence (ihsan), MIT strives to build a generation that serves both
          the Ummah and wider society with integrity and purpose.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
