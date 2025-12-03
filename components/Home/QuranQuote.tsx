"use client";
import { AuroraBackground } from "@/src/components/ui/aurora-background";

export default function QuranQuote() {
  return (
    <AuroraBackground className=" h-screen md:h-screen min-h-[120vh] w-screen bg-gradient-to-b from-green-900 via-blue-900 to-zinc-900 flex items-center justify-center px-4 md:px-10">
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
    </AuroraBackground>
  );
}
