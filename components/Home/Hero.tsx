"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

interface HeroProps {
  images: string[];
}

export default function Hero({ images }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
  const t = useTranslations("hero");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setCurrentIndexMobile((prev) => (prev + 2) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const currentStack = [
    images[currentIndexMobile % images.length],
    images[(currentIndexMobile + 1) % images.length],
  ];

  return (
    <div className="relative w-full min-h-[93.5vh] max-h-screen md:min-h-[87vh] md:max-h-[90vh] overflow-hidden">
      {/** * Desktop Background Slider */}
      <div className="hidden lg:block h-full">
        {images.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={`background ${index}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            style={{ filter: "brightness(0.9)" }}
          />
        ))}
      </div>

      {/** * Mobile Image Stack */}
      <div className="flex flex-col lg:hidden absolute inset-0 w-full h-full">
        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          <Image
            src={currentStack[0]}
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
            src={currentStack[1]}
            alt="bottom"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/** * Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:mt-3 md:px-6 space-y-1">
        <h1 className="text-4xl Carena-font font-serif md:text-6xl font-bold relative">
          <span className="text-[#f1c34c] drop-shadow-[0_0_4px_black]">
            {t("title").split(" ")[0]}{" "}
          </span>
          <span className="text-[#11b505] drop-shadow-[0_0_4px_black]">
            {t("title").split(" ")[1]}{" "}
          </span>
          <span className="text-[#4d93fb] drop-shadow-[0_0_4px_black]">
            {t("title").split(" ")[2]}
          </span>
        </h1>

        <div className="flex flex-col w-fit p-2 font-serif rounded-md items-center">
          <p className="text-sm md:text-xl w-fit max-w-xs md:max-w-md text-white font-semibold drop-shadow-[black_0_0_2px]">
            {t("subtitle1")}
          </p>
        </div>
      </div>
    </div>
  );
}
