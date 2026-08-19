"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Repeat, TriangleAlert } from "lucide-react";

import Reveal from "@/components/reusable/Reveal";
import PosterMedia from "@/components/reusable/PosterMedia";
import DateTile from "@/components/reusable/DateTile";
import { placeLabel } from "@/lib/eventTime";
import type { EventDisplayData } from "@/lib/types";

interface BlogCardProps {
  bgImg: string;
  readTime: string;
  title: string;
  desc: string;
  note?: string;
  index?: number;
  eventUrl?: string;
  isPastEvent?: boolean;
  event?: EventDisplayData;
  ctaLabel: string;
}

export default function BlogCard({
  bgImg,
  readTime,
  title,
  desc,
  note,
  index = 0,
  eventUrl = "#",
  isPastEvent = false,
  event,
  ctaLabel,
}: BlogCardProps) {
  const handleClick = () => {
    if (!event) return;
    const eventId = event.slug || event._id || event.id;
    if (eventId) {
      sessionStorage.setItem(`event-${eventId}`, JSON.stringify(event));
    }
  };

  const isRecurring = Boolean(event?.isRecurring);
  const place = placeLabel(event?.location);

  return (
    <Reveal
      as="article"
      y={24}
      delay={index * 90}
      className="surface surface-lift group relative h-full w-full overflow-hidden rounded-[1.5rem]"
    >
      <Link
        href={eventUrl}
        onClick={handleClick}
        className="flex h-full flex-col outline-none"
      >
        <div className="media-zoom relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
          <PosterMedia
            src={bgImg}
            sizes="(max-width: 768px) 82vw, 360px"
            className={
              isPastEvent
                ? "grayscale transition-[filter] duration-[900ms] group-hover:grayscale-0"
                : undefined
            }
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/10" />

          <div className="absolute start-3.5 top-3.5 z-10">
            {isRecurring ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold backdrop-blur-md ${
                  isPastEvent
                    ? "bg-ink-950/60 text-white/85"
                    : "bg-brand-green text-white"
                }`}
              >
                <Repeat className="h-3 w-3" />
                {readTime}
              </span>
            ) : (
              <DateTile
                day={event?.displayDay}
                month={event?.displayMonth}
                muted={isPastEvent}
              />
            )}
          </div>

          {note && (
            <div className="absolute bottom-3.5 start-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold-soft/95 px-3 py-1.5 text-[0.7rem] font-bold text-brand-gold-dark shadow-sm backdrop-blur-sm">
              <TriangleAlert className="h-3 w-3" />
              {note}
            </div>
          )}

          <span className="absolute bottom-3.5 end-3.5 z-10 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-ink-900 opacity-0 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="display text-[1.15rem] leading-snug text-ink-900 transition-colors duration-300 group-hover:text-brand-green-dark">
            {title}
          </h3>

          {place && (
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-ink-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-gold-dark" />
              <span className="line-clamp-1">{place}</span>
            </span>
          )}

          <p className="mt-3 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-600">
            {desc}
          </p>

          <div className="mt-auto pt-5">
            <div className="rule-fade" />
            <span className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-wide text-ink-700 transition-colors duration-300 group-hover:text-brand-green-dark">
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
