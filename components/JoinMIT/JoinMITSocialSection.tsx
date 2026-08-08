"use client";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionTag } from "../Events/SectionTag";

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/muszlimifjusag/",
    color: "text-blue-800",
    bg: "bg-blue-50",
    name: "MIT - Facebook",
    id: "facebook",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/muszlimifjusag/",
    color: "text-pink-800",
    bg: "bg-pink-50",
    name: "MIT - Instagram",
    id: "instagram",
  },
  {
    icon: HiOutlineMail,
    href: "#",
    color: "text-yellow-800",
    bg: "bg-yellow-50",
    name: "MIT - Email",
    id: "email",
  },
  {
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/IyKhrvmcp65FCGfHJdiJUm",
    color: "text-green-800",
    bg: "bg-green-50",
    name: "MIT - Professional community ",
    id: "whatsapp",
  },
];

export default function JoinMITSocialSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const t = useTranslations("joinMIT");
  const tNav = useTranslations("nav");

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("muszlimifjusag@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div
      id="socials"
      className="max-w-7xl mx-auto px-4 py-14 md:py-10 bg-white/50 rounded-[2rem] md:rounded-[3rem] my-6 md:my-10"
    >
      <div className="text-center mb-6 md:mb-10">
        <SectionTag text={t("socialTag") || "Stay Connected"} color="gray" />
        <h2 className="display text-[2rem] text-ink-900 sm:text-4xl md:text-[2.6rem]">
          {t("connectWithUs")}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          const isEmail = social.id === "email";
          const isWhatsApp = social.id === "whatsapp";
          const cardStyles =
            "bg-white hover:shadow-xl hover:-translate-y-2 cursor-pointer border-ink-100";

          const iconWrapperStyles = `${social.bg} group-hover:scale-110`;

          const content = (
            <div
              className={`h-full rounded-2xl md:rounded-3xl p-4 md:p-8 text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] md:shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-300 group flex flex-col items-center justify-center ${cardStyles}`}
            >
              {/* Compact Icon Container */}
              <div
                className={`w-10 h-10 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-transform ${iconWrapperStyles}`}
              >
                <Icon className={`text-lg md:text-3xl ${social.color}`} />
              </div>

              {/* Compact Title */}
              <h3
                className={`text-md md:text-xl font-semibold mb-1 md:mb-2  text-ink-800 `}
              >
                {social.name}
              </h3>

              {/* Compact Description */}
              <p className="text-ink-500 text-[12px] md:text-sm mb-2 md:mb-4 line-clamp-2 leading-relaxed">
                {t(`socialText.${social.id.toLowerCase()}`)}
              </p>

              {/* Action Text */}
              <div
                className={`text-[12px] md:text-sm font-semibold mt-auto transition-opacity ${`${social.color} opacity-80 group-hover:opacity-100`}`}
              >
                {isWhatsApp ? (
                  <span>{t("whatsapp-join")}</span>
                ) : isEmail && emailCopied ? (
                  tNav("copied")
                ) : isEmail ? (
                  <span>{t("copyEmail")}</span>
                ) : (
                  <span>{t("followUs")}</span>
                )}
              </div>
            </div>
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              {isEmail ? (
                <button
                  onClick={handleEmailCopy}
                  className="w-full h-full block text-left"
                >
                  {content}
                </button>
              ) : (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
