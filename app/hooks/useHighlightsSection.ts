import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getHighlights } from "@/lib/highlightClient";
import { HighlightDisplayData, HighlightsSectionProps } from "@/lib/types";

export function useHighlightsSection({ limit }: HighlightsSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sectionId = "highlights-section";

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
    const sliced = limit ? highlights.slice(0, limit) : highlights;

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
