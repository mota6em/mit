import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getEvents } from "@/lib/eventService";
import { dayMap, EventDisplayData, EventsSectionProps } from "@/lib/types";

export function useEventsSection({
  type,
  limit,
  filterMode = "all",
}: EventsSectionProps) {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sectionId = `${type}-events`;

  // Data Fetching with Caching
  const { data: events = [], isLoading } = useSWR("events-data", () =>
    getEvents()
  );

  // Filtering Logic (Memoized)
  const filteredPrograms = useMemo(() => {
    // Safety check: ensure events is an array
    if (!Array.isArray(events)) return [];

    return events.filter((p) => {
      if (filterMode === "recurring_only" && !p.isRecurring) return false;
      if (filterMode === "single_only" && p.isRecurring) return false;
      if (p.isRecurring) return type === "upcoming";
      if (!p.date) return false;

      const eventDate = new Date(p.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return type === "upcoming" ? eventDate >= today : eventDate < today;
    });
  }, [events, filterMode, type]);

  // Presentation Logic (Slicing & Formatting)
  const displayedPrograms: EventDisplayData[] = useMemo(() => {
    const sliced = limit ? filteredPrograms.slice(0, limit) : filteredPrograms;

    return sliced.map((p) => {
      let displayDate = "";
      if (p.isRecurring && p.recurringDays?.length) {
        displayDate = p.recurringDays
          .map((day) => dayMap[day]?.[locale === "hu" ? "hu" : "en"] || day)
          .join(", ");
      } else if (p.date) {
        displayDate = new Date(p.date).toLocaleDateString(
          locale === "hu" ? "hu-HU" : "en-US"
        );
      }

      return {
        ...p,
        displayTitle: locale === "hu" ? p.title_hu : p.title_en,
        displayDesc: locale === "hu" ? p.desc_hu : p.desc_en,
        displayNote: locale === "hu" ? p.note_hu : p.note_en,
        eventId: p.slug || p._id || p.id,
        displayDate,
      };
    });
  }, [filteredPrograms, limit, locale]);

  // Title & Links
  const isWeeklySection =
    filterMode === "recurring_only" && type === "upcoming";
  const titleText = isWeeklySection
    ? "Weekly Gatherings"
    : t(
        type === "upcoming"
          ? "latestPrograms.upcomingTitle"
          : "latestPrograms.pastTitle"
      );

  const linkHref = `/${locale}/events#${sectionId}`;

  return {
    loading: isLoading,
    displayedPrograms,
    titleText,
    linkHref,
    sectionId,
    locale,
    t,
  };
}
