"use client";

import { FaCalendarAlt, FaBell } from "react-icons/fa";
import { HighlightBadgeProps } from "@/lib/types";

export default function HighlightBadge({ type, text }: HighlightBadgeProps) {
  const isAnnouncement = type === "announcement";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
        isAnnouncement
          ? "bg-brand-gold-soft text-brand-gold-dark"
          : "bg-ink-100 text-ink-600"
      }`}
    >
      {isAnnouncement ? (
        <FaBell className="w-3 h-3" />
      ) : (
        <FaCalendarAlt className="w-3 h-3" />
      )}
      {text}
    </span>
  );
}
