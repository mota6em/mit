"use client";

import type { BadgeData, DetailPageBadgesProps } from "@/lib/types";

export function DetailPageBadge({ icon: Icon, text, color }: BadgeData) {
  return (
    <span
      className={`px-3 py-1 rounded-full ${color} text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1`}
    >
      <Icon className="text-sm" /> {text}
    </span>
  );
}

export function DetailPageBadges({ badges }: DetailPageBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
      {badges.map((badge, index) => (
        <DetailPageBadge key={index} {...badge} />
      ))}
    </div>
  );
}
