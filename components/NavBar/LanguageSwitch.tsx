"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSwitch() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const rest = segments.slice(2).join("/");

  const locales = [
    { code: "en", label: "English" },
    { code: "hu", label: "Magyar" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={null}
          className="cursor-pointer font-serif hover:text-yellow-900  text-black px-2 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          {currentLocale.toUpperCase()}
          <span className="ml-1">▼</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-[100px] backdrop-blur-lg bg-white/10 border-white/20 text-white"
        align="end"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className="cursor-pointer drop-shadow-[0_0_2px_black] hover:bg-white/20 transition font-medium"
            asChild
          >
            <Link href={`/${locale.code}/${rest}`}>{locale.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
