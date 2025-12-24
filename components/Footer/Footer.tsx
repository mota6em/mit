"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

export default function Footer() {
  const t = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border border-t border-gray-200 text-black py-4 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          <Image
            src="/imgs/icons/mit-nav-logo.png"
            alt="MIT Logo"
            width={120}
            height={40}
            className="object-cover"
          />

          <SocialMediaIcons />
        </div>{" "}
        <div className="flex flex-col md:flex-row md:px-5 items-center justify-between gap-2 pt-6 md:pt-4 text-xs text-slate-500">
          <p>&copy; {currentYear} MIT. </p>

          <p className="flex items-center gap-1">
            <span>Developed by</span>
            <a
              href="https://motasem.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-600 hover:text-black transition-colors duration-200 underline decoration-gray-300 hover:decoration-black underline-offset-2"
            >
              motasem.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
