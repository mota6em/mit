"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { CgMenuRight } from "react-icons/cg";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/pages", label: "PAGES" },
  { href: "/events", label: "EVENTS" },
  { href: "/give", label: "GIVE" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 px-2 md:px-0">
      <div className="container flex justify-between items-center px-0 py-2">
        <Link href="/" className="flex items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14">
              <Image
                src="/imgs/nav-logo.jpg"
                alt="MIT Logo"
                fill
                className="object-cover rounded-3xl shadow-xs"
              />
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
              <span className="text-xs font-medium text-yellow-600">
                Muszlim Ifjúsági Társaság
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 md:me-3">
          <LanguageSwitch />
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black text-sm font-serif hover:text-yellow-700 px-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav trigger */}
        <div className="md:hidden flex items-center">
          <LanguageSwitch />
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              {isMenuOpen ? (
                <X className="!w-6 !h-6" />
              ) : (
                <CgMenuRight className="!w-6 !h-6" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={5}
              className="bg-white/90 backdrop-blur-md p-4 min-w-[150px] flex flex-col gap-3"
            >
              {navLinks.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  asChild
                  className="text-gray-800 font-medium hover:bg-yellow-100 rounded-md"
                >
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
