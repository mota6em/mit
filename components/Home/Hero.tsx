"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTranslations } from "next-intl";

const images = [
  "/imgs/hero/hero-bg-1.jpg",
  "/imgs/hero/hero-bg-2.jpg",
  "/imgs/hero/hero-bg-3.jpg",
  "/imgs/hero/hero-bg-4.jpg",
  "/imgs/hero/hero-bg-5.jpg",
  "/imgs/hero/hero-bg-6.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("hero");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentStack = images.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full min-h-[90vh] max-h-[90vh] overflow-hidden">
      {/* DESKTOP BG */}
      <div className="hidden md:block h-full">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`background ${index}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority
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
            src="/imgs/hero/hero-sm-bg.jpg"
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

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-6 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_2px_black]">
          {t("title")}
        </h1>

        <div className="flex flex-col font-serif items-center space-y-1">
          <p className="text-sm md:text-xl w-fit max-w-2xl text-yellow-300 font-semibold drop-shadow-[black_0_0_2px] transition-all duration-500">
            {t("subtitle1")}
          </p>
          <p className="text-sm md:text-xl w-fit max-w-2xl text-yellow-300 font-semibold drop-shadow-[black_0_0_2px] transition-all duration-500">
            {t("subtitle2")}
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 mt-3">
          {[
            {
              icon: FaFacebookF,
              href: "https://www.facebook.com/muszlimifjusag/",
              gradient: "from-blue-500 via-indigo-500 to-purple-500",
            },
            {
              icon: FaInstagram,
              href: "https://www.instagram.com/muszlimifjusag/",
              gradient: "from-pink-500 via-red-500 to-yellow-500",
            },
            {
              icon: FaWhatsapp,
              href: "https://wa.me/123456789",
              gradient: "from-green-400 via-lime-500 to-teal-500",
            },
            {
              icon: HiOutlineMail,
              href: "mailto:muszlimifjusag@gmail.com",
              gradient: "from-purple-400 via-pink-500 to-yellow-400",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-full shadow-lg text-white hover:scale-110 transition-all duration-300 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.gradient} animate-gradient-x`}
                ></div>
                <Icon size={20} className="relative z-10" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
