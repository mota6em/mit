"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // split the path
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] || "en";
  const restOfPath = segments.slice(1).join("/");

  const locales = [
    { code: "en", label: "English", flag: "/imgs/icons/uk.png" },
    { code: "hu", label: "Magyar", flag: "/imgs/icons/hun.png" },
  ];

  const current = locales.find((l) => l.code === currentLocale) || locales[0];
  const saveLangLocale = (code: string) => {
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <>
      {/* Preload all flag images */}
      {locales.map((locale) => (
        <Image
          key={`preload-${locale.code}`}
          src={locale.flag}
          alt=""
          width={20}
          height={20}
          className="hidden"
          priority
          unoptimized
        />
      ))}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1.5 text-ink-600 transition-all duration-300 hover:border-ink-300 hover:text-ink-900">
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image
                src={current.flag}
                alt={current.code}
                fill
                sizes="20px"
                priority
                unoptimized
                className="rounded-sm object-cover"
              />
            </div>
            {open ? <X size={14} /> : <ChevronDown size={14} />}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="min-w-[150px] rounded-2xl border-ink-200 bg-white p-1.5 text-ink-800 shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.18)]"
          align="end"
        >
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale.code}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-ink-50 focus:bg-ink-50"
              asChild
            >
              <Link
                href={`/${locale.code}/${restOfPath}`}
                onClick={() => saveLangLocale(locale.code)}
              >
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={locale.flag}
                    alt={locale.code}
                    fill
                    sizes="20px"
                    priority
                    unoptimized
                    className="rounded-sm object-cover"
                  />
                </div>
                {locale.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
