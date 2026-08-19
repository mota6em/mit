"use client";

import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

import Section from "../reusable/Section";
import Reveal from "../reusable/Reveal";
import SectionHeader from "../reusable/SectionHeader";

const AchievementsSection = () => {
  const t = useTranslations("aboutMIT.achievements");
  const listItems = t.raw("list");
  const items = Array.isArray(listItems) ? listItems : [];

  return (
    <Section tone="dark" width="default" className="overflow-hidden" deferPaint>
      <div className="pattern-star-gold mask-radial pointer-events-none absolute -end-24 -top-24 h-[26rem] w-[26rem] opacity-[0.07]" />
      <div className="pointer-events-none absolute -start-32 bottom-0 h-80 w-80 rounded-full bg-brand-green/12 blur-3xl" />

      <SectionHeader
        title={t("title")}
        icon={<Trophy className="h-7 w-7" />}
        align="start"
        tone="light"
        className="relative mb-16 max-w-2xl"
      />

      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-y-2 start-[0.9rem] w-px bg-gradient-to-b from-brand-gold/50 via-white/15 to-transparent md:start-[1.4rem]"
        />

        {items.map((_, index) => (
          <Reveal
            as="li"
            key={index}
            y={18}
            delay={index * 70}
            className="group relative flex items-start gap-5 py-4 md:gap-8"
          >
            <span className="relative z-10 grid h-[1.8rem] w-[1.8rem] shrink-0 place-items-center rounded-full border border-white/15 bg-ink-900 transition-colors duration-500 group-hover:border-brand-gold md:h-[2.8rem] md:w-[2.8rem]">
              <span className="numeral text-[0.7rem] text-ink-400 transition-colors duration-500 group-hover:text-brand-gold md:text-[0.85rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>

            <p className="pt-1 text-[0.98rem] leading-relaxed text-ink-200 transition-colors duration-300 group-hover:text-white md:text-[1.05rem]">
              {t(`list.${index}`)}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
};

export default AchievementsSection;
