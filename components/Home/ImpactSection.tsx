"use client";

import {
  FaUsers,
  FaBookOpen,
  FaHandsHelping,
  FaRegSmile,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function MITFeaturesPremium() {
  const t = useTranslations("impact");

  const features = [
    {
      icon: FaUsers,
      title: t("community.title"),
      desc: t("community.desc"),
    },
    {
      icon: FaBookOpen,
      title: t("education.title"),
      desc: t("education.desc"),
    },
    {
      icon: FaHandsHelping,
      title: t("support.title"),
      desc: t("support.desc"),
    },
    {
      icon: FaRegSmile,
      title: t("events.title"),
      desc: t("events.desc"),
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-yellow-600 font-serif">
          {t("heading")}
        </h2>

        <p className="text-md md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          {t("description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-xl bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 rounded-full mb-4 bg-yellow-100">
                  <Icon size={32} className="text-yellow-600" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
