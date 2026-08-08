"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaCheck,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function SocialMediaIcons() {
  const [showCopied, setShowCopied] = useState(false);
  const t = useTranslations("nav");

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("muszlimifjusag@gmail.com");
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/muszlimifjusag/",
      bg: "bg-blue-600",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/muszlimifjusag/",
      bg: "bg-pink-600",
    },

    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@muszlimifjusagitarsasag/",
      bg: "bg-red-600",
    },

    {
      icon: HiOutlineMail,
      href: "mailto:muszlimifjusag@gmail.com",
      bg: "bg-orange-600",
      isEmail: true,
    },
    {
      icon: FaWhatsapp,
      href: "https://chat.whatsapp.com/IyKhrvmcp65FCGfHJdiJUm",
      bg: "bg-green-600",
    },

  ];

  return (
    <div className="flex gap-2.5">
      {socialLinks.map((s, i) => {
        const Icon = s.icon;

        if (s.isEmail) {
          return (
            <div key={i} className="relative">
              {showCopied && (
                <span className="absolute -top-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                  {t("copied")}
                </span>
              )}
              <button
                onClick={copyEmailToClipboard}
                className="relative grid h-10 w-10 cursor-pointer place-items-center overflow-hidden rounded-full text-white shadow-[0_6px_16px_-6px_rgba(16,20,15,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <div className={`absolute inset-0 rounded-full ${s.bg}`} />
                {showCopied ? (
                  <FaCheck size={20} className="relative z-10" />
                ) : (
                  <Icon size={20} className="relative z-10" />
                )}
              </button>
            </div>
          );
        }

        return (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full text-white shadow-[0_6px_16px_-6px_rgba(16,20,15,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <div className={`absolute inset-0 rounded-full ${s.bg}`} />
            <Icon size={18} className="relative z-10" />
          </a>
        );
      })}
    </div>
  );
}
