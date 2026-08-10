"use client";

import Link from "next/link";
import { ArrowUpRight, Images, Sparkles } from "lucide-react";

import Reveal from "../reusable/Reveal";
import PosterMedia from "../reusable/PosterMedia";
import type { HighlightDisplayData } from "@/lib/types";

type HighlightCardProps = {
  highlight: HighlightDisplayData;
  locale: string;
  index?: number;
};

export default function HighlightCard({
  highlight,
  locale,
  index = 0,
}: HighlightCardProps) {
  const images = highlight.images ?? [];
  const cover = images[0];

  const cacheHighlight = () => {
    const id = highlight.slug || highlight._id || highlight.id;
    if (id) sessionStorage.setItem(`highlight-${id}`, JSON.stringify(highlight));
  };

  return (
    <Reveal
      as="article"
      y={24}
      delay={index * 90}
      className="surface surface-lift group h-full overflow-hidden rounded-[1.5rem]"
    >
      <Link
        href={`/${locale}/highlights/${highlight.highlightId}`}
        onClick={cacheHighlight}
        className="flex h-full flex-col"
      >
        <div className="media-zoom relative aspect-[16/10] w-full overflow-hidden bg-ink-100">
          {cover ? (
            <PosterMedia
              src={cover}
              sizes="(max-width: 1024px) 92vw, 30vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400">
              <Sparkles className="h-10 w-10" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />

          {images.length > 1 && (
            <span className="absolute start-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/60 px-2.5 py-1 text-[0.68rem] font-semibold text-white backdrop-blur-md">
              <Images className="h-3 w-3" />
              {images.length}
            </span>
          )}

          <span className="absolute bottom-3.5 end-3.5 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-ink-900 opacity-0 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {highlight.displayDate && (
            <span className="eyebrow mb-3.5 text-brand-green-dark">
              {highlight.displayDate}
            </span>
          )}

          <h3 className="display text-[1.2rem] leading-snug text-ink-900 transition-colors duration-300 group-hover:text-brand-green-dark">
            {highlight.displayTitle}
          </h3>

          <p className="mt-3 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-600">
            {highlight.displayDesc}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
