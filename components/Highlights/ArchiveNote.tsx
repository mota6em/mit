"use client";

import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/muszlimifjusag/",
    icon: <FaFacebook className="w-5 h-5" />,
    bgColor: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/muszlimifjusag/",
    icon: <FaInstagram className="w-5 h-5" />,
    bgColor: "bg-pink-600",
    hoverColor: "hover:bg-pink-700",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@muszlimifjusagitarsasag/",
    icon: <FaYoutube className="w-5 h-5" />,
    bgColor: "bg-red-600",
    hoverColor: "hover:bg-red-700",
  },
];

export default function ArchiveNote() {
  const t = useTranslations("highlights");

  return (
    <div className="px-4 md:px-10 text-center max-w-4xl mx-auto">
      <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-200">
        <h3 className="text-lg md:text-xl font-semibold text-ink-800 mb-4">
          {t("archiveTitle")}
        </h3>
        <p className="text-ink-600 text-sm md:text-base mb-6 leading-relaxed">
          {t("archiveDescription")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 ${link.bgColor} ${link.hoverColor} text-white rounded-lg transition-colors`}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
