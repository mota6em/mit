import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { SWR_KEYS } from "@/lib/swrKeys";
import {
  LOCALE_META,
  localizedField,
  localizedFieldOptional,
  toLocale,
} from "@/lib/i18n";
import {
  ApiEvent,
  dayMap,
  EventDisplayData,
  EventsSectionProps,
} from "@/lib/types";

export function useEventsSection({
  type,
  limit,
  filterMode = "all",
}: EventsSectionProps) {
  const t = useTranslations("home");
  const params = useParams();
  const locale = toLocale(params?.locale);
  const sectionId = `${type}-events`;

  const { data, isLoading } = useSWR<ApiEvent[]>(SWR_KEYS.events);

  const events = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const filteredPrograms = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter((p) => {
      if (filterMode === "recurring_only" && !p.isRecurring) return false;
      if (filterMode === "single_only" && p.isRecurring) return false;
      if (p.isRecurring) return type === "upcoming";
      if (!p.date) return false;

      const eventDate = new Date(p.date);
      return type === "upcoming" ? eventDate >= today : eventDate < today;
    });
  }, [events, filterMode, type]);

  const displayedPrograms: EventDisplayData[] = useMemo(() => {
    const sliced = limit ? filteredPrograms.slice(0, limit) : filteredPrograms;
    const intl = LOCALE_META[locale].intl;
    const dateFormatter = new Intl.DateTimeFormat(intl, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const dayFormatter = new Intl.DateTimeFormat(intl, { day: "numeric" });
    const monthFormatter = new Intl.DateTimeFormat(intl, { month: "short" });

    return sliced.map((p) => {
      let displayDate = "";
      let displayDay: string | undefined;
      let displayMonth: string | undefined;

      if (p.isRecurring && p.recurringDays?.length) {
        displayDate = p.recurringDays
          .map((day: string) => dayMap[day]?.[locale] || day)
          .join(", ");
      } else if (p.date) {
        const parsed = new Date(p.date);
        displayDate = dateFormatter.format(parsed);
        displayDay = dayFormatter.format(parsed);
        displayMonth = monthFormatter.format(parsed).replace(".", "");
      }

      return {
        ...p,
        displayTitle: localizedField(p, "title", locale),
        displayDesc: localizedField(p, "desc", locale),
        displayNote: localizedFieldOptional(p, "note", locale),
        eventId: p.slug || p._id || p.id || "",
        displayDate,
        displayDay,
        displayMonth,
      };
    });
  }, [filteredPrograms, limit, locale]);

  const isWeeklySection =
    filterMode === "recurring_only" && type === "upcoming";

  const titleText = isWeeklySection
    ? t("latestPrograms.upcomingTitle")
    : t(
        type === "upcoming"
          ? "latestPrograms.upcomingTitle"
          : "latestPrograms.pastTitle"
      );

  const linkHref = `/${locale}/events#${sectionId}`;

  return {
    loading: isLoading && data === undefined,
    displayedPrograms,
    titleText,
    linkHref,
    sectionId,
    locale,
    t,
  };
}
