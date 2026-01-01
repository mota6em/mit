import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getHighlights } from "@/lib/highlightClient";
import { HighlightDisplayData, HighlightsSectionProps } from "@/lib/types";

export function useHighlightsSection({ limit, year }: HighlightsSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sectionId = year ? `${year}-highlights` : "highlights-section";

  // Data Fetching with Caching
  const { data: highlights = [], isLoading } = useSWR(
    "highlights-data",
    () => getHighlights(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  // Presentation Logic (Slicing & Formatting)
  const displayedHighlights: HighlightDisplayData[] = useMemo(() => {
    // Filter by year if specified
    let filteredHighlights = highlights;
    if (year) {
      if (year === "archive") {
        // Archive includes 2024 and earlier
        filteredHighlights = highlights.filter((h) => {
          const highlightYear = parseInt(h.year || "0");
          return highlightYear <= 2024;
        });
      } else {
        // Specific year filter
        filteredHighlights = highlights.filter((h) => h.year === year);
      }
    }

    const sliced = limit
      ? filteredHighlights.slice(0, limit)
      : filteredHighlights;

    return sliced.map((h) => {
      let displayDate = "";
      if (h.date) {
        displayDate = new Date(h.date).toLocaleDateString(
          locale === "hu" ? "hu-HU" : "en-US"
        );
      } else if (h.year) {
        displayDate = h.year;
      } else {
        displayDate = new Date(h.createdAt).toLocaleDateString(
          locale === "hu" ? "hu-HU" : "en-US"
        );
      }

      return {
        ...h,
        displayTitle: locale === "hu" ? h.title_hu : h.title_en,
        displayDesc: locale === "hu" ? h.desc_hu : h.desc_en,
        displayNote: locale === "hu" ? h.note_hu : h.note_en,
        highlightId: h.slug || h._id || h.id,
        displayDate,
      };
    });
  }, [highlights, limit, locale, year]);

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
