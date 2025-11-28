"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/imgs/hero/hero-bg-1.jpg",
  "/imgs/hero/hero-bg-2.jpg",
  "/imgs/hero/hero-bg-3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`background ${index}`}
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      ))}

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
