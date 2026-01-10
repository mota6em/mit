"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { CgMenuRight } from "react-icons/cg";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);

  const t = useTranslations("nav");
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "en";

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
    <header className="md:backdrop-blur-md bg-white md:bg-white/80 sticky top-0 z-50 px-2 md:px-10">
      <div className="container flex justify-between items-center px-0 py-1 md:py-0.5">
        <Link href={`/${locale}`} className="flex items-center p-0.5">
          <Image
            src="/imgs/icons/mit-nav-logo.png"
            alt="MIT Logo"
            width={120}
            height={40}
            className="object-cover"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-1 md:me-3">
          <LanguageSwitch />
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // Special handling for events dropdown
              if (link.label === t("events")) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsEventsDropdownOpen(true)}
                    onMouseLeave={() => setIsEventsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`poppins.className text-sm pt-1 tracking-wider rounded-4xl px-2 ${
                        isActive
                          ? "text-yellow-700 font-medium"
                          : "text-black hover:text-yellow-700"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Events Dropdown */}
                    <AnimatePresence>
                      {isEventsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <Link
                            href={`/${locale}/events#upcoming-events`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-700 transition-colors"
                            onClick={() => setIsEventsDropdownOpen(false)}
                          >
                            {t("upcoming events")}
                          </Link>
                          <Link
                            href={`/${locale}/events#past-events`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-700 transition-colors"
                            onClick={() => setIsEventsDropdownOpen(false)}
                          >
                            {t("past events")}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Special handling for highlights dropdown
              if (link.label === t("highlights")) {
                return (
                  <div key={link.label} className="relative">
                    <Link
                      href={link.href}
                      className={`poppins.className text-sm pt-1 tracking-wider rounded-4xl px-2 ${
                        isActive
                          ? "text-yellow-700 font-medium"
                          : "text-black hover:text-yellow-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`poppins.className text-sm pt-1 tracking-wider rounded-4xl px-2 ${
                    isActive
                      ? "text-yellow-700 font-medium"
                      : "text-black hover:text-yellow-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
        {/* Mobile nav trigger  */}
        <div className="md:hidden flex items-center">
          <LanguageSwitch />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CgMenuRight className="w-7 h-7" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                />

                {/* Sliding Drawer Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-70 bg-white shadow-2xl z-51 flex flex-col p-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-bold text-gray-900">
                      Menu
                    </span>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-auto border-t pt-6">
                    <p className="text-xs text-gray-400 text-center">
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
