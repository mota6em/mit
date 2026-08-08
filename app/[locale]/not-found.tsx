"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = useTranslations("notFound");
  const tNav = useTranslations("nav");

  const suggestions = [
    { href: `/${locale}/events`, label: tNav("events") },
    { href: `/${locale}/highlights`, label: tNav("highlights") },
    { href: `/${locale}/about`, label: tNav("about mit") },
    { href: `/${locale}/join-mit`, label: tNav("join mit") },
  ];

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink-50 px-5 py-24">
      <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.07] blur-3xl" />

      <div className="relative flex max-w-lg flex-col items-center text-center">
        <Image
          src="/imgs/icons/mit-logo-full-resized.png"
          alt="MIT Logo"
          width={110}
          height={110}
          priority
          className="mb-8 h-auto w-24 opacity-90"
        />

        <span className="display text-6xl leading-none text-ink-300 md:text-7xl">
          {t("code")}
        </span>

        <h1 className="display mt-5 text-2xl text-ink-900 md:text-3xl">
          {t("title")}
        </h1>

        <p className="lede mt-4">{t("description")}</p>

        <Link
          href={`/${locale}`}
          className="btn-sheen group relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800"
        >
          <ArrowLeft className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="relative z-10">{t("cta")}</span>
        </Link>

        {/* A dead end should still offer a way onward */}
        <div className="mt-12 w-full">
          <div className="rule-fade mb-6" />
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-ink-300 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
