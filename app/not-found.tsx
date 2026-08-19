"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import NotFoundView from "@/components/reusable/NotFoundView";
import { LOCALE_META, localeFromPathname, type Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    cta: string;
    links: { path: string; label: string }[];
  }
> = {
  en: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has been moved.",
    cta: "Back to home",
    links: [
      { path: "events", label: "Events" },
      { path: "highlights", label: "Highlights" },
      { path: "about", label: "About MIT" },
      { path: "join-mit", label: "Join MIT" },
    ],
  },
  hu: {
    title: "Az oldal nem található",
    description: "A keresett oldal nem létezik, vagy áthelyezték.",
    cta: "Vissza a főoldalra",
    links: [
      { path: "events", label: "Események" },
      { path: "highlights", label: "Kiemeltek" },
      { path: "about", label: "Rólunk" },
      { path: "join-mit", label: "Csatlakozz" },
    ],
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    cta: "العودة إلى الرئيسية",
    links: [
      { path: "events", label: "الفعاليات" },
      { path: "highlights", label: "المستجدات" },
      { path: "about", label: "من نحن" },
      { path: "join-mit", label: "انضم إلينا" },
    ],
  },
};

export default function NotFound() {
  const pathname = usePathname() || "";
  const locale = localeFromPathname(pathname);
  const { dir } = LOCALE_META[locale];
  const copy = COPY[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <NotFoundView
      locale={locale}
      dir={dir}
      fullHeight
      code="404"
      title={copy.title}
      description={copy.description}
      cta={copy.cta}
      links={copy.links.map((link) => ({
        href: `/${locale}/${link.path}`,
        label: link.label,
      }))}
    />
  );
}
