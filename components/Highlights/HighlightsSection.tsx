"use client";

import { useTranslations } from "next-intl";
import { Megaphone } from "lucide-react";
import FeaturedAnnouncement from "./FeaturedAnnouncement";
import { HighlightsSectionProps } from "@/lib/types";
import { useHighlightsSection } from "@/app/hooks/useHighlightsSection";
import SectionHeader from "../reusable/SectionHeader";
import ViewMoreButton from "../reusable/ViewMoreButton";
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

  const latestHighlightOnly = limit === 1;
  const latestAnnouncement = displayedHighlights[0];

  const sectionTitle = titleKey
    ? t(titleKey)
    : latestHighlightOnly
    ? t("latestAnnouncement")
    : titleText;

  if (loading) {
    return (
      <section
        id={sectionId}
        className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col gap-8 px-5 py-16 sm:px-8 md:gap-16 md:py-20"
      >
        {Array.from({ length: limit || 3 }).map((_, i) => (
          <HighlightSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (!latestAnnouncement) {
    return (
      <section
        id={sectionId}
        className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col items-center px-5 py-16 sm:px-8 md:py-20"
      >
        <SectionHeader title={sectionTitle} className="mb-10" />
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-dashed border-ink-300 bg-white/60 px-8 py-14 text-center">
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
            <Megaphone className="h-6 w-6" />
          </span>
          <p className="text-[0.95rem] font-medium text-ink-600">
            {t("noAnnouncements")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col px-5 py-16 sm:px-8 md:py-20"
    >
      {latestHighlightOnly ? (
        <>
          <SectionHeader title={sectionTitle} className="mb-10" underLine />
          <FeaturedAnnouncement
            announcement={latestAnnouncement}
            locale={locale}
          />
          <div className="mt-10 flex justify-center">
            <ViewMoreButton
              href={linkHref}
              label={t("viewAllHighlights")}
              variant="centered"
            />
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col gap-12 md:gap-20">
          {displayedHighlights.map((h) => (
            <FeaturedAnnouncement
              key={h.highlightId}
              announcement={h}
              locale={locale}
            />
          ))}
        </div>
      )}
    </section>
  );
}
