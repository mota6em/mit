"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { CgMenuRight } from "react-icons/cg";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("nav");
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "en";

  // Header condenses and gains a hairline once the page leaves the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/highlights`, label: t("highlights") },
      { href: `/${locale}/events`, label: t("events") },
      { href: `/${locale}/about`, label: t("about mit") },
      { href: `/${locale}/join-mit`, label: t("join mit") },
    ],
    [locale, t]
  );

  return (
    <header
      className={`glass sticky top-0 z-50 transition-[padding,box-shadow,background-color] duration-500 ${
        scrolled
          ? "shadow-[0_1px_0_rgba(16,20,15,0.08),0_8px_24px_-16px_rgba(16,20,15,0.25)]"
          : ""
      }`}
    >
      {/* Brand accent hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-green via-brand-gold to-brand-sky" />

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 md:px-8 ${
          scrolled ? "py-1" : "py-2"
        }`}
      >
        <Link
          href={`/${locale}`}
          className="group flex items-center"
          aria-label="MIT — home"
        >
          <Image
            src="/imgs/icons/mit-nav-logo.png"
            alt="MIT Logo"
            width={120}
            height={40}
            priority
            className={`object-contain transition-all duration-500 group-hover:scale-[1.03] ${
              scrolled ? "h-9 w-auto" : "h-11 w-auto"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isEvents = link.label === t("events");

              const linkEl = (
                <Link
                  href={link.href}
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  className={`link-underline relative rounded-full px-3 py-2 text-[0.9rem] font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-ink-900"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {link.label}
                    {isEvents && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isEventsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </span>
                </Link>
              );

              if (isEvents) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsEventsDropdownOpen(true)}
                    onMouseLeave={() => setIsEventsDropdownOpen(false)}
                  >
                    {linkEl}

                    <AnimatePresence>
                      {isEventsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white p-1.5 shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.18)]">
                            {[
                              {
                                href: `/${locale}/events#upcoming-events`,
                                label: t("upcoming events"),
                                dot: "bg-brand-green",
                              },
                              {
                                href: `/${locale}/events#past-events`,
                                label: t("past events"),
                                dot: "bg-ink-400",
                              },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsEventsDropdownOpen(false)}
                                className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
                              >
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`}
                                />
                                <span className="flex-1">{item.label}</span>
                                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return <div key={link.label}>{linkEl}</div>;
            })}
          </div>

          <span className="mx-3 h-5 w-px bg-ink-200" />
          <LanguageSwitch />
        </nav>

        {/* Mobile nav trigger  */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitch />
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-ink-700 transition-colors hover:bg-ink-100 active:scale-95"
          >
            <CgMenuRight className="h-6 w-6" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm"
                />

                {/* Sliding Drawer Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="fixed right-0 top-0 z-51 flex h-full w-[82vw] max-w-xs flex-col bg-white shadow-2xl"
                >
                  <div className="h-[3px] w-full bg-gradient-to-r from-brand-green via-brand-gold to-brand-sky" />

                  <div className="flex flex-col p-6">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                      <Image
                        src="/imgs/icons/mit-nav-logo.png"
                        alt="MIT Logo"
                        width={100}
                        height={34}
                        className="h-9 w-auto object-contain"
                      />
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                        className="rounded-full bg-ink-100 p-2 transition-colors hover:bg-ink-200 active:scale-95"
                      >
                        <X className="h-5 w-5 text-ink-600" />
                      </button>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link, i) => {
                        const isActive = pathname === link.href;
                        return (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.08 + i * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              href={link.href}
                              aria-current={isActive ? "page" : undefined}
                              onClick={() => setIsMenuOpen(false)}
                              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-all duration-300 ${
                                isActive
                                  ? "bg-brand-gold-soft text-ink-900"
                                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                              }`}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight
                                className={`h-4 w-4 transition-all duration-300 ${
                                  isActive
                                    ? "text-brand-gold-dark"
                                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                }`}
                              />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto p-6">
                    <div className="rule-fade mb-5" />
                    <p className="text-center text-xs tracking-wide text-ink-400">
                      © {new Date().getFullYear()} MIT
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
