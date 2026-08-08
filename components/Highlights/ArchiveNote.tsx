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
    bgColor: "bg-[#1877F2]",
    hoverColor: "hover:brightness-110",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/muszlimifjusag/",
    icon: <FaInstagram className="w-5 h-5" />,
    bgColor: "bg-[#E1306C]",
    hoverColor: "hover:brightness-110",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@muszlimifjusagitarsasag/",
    icon: <FaYoutube className="w-5 h-5" />,
    bgColor: "bg-[#FF0000]",
    hoverColor: "hover:brightness-110",
  },
];

export default function ArchiveNote() {
  const t = useTranslations("highlights");

  return (
    <div className="px-4 md:px-10 text-center max-w-4xl mx-auto">
      <div className="surface rounded-3xl p-8 md:p-10">
        <h3 className="display mb-4 text-xl text-ink-900 md:text-2xl">
          {t("archiveTitle")}
        </h3>
        <p className="lede mx-auto mb-8 max-w-xl">
          {t("archiveDescription")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_-6px_rgba(16,20,15,0.5)] transition-all duration-300 hover:-translate-y-0.5 ${link.bgColor} ${link.hoverColor}`}
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
