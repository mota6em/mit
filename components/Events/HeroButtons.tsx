"use client";
import { HiCalendar, HiArrowRight } from "react-icons/hi";

interface HeroButtonsProps {
  t: any; // translation function
}

export const HeroButtons = ({ t }: HeroButtonsProps) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      className="px-8 py-3.5 cursor-pointer bg-brand-sky text-white rounded-full font-semibold hover:bg-brand-sky/85 transition-all shadow-[0_4px_15px_rgba(77,147,251,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
      onClick={() => {
        const el = document.getElementById("upcoming-events");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <HiCalendar className="text-xl" />
      {t("hero.primaryBtn")}
    </button>

    <button
      className="px-8 py-3.5 cursor-pointer bg-white text-ink-600 border border-ink-200 rounded-full font-semibold hover:bg-ink-50 transition-colors flex items-center justify-center gap-2"
      onClick={() => {
        const el = document.getElementById("past-events");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {t("hero.secondaryBtn")} <HiArrowRight />
    </button>
  </div>
);
