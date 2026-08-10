"use client";

import { useTranslations } from "next-intl";
import { Clock, Network, Sparkles, Users2 } from "lucide-react";

import Section from "../reusable/Section";
import SectionHeader from "../reusable/SectionHeader";
import Reveal from "../reusable/Reveal";
import ViewMoreButton from "../reusable/ViewMoreButton";

const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSd6KJuRRaifHAoZTEBxKaawimJBzj_pAaU7zBnSgMuq_BQBvA/viewform";

const BENEFITS = [
  { key: "impact", icon: Sparkles, accent: "text-brand-gold-dark", tile: "bg-brand-gold-soft" },
  { key: "network", icon: Network, accent: "text-brand-sky", tile: "bg-brand-sky-soft" },
  { key: "leadership", icon: Users2, accent: "text-brand-green", tile: "bg-brand-green-soft" },
] as const;

export default function JoinMITVolunteerSection() {
  const t = useTranslations("joinMIT");

  return (
    <Section id="volunteer" tone="plain" width="default" deferPaint>
      <SectionHeader
        title={t("volunteer.title")}
        topText={t("impactTag")}
        description={t("volunteer.description")}
        align="start"
        className="mb-14 max-w-2xl"
      />

      <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        {BENEFITS.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Reveal
              key={benefit.key}
              y={24}
              delay={index * 110}
              className="surface surface-lift group flex flex-col rounded-[1.5rem] p-7"
            >
              <span
                className={`mb-6 grid h-13 w-13 place-items-center rounded-2xl p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${benefit.tile} ${benefit.accent}`}
              >
                <Icon className="h-6 w-6" />
              </span>

              <h3 className="display text-[1.1rem] leading-snug text-ink-900">
                {t(`volunteer.benefits.${benefit.key}`)}
              </h3>

              <span className="numeral mt-auto pt-6 text-sm text-ink-300 transition-colors duration-500 group-hover:text-brand-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        y={20}
        delay={220}
        className="mt-10 flex flex-col items-start gap-5 rounded-[1.5rem] border border-brand-green/25 bg-brand-green-soft/60 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9"
      >
        <p className="inline-flex items-center gap-2.5 text-sm font-medium text-brand-green-dark">
          <Clock className="h-4 w-4 shrink-0" />
          {t("volunteer.note")}
        </p>

        <ViewMoreButton
          href={VOLUNTEER_FORM}
          label={t("volunteer.button")}
          variant="inline"
          external
          linkClassName="btn btn-green btn-sheen group"
        />
      </Reveal>
    </Section>
  );
}
