"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % images.length); 
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  const currentStack = images.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative -mt-17.5 h-screen w-full overflow-hidden">
      {/* md+ screens: full background slideshow */}
      <div className="hidden md:block">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`background ${index}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
        ))}
      </div>

      {/* small screens: 3 images stacked vertically with staggered fade */}
      <div className="flex flex-col md:hidden absolute inset-0 w-full h-full">
        {currentStack.map((img, index) => (
          <div
            key={index}
            className={`relative flex-1 w-full transition-opacity duration-1000 delay-[${
              index * 300
            }ms]`}
          >
            <Image
              src={img}
              alt={`stacked ${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* overlay content */}
      <div className="absolute inset-0 drop-shadow-[0_0_2px_black] flex flex-col gap-y-2 items-center justify-center text-white text-center px-6 space-y-4 md:space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">
          Muszlim Ifjúsági Társaság
        </h1>
        <p className="text-md md:text-xl max-w-2xl bg-yellow-600/50 backdrop-blur-sm shadow-lg text-white font-semibold">
          Welcome to the official page! <br /> Events for Muslim Students &
          Community.
        </p>
      </div>
    </div>
  );
}
