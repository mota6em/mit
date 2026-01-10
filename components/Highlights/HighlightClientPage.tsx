"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { DetailPageClient } from "@/components/reusable/DetailPage";
import type {
  DetailPageData,
  DetailPageConfig,
  ApiHighlight,
} from "@/lib/types";
import { useHighlightData } from "@/app/hooks/useHighlightData";

interface HighlightClientPageProps {
  initialHighlight: ApiHighlight | null;
}

/**
 * Transform API highlight data to DetailPageData format
 */
function transformHighlightToDetailData(
  highlight: ApiHighlight,
  locale: string
): DetailPageData {
  const isHu = locale === "hu";
  return {
    id: highlight._id,
    title: isHu ? highlight.title_hu : highlight.title_en,
    description: isHu ? highlight.desc_hu : highlight.desc_en,
    images: highlight.images || [],
    date: highlight.date,
  };
}

export default function HighlightClientPage({
  initialHighlight,
}: HighlightClientPageProps) {
  const { locale: rawLocale } = useParams();
  const locale = (rawLocale as string) === "hu" ? "hu" : "en";
  const t = useTranslations("highlights");

  const { highlight, loading, error, views } =
    useHighlightData(initialHighlight);

  // Build config
  const config: DetailPageConfig = {
    type: "highlight",
    locale,
    backHref: `/${locale}/highlights`,
    backLabel: t("backToHighlights"),
    notFoundTitle: t("notFoundTitle"),
    notFoundDesc: t("notFoundDesc"),
    showViews: true,
    showActions: false,
    showMap: false,
    showDateFooter: true,
    translations: {
      loading: t("loading") || "Loading...",
    },
  };

  // Transform highlight data
  const data = highlight
    ? transformHighlightToDetailData(highlight, locale)
    : null;

  return (
    <DetailPageClient
      data={error ? null : data}
      config={config}
      views={views}
      loading={loading}
    />
  );
}
