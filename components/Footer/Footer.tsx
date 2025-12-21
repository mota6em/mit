"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

export default function Footer() {
  const t = useTranslations("nav");

  return (
    <footer className="bg-white border border-t border-gray-200 text-black py-4 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <Image
            src="/imgs/mit-nav-logo.png"
            alt="MIT Logo"
            width={120}
            height={40}
            className="object-cover"
          />
          <SocialMediaIcons />
        </div>
      </div>
    </footer>
  );
}
