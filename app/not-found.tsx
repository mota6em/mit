"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Root-level 404, which is what Next renders for any unmatched URL.
 *
 * It sits outside the [locale] layout, so there is no next-intl provider and
 * no navbar or footer here. Rather than pull in the whole message catalogue for
 * four strings, the handful of labels this page needs are inlined and picked
 * from the locale in the URL — a visitor who mistypes a /hu/... link still gets
 * Hungarian, and the correct 404 status is preserved.
 */
const COPY = {
  en: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    cta: "Back to home",
    links: [
      { href: "/en/events", label: "Events" },
      { href: "/en/highlights", label: "Highlights" },
      { href: "/en/about", label: "About MIT" },
      { href: "/en/join-mit", label: "Join MIT" },
    ],
  },
  hu: {
    title: "Az oldal nem található",
    description: "A keresett oldal nem létezik, vagy áthelyezték.",
    cta: "Vissza a főoldalra",
    links: [
      { href: "/hu/events", label: "Események" },
      { href: "/hu/highlights", label: "Kiemeltek" },
      { href: "/hu/about", label: "Rólunk" },
      { href: "/hu/join-mit", label: "Csatlakozz" },
    ],
  },
} as const;

export default function NotFound() {
  const pathname = usePathname() || "";
  const locale = pathname.startsWith("/hu") ? "hu" : "en";
  const t = COPY[locale];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-50 px-5 py-24">
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

        {/* A dead end should still offer a way onward */}
        <div className="mt-12 w-full">
          <div className="rule-fade mb-6" />
          <div className="flex flex-wrap justify-center gap-2">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
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
