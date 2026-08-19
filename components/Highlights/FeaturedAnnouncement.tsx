"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Images, Sparkles } from "lucide-react";

import Reveal from "../reusable/Reveal";
import PosterMedia from "../reusable/PosterMedia";
import { FeaturedAnnouncementProps } from "@/lib/types";

type Props = FeaturedAnnouncementProps & { flip?: boolean; eager?: boolean };

export default function FeaturedAnnouncement({
  announcement,
  locale,
  flip = false,
  eager = false,
}: Props) {
  const t = useTranslations("highlights");
  const images = announcement.images ?? [];
  const cover = images[0];

  const cacheHighlight = () => {
    const id = announcement.slug || announcement._id || announcement.id;
    if (id) {
      sessionStorage.setItem(`highlight-${id}`, JSON.stringify(announcement));
    }
  };

  return (
    <Reveal
      as="article"
      y={26}
      className="surface surface-lift group relative w-full overflow-hidden rounded-[1.75rem]"
    >
      <Link
        href={`/${locale}/highlights/${announcement.highlightId}`}
        onClick={cacheHighlight}
        className="grid grid-cols-1 lg:grid-cols-12"
      >
        <div
          className={`media-zoom relative aspect-[16/10] w-full overflow-hidden bg-ink-100 lg:col-span-7 lg:aspect-auto lg:min-h-[24rem] ${
            flip ? "lg:order-2" : ""
          }`}
        >
          {cover ? (
            <PosterMedia
              src={cover}
              priority={eager}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400">
              <Sparkles className="h-12 w-12" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent" />

          {images.length > 1 && (
            <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-950/60 px-3 py-1.5 text-[0.72rem] font-semibold text-white backdrop-blur-md">
              <Images className="h-3.5 w-3.5" />
              {images.length}
            </span>
          )}
        </div>

        <div
          className={`relative flex flex-col justify-center p-7 md:p-10 lg:col-span-5 ${
            flip ? "lg:order-1" : ""
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-8 start-0 hidden w-[2px] rounded-full bg-gradient-to-b from-brand-gold via-brand-gold/40 to-transparent lg:block"
          />

          {announcement.displayDate && (
            <span className="eyebrow mb-5 text-brand-green-dark">
              {announcement.displayDate}
            </span>
          )}

          <h3 className="display display-5 text-ink-900 transition-colors duration-300 group-hover:text-brand-green-dark">
            {announcement.displayTitle}
          </h3>

          <p className="prose-body mt-5 line-clamp-4">
            {announcement.displayDesc}
          </p>

          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 bg-paper px-5 py-2.5 text-[0.82rem] font-semibold text-ink-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-paper">
            {t("readMore")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
