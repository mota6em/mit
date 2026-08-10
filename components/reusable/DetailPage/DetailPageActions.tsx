"use client";

import { FaInstagram } from "react-icons/fa";
import { Check, ExternalLink, Share2 } from "lucide-react";

import type { DetailPageActionsProps } from "@/lib/types";

export function DetailPageActions({
  registrationUrl,
  onShare,
  isCopied,
  showDmButton = true,
  translations,
}: DetailPageActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {registrationUrl && (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-green btn-sheen w-full"
        >
          <ExternalLink className="h-4 w-4" />
          {translations.register || "Register"}
        </a>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {showDmButton && (
          <a
            href="https://ig.me/m/muszlimifjusag"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex-1 hover:!border-[#E1306C] hover:!text-[#E1306C]"
          >
            <FaInstagram className="h-4 w-4" />
            {translations.dm || "Send Message"}
          </a>
        )}

        <button
          type="button"
          onClick={onShare}
          className={`btn flex-1 transition-colors ${
            isCopied ? "btn-green" : "btn-outline"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              {translations.copied || "Copied!"}
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              {translations.share || "Share"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
