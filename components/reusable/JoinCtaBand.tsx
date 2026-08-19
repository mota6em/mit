"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import CtaBand from "./CtaBand";
import { toLocale } from "@/lib/i18n";

export default function JoinCtaBand() {
  const t = useTranslations("joinMIT");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = toLocale(params?.locale);

  return (
    <CtaBand
      eyebrow={t("joinUsTag")}
      title={t("title")}
      description={t("finalMessage")}
      primary={{ href: `/${locale}/join-mit`, label: tNav("join mit") }}
      secondary={{ href: `/${locale}/events`, label: tNav("events") }}
    />
  );
}
