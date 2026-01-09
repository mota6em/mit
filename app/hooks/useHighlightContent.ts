"use client";

import { useMemo } from "react";
import { ApiHighlight, HighlightContentData } from "@/lib/types";

/**
 * Hook to transform API highlight data into locale-specific display content
 */
export function useHighlightContent(
  highlight: ApiHighlight | null,
  locale: string
): HighlightContentData | null {
  return useMemo(() => {
    if (!highlight) return null;
    return {
      title: locale === "hu" ? highlight.title_hu : highlight.title_en,
      description: locale === "hu" ? highlight.desc_hu : highlight.desc_en,
      date: highlight.date || "",
      images: highlight.images || [],
    };
  }, [highlight, locale]);
}
