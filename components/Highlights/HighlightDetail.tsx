"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import { fadeInUp } from "@/data/constants/const";
import {
  BackButtonProps,
  DateFooterProps,
  GallerySectionProps,
  HighlightDescriptionProps,
  NotFoundStateProps,
} from "@/lib/types";
import { HighlightGallery } from "./HighlightGallery";

// Re-export hook from centralized location
export { useHighlightContent } from "@/app/hooks/useHighlightContent";
export type { HighlightContentData as HighlightContent } from "@/lib/types";

// ============================================================================
// Components
// ============================================================================

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
    >
      <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
        <HiArrowLeft className="w-4 h-4" />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export function DateFooter({ date, locale }: DateFooterProps) {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale === "hu" ? "hu-HU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date, locale]);

  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.5}
      className="mt-12 pt-8 border-t border-gray-100"
    >
      <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
        <div className="w-8 h-px bg-gray-200" />
        <time dateTime={date}>{formattedDate}</time>
        <div className="w-8 h-px bg-gray-200" />
      </div>
    </motion.footer>
  );
}

export function GallerySection({
  images,
  title,
  onImageClick,
}: GallerySectionProps) {
  if (images.length === 0) return null;

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.1}
      className="mb-10"
    >
      <HighlightGallery
        images={images}
        title={title}
        onImageClick={onImageClick}
      />
    </motion.section>
  );
}

export function HighlightDescription({
  description,
}: HighlightDescriptionProps) {
  const paragraphs = description.split(/\n\s*\n|\n/).filter((p) => p.trim());

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.2}
      className="relative"
    >
      <div className="max-w-none">
        <div className="relative">
          {/* Subtle left accent */}
          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="pl-6 space-y-6">
            {paragraphs.map((paragraph, index) => {
              const trimmedParagraph = paragraph.trim();

              if (index === 0 && trimmedParagraph.length > 0) {
                const firstLetter = trimmedParagraph.charAt(0);
                const restOfText = trimmedParagraph.slice(1);

                return (
                  <p
                    key={index}
                    className="text-gray-800 leading-relaxed text-lg md:text-xl font-normal tracking-wide"
                  >
                    <span
                      className="float-left text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-none tracking-tight mr-3 mt-1"
                      style={{
                        lineHeight: "0.8",
                        paddingTop: "0.1em",
                      }}
                    >
                      {firstLetter}
                    </span>
                    {restOfText}
                  </p>
                );
              }

              return (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-lg md:text-xl font-normal tracking-wide"
                >
                  {trimmedParagraph}
                </p>
              );
            })}

            <div className="mt-8 h-px bg-gray-100" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function NotFoundState({ locale, t }: NotFoundStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          {t("notFoundTitle")}
        </h1>
        <p className="text-gray-500 mb-8">{t("notFoundDesc")}</p>
        <Link
          href={`/${locale}/highlights`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          {t("backToHighlights")}
        </Link>
      </motion.div>
    </div>
  );
}
