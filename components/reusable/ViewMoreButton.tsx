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
  /**
   * A bordered pill that fills with ink on hover — reads as a real
   * affordance at a glance while staying quiet next to primary CTAs.
   */
  const baseClasses =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-ink-300 bg-white px-6 py-3 text-[0.9rem] font-semibold text-ink-800 transition-all duration-500 hover:-translate-y-0.5 hover:border-ink-900 hover:text-white hover:shadow-[0_12px_28px_-10px_rgba(16,20,15,0.45)]";

  const variantClasses = {
    default: "flex justify-center mb-8",
    inline: "",
    centered: "flex justify-center mb-8",
  };

  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      <Link {...linkProps} className={linkClassName || baseClasses}>
        {/* Ink wipe, left → right */}
        <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-ink-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        <span className="relative z-10">{label}</span>
        <FaArrowRightLong className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
