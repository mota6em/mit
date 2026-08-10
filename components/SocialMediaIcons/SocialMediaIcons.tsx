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

import { cn } from "@/lib/utils";

const EMAIL = "muszlimifjusag@gmail.com";

const SOCIAL_LINKS = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/muszlimifjusag/",
    label: "Facebook",
    hover: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/muszlimifjusag/",
    label: "Instagram",
    hover: "hover:bg-[#E1306C] hover:border-[#E1306C]",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@muszlimifjusagitarsasag/",
    label: "YouTube",
    hover: "hover:bg-[#FF0000] hover:border-[#FF0000]",
  },
  {
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/IyKhrvmcp65FCGfHJdiJUm",
    label: "WhatsApp",
    hover: "hover:bg-[#25D366] hover:border-[#25D366]",
  },
];

export default function SocialMediaIcons({
  tone = "light",
}: {
  tone?: "light" | "ink";
}) {
  const [showCopied, setShowCopied] = useState(false);
  const t = useTranslations("nav");

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      setShowCopied(false);
    }
  };

  const base = cn(
    "relative grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:text-white",
    tone === "light"
      ? "border-white/15 bg-white/[0.06] text-white/70"
      : "border-ink-200 bg-white text-ink-600"
  );

  return (
    <div className="flex flex-wrap gap-2.5">
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className={cn(base, social.hover)}
          >
            <Icon size={16} />
          </a>
        );
      })}

      <div className="relative">
        {showCopied && (
          <span className="absolute -top-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gold px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-lg">
            {t("copied")}
          </span>
        )}
        <button
          type="button"
          onClick={copyEmailToClipboard}
          aria-label={EMAIL}
          title={EMAIL}
          className={cn(
            base,
            "cursor-pointer hover:border-brand-gold hover:bg-brand-gold hover:!text-ink-900"
          )}
        >
          {showCopied ? <FaCheck size={15} /> : <HiOutlineMail size={17} />}
        </button>
      </div>
    </div>
  );
}
