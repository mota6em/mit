"use client";

import { useTranslations } from "next-intl";
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

  return (
    <section
      id={sectionId}
      className="mt-8 px-4 md:px-8 flex flex-col items-center"
    >
      <div className="flex flex-col gap-8 md:gap-16 w-full">
        {loading ? (
          Array.from({ length: limit || 6 }).map((_, i) => (
            <div key={i} className="w-full">
              <HighlightSkeleton />
            </div>
          ))
        ) : latestHighlightOnly ? ( //for latest announcement layout in home page
          <section
            id={sectionId}
            className="relative mt-6 mb-8 px-4 md:px-6 lg:px-8"
          >
            <SectionHeader title={sectionTitle} className="my-8" />
            <FeaturedAnnouncement
              announcement={latestAnnouncement}
              locale={locale}
            />
            <div className="flex justify-center mt-8">
              <ViewMoreButton
                href={linkHref}
                label={t("viewAllHighlights")}
                variant="centered"
              />
            </div>
          </section>
        ) : (
          displayedHighlights.map((h) => (
            <div key={h.highlightId} className="w-full">
              <FeaturedAnnouncement announcement={h} locale={locale} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
