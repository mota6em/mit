"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

export default function Footer() {
  const t = useTranslations("nav");

  return (
    <footer className="bg-white border border-t border-gray-200 text-black py-2 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Logo and Name Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image src="/imgs/hero/mit-logo-full.png" alt="MIT Logo" fill />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-0.5">
                <span className="text-2xl font-bold text-[#4d93fb] monstera-font tracking-widest">
                  M
                </span>
                <span className="text-2xl font-bold text-[#11b505] monstera-font tracking-widest">
                  I
                </span>
                <span className="text-2xl font-bold text-[#f1c34c] monstera-font tracking-widest">
                  T
                </span>
              </div>
              <span className="text-sm font-medium">{t("subtitle")}</span>
            </div>
          </div>
          {/* Social Media Section */}
          <SocialMediaIcons />
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 md:mt-2 text-sm opacity-90">
          © {new Date().getFullYear()} MIT - {t("subtitle")}.
        </div>
      </div>
    </footer>
  );
}
