"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

export default function Footer() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const currentYear = new Date().getFullYear();

  const links = [
    { href: `/${locale}/highlights`, label: t("highlights") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/about`, label: t("about mit") },
    { href: `/${locale}/join-mit`, label: t("join mit") },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-ink-200 bg-white">
      {/* Brand accent hairline mirrors the header */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-green via-brand-gold to-brand-sky" />

      <div className="pattern-geo pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 opacity-[0.04] [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex max-w-xs flex-col items-center gap-3 md:items-start">
            <Link href={`/${locale}`} aria-label="MIT — home">
              <Image
                src="/imgs/icons/mit-nav-logo.png"
                alt="MIT Logo"
                width={130}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ink-500">
              {t("subtitle")}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center gap-3 md:items-start">
            <span className="eyebrow text-ink-400">{t("pages")}</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:flex-col md:gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <SocialMediaIcons />
          </div>
        </div>

        <div className="rule-fade my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-ink-400 md:flex-row">
          <p>
            &copy; {currentYear} MIT. {t("copyright")}
          </p>

          <p className="flex items-center gap-1.5">
            <span>{t("developedBy")}</span>
            <a
              href="https://motasem.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink-600 underline decoration-ink-300 underline-offset-4 transition-colors duration-200 hover:text-brand-green-dark hover:decoration-brand-green"
            >
              motasem.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
