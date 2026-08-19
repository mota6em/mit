"use client";

import { useTranslations } from "next-intl";

import Section from "../reusable/Section";
import SectionHeader from "../reusable/SectionHeader";
import Reveal from "../reusable/Reveal";
import { StarMark } from "../reusable/Ornament";

const CARDS = [
  {
    key: "vision",
    accent: "text-brand-sky",
    rule: "bg-brand-sky",
    glow: "bg-brand-sky/10",
    hover: "hover:border-brand-sky/40",
  },
  {
    key: "mission",
    accent: "text-brand-gold-dark",
    rule: "bg-brand-gold",
    glow: "bg-brand-gold/10",
    hover: "hover:border-brand-gold/50",
  },
] as const;

const VisionMissionSection = () => {
  const t = useTranslations("aboutMIT.visionMission");

  return (
    <Section tone="plain" width="wide" deferPaint>
      <SectionHeader
        title={t("title")}
        topText={t("coreFoundations")}
        align="start"
        className="mb-12 max-w-2xl md:mb-14"
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
        {CARDS.map((card, i) => (
          <Reveal
            as="article"
            key={card.key}
            y={28}
            delay={i * 120}
            className={`surface group relative flex flex-col overflow-hidden rounded-[1.5rem] p-7 transition-colors duration-500 sm:p-9 md:rounded-[2rem] md:p-12 ${card.hover}`}
          >
            <div
              className={`pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full blur-3xl ${card.glow}`}
            />

            <div className="relative z-10 flex flex-1 flex-col">
              <div className="flex items-center gap-4">
                <span className={`h-7 w-7 shrink-0 ${card.accent}`}>
                  <StarMark strokeWidth={1.6} />
                </span>
                <h3 className="eyebrow text-ink-500">
                  {t(`${card.key}.title`)}
                </h3>
              </div>

              <span
                aria-hidden="true"
                className={`mt-6 h-[3px] w-12 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20 ${card.rule}`}
              />

              <p className="display mt-7 text-[clamp(1.2rem,2.6vw,1.6rem)] font-normal leading-[1.5] tracking-normal text-ink-900">
                {t(`${card.key}.description`)}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-9">
                <span className="numeral text-[0.72rem] tracking-widest text-ink-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-ink-200" />
                <span className="text-[0.78rem] font-semibold tracking-wide text-ink-500">
                  {t(`${card.key}.tagline`)}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default VisionMissionSection;
