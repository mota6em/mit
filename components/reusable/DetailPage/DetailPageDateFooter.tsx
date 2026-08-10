"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/data/constants/const";
import type { DateFooterProps } from "@/lib/types";
import { LOCALE_META, toLocale } from "@/lib/i18n";

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
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.5}
      className="mt-12 pt-8 border-t border-ink-100"
    >
      <div className="flex items-center justify-center gap-3 text-ink-400 text-sm">
        <div className="w-8 h-px bg-ink-200" />
        <time dateTime={date}>{formattedDate}</time>
        <div className="w-8 h-px bg-ink-200" />
      </div>
    </motion.footer>
  );
}
