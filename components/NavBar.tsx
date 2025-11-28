"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/pages", label: "PAGES" },
    { href: "/events", label: "EVENTS" },
    { href: "/give", label: "GIVE" },
  ];

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
              <div>
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
              <div className="flex space-x-0.5">
                <span className="text-xs font-medium text-yellow-600">
                  Muszlim Ifjúsági Társaság
                </span>
              </div>
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 md:me-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black text-sm font-serif hover:text-yellow-700 hover:outline rounded-lg px-2 outline-yellow-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-black"
          >
            <CgMenuRight size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="flex flex-col items-center space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
