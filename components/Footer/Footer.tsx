"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import { StarMark } from "../reusable/Ornament";
import { localeFromPathname } from "@/lib/i18n";

export default function Footer() {
  const t = useTranslations("nav");
  const tJoin = useTranslations("joinMIT");
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const currentYear = new Date().getFullYear();

  const links = [
    { href: `/${locale}/highlights`, label: t("highlights") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/about`, label: t("about mit") },
    { href: `/${locale}/join-mit`, label: t("join mit") },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink-950 text-ink-300">
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-green via-brand-gold to-brand-sky" />

      <div className="pattern-star-gold mask-radial pointer-events-none absolute -start-28 -top-20 h-[24rem] w-[24rem] opacity-[0.06]" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 md:pt-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              aria-label={`MIT — ${t("home")}`}
              className="inline-block"
            >
              <Image
                src="/imgs/icons/mit-nav-logo-light.png"
                alt="MIT"
                width={140}
                height={50}
                sizes="140px"
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-ink-400">
              {t("subtitle")}
            </p>

            <div className="mt-8">
              <SocialMediaIcons tone="light" />
            </div>
          </div>

          <nav className="md:col-span-3">
            <span className="eyebrow text-brand-gold">{t("pages")}</span>
            <ul className="mt-6 flex flex-col gap-3.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-brand-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <span className="eyebrow text-brand-gold">
              {tJoin("newsletterTag")}
            </span>

            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-ink-400">
              {tJoin("subscriptionDescription")}
            </p>

            <Link
              href={`/${locale}/join-mit#subscribe`}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold hover:text-ink-900"
            >
              {tJoin("subscribe")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        <div className="rule-fade-light mt-14" />

        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-xs text-ink-500 md:flex-row">
          <p className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 text-brand-gold/60">
              <StarMark strokeWidth={2.5} />
            </span>
            &copy; {currentYear} MIT. {t("copyright")}
          </p>

          <p className="flex items-center gap-1.5">
            <span>{t("developedBy")}</span>
            <a
              href="https://motasem.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink-300 underline decoration-ink-600 underline-offset-4 transition-colors duration-300 hover:text-brand-gold hover:decoration-brand-gold"
            >
              motasem.dev
            </a>
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative flex h-[clamp(4.3rem,16vw,10.4rem)] justify-center overflow-hidden"
      >
        <span
          className="display block select-none text-[clamp(7rem,26vw,17rem)] leading-none tracking-tight text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          MIT
        </span>
      </div>
    </footer>
  );
}
