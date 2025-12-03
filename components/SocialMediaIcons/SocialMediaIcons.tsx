"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaCheck } from "react-icons/fa";
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
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/muszlimifjusag/",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/123456789",
      gradient: "from-green-400 via-lime-500 to-teal-500",
    },
    {
      icon: HiOutlineMail,
      href: "mailto:muszlimifjusag@gmail.com",
      gradient: "from-purple-400 via-pink-500 to-yellow-400",
      isEmail: true,
    },
  ];

  return (
    <div className="flex gap-5 mt-2">
      {socialLinks.map((s, i) => {
        const Icon = s.icon;

        if (s.isEmail) {
          return (
            <div key={i} className="relative">
              {showCopied && (
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap z-20">
                  {t("copied")}
                </span>
              )}
              <button
                onClick={copyEmailToClipboard}
                className="relative p-3 rounded-full shadow-lg text-white hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.gradient} animate-gradient-x`}
                ></div>
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
            className="relative p-3 rounded-full shadow-lg text-white hover:scale-110 transition-all duration-300 overflow-hidden"
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.gradient} animate-gradient-x`}
            ></div>
            <Icon size={20} className="relative z-10" />
          </a>
        );
      })}
    </div>
  );
}
