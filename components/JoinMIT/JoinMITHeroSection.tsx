"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HeroImageCollage from "../reusable/HeroImageCollage";
import { SectionTag } from "../Events/SectionTag";

export default function JoinMITHeroSection() {
  const t = useTranslations("joinMIT");

  return (
    <div className="max-w-7xl relative md:w-full lg:max-w-7xl md:mt-32 lg:mt-0 md:ms-2 mx-auto px-2 sm:px-6 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center  z-10 mt-10 md:mt-0"
        >
          <SectionTag text={t("joinUsTag") || "Be Part of Us"} color="green" />

          <h1 className="text-4xl md:text-6xl font-semibold mb-6 md:mb-2">
            <span className="text-[#4d93fb] drop-shadow-sm">
              {t("title").split(" ")[0] || "Join"}{" "}
            </span>
            <span className="text-[#11b505] drop-shadow-sm">
              {t("title").split(" ")[1] || "The"}
            </span>{" "}
            <span className="text-[#e8b030] drop-shadow-sm">
              {t("title").split(" ")[2] || "Family"}
            </span>
          </h1>

          {/* Image Collage - mobile screens view */}
          <HeroImageCollage
            wrapperClassName="md:hidden"
            rightImage="/imgs/join/mit-pecs.jpg"
            leftImage="/imgs/join/join-mit-2.jpg"
            leftClassName="absolute top-32 md:top-20 left-26 sm:left-58 w-60 h-60 rotate-[12deg] z-20"
            rightClassName="absolute top-0 left-4 sm:left-14 w-64 h-80 rotate-[-6deg] z-10"
          />

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mx-10 md:mx-0">
            <a
              href="#volunteer"
              className="px-8 py-3 bg-[#11b505] text-white rounded-full font-semibold hover:bg-[#0f9e04] transition-all duration-300 shadow-lg shadow-green-200"
            >
              {t("volunteer.button") || "Start Volunteering"}
            </a>
            <a
              href="#socials"
              className="px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-transition-all duration-300"
            >
              {t("connect") || "Connect With Us"}
            </a>
          </div>
        </motion.div>
        {/* Image Collage - big screens view */}
        <HeroImageCollage
          wrapperClassName="hidden md:flex"
          leftImage="/imgs/join/mit-pecs.jpg"
          rightImage="/imgs/join/join-mit-2.jpg"
          leftClassName="absolute top-12 left-2 md:left-24 lg:left-10 w-80 h-90 lg:w-70 lg-84 rotate-[-10deg] z-10"
          rightClassName="absolute top-45 left-26 md:left-72 lg:left-50 w-72 h-72 lg:w-64 lg:h-68 rotate-[12deg] z-20"
        />
      </div>
      <div className="absolute top-10 right-20 md:right-40 w-72 h-72 bg-[#11b505]/50 md:bg-[#4d93fb]/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-[#11b505]/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-40 left-40 w-72 h-72 bg-[#f1c34c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}
