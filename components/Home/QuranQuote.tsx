"use client";
 import Image from "next/image";

export default function QuranQuote() {
  return (
    <div className="h-screen md:h-screen max-h-screen w-screen bg-gradient-to-b from-green-900 via-blue-900 to-zinc-900 flex flex-col items-center justify-center px-4 md:px-10 relative">
      <div className="relative text-center z-10 mt-14">
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
      <div className="w-full z-10 flex flex-col items-center gap-3 mt-20">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/imgs/mit-logo-full-resized.png"
            alt="MIT Logo"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
        <p className="text-white/90 font-semibold text-sm md:text-base tracking-wide Carena-font">
          MIT
        </p>
      </div>
    </div>
  );
}
