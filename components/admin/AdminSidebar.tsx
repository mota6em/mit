"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // Use client-side signOut
import { HiCalendar, HiViewGrid, HiMenu, HiX, HiLogout, HiMail } from "react-icons/hi";
import { HomeIcon } from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: HiViewGrid },
    { href: "/admin/events", label: "Events", icon: HiCalendar },
    { href: "/admin/newsletter", label: "Newsletter", icon: HiMail },  
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16 fixed top-0 left-0 right-0 z-[60] shadow-sm">
        <Link href="/admin" className="text-xl font-bold text-blue-600">
          MIT Admin
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <HiX className="text-2xl" />
          ) : (
            <HiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-[80] transition-transform duration-300 ease-in-out md:translate-x-0 w-[260px] md:w-60 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between h-16 md:h-20 shrink-0">
          <Link href="/admin" className="text-xl font-bold text-blue-600">
            MIT Admin
          </Link>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 text-gray-400"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto mt-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon className="text-xl" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all font-bold"
          >
            <HomeIcon className="text-xl" />
            Home
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
          >
            <HiLogout className="text-xl" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
