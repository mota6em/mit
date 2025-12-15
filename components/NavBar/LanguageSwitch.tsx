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
    { code: "en", label: "English", flag: "/imgs/uk.png" },
    { code: "hu", label: "Magyar", flag: "/imgs/hun.png" },
  ];

  const current = locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1 px-2 font-serif hover:text-yellow-900 transition-colors">
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
        className="min-w-[120px] backdrop-blur-3xl bg-white/50 border-white/20 text-black shadow-lg"
        align="end"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className="cursor-pointer flex items-center gap-2 font-medium hover:bg-white/40 focus:bg-white/40 transition"
            asChild
          >
            <Link href={`/${locale.code}/${restOfPath}`}>
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
  );
}
