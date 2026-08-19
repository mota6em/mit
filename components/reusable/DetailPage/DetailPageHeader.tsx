"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

import type { DetailPageHeaderProps } from "@/lib/types";

export function DetailPageHeader({
  backHref,
  backLabel,
  views,
  showViews = true,
}: DetailPageHeaderProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2.5 text-ink-500 transition-colors duration-300 hover:text-ink-900"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5 group-hover:border-ink-900">
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
        </span>
        <span className="text-sm font-semibold tracking-wide">{backLabel}</span>
      </Link>

      {showViews && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-500">
          <Eye className="h-3.5 w-3.5" />
          <span className="numeral">{views && views > 0 ? views : "—"}</span>
        </span>
      )}
    </div>
  );
}
