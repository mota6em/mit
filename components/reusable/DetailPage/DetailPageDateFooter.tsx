"use client";

import { useMemo } from "react";

import type { DateFooterProps } from "@/lib/types";
import { LOCALE_META, toLocale } from "@/lib/i18n";
import { StarMark } from "@/components/reusable/Ornament";

export function DetailPageDateFooter({ date, locale }: DateFooterProps) {
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALE_META[toLocale(locale)].intl, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date)),
    [date, locale]
  );

  return (
    <footer className="mt-10 flex items-center gap-3 text-sm text-ink-400">
      <span className="h-3 w-3 shrink-0 text-brand-gold/70">
        <StarMark strokeWidth={2.5} />
      </span>
      <time dateTime={date} className="tracking-wide">
        {formattedDate}
      </time>
      <span className="h-px flex-1 bg-gradient-to-r from-ink-200 to-transparent" />
    </footer>
  );
}
