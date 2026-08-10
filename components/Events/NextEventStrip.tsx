"use client";

import { useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { SWR_KEYS } from "@/lib/swrKeys";
import { localizedField, toLocale } from "@/lib/i18n";
import { useNow } from "@/app/hooks/useNow";
import { nextOccurrence } from "@/lib/eventTime";
import type { ApiEvent } from "@/lib/types";

export default function NextEventStrip() {
  const t = useTranslations("events.countdown");
  const params = useParams();
  const locale = toLocale(params?.locale);
  const { data } = useSWR<ApiEvent[]>(SWR_KEYS.events);
  const now = useNow();

  const next = useMemo(() => {
    if (!Array.isArray(data) || now === null) return null;

    return data
      .map((event) => ({ event, at: nextOccurrence(event, now) }))
      .filter((entry): entry is { event: ApiEvent; at: number } => entry.at !== null)
      .sort((a, b) => a.at - b.at)[0];
  }, [data, now]);

  if (!next || now === null) return null;

  const remaining = Math.max(next.at - now, 0);
  const live = next.at - now <= 0;
  const days = Math.floor(remaining / 86400_000);
  const hours = Math.floor((remaining % 86400_000) / 3600_000);
  const minutes = Math.floor((remaining % 3600_000) / 60000);

  const units = [
    { value: days, label: t("days") },
    { value: hours, label: t("hours") },
    { value: minutes, label: t("minutes") },
  ];

  const href = `/${locale}/events/${next.event.slug || next.event._id}`;

  return (
    <Link
      href={href}
      className="group flex w-full flex-col gap-5 rounded-2xl border border-ink-200 bg-white/70 p-5 shadow-[0_1px_2px_rgba(18,22,15,0.04)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-[0_18px_36px_-16px_rgba(18,22,15,0.3)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <span className="eyebrow flex items-center gap-2 text-brand-green-dark">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
          </span>
          {live ? t("live") : t("eyebrow")}
        </span>

        <p className="display mt-2.5 line-clamp-1 text-lg text-ink-900 transition-colors duration-300 group-hover:text-brand-green-dark">
          {localizedField(next.event, "title", locale)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        {!live &&
          units.map((unit) => (
            <span
              key={unit.label}
              className="flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-ink-200 bg-paper leading-none"
            >
              <span className="numeral text-lg font-semibold text-ink-900">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-ink-400">
                {unit.label}
              </span>
            </span>
          ))}

        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-900 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
