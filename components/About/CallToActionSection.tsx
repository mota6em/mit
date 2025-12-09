"use client";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const CallToActionSection = () => {
  const t = useTranslations("aboutMIT.callToAction");

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#4d93fb]/5 via-[#11b505]/5 to-[#f1c34c]/5 p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 tracking-widest Ang-font">
            <span className="text-yellow-600">
              {t("title")}
            </span>
            <br />
            <span className="text-yellow-600">
              {t("subtitle")}
            </span>
          </h2>

          <ul className="text-left max-w-2xl mx-auto space-y-6 mt-12">
            {[0, 1, 2].map((index) => (
              <li
                key={index}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-[#11b505] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{t(`points.${index}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
