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

          <h1 className="display mb-6 text-4xl md:mb-2 md:text-6xl">
            <span className="text-brand-sky drop-shadow-sm">
              {t("title").split(" ")[0] || "Join"}{" "}
            </span>
            <span className="text-brand-green drop-shadow-sm">
              {t("title").split(" ")[1] || "The"}
            </span>{" "}
            <span className="text-brand-gold-dark drop-shadow-sm">
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

          <p className="lede mx-auto mb-6 max-w-lg lg:mx-0">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mx-10 md:mx-0">
            <a
              href="#volunteer"
              className="btn-sheen relative overflow-hidden rounded-full bg-brand-green px-8 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(45,155,74,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark"
            >
              {t("volunteer.button") || "Start Volunteering"}
            </a>
            <a
              href="#socials"
              className="rounded-full border border-ink-300 bg-white px-8 py-3.5 font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
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
      <div className="absolute top-10 right-20 md:right-40 w-72 h-72 bg-brand-green/50 md:bg-brand-sky/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-brand-green/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-40 left-40 w-72 h-72 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}
