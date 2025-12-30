"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CgDanger } from "react-icons/cg";
import { HiClock, HiRefresh, HiEye, HiLink } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { EventMap } from "./EventMap";
import { useTranslations } from "next-intl";

interface ApiEvent {
  _id: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  date?: string;
  note_en?: string;
  note_hu?: string;
  location?: string;
  registrationUrl?: string;
  time?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
}

const dayMap: Record<string, { en: string; hu: string }> = {
  Monday: { en: "Mon", hu: "Hé" },
  Tuesday: { en: "Tue", hu: "Ke" },
  Wednesday: { en: "Wed", hu: "Sze" },
  Thursday: { en: "Thu", hu: "Csü" },
  Friday: { en: "Fri", hu: "Pé" },
  Saturday: { en: "Sat", hu: "Szo" },
  Sunday: { en: "Sun", hu: "Va" },
};

export default function EventClientPage({
  initialEvent,
}: {
  initialEvent: any;
}) {
  const t = useTranslations("events.eventDetails");
  const params = useParams();
  const locale = (params?.locale as string) === "hu" ? "hu" : "en";

  const [event, setEvent] = useState<ApiEvent | null>(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState<number>(0);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (initialEvent) return;
    const id = params?.id as string;
    if (!id) return;

    fetch(`/api/events?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [params?.id, initialEvent]);

  useEffect(() => {
    const id = (params?.id as string) || event?._id;
    if (!id || hasIncremented.current) return;
    hasIncremented.current = true;

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.views) setViews(data.views);
      })
      .catch((err) => console.error("Failed to increment views:", err));
  }, [params?.id, event?._id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
          <p className="text-primary font-semibold Carena-font text-base tracking-wide">
            {t("loading")}
          </p>
        </div>
      </div>
    );

  if (error || !event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-3xl font-bold text-primary mb-3 Carena-font">
          {t("notFoundTitle")}
        </h1>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          {t("notFoundDesc")}
        </p>
        <Link
          href={`/${locale}/events`}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition shadow-md text-sm"
        >
          {t("back")}
        </Link>
      </div>
    );

  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;
  const note = locale === "hu" ? event.note_hu : event.note_en;
  const dateFormatted = event.date
    ? new Date(event.date).toLocaleDateString(
        locale === "hu" ? "hu-HU" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 pb-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
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
          <h1 className="text-3xl md:hidden pt-4 font-bold text-center Carena-font leading-tight text-foreground">
            {title}
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100"
          >
            {event.img ? (
              <Image
                src={event.img}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No Image
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 sticky top-0 md:top-24"
          >
            <div className="space-y-1.5 border-b border-border pb-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {note && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <CgDanger className="w-4 h-4" /> {note}
                  </span>
                )}
                {!event.isRecurring && dateFormatted && (
                  <span className="hidden lg:inline-block px-3 py-1 rounded-full bg-green-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                    {dateFormatted}
                  </span>
                )}
                {event.time && (
                  <span className="px-3 py-1 rounded-full bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <HiClock className="text-sm" /> {event.time}
                  </span>
                )}
                {!event.isRecurring && dateFormatted && (
                  <div className="lg:hidden">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold shadow-sm text-black">
                      {dateFormatted}
                    </span>
                  </div>
                )}
                {event.isRecurring && event.recurringDays && (
                  <span className="px-3 py-1 rounded-full bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <HiRefresh className="text-sm" />
                    {event.recurringDays
                      .map(
                        (day) =>
                          dayMap[day]?.[locale === "hu" ? "hu" : "en"] || day
                      )
                      .join(", ")}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-3xl pt-2 font-bold hidden md:block Carena-font leading-tight text-foreground">
                {title}
              </h1>

              <div className="flex items-center gap-2 pt-3">
                <Image
                  src="/imgs/icons/icon.jpg"
                  alt="organizer logo"
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

            <div className="pt-2 flex flex-col gap-3">
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-0 py-3 cursor-pointer rounded-lg font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
                >
                  <HiLink className="w-5 h-5" />
                  <span>{t("register")}</span>
                </a>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://ig.me/m/muszlimifjusag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-0 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>{t("dm")}</span>
                </a>
                <button
                  onClick={handleShare}
                  className={`flex-1 px-3 py-3 cursor-pointer rounded-lg font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                    copied
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-primary-foreground hover:opacity-90"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <MdOutlineDone className="w-5 h-5" /> {t("copied")}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="share"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CiShare2 className="w-5 h-5" />
                        {t("share")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        <EventMap location={event?.location} />
      </div>
    </div>
  );
}
