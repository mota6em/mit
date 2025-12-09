"use client";
import { BookOpen, Users, Megaphone, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

const CoreServicesSection = () => {
  const t = useTranslations("aboutMIT.coreServices");

  const serviceIcons = [BookOpen, Users, Megaphone, UserPlus];
  const serviceColors = ["#4d93fb", "#11b505", "#f1c34c", "#9b59b6"];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font text-yellow-600">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0, 1, 2, 3].map((index) => {
            const Icon = serviceIcons[index];
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  style={{ backgroundColor: serviceColors[index] }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg  transition-transform duration-300"
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
                  {t(`services.${index}.title`)}
                </h3>
                <p className="text-center text-gray-600 leading-relaxed">
                  {t(`services.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
