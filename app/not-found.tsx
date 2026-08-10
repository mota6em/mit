"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  const t = COPY[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <section
      lang={locale}
      dir={dir}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-50 px-5 py-24"
    >
      <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.07] blur-3xl" />

      <div className="relative flex max-w-lg flex-col items-center text-center">
        <Link href={`/${locale}`} aria-label="MIT">
          <Image
            src="/imgs/icons/mit-logo-full-resized.png"
            alt="MIT Logo"
            width={110}
            height={110}
            priority
            className="mb-8 h-auto w-24 opacity-90 transition-transform duration-500 hover:scale-105"
          />
        </Link>

        <span className="display text-6xl leading-none text-ink-300 md:text-7xl">
          404
        </span>

        <h1 className="display mt-5 text-2xl text-ink-900 md:text-3xl">
          {t.title}
        </h1>

        <p className="lede mt-4">{t.description}</p>

        <Link
          href={`/${locale}`}
          className="btn-sheen group relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800"
        >
          <span className="relative z-10">{t.cta}</span>
        </Link>

        <div className="mt-12 w-full">
          <div className="rule-fade mb-6" />
          <div className="flex flex-wrap justify-center gap-2">
            {t.links.map((l) => (
              <Link
                key={l.path}
                href={`/${locale}/${l.path}`}
                className="rounded-full border border-ink-300 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
