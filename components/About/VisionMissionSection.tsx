"use client";
import { Target, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeader from "../reusable/SectionHeader";
import Section from "../reusable/Section";
import Reveal from "../reusable/Reveal";

const CARDS = [
  {
    key: "vision",
    icon: Target,
    accent: "text-brand-sky",
    tile: "bg-brand-sky-soft",
    glow: "bg-brand-sky/10",
    hover: "hover:border-brand-sky/40",
  },
  {
    key: "mission",
    icon: Rocket,
    accent: "text-brand-gold-dark",
    tile: "bg-brand-gold-soft",
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
        className="mb-14"
        underLine
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal
              as="article"
              key={card.key}
              y={28}
              delay={i * 120}
              className={`surface group relative flex flex-col overflow-hidden rounded-[2rem] p-9 transition-colors duration-500 md:p-12 ${card.hover}`}
            >
              {/* Ambient accent that warms the card corner */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${card.glow}`}
              />

              <div className="relative z-10 flex flex-col">
                <div
                  className={`mb-7 grid h-14 w-14 place-items-center rounded-2xl ${card.tile} ${card.accent}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="display mb-4 text-2xl text-ink-900 md:text-3xl">
                  {t(`${card.key}.title`)}
                </h3>

                <p className="lede mb-8 text-ink-700">
                  {t(`${card.key}.description`)}
                </p>

                {/* Tagline reads as a pull-quote, not another paragraph */}
                <div className="mt-auto flex items-center gap-3 border-t border-ink-200 pt-6">
                  <span className={`h-8 w-1 rounded-full ${card.tile}`} />
                  <span className="text-sm font-semibold tracking-wide text-ink-600">
                    {t(`${card.key}.tagline`)}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};

export default VisionMissionSection;
