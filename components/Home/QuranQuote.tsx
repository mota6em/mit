"use client";

export default function QuranQuote() {
  return (
    <section className="relative w-full my-10 py-20 px-4 overflow-hidden">
      {/* subtle geometric pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/imgs/patterns/islamic-pattern.jpg')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className="bg-white/40 backdrop-blur-md border border-white/50 
                        shadow-xl rounded-3xl px-2 md:px-10 py-4 md:py-12"
        >
          {/* Arabic */}
          <p className="text-[28px] md:text-[36px] font-semibold text-white leading-relaxed tracking-wide">
            ( وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰ ۖ )
          </p>

          {/* English translation */}
          <p className="mt-2 text-[20px] md:text-[24px] font-medium text-white tracking-wide">
            “Cooperate with one another in goodness and righteousness.”
          </p>

          {/* reference */}
          <p className="mt-3 text-white font-medium tracking-wider">
            — Quran 5:2
          </p>
        </div>
      </div>
    </section>
  );
}
