"use client";

import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import Reveal from "../reusable/Reveal";
import RevealText from "../reusable/RevealText";
import { StarMark } from "../reusable/Ornament";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/muszlimifjusag/",
    icon: <FaFacebook className="h-4 w-4" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/muszlimifjusag/",
    icon: <FaInstagram className="h-4 w-4" />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@muszlimifjusagitarsasag/",
    icon: <FaYoutube className="h-4 w-4" />,
  },
];

export default function ArchiveNote() {
  const t = useTranslations("highlights");

  return (
    <Reveal
      y={20}
      className="surface relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-[1.75rem] px-8 py-12 text-center md:px-12 md:py-14"
    >
      <div className="pattern-star mask-radial pointer-events-none absolute -end-16 -top-16 h-56 w-56 opacity-[0.06]" />

      <span className="h-9 w-9 text-brand-gold/70">
        <StarMark />
      </span>

      <RevealText
        as="h3"
        text={t("archiveTitle")}
        delay={80}
        className="display display-6 mt-7 text-ink-900"
      />

      <p className="prose-body mx-auto mt-5 max-w-lg">
        {t("archiveDescription")}
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-paper px-5 py-2.5 text-[0.82rem] font-semibold text-ink-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-ink-900 hover:bg-ink-900 hover:text-paper"
          >
            {link.icon}
            {link.name}
          </a>
        ))}
      </div>
    </Reveal>
  );
}
