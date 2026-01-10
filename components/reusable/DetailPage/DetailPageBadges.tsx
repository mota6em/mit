"use client";

import type { BadgeData } from "@/lib/types";

export function DetailPageBadge({ icon: Icon, text, color }: BadgeData) {
  return (
    <span
      className={`px-3 py-1 rounded-full ${color} text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1`}
    >
      <Icon className="text-sm" /> {text}
    </span>
  );
}
