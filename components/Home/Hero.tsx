"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("home");
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileTopLoaded, setMobileTopLoaded] = useState(false);
  const [mobileMiddleLoaded, setMobileMiddleLoaded] = useState(false);
  const [mobileBottomLoaded, setMobileBottomLoaded] = useState(false);

  return (
    <div className="relative w-full min-h-[85vh] max-h-[85vh] md:min-h-[87vh] md:max-h-[90vh] overflow-hidden">
      {/** * Desktop Background Slider */}
      <div className="hidden lg:block h-full">
        {!desktopLoaded && <ImageSkeleton />}
        <Image
          src={"/imgs/home/hero/picnic.jpg"}
          alt="hero"
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
            desktopLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority={true}
          style={{ filter: "brightness(0.75)" }}
          onLoad={() => setDesktopLoaded(true)}
        />
      </div>

      {/** * Mobile Image Stack */}
      <div className="flex flex-col lg:hidden absolute inset-0 w-full h-full">
        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          {!mobileTopLoaded && <ImageSkeleton />}
          <Image
            src={"/imgs/home/hero/picnic2.jpg"}
            alt="top"
            fill
            className={`object-cover transition-opacity duration-500 ${
              mobileTopLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setMobileTopLoaded(true)}
          />
        </div>

        <div className="relative flex-1 w-full">
          {!mobileMiddleLoaded && <ImageSkeleton />}
          <Image
            src="/imgs/home/aboutmit/hero-sm-bg.jpg"
            alt="middle-fixed"
            fill
            className={`object-cover transition-opacity duration-500 ${
              mobileMiddleLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setMobileMiddleLoaded(true)}
          />
        </div>

        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          {!mobileBottomLoaded && <ImageSkeleton />}
          <Image
            src={"/imgs/home/hero/picnic.jpg"}
            alt="bottom"
            fill
            className={`object-cover transition-opacity duration-500 ${
              mobileBottomLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setMobileBottomLoaded(true)}
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
