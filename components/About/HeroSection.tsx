"use client";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("aboutMIT.hero");

  return (
    <section className="py-18 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent mb-8">
          {t("title")}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 font-normal max-w-4xl mx-auto">
          {t("description")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
