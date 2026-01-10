"use client";

import { FaInstagram } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import type { DetailPageActionsProps } from "@/lib/types";

export function DetailPageActions({
  registrationUrl,
  onShare,
  isCopied,
  showDmButton = true,
  translations,
}: DetailPageActionsProps) {
  return (
    <div className="pt-2 flex flex-col gap-3">
      {registrationUrl && (
        <a
          href={registrationUrl}
          target="_blank"
          className="py-3 rounded-lg font-bold bg-green-600 text-white flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
        >
          <HiLink className="w-5 h-5" />
          <span>{translations.register || "Register"}</span>
        </a>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        {showDmButton && (
          <a
            href="https://ig.me/m/muszlimifjusag"
            target="_blank"
            className="flex-1 py-3 rounded-lg bg-linear-to-r from-purple-500 to-orange-500 text-white flex items-center justify-center gap-2"
          >
            <FaInstagram className="w-5 h-5" />
            <span>{translations.dm || "Send Message"}</span>
          </a>
        )}
        <button
          onClick={onShare}
          className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
            isCopied ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {isCopied
            ? translations.copied || "Copied!"
            : translations.share || "Share"}
        </button>
      </div>
    </div>
  );
}
