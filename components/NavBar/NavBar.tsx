"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { X } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { CgMenuRight } from "react-icons/cg";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "en";

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about mit") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/join-mit`, label: t("join mit") },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 px-2 md:px-10">
      <div className="container flex justify-between items-center px-0 py-1 md:py-2">
        <Link href={`/${locale}`} className="flex items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/imgs/nav-logo.jpg"
                alt="MIT Logo"
                fill
                className="object-cover rounded-3xl shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-0.5">
                <span className=" text-xl md:text-2xl font-bold text-[#4d93fb] monstera-font tracking-widest">
                  M
                </span>
                <span className=" text-xl md:text-2xl font-bold text-[#11b505] monstera-font tracking-widest">
                  I
                </span>
                <span className=" text-xl md:text-2xl font-bold text-[#f1c34c] monstera-font tracking-widest">
                  T
                </span>
              </div>
              <span className="text-xs font-medium text-yellow-600">
                {t("subtitle")}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-1 md:me-3">
          <LanguageSwitch />
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`Carena-font text-sm pt-1 tracking-wider rounded-4xl font-serif px-2 ${
                    isActive
                      ? "outline outline-yellow-700 text-yellow-700"
                      : "text-black hover:outline outline-yellow-700 hover:text-yellow-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
        {/* Mobile nav trigger  */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitch />

           <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -mr-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
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
                  className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[51] flex flex-col p-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-bold text-gray-900 Carena-font tracking-wide">
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
