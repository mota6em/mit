"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CgDanger } from "react-icons/cg";
import { HiClock, HiRefresh } from "react-icons/hi";

import { DetailPageClient } from "@/components/reusable/DetailPage";
import type {
  DetailPageData,
  DetailPageConfig,
  BadgeData,
  ApiEvent,
} from "@/lib/types";
import { dayMap } from "@/lib/types";
import { useEventData } from "@/app/hooks/useEventData";

interface EventClientPageProps {
  initialEvent: ApiEvent | null;
}

/**
 * Transform API event data to DetailPageData format
 */
function transformEventToDetailData(
  event: ApiEvent,
  locale: string
): DetailPageData {
  const isHu = locale === "hu";
  return {
    id: event._id,
    title: isHu ? event.title_hu : event.title_en,
    description: isHu ? event.desc_hu : event.desc_en,
    images: event.img ? [event.img] : [],
    date: event.date,
    time: event.time,
    note: isHu ? event.note_hu : event.note_en,
    isRecurring: event.isRecurring,
    recurringDays: event.recurringDays,
    registrationUrl: event.registrationUrl,
    location: event.location,
  };
}

/**
 * Generate badges for event display
 */
function generateEventBadges(event: ApiEvent, locale: string): BadgeData[] {
  const badges: BadgeData[] = [];
  const isHu = locale === "hu";
  const note = isHu ? event.note_hu : event.note_en;

  // Note badge
  if (note) {
    badges.push({
      icon: CgDanger,
      text: note,
      color: "bg-amber-500",
    });
  }

  // Date badge (for non-recurring events)
  if (!event.isRecurring && event.date) {
    const dateFormatted = new Date(event.date).toLocaleDateString(
      isHu ? "hu-HU" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    badges.push({
      icon: HiClock,
      text: dateFormatted,
      color: "bg-green-500",
    });
  }

  // Time badge
  if (event.time) {
    badges.push({
      icon: HiClock,
      text: event.time,
      color: "bg-blue-500",
    });
  }

  // Recurring days badge
  if (event.isRecurring && event.recurringDays) {
    const daysText = event.recurringDays
      .map((day: string) => dayMap[day]?.[locale as "en" | "hu"] || day)
      .join(", ");
    badges.push({
      icon: HiRefresh,
      text: daysText,
      color: "bg-indigo-500",
    });
  }

  return badges;
}

export default function EventClientPage({
  initialEvent,
}: EventClientPageProps) {
  const t = useTranslations("events.eventDetails");
  const { locale: rawLocale } = useParams();
  const locale = rawLocale === "hu" ? "hu" : "en";

  const { event, loading, error, views } = useEventData(initialEvent);

  // Build config
  const config: DetailPageConfig = {
    type: "event",
    locale,
    backHref: `/${locale}/events`,
    backLabel: t("back"),
    notFoundTitle: t("notFoundTitle"),
    notFoundDesc: t("notFoundDesc"),
    showViews: true,
    showActions: true,
    showMap: true,
    showDateFooter: false,
    translations: {
      organizer: t("organizer"),
      register: t("register"),
      dm: t("dm"),
      share: t("share"),
      copied: t("copied"),
      loading: t("loading"),
    },
  };

  // Transform event data
  const data = event ? transformEventToDetailData(event, locale) : null;
  const badges = event ? generateEventBadges(event, locale) : [];

  return (
    <DetailPageClient
      data={error ? null : data}
      config={config}
      badges={badges}
      views={views}
      loading={loading}
    />
  );
}
