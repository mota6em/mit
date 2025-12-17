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
  const t = useTranslations("hero");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  // Handle slicing for the stack logic safely
  const currentStack = [
    images[currentIndex % images.length],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length],
  ];

  return (
    <div className="relative w-full min-h-[90vh] max-h-[90vh] overflow-hidden">
      {/* DESKTOP BG */}
      <div className="hidden md:block h-full">
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
          />
        ))}
      </div>

      {/* MOBILE STACK */}
      <div className="flex flex-col md:hidden absolute inset-0 w-full h-full">
        {/* top image */}
        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          <Image
            src={currentStack[0]}
            alt="top"
            fill
            className="object-cover"
          />
        </div>

        {/* middle image (fixed) */}
        <div className="relative flex-1 w-full">
          <Image
            src="/imgs/home/aboutmit/hero-sm-bg.jpg"
            alt="middle-fixed"
            fill
            className="object-cover"
          />
        </div>

        {/* bottom image */}
        <div className="relative flex-1 w-full transition-opacity duration-700 ease-out">
          <Image
            src={currentStack[1]}
            alt="bottom"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-6 space-y-1">
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
          <p className="text-sm md:text-xl w-fit max-w-2xl-0 p-0 text-white font-semibold drop-shadow-[black_0_0_2px]">
            {t("subtitle1")}
          </p>
        </div>

        <SocialMediaIcons />
      </div>
    </div>
  );
}
