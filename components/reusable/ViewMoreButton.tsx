"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

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
  const wrapper = variant === "inline" ? "" : "flex justify-center";

  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className={cn(wrapper, className)}>
      <Link
        {...linkProps}
        className={
          linkClassName ||
          "btn btn-outline group hover:!bg-ink-900 hover:!text-paper"
        }
      >
        <span className="relative z-10">{label}</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 rtl:-scale-x-100" />
      </Link>
    </div>
  );
}
