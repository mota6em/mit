"use client";
import { Building2, Heart, Link as LinkIcon, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const CommunityRoleSection = () => {
  const t = useTranslations("aboutMIT.communityRole");

  const roleIcons = [Building2, Heart, LinkIcon, Sparkles];
  const roleColors = ["#4d93fb", "#11b505", "#f1c34c", "#9b59b6"];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((index) => {
            const Icon = roleIcons[index];
            return (
              <div
                key={index}
                className="flex items-start gap-5 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 "
              >
                <div
                  style={{ backgroundColor: roleColors[index] }}
                  className="p-4 rounded-xl flex-shrink-0 shadow-md"
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                  {t(`roles.${index}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityRoleSection;
