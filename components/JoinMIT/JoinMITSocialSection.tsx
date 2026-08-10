"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check } from "lucide-react";

import Section from "../reusable/Section";
import SectionHeader from "../reusable/SectionHeader";
import Reveal from "../reusable/Reveal";

const EMAIL = "muszlimifjusag@gmail.com";

const SOCIALS = [
  {
    id: "facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/muszlimifjusag/",
    name: "Facebook",
    hover: "group-hover:bg-[#1877F2]",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/muszlimifjusag/",
    name: "Instagram",
    hover: "group-hover:bg-[#E1306C]",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/IyKhrvmcp65FCGfHJdiJUm",
    name: "WhatsApp",
    hover: "group-hover:bg-[#25D366]",
  },
  {
    id: "email",
    icon: HiOutlineMail,
    href: "#",
    name: "Email",
    hover: "group-hover:bg-brand-gold-dark",
  },
] as const;

export default function JoinMITSocialSection() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("joinMIT");
  const tNav = useTranslations("nav");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="socials" tone="tinted" width="default" deferPaint>
      <SectionHeader
        title={t("connectWithUs")}
        topText={t("socialTag")}
        description={t("socialDescription")}
        align="start"
        className="mb-14 max-w-2xl"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {SOCIALS.map((social, index) => {
          const Icon = social.icon;
          const isEmail = social.id === "email";
          const isWhatsApp = social.id === "whatsapp";

          const actionLabel = isWhatsApp
            ? t("whatsapp-join")
            : isEmail
            ? copied
              ? tNav("copied")
              : t("copyEmail")
            : t("followUs");

          const inner = (
            <>
              <span
                className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-ink-100 text-ink-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:text-white ${social.hover}`}
              >
                <Icon className="text-lg" />
              </span>

              <h3 className="display text-[1.05rem] text-ink-900">
                {social.name}
              </h3>

              <p className="mt-2.5 line-clamp-2 text-[0.85rem] leading-relaxed text-ink-500">
                {t(`socialText.${social.id}`)}
              </p>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.78rem] font-semibold text-ink-700 transition-colors duration-300 group-hover:text-brand-green-dark">
                {actionLabel}
                {isEmail && copied ? (
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                )}
              </span>
            </>
          );

          const cardClass =
            "surface surface-lift group flex h-full flex-col rounded-[1.5rem] p-6 text-start";

          return (
            <Reveal key={social.id} y={24} delay={index * 90} className="h-full">
              {isEmail ? (
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`${cardClass} w-full`}
                >
                  {inner}
                </button>
              ) : (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
