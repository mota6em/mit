"use client";
import { motion } from "framer-motion";
import HeroImageCollage from "../reusable/HeroImageCollage";
import { SectionTag } from "./SectionTag";
import { HeroButtons } from "./HeroButtons";
import { HeroBadges } from "./HeroBadges";

const Hero = () => {
  const titleParts = ["Highlights", "&", "Announcements"];

  return (
    <div className="relative w-full overflow-hidden bg-white pt-12 pb-16 md:pb-4 md:pt-0 md:px-5">
      {/* Background blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <div className="pointer-events-none absolute left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />

      <div className="mx-auto px-4 relative z-10">
        <div className="grid relative lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:-mt-10"
          >
            <SectionTag text="Our Journey" color="blue" />

            <h1 className="text-4xl md:text-6xl w-full font-semibold md:mt-12 lg:mt-0 mb-0 md:mb-2 leading-tight">
              <span className="text-[#4d93fb] drop-shadow-sm">
                {titleParts[0]}{" "}
              </span>
              <span className="text-[#11b505] drop-shadow-sm">
                {titleParts[1]}{" "}
              </span>
              <br className="hidden md:block" />
              <span className="text-[#e7b43f] drop-shadow-sm">
                {titleParts[2]}
              </span>
            </h1>
            <div className="relative md:hidden">
              {/* Image section for only mobile devices */}
              <HeroImageCollage
                wrapperClassName="md:hidden"
                leftImage="/imgs/events/event-group.jpg"
                rightImage="/imgs/home/hero/picnic.jpg"
                leftClassName="absolute top-6 md:top-8 left-0 sm:left-28 md:left-24 w-80 md:w-96 h-68 md:h-80 -rotate-4 sm:-rotate-8 md:rotate-[-4deg] z-10 "
                rightClassName="absolute bottom-10 md:bottom-16 right-4 sm:right-28 md:right-24 w-48 md:w-72 h-32 md:h-56 rotate-[8deg] z-20 "
              />
            </div>

            <p className="text-gray-600 text-lg md:text-xl mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed">
              Celebrating our achievements, milestones, and the stories that
              shape our community.
            </p>

            <HeroBadges />
            <HeroButtons />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <HeroImageCollage
              wrapperClassName="hidden md:block"
              leftImage="/imgs/events/event-group.jpg"
              rightImage="/imgs/home/hero/picnic.jpg"
              leftClassName="absolute top-6 md:top-8 left-0 sm:left-28 md:left-24 w-80 md:w-96 h-68 md:h-80 -rotate-4 sm:-rotate-8 md:rotate-[-4deg] z-10 "
              rightClassName="absolute bottom-10 md:bottom-16 right-4 sm:right-28 md:right-24 w-48 md:w-72 h-32 md:h-56 rotate-[8deg] z-20 "
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
