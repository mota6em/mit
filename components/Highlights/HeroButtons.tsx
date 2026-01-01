"use client";
import { HiArrowRight } from "react-icons/hi";

export const HeroButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      className="px-8 py-3.5 cursor-pointer bg-[#4d93fb] text-white rounded-full font-semibold hover:bg-[#3b7ddb] transition-all shadow-[0_4px_15px_rgba(77,147,251,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
      onClick={() => {
        const el = document.getElementById("highlights-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Explore Highlights
    </button>

    <button
      className="px-8 py-3.5 cursor-pointer bg-white text-gray-600 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      onClick={() => {
        window.location.href = "/en"; // or use router
      }}
    >
      Back to Home <HiArrowRight />
    </button>
  </div>
);
