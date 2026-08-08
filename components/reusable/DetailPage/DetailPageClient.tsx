"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ImageLightbox, {
  useImageLightbox,
} from "@/components/reusable/ImageLightbox";
import { EventMap } from "@/components/Events/EventMap";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
        <p className="text-primary font-semibold Carena-font tracking-wide">
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
    <div className="min-h-screen  overflow-x-hidden bg-background text-foreground pt-4 pb-8 px-4 md:px-6">
      <ImageLightbox
        images={data.images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        alt={data.title}
      />

      <div className="max-w-5xl mx-auto">
        <div className="md:mb-4 md:px-6">
          <DetailPageHeader
            backHref={config.backHref}
            backLabel={config.backLabel}
            views={views}
            showViews={config.showViews}
          />
        </div>

        <div className="grid grid-cols-1 items-start lg:grid-cols-2 pt-2 gap-4 lg:gap-10">
          <h1 className="text-3xl md:hidden pt-4 font-bold text-center Carena-font leading-tight">
            {data.title}
          </h1>

          <DetailPageGallery
            images={data.images}
            title={data.title}
            onImageClick={openLightbox}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 sticky top-0 md:top-24"
          >
            <div className="space-y-1.5 border-b border-border pb-3">
              {badges.length > 0 && (
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {badges.map((badge, index) => (
                    <DetailPageBadge key={index} {...badge} />
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-3xl pt-2 font-bold hidden md:block Carena-font leading-tight">
                {data.title}
              </h1>

              {config.showOrganizer !== false && (
                <div className="flex items-center gap-2 pt-3">
                  <Image
                    src="/imgs/icons/icon.jpg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {config.translations?.organizer || "Organized by"}
                    </span>
                    <span className="text-[13px] text-muted-foreground leading-none">
                      MIT
                    </span>
                  </div>
                </div>
              )}
            </div>

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
          </motion.div>
        </div>

        {config.showMap && data.location && (
          <div className="mt-8">
            <EventMap location={data.location} />
          </div>
        )}
      </div>
    </div>
  );
}
