"use client";

import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { useTranslations } from "next-intl";
import HighlightCardSkeleton from "../skeletons/HighlightCardSkeleton";
import FeaturedAnnouncement from "./FeaturedAnnouncement";
import { FeaturedAnnouncementSkeleton } from "../skeletons/FeaturedAnnouncementSkeleton";
import { HighlightsSectionProps } from "@/lib/types";
import { useHighlightsSection } from "@/app/hooks/useHighlightsSection";
import SectionHeader from "../reusable/SectionHeader";
import ViewMoreButton from "../reusable/ViewMoreButton";

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

  const useFeaturedLayout = limit === 1;
  const latestAnnouncement = displayedHighlights[0];

  const sectionTitle = titleKey
    ? t(titleKey)
    : useFeaturedLayout
    ? t("latestAnnouncement")
    : titleText;

  // Featured Layout (homepage - single announcement)
  if (useFeaturedLayout) {
    return (
      <section
        id={sectionId}
        className="relative mt-6 mb-8 px-4 md:px-6 lg:px-8"
      >
        <SectionHeader title={sectionTitle} className="my-8" />
        {loading ? (
          <FeaturedAnnouncementSkeleton />
        ) : latestAnnouncement ? (
          <FeaturedAnnouncement
            announcement={latestAnnouncement}
            locale={locale}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl mx-auto text-center py-8"
          >
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBell className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">{t("noAnnouncements")}</p>
          </motion.div>
        )}
        <div className="flex justify-center mt-8">
          <ViewMoreButton
            href={linkHref}
            label={t("viewAllHighlights")}
            variant="centered"
          />
        </div>
      </section>
    );
  }

  // Grid Layout (highlights page - multiple cards)
  return (
    <section
      id={sectionId}
      className="mt-8 px-4 md:px-8 flex flex-col items-center"
    >
      <div className="flex flex-col gap-8 md:gap-16 w-full">
        {loading
          ? Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={i} className="w-full">
                <HighlightCardSkeleton />
              </div>
            ))
          : displayedHighlights.map((h) => (
              <div key={h.highlightId} className="w-full">
                <FeaturedAnnouncement announcement={h} locale={locale} />
              </div>
            ))}
      </div>
    </section>
  );
}
