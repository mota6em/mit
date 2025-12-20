"use client";

import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Statistics = () => {
  const t = useTranslations("home.statistics");

  const stats = [
    {
      icon: FaHashtag,
      value: "1.5k+",
      label: t("socialLabel"),
      color: "text-blue-500",
    },
    {
      icon: FaUsers,
      value: "9+",
      label: t("yearsLabel"),
      color: "text-[#11b505]",
    },
    {
      icon: FaCalendarAlt,
      value: "100+",
      label: t("eventsLabel"),
      color: "text-[#e8b030]",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Simple Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold Carena-font text-gray-900 mb-4">
            {t("titlePart1")}{" "}
            <span className="text-[#11b505]">{t("titlePart2")}</span>
          </h2>
          <div className="w-16 h-1 bg-[#e8b030] mx-auto rounded-full" />
        </div>

        {/* Minimalist Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4"
            >
               <div className={`mb-4 p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="text-2xl" aria-hidden="true" />
              </div>

               <span className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {stat.value}
              </span>

               <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </span>

               {index < stats.length - 1 && (
                <div className="w-12 h-px bg-gray-100 mt-12 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
