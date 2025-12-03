"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  const t = useTranslations("nav");

  return (
    <footer className="bg-white border border-t border-gray-200 text-black py-2 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Name Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image src="/imgs/hero/mit-logo-full.png" alt="MIT Logo" fill />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-0.5">
                <span className="text-2xl font-bold text-[#4d93fb] monstera-font tracking-widest">
                  M
                </span>
                <span className="text-2xl font-bold text-[#11b505] monstera-font tracking-widest">
                  I
                </span>
                <span className="text-2xl font-bold text-[#f1c34c] monstera-font tracking-widest">
                  T
                </span>
              </div>
              <span className="text-sm font-medium">{t("subtitle")}</span>
            </div>
          </div>

          <div className="flex gap-5 mt-2">
            {[
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
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative p-3 rounded-full shadow-lg text-white hover:scale-110 transition-all duration-300 overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.gradient} animate-gradient-x`}
                  ></div>
                  <Icon size={20} className="relative z-10" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-2 text-sm opacity-90">
          © {new Date().getFullYear()} MIT - {t("subtitle")}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
