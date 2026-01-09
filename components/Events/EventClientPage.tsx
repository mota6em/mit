"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CgDanger } from "react-icons/cg";
import { HiClock, HiRefresh, HiEye } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslations } from "next-intl";

import { LoadingUI, ErrorUI } from "./EventStateUIs";
import { EventMap } from "./EventMap";
import { EventActions } from "./EventActions";
import { dayMap, ApiEvent } from "@/lib/types";
import { useEventData } from "@/app/hooks/useEventData";
import ImageLightbox, {
  useImageLightbox,
} from "@/components/reusable/ImageLightbox";

const Badge = ({
  icon: Icon,
  text,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  color: string;
}) => (
  <span
    className={`px-3 py-1 rounded-full ${color} text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1`}
  >
    <Icon className="text-sm" /> {text}
  </span>
);

export default function EventClientPage({
  initialEvent,
}: {
  initialEvent: ApiEvent | null;
}) {
  const t = useTranslations("events.eventDetails");
  const { locale: rawLocale } = useParams();
  const locale = rawLocale === "hu" ? "hu" : "en";

  const { event, loading, error, views } = useEventData(initialEvent);
  const [copied, setCopied] = useState(false);

  // Lightbox state
  const { isOpen, initialIndex, openLightbox, closeLightbox } =
    useImageLightbox();

  if (loading) return <LoadingUI message={t("loading")} />;
  if (error || !event)
    return (
      <ErrorUI
        title={t("notFoundTitle")}
        desc={t("notFoundDesc")}
        backText={t("back")}
        locale={locale}
      />
    );

  const isHu = locale === "hu";
  const title = isHu ? event.title_hu : event.title_en;
  const description = isHu ? event.desc_hu : event.desc_en;
  const note = isHu ? event.note_hu : event.note_en;

  const dateFormatted = event.date
    ? new Date(event.date).toLocaleDateString(isHu ? "hu-HU" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Event images array (currently just one image, but supports multiple in future)
  const eventImages = event.img ? [event.img] : [];

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 pb-8 px-4 md:px-6">
      {/* Image Lightbox */}
      <ImageLightbox
        images={eventImages}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        alt={title}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between md:mb-4 md:px-6">
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="p-1.5 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
              <IoIosArrowRoundBack className="w-5 h-5" />
            </span>
            <span className="font-medium tracking-wide text-sm">
              {t("back")}
            </span>
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
            <HiEye className="w-4 h-4" /> {views > 0 ? views : "-"}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start lg:grid-cols-2 pt-2 gap-4 lg:gap-10">
          <h1 className="text-3xl md:hidden pt-4 font-bold text-center Carena-font leading-tight">
            {title}
          </h1>

          {/* Event Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-4/5 lg:aspect-3/4 rounded-2xl overflow-hidden shadow-xl bg-gray-100 cursor-zoom-in group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={event.img}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Click to expand hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
              <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
                Click to expand
              </span>
            </div>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 sticky top-0 md:top-24"
          >
            <div className="space-y-1.5 border-b border-border pb-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {note && (
                  <Badge icon={CgDanger} text={note} color="bg-amber-500" />
                )}
                {!event.isRecurring && dateFormatted && (
                  <Badge
                    icon={HiClock}
                    text={dateFormatted}
                    color="bg-green-500"
                  />
                )}
                {event.time && (
                  <Badge icon={HiClock} text={event.time} color="bg-blue-500" />
                )}
                {event.isRecurring && event.recurringDays && (
                  <Badge
                    icon={HiRefresh}
                    text={event.recurringDays
                      .map((day: string) => dayMap[day]?.[locale] || day)
                      .join(", ")}
                    color="bg-indigo-500"
                  />
                )}
              </div>

              <h1 className="text-3xl md:text-3xl pt-2 font-bold hidden md:block Carena-font leading-tight">
                {title}
              </h1>

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
                    {t("organizer")}
                  </span>
                  <span className="text-[13px] text-muted-foreground leading-none">
                    MIT
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {description}
            </div>

            <EventActions
              regUrl={event.registrationUrl}
              onShare={handleShare}
              isCopied={copied}
              dict={t}
            />
          </motion.div>
        </div>

        {/* Event Map */}
        <div className="mt-8">
          <EventMap location={event?.location} />
        </div>
      </div>
    </div>
  );
}
