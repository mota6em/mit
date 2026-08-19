"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { DetailPageClient } from "@/components/reusable/DetailPage";
import type {
  DetailPageData,
  DetailPageConfig,
  ApiHighlight,
} from "@/lib/types";
import { localizedField, toLocale, type Locale } from "@/lib/i18n";
import { useHighlightData } from "@/app/hooks/useHighlightData";

interface HighlightClientPageProps {
  initialHighlight: ApiHighlight | null;
}

function transformHighlightToDetailData(
  highlight: ApiHighlight,
  locale: Locale
): DetailPageData {
  return {
    id: highlight._id,
    title: localizedField(highlight, "title", locale),
    description: localizedField(highlight, "desc", locale),
    images: highlight.images || [],
    date: highlight.date,
  };
}

export default function HighlightClientPage({
  initialHighlight,
}: HighlightClientPageProps) {
  const { locale: rawLocale } = useParams();
  const locale = toLocale(rawLocale);
  const t = useTranslations("highlights");

  const { highlight, loading, error, views } =
    useHighlightData(initialHighlight);

  const config: DetailPageConfig = {
    type: "highlight",
    locale,
    backHref: `/${locale}/highlights`,
    backLabel: t("backToHighlights"),
    notFoundTitle: t("notFoundTitle"),
    notFoundDesc: t("notFoundDesc"),
    showViews: true,
    showActions: true,
    showMap: false,
    showDateFooter: true,
    showOrganizer: false,
    showDmButton: false,
    translations: {
      loading: t("loading"),
      share: t("share"),
      copied: t("copied"),
    },
  };

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
