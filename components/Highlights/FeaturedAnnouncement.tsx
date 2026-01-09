"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HighlightBadge from "./HighlightBadge";
import HighlightImage from "./HighlightImage";
import HighlightContent from "./HighlightContent";
import {
  FeaturedAnnouncementProps,
  HIGHLIGHT_ANIMATION_VARIANTS,
} from "@/lib/types";

export default function FeaturedAnnouncement({
  announcement,
  locale,
}: FeaturedAnnouncementProps) {
  const t = useTranslations("highlights");

  const cacheHighlight = () => {
    const id = announcement.slug || announcement._id || announcement.id;
    if (id) {
      sessionStorage.setItem(`highlight-${id}`, JSON.stringify(announcement));
    }
  };

  return (
    <motion.div
      variants={HIGHLIGHT_ANIMATION_VARIANTS.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-4xl mx-auto"
    >
      <Link
        href={`/${locale}/highlights/${announcement.highlightId}`}
        onClick={cacheHighlight}
      >
        <motion.div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200/60 transition-shadow duration-100 hover:shadow-xs">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent pointer-events-none z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content Section */}
            <HighlightContent
              title={announcement.displayTitle}
              description={announcement.displayDesc}
              ctaLabel={t("readMore")}
              variants={HIGHLIGHT_ANIMATION_VARIANTS.item}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <HighlightBadge type="date" text={announcement.displayDate} />
              </div>
            </HighlightContent>

            {/* Image Section */}
            <HighlightImage
              images={announcement.images}
              title={announcement.displayTitle}
              variants={HIGHLIGHT_ANIMATION_VARIANTS.image}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
