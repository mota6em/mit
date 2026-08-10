import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { SWR_KEYS } from "@/lib/swrKeys";
import { LOCALE_META, localizedField, toLocale } from "@/lib/i18n";
import {
  ApiHighlight,
  HighlightDisplayData,
  HighlightsSectionProps,
} from "@/lib/types";

export function useHighlightsSection({ limit }: HighlightsSectionProps) {
  const params = useParams();
  const locale = toLocale(params?.locale);
  const t = useTranslations("highlights");
  const sectionId = "highlights-section";

  const { data, isLoading } = useSWR<ApiHighlight[]>(SWR_KEYS.highlights);

  const highlights = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const displayedHighlights: HighlightDisplayData[] = useMemo(() => {
    const sliced = limit ? highlights.slice(0, limit) : highlights;
    const dateFormatter = new Intl.DateTimeFormat(LOCALE_META[locale].intl, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return sliced.map((h) => {
      const rawDate = h.date || (h as { createdAt?: string }).createdAt;

      return {
        ...h,
        displayTitle: localizedField(h, "title", locale),
        displayDesc: localizedField(h, "desc", locale),
        highlightId: h.slug || h._id || h.id || "",
        displayDate: rawDate ? dateFormatter.format(new Date(rawDate)) : "",
      };
    });
  }, [highlights, limit, locale]);

  return {
    loading: isLoading && data === undefined,
    displayedHighlights,
    titleText: t("heroTitle"),
    linkHref: `/${locale}/highlights`,
    sectionId,
    locale,
  };
}
