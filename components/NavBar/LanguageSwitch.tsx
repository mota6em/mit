"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const rest = segments.slice(2).join("/");

  const locales = [
    { code: "en", label: "English", flag: "/imgs/uk.png" },
    { code: "hu", label: "Magyar", flag: "/imgs/hun.png" },
  ];

  const current = locales.find((l) => l.code === currentLocale) || locales[0];
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer font-serif hover:text-yellow-900 text-black px-2 flex items-center gap-1 focus:outline-none focus:ring-0 active:outline-none active:ring-0">
          <img
            src={current.flag}
            alt={current.code}
            className="w-5 h-5 rounded-sm"
          />
          {open ? <X size={14} /> : <ChevronDown size={14} />}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-[120px] backdrop-blur-lg bg-white/10 border-white/20 text-white"
        align="end"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className="cursor-pointer drop-shadow-[0_0_2px_black] hover:bg-white/20 transition font-medium flex items-center gap-2"
            asChild
          >
            <Link href={`/${locale.code}/${rest}`}>
              <img
                src={locale.flag}
                alt={locale.code}
                className="w-5 h-5 rounded-sm"
              />
              {locale.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
