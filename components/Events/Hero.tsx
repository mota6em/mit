"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import HeroImageCollage from "../reusable/HeroImageCollage";
import { SectionTag } from "./SectionTag";
import { HeroButtons } from "./HeroButtons";
import { HeroBadges } from "./HeroBadges";
import { HiSparkles } from "react-icons/hi";

const Hero = () => {
  const t = useTranslations("events");

  const titleParts = t("hero.title").split(" ") || [
    "Sharing",
    "Special",
    "Moments",
  ];

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
            <SectionTag text={t("hero.tag") || "Community Life"} color="blue" />

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
              <HeroBadges t={t} type="mobileFloating" />
            </div>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed -mt-4 sm:mt-4 md:mt-0 mb-6 mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <HeroButtons t={t} />
            <HeroBadges t={t} />
          </motion.div>

          {/* Desktop image section */}
          <div className="relative hidden md:flex">
            <HeroImageCollage
              leftImage="/imgs/events/event-group.jpg"
              rightImage="/imgs/home/hero/picnic.jpg"
              leftClassName="absolute top-12 left-8 md:left-16 w-64 md:w-96 h-80 md:h-80 rotate-[-4deg] z-10"
              rightClassName="absolute bottom-16 right-8 md:left-54 w-48 md:w-72 h-48 md:h-46 rotate-[8deg] z-20"
            />
            <HeroBadges t={t} type="desktopFloating" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
