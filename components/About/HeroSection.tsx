"use client";
import { useTranslations } from "next-intl";
import SectionHeader from "../reusable/SectionHeader";
import HeroImageCollage from "../reusable/HeroImageCollage";
import Reveal from "../reusable/Reveal";

const HeroSection = () => {
  const t = useTranslations("aboutMIT.hero");

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-brand-green-soft/40 via-ink-50 to-white px-6 py-12 md:px-12 lg:px-20 lg:py-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <HeroImageCollage
          floatLeft
          floatRight
          leftImage="/imgs/about/one-year-mit.jpg"
          rightImage="/imgs/about/femynso-mit.jpg"
          centerIcon="/imgs/home/aboutmit/mit-main-log-no-bg.png"
          leftClassName="absolute top-0 left-0 sm:left-12 md:left-24 lg:left-5 lg:top-4 w-64 h-80 md:w-72 md:h-88 lg:w-64 lg:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 transform -rotate-6"
          rightClassName="absolute -bottom-8 mg:bottom-10 lg:bottom-12 -right-4 sm:right-10 md:right-20 lg:right-4 w-60 h-72 md:w-70 md:h-82 lg:w-60 lg:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 transform rotate-8 md:rotate-8"
        />

        {/* Right COLUMN: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
          <SectionHeader
            title={t("title")}
            align="start"
            underLine
            className="mb-6 items-center text-center lg:items-start lg:text-start"
          />
          <Reveal as="p" y={12} delay={140} className="lede mb-8 max-w-xl">
            {t("description")}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
