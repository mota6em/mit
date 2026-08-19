"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import NotFoundView from "@/components/reusable/NotFoundView";
import { toLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams();
  const locale = toLocale(params?.locale);
  const t = useTranslations("notFound");
  const tNav = useTranslations("nav");

  return (
    <NotFoundView
      locale={locale}
      code={t("code")}
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      links={[
        { href: `/${locale}/events`, label: tNav("events") },
        { href: `/${locale}/highlights`, label: tNav("highlights") },
        { href: `/${locale}/about`, label: tNav("about mit") },
        { href: `/${locale}/join-mit`, label: tNav("join mit") },
      ]}
    />
  );
}
