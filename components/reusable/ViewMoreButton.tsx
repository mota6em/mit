"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface ViewMoreButtonProps {
  href: string;
  label: string;
  variant?: "default" | "inline" | "centered";
  className?: string;
  linkClassName?: string;
  external?: boolean;
}

export default function ViewMoreButton({
  href,
  label,
  variant = "default",
  className = "",
  linkClassName = "",
  external = false,
}: ViewMoreButtonProps) {
  const baseClasses =
    "group inline-flex items-center gap-2 text-md rounded-full font-medium transition-all duration-300 text-gray-700 hover:text-gray-900";

  const variantClasses = {
    default: "flex mb-8",
    inline: "",
    centered: "flex justify-center mb-8",
  };

  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      <Link {...linkProps} className={linkClassName || baseClasses}>
        <span>{label}</span>
        <FaArrowRightLong className="group-hover:translate-x-1 transition-transform duration-100 ease-in-out" />
      </Link>
    </div>
  );
}
