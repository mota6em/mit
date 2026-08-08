"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "../reusable/SectionHeader";
import { STATS_CONFIG } from "@/data/constants/statistics";
import { StatItem } from "./StatItem";

const Statistics = () => {
  const t = useTranslations("home.statistics");

  return (
    <section className="relative overflow-hidden border-y border-ink-200 bg-white py-24 md:py-28">
      {/* Soft brand light pooling behind the numbers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader title={t("title")} className="mb-16" underLine />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {STATS_CONFIG.map((stat, i) => (
            <div key={stat.key} className="relative">
              {/* Vertical hairlines between columns, desktop only */}
              {i > 0 && (
                <span className="absolute -left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent md:block" />
              )}
              <StatItem
                stat={stat}
                label={t(`${stat.key}Label`)}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
