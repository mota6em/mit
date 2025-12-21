"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface HeroProps {
  images: string[];
}

export default function Hero({ images }: HeroProps) {
  const t = useTranslations("home");

  return (
    <div className="relative w-full min-h-[93.5vh] max-h-screen md:min-h-[87vh] md:max-h-[90vh] overflow-hidden">
      {/** * Desktop Background Slider */}
      <div className="hidden lg:block h-full">
        <Image
          src={"/imgs/home/hero/picnic2.jpg"}
          alt="hero"
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out`}
          priority={true}
          style={{ filter: "brightness(0.75)" }}
        />
      </div>

      {/** * Mobile Image Stack */}
      <div className="flex flex-col lg:hidden absolute inset-0 w-full h-full">
        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          <Image
            src={"/imgs/home/hero/picnic2.jpg"}
            alt="top"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 w-full">
          <Image
            src="/imgs/home/aboutmit/hero-sm-bg.jpg"
            alt="middle-fixed"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          <Image
            s
            src={"/imgs/home/hero/picnic.jpg"}
            alt="bottom"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/** * Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:mt-3 md:px-6 space-y-1">
        <h1 className="text-3xl md:text-5xl font-bold relative">
          <span className="text-[#f1c34c] drop-shadow-[0_0_4px_black]">
            {t("hero.title")}
          </span>
        </h1>

        <div className="flex flex-col w-fit p-2 rounded-md items-center">
          <p className="text-sm md:text-xl w-fit max-w-xs md:max-w-md text-white font-semibold drop-shadow-[black_0_0_2px]">
            {t("hero.subtitle1")}
          </p>
        </div>
      </div>
    </div>
  );
}
