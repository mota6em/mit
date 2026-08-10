"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reusable/Reveal";
import type { EventDisplayData } from "@/lib/types";

interface BlogCardProps {
  bgImg: string;
  authorImg: string;
  authorName: string;
  readTime: string;
  title: string;
  desc: string;
  note?: string;
  index?: number;
  eventUrl?: string;
  isPastEvent?: boolean;
  event?: EventDisplayData;
}

export default function BlogCard({
  bgImg,
  authorImg,
  authorName,
  readTime,
  title,
  desc,
  note,
  index = 0,
  eventUrl = "#",
  isPastEvent = false,
  event,
}: BlogCardProps) {
  const handleClick = () => {
    if (event) {
      const eventId = event.slug || event._id || event.id;
      if (eventId) {
        sessionStorage.setItem(`event-${eventId}`, JSON.stringify(event));
      }
    }
  };

  return (
    <Link href={eventUrl} onClick={handleClick} className="block h-full">
      <Reveal
        as="article"
        y={24}
        delay={index * 90}
        className="surface surface-lift group relative flex h-full w-full flex-col overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
          <Image
            src={bgImg}
            alt={title}
            fill
            sizes="(max-width: 768px) 85vw, 360px"
            quality={72}
            loading="lazy"
            className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
              isPastEvent ? "grayscale group-hover:grayscale-0" : ""
            }`}
          />

          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/70 to-transparent" />

          <div className="absolute start-3 top-3 z-10">
            <span
              className={`eyebrow inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md ${
                isPastEvent
                  ? "bg-ink-900/55 text-white/85"
                  : "bg-brand-green/90 text-white"
              }`}
            >
              {!isPastEvent && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
              {readTime}
            </span>
          </div>

          {note && (
            <div className="absolute bottom-3 start-3 z-10 rounded-full border border-brand-gold/40 bg-brand-gold-soft/95 px-3 py-1.5 text-xs font-bold text-brand-gold-dark shadow-sm backdrop-blur-sm">
              ⚠️ {note}
            </div>
          )}

          <div className="absolute bottom-3 end-3 z-10 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-ink-900 opacity-0 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4.5 w-4.5 rtl:-scale-x-100" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <h3 className="display text-lg leading-snug text-ink-900 transition-colors duration-300 group-hover:text-brand-green-dark">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-ink-600">
            {desc}
          </p>

          <div className="mt-auto flex items-center gap-2.5 pt-4">
            <Image
              src={authorImg}
              alt={authorName}
              width={26}
              height={26}
              className="rounded-full object-cover ring-2 ring-ink-100"
            />
            <span className="text-xs font-semibold tracking-wide text-ink-500">
              {authorName}
            </span>
          </div>
        </div>
      </Reveal>
    </Link>
  );
}
