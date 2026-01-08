import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getHighlights } from "@/lib/highlightClient";
import { HighlightDisplayData, HighlightsSectionProps } from "@/lib/types";

/** Cache key for consistent SWR caching */
const HIGHLIGHTS_CACHE_KEY = "highlights-data";

/** SWR configuration for aggressive caching - prevents refetch on reload */
const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  revalidateOnMount: true,
  dedupingInterval: 1000 * 60 * 10, // 10 minutes deduplication
  keepPreviousData: true,
} as const;

export function useHighlightsSection({ limit }: HighlightsSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sectionId = "highlights-section";

  // Fetch with aggressive caching to prevent unnecessary refetches
  const { data, isLoading } = useSWR(
    HIGHLIGHTS_CACHE_KEY,
    () => getHighlights(),
    SWR_CONFIG
  );

  // Ensure highlights is always an array (SWR can return null)
  const highlights = data ?? [];

  // Presentation Logic (Slicing & Formatting)
  const displayedHighlights: HighlightDisplayData[] = useMemo(() => {
    if (!Array.isArray(highlights)) return [];

    const sliced = limit ? highlights.slice(0, limit) : highlights;

    return sliced.map((h) => {
      let displayDate = "";
      if (h.date) {
        displayDate = new Date(h.date).toLocaleDateString(
          locale === "hu" ? "hu-HU" : "en-US"
        );
      } else if (h.createdAt) {
        displayDate = new Date(h.createdAt).toLocaleDateString(
          locale === "hu" ? "hu-HU" : "en-US"
        );
      }

      return {
        ...h,
        displayTitle: locale === "hu" ? h.title_hu : h.title_en,
        displayDesc: locale === "hu" ? h.desc_hu : h.desc_en,
        highlightId: h.slug || h._id || h.id,
        displayDate,
      };
    });
  }, [highlights, limit, locale]);

  // Title & Links
  const titleText = "Highlights & Announcements";

  const linkHref = `/${locale}/highlights`;

  return {
    loading: isLoading,
    displayedHighlights,
    titleText,
    linkHref,
    sectionId,
    locale,
  };
}
