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
      className="mx-auto w-full max-w-5xl"
    >
      <Link
        href={`/${locale}/highlights/${announcement.highlightId}`}
        onClick={cacheHighlight}
      >
        <motion.div className="surface surface-lift group relative overflow-hidden rounded-[28px]">
          {/* Brand edge — marks this as the featured item */}
          <span className="absolute inset-y-0 left-0 z-20 w-1 bg-gradient-to-b from-brand-gold via-brand-gold to-brand-green" />

          {/* Warm light pooling from the top-left for depth */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-brand-gold-soft/40 via-transparent to-transparent" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
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
