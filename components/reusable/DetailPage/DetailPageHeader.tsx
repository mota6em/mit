"use client";

import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiEye } from "react-icons/hi";
import type { DetailPageHeaderProps } from "@/lib/types";

export function DetailPageHeader({
  backHref,
  backLabel,
  views,
  showViews = true,
}: DetailPageHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="p-1.5 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
          <IoIosArrowRoundBack className="w-5 h-5" />
        </span>
        <span className="font-medium tracking-wide text-sm">{backLabel}</span>
      </Link>
      {showViews && (
        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
          <HiEye className="w-4 h-4" /> {views && views > 0 ? views : "-"}
        </span>
      )}
    </div>
  );
}
