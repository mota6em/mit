"use client";
import { AuroraBackground } from "@/src/components/ui/aurora-background";
import Image from "next/image";

export default function QuranQuote() {
  return (
    <AuroraBackground className=" h-screen md:h-screen max-h-screen w-screen bg-gradient-to-b from-green-900 via-blue-900 to-zinc-900 flex flex-col items-center justify-center px-4 md:px-10 relative">
      <div className="relative text-center z-10">
        {/* Ayah */}
        <p className="text-2xl md:text-5xl font-semibold font-serif text-white leading-relaxed tracking-wide">
          « وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰۖ »
        </p>

        {/* English translation */}
        <p className="mt-3 text-xl lg:text-3xl font-medium font-serif text-white tracking-wide">
          “Cooperate with one another in goodness and righteousness.”
        </p>

        {/* reference */}
        <p className="mt-2 text-white font-medium font-serif tracking-wider text-sm sm:text-base md:text-xl">
          — Quran 5:2
        </p>
      </div>

      {/* MIT Logo and Text at Bottom */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/imgs/hero/mit-logo-full.png"
            alt="MIT Logo"
            fill
            className="object-contain drop-shadow-lg"
            placeholder="blur"
            blurDataURL="/imgs/hero/mit-logo-resized.png"
          />
        </div>
        <p className="text-white/90 font-semibold text-sm md:text-base tracking-wide Carena-font">
          MIT
        </p>
      </div>
    </AuroraBackground>
  );
}
