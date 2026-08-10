"use client";

import { useTranslations } from "next-intl";

import SectionHeader from "../reusable/SectionHeader";
import { STATS_CONFIG } from "@/data/constants/statistics";
import { StatItem } from "./StatItem";

const Statistics = () => {
  const t = useTranslations("home.statistics");

  return (
    <section className="defer-paint relative overflow-hidden border-y border-ink-200 bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          title={t("title")}
          topText={t("eyebrow")}
          align="start"
          className="mb-16 max-w-2xl"
        />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          {STATS_CONFIG.map((stat, i) => (
            <div key={stat.key} className="relative">
              {i > 0 && (
                <span className="absolute -start-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent md:block" />
              )}
              <StatItem stat={stat} label={t(`${stat.key}Label`)} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
