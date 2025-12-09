"use client";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const AchievementsSection = () => {
  const t = useTranslations("aboutMIT.achievements");

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          {t("title")}
        </h2>

        <div className="space-y-5 max-w-4xl mx-auto">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-[#f1c34c] hover:border-[#11b505]"
            >
              <CheckCircle2 className="w-7 h-7 text-[#11b505] flex-shrink-0 mt-0.5" />
              <p className="text-lg text-gray-700 leading-relaxed">
                {t(`list.${index}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
