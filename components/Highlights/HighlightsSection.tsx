"use client";

import { useTranslations } from "next-intl";
import { Megaphone } from "lucide-react";

import FeaturedAnnouncement from "./FeaturedAnnouncement";
import HighlightCard from "./HighlightCard";
import { HighlightsSectionProps } from "@/lib/types";
import { useHighlightsSection } from "@/app/hooks/useHighlightsSection";
import SectionHeader from "../reusable/SectionHeader";
import ViewMoreButton from "../reusable/ViewMoreButton";
import Reveal from "../reusable/Reveal";
import { HighlightSkeleton } from "../skeletons/HighlightSkeleton";

export default function HighlightsSection(props: HighlightsSectionProps) {
  const {
    loading,
    displayedHighlights,
    titleText,
    linkHref,
    sectionId,
    locale,
  } = useHighlightsSection(props);

  const { limit, titleKey } = props;
  const t = useTranslations("highlights");

  const latestOnly = limit === 1;
  const sectionTitle = titleKey
    ? t(titleKey)
    : latestOnly
    ? t("latestAnnouncement")
    : titleText;

  const [featured, ...rest] = displayedHighlights;

  return (
    <section
      id={sectionId}
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-16 sm:px-8 md:py-24 lg:px-12"
    >
      {latestOnly && (
        <SectionHeader
          title={sectionTitle}
          align="start"
          className="mb-12 max-w-2xl"
        />
      )}

      {loading ? (
        <div className="flex flex-col gap-10">
          {Array.from({ length: limit || 2 }).map((_, i) => (
            <HighlightSkeleton key={i} />
          ))}
        </div>
      ) : !featured ? (
        <Reveal
          y={16}
          className="mx-auto flex w-full max-w-md flex-col items-center rounded-[1.5rem] border border-dashed border-ink-300 bg-white/60 px-8 py-14 text-center"
        >
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
            <Megaphone className="h-6 w-6" />
          </span>
          <p className="text-[0.95rem] font-medium text-ink-600">
            {t("noAnnouncements")}
          </p>
        </Reveal>
      ) : (
        <div className="flex flex-col gap-8 md:gap-10">
          <FeaturedAnnouncement
            announcement={featured}
            locale={locale}
            eager={!latestOnly}
          />

          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {rest.map((highlight, index) => (
                <HighlightCard
                  key={highlight.highlightId}
                  highlight={highlight}
                  locale={locale}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {latestOnly && featured && (
        <ViewMoreButton
          href={linkHref}
          label={t("viewAllHighlights")}
          className="mt-12"
        />
      )}
    </section>
  );
}
