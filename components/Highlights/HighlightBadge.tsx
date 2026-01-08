"use client";

import { FaCalendarAlt } from "react-icons/fa";
import { HighlightBadgeProps } from "@/lib/types";

export default function HighlightBadge({ text }: HighlightBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
      <FaCalendarAlt className="w-3 h-3" />
      {text}
    </span>
  );
}
