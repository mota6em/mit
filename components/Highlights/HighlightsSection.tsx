"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBell } from "react-icons/fa";
import HighlightCard from "./HighlightCard";
import HighlightCardSkeleton from "../skeletons/HighlightCardSkeleton";
import FeaturedAnnouncement from "./FeaturedAnnouncement";
import { FeaturedAnnouncementSkeleton } from "../skeletons/FeaturedAnnouncementSkeleton";
import { HighlightsSectionProps } from "@/lib/types";
import { useHighlightsSection } from "@/app/hooks/useHighlightsSection";
import SectionHeader from "../reusable/SectionHeader";
import ViewAllButton from "../reusable/ViewAllButton";
import { useTranslations } from "next-intl";

export default function HighlightsSection(props: HighlightsSectionProps) {
  const {
    loading,
    displayedHighlights,
    titleText,
    linkHref,
    sectionId,
    locale,
  } = useHighlightsSection(props);

  const { limit, showViewAll = true, year, titleKey } = props;
  const t = useTranslations("highlights");

  // Determine if we should use featured layout (only for limit=1 on homepage)
  const useFeaturedLayout = limit === 1 && !year;

  // Get only the latest announcement for featured layout
  const latestAnnouncement = displayedHighlights[0];

  // Use custom title if provided, otherwise use appropriate default
  const sectionTitle = titleKey
    ? t(titleKey)
    : useFeaturedLayout
    ? "Latest Announcement"
    : titleText;

  // Featured Layout (for homepage - shows only latest announcement)
  if (useFeaturedLayout) {
    return (
      <section
        id={sectionId}
        className="relative mt-8 mb-16 px-4 md:px-8 lg:px-12"
      >
        <SectionHeader title={sectionTitle} className="my-12" />
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
            className="w-full max-w-2xl mx-auto text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBell className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No announcements yet</p>
          </motion.div>
        )}
        <div className="flex justify-center mt-8">
          <ViewAllButton href={linkHref} label={t("viewAllHighlights")} />
        </div>
      </section>
    );
  }

  // Grid Layout (for highlights page - shows multiple cards in columns)
  return (
    <section
      id={sectionId}
      className="mt-14 px-4 md:px-10 flex flex-col items-center"
    >
      <SectionHeader
        title={sectionTitle}
        className="text-3xl md:text-4xl text-center tracking-wide"
      />
      {/* Cards Grid */}
      <div className="flex overflow-x-auto items-center overflow-y-hidden md:grid md:grid-cols-3 gap-6 w-full md:w-fit md:gap-10 snap-x snap-mandatory scrollbar-hide pb-4 px-2">
        {loading
          ? Array.from({ length: limit || 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[75vw] md:min-w-2xs snap-start h-full"
              >
                <HighlightCardSkeleton />
              </div>
            ))
          : displayedHighlights.map((h, index) => (
              <div
                key={h.highlightId}
                className="min-w-[75vw] md:min-w-0 snap-start h-full"
              >
                <HighlightCard
                  images={h.images}
                  authorImg="/imgs/icons/icon.jpg"
                  authorName="MIT Community"
                  readTime={h.displayDate}
                  title={h.displayTitle}
                  desc={h.displayDesc}
                  note={h.displayNote}
                  highlightUrl={`/${locale}/highlights/${h.highlightId}`}
                  index={index}
                  isVerified={true}
                  highlight={h}
                />
              </div>
            ))}
      </div>{" "}
      <div className="flex justify-center mt-8">
        <ViewAllButton href={linkHref} label={t("viewAllHighlights")} />
      </div>
    </section>
  );
}
