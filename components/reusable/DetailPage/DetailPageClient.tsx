"use client";

import { useState } from "react";
import Image from "next/image";

import ImageLightbox, {
  useImageLightbox,
} from "@/components/reusable/ImageLightbox";
import { EventMap } from "@/components/Events/EventMap";
import Reveal from "@/components/reusable/Reveal";
import RevealText from "@/components/reusable/RevealText";
import { StarMark } from "@/components/reusable/Ornament";

import { DetailPageHeader } from "./DetailPageHeader";
import { DetailPageGallery } from "./DetailPageGallery";
import { DetailPageDescription } from "./DetailPageDescription";
import { DetailPageNotFound } from "./DetailPageNotFound";
import { DetailPageActions } from "./DetailPageActions";
import { DetailPageDateFooter } from "./DetailPageDateFooter";
import { DetailPageBadge } from "./DetailPageBadges";

import type { DetailPageData, DetailPageConfig, BadgeData } from "@/lib/types";

interface DetailPageClientProps {
  data: DetailPageData | null;
  config: DetailPageConfig;
  badges?: BadgeData[];
  views?: number;
  loading?: boolean;
}

export default function DetailPageClient({
  data,
  config,
  badges = [],
  views = 0,
  loading = false,
}: DetailPageClientProps) {
  const [copied, setCopied] = useState(false);
  const { isOpen, initialIndex, openLightbox, closeLightbox } =
    useImageLightbox();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-paper">
        <span className="h-10 w-10 animate-pulse text-brand-gold">
          <StarMark />
        </span>
        <p className="eyebrow text-ink-400">
          {config.translations?.loading || "Loading..."}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <DetailPageNotFound
        locale={config.locale}
        title={config.notFoundTitle}
        description={config.notFoundDesc}
        backHref={config.backHref}
        backLabel={config.backLabel}
      />
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper px-5 pb-20 pt-8 sm:px-8 md:pb-28 lg:px-12">
      <div className="pattern-star mask-radial pointer-events-none absolute -end-24 top-0 h-[24rem] w-[24rem] opacity-[0.04]" />

      <ImageLightbox
        images={data.images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        alt={data.title}
      />

      <div className="relative mx-auto max-w-6xl">
        <DetailPageHeader
          backHref={config.backHref}
          backLabel={config.backLabel}
          views={views}
          showViews={config.showViews}
        />

        <RevealText
          as="h1"
          text={data.title}
          className="display display-4 mt-10 max-w-3xl text-ink-900 lg:hidden"
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <DetailPageGallery
              images={data.images}
              title={data.title}
              onImageClick={openLightbox}
            />
          </div>

          <Reveal
            y={20}
            delay={120}
            className="flex flex-col lg:sticky lg:top-28 lg:col-span-5"
          >
            {badges.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {badges.map((badge, index) => (
                  <DetailPageBadge key={index} {...badge} />
                ))}
              </div>
            )}

            <h1 className="display display-4 hidden text-ink-900 lg:block">
              {data.title}
            </h1>

            {config.showOrganizer !== false && (
              <div className="mt-7 flex items-center gap-3">
                <Image
                  src="/imgs/icons/icon.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-ink-100"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {config.translations?.organizer || "Organized by"}
                  </span>
                  <span className="display text-[1.05rem] text-ink-900">
                    MIT
                  </span>
                </div>
              </div>
            )}

            <div className="rule-fade my-7" />

            <DetailPageDescription description={data.description} />

            {config.showActions && (
              <DetailPageActions
                registrationUrl={data.registrationUrl}
                onShare={handleShare}
                isCopied={copied}
                showDmButton={config.showDmButton}
                translations={{
                  register: config.translations?.register,
                  dm: config.translations?.dm,
                  share: config.translations?.share,
                  copied: config.translations?.copied,
                }}
              />
            )}

            {config.showDateFooter && data.date && (
              <DetailPageDateFooter date={data.date} locale={config.locale} />
            )}
          </Reveal>
        </div>

        {config.showMap && data.location && (
          <Reveal y={20} className="mt-14 overflow-hidden rounded-[1.5rem]">
            <EventMap location={data.location} />
          </Reveal>
        )}
      </div>
    </div>
  );
}
