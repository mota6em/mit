"use client";
import { useTranslations } from "next-intl";
import HeroImageCollage from "../reusable/HeroImageCollage";
import { SectionTag } from "../Events/SectionTag";
import Reveal from "../reusable/Reveal";

export default function JoinMITHeroSection() {
  const t = useTranslations("joinMIT");

  return (
    <div className="max-w-7xl relative md:w-full lg:max-w-7xl md:mt-32 lg:mt-0 md:ms-2 mx-auto px-2 sm:px-6 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <Reveal
          y={0}
          x={-30}
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
        </Reveal>
        {/* Image Collage - big screens view */}
        <HeroImageCollage
          wrapperClassName="hidden md:flex"
          leftImage="/imgs/join/mit-pecs.jpg"
          rightImage="/imgs/join/join-mit-2.jpg"
          leftClassName="absolute top-12 left-2 md:left-24 lg:left-10 w-80 h-90 lg:w-70 lg-84 rotate-[-10deg] z-10"
          rightClassName="absolute top-45 left-26 md:left-72 lg:left-50 w-72 h-72 lg:w-64 lg:h-68 rotate-[12deg] z-20"
        />
      </div>
      {/* Ambient brand wash. This was three separately animated 288px blurred
          circles; each frame of that motion re-rasterizes a large blur, which
          is one of the most expensive things a browser can do while the user
          is scrolling. A static multi-stop gradient reads the same. */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-multiply blur-3xl bg-[radial-gradient(circle_at_78%_12%,var(--color-brand-sky)_0,transparent_38%),radial-gradient(circle_at_22%_82%,var(--color-brand-green)_0,transparent_38%),radial-gradient(circle_at_28%_35%,var(--color-brand-gold)_0,transparent_38%)]" />
    </div>
  );
}
