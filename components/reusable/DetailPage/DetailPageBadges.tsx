"use client";

import type { BadgeData } from "@/lib/types";

export function DetailPageBadge({ icon: Icon, text, color }: BadgeData) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold ${color}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {text}
    </span>
  );
}
