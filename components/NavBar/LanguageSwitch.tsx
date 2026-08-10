"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_META, toLocale } from "@/lib/i18n";

function rememberLocale(code: string) {
  try {
    window.localStorage.setItem("lang", code);
    window.document.cookie = `lang=${code}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* storage unavailable in private mode */
  }
}

export default function LanguageSwitch() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = toLocale(segments[0]);
  const restOfPath = segments.slice(1).join("/");

  const persist = (code: string) => {
    rememberLocale(code);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("changeLanguage")}
          className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink-200 bg-white py-1.5 pe-2 ps-2.5 text-ink-600 transition-all duration-300 hover:border-ink-300 hover:text-ink-900"
        >
          <Globe className="h-4 w-4 text-ink-400 transition-colors duration-300 group-hover:text-brand-green" />
          <span className="text-xs font-bold tracking-wider">
            {LOCALE_META[currentLocale].shortLabel}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-ink-400 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[190px] rounded-2xl border-ink-200 bg-white p-1.5 text-ink-800 shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.18)]"
      >
        {LOCALES.map((code) => {
          const meta = LOCALE_META[code];
          const isActive = code === currentLocale;

          return (
            <DropdownMenuItem
              key={code}
              className="cursor-pointer rounded-xl p-0 focus:bg-transparent"
              asChild
            >
              <Link
                href={`/${code}${restOfPath ? `/${restOfPath}` : ""}`}
                onClick={() => persist(code)}
                lang={code}
                dir={meta.dir}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-green-soft text-brand-green-dark"
                    : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                <span
                  className={`grid h-6 w-8 shrink-0 place-items-center rounded-md text-[0.62rem] font-bold tracking-wider ${
                    isActive
                      ? "bg-brand-green text-white"
                      : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {meta.shortLabel}
                </span>
                <span className="flex-1 text-start">{meta.nativeName}</span>
                {isActive && <Check className="h-4 w-4 shrink-0" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
