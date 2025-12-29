"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "../reusable/SectionHeader";
import { STATS_CONFIG } from "@/data/constants/statistics";
import { StatItem } from "./StatItem";

const Statistics = () => {
  const t = useTranslations("home.statistics");

  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={t("title")} className="mb-20" underLine />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
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
