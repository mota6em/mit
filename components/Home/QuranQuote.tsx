"use client";

import Image from "next/image";

export default function QuranQuote() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center px-4 md:px-10 overflow-hidden">
      {/* Mobile background */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/imgs/patterns/quba-alsakhra-mobile-view-3.jpg"
          alt="Quba Al-Sakhra Mobile"
          fill
          priority
          placeholder="blur"
          blurDataURL="/imgs/patterns/quba-alsakhra-mobile-view-3-lowres.jpg"
          className="object-cover"
        />
      </div>

      {/* Desktop background */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/imgs/patterns/quba-alsakhra.jpg"
          alt="Quba Al-Sakhra"
          fill
          priority
          placeholder="blur"
          blurDataURL="/imgs/patterns/quba-alsakhra-lowres.jpg"
          className="object-cover"
        />
      </div>

      {/* content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className="bg-yellow-600/10 md:bg-yellow-500/20 backdrop-blur-xs border border-white/30 
                        shadow-2xl rounded-lg md:rounded-3xl px-2 md:px-4 py-3 md:py-8"
        >
          {/* Arabic */}
          <p className="text-[26px] md:text-[36px] font-semibold text-white leading-relaxed tracking-wide">
            ( وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰۖ )
          </p>

          {/* English translation */}
          <p className="mt-1 md:mt-3 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-medium text-white tracking-wide">
            “Cooperate with one another in goodness and righteousness.”
          </p>

          {/* reference */}
          <p className="mt-1 md:mt-3 text-white font-medium tracking-wider text-sm sm:text-base md:text-lg">
            — Quran 5:2
          </p>
        </div>
      </div>
    </section>
  );
}
