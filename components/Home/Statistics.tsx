"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { useTranslations } from "next-intl";
import SectionHeader from "../reusable/SectionHeader";
import { useCounter } from "@/app/hooks/useCounter";

const STATS_CONFIG = [
  {
    icon: FaUsers,
    target: 10,
    suffix: "+",
    key: "years",
    color: "text-[#2D9B4A]",
  },
  {
    icon: FaCalendarAlt,
    target: 100,
    suffix: "+",
    key: "events",
    color: "text-[#F9BC15]",
  },
  {
    icon: FaHashtag,
    target: 1500,
    suffix: "+",
    key: "social",
    color: "text-[#00ADEF]",
  },
];

const StatItem = ({
  stat,
  label,
}: {
  stat: (typeof STATS_CONFIG)[0];
  label: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const display = useCounter(stat.target, stat.suffix, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center px-4 group"
    >
      <div
        className={`mb-4 p-4 rounded-full bg-gray-50 transition-colors group-hover:bg-gray-100 ${stat.color}`}
      >
        <stat.icon className="text-3xl" aria-hidden="true" />
      </div>

      <motion.span className="text-4xl md:text-5xl  text-gray-800 mb-2">
        {display}
      </motion.span>

      <span className="text-xs md:text-sm  text-gray-400 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
};

const Statistics = () => {
  const t = useTranslations("home.statistics");

  return (
    <section className="py-20 bg-white border-y border-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={t("title")} className="mb-14" underLine />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STATS_CONFIG.map((stat) => (
            <StatItem
              key={stat.key}
              stat={stat}
              label={t(`${stat.key}Label`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
