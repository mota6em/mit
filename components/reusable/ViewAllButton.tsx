"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface ViewAllButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function ViewAllButton({
  href,
  label,
  className = "",
}: ViewAllButtonProps) {
  return (
    <div className={`flex mb-8 ${className}`}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-md rounded-full font-medium transition-all duration-300 text-gray-700 hover:text-gray-900"
      >
        <span>{label}</span>
        <FaArrowRightLong className="group-hover:translate-x-1 transition-transform duration-100 ease-in-out" />
      </Link>
    </div>
  );
}
