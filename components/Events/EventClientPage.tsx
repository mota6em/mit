"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CgDanger } from "react-icons/cg";
import { HiClock, HiRefresh } from "react-icons/hi";

interface ApiEvent {
  _id: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  date: string;
  note_en?: string;
  note_hu?: string;
  time?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
}

const dictionary = {
  en: {
    back: "Back to Events",
    dateLabel: "Date",
    notFoundTitle: "Event Not Found",
    notFoundDesc:
      "The event you are looking for does not exist or has been removed.",
    loading: "Loading event details...",
    organizer: "Organizer",
    share: "Share Event",
    copied: "Link Copied!",
    repeats: "Repeats on:",
  },
  hu: {
    back: "Vissza az eseményekhez",
    dateLabel: "Dátum",
    notFoundTitle: "Esemény nem található",
    notFoundDesc: "A keresett esemény nem létezik, vagy törölve lett.",
    loading: "Esemény betöltése...",
    organizer: "Szervező",
    share: "Megosztás",
    copied: "Link Másolva!",
    repeats: "Ismétlődik:",
  },
};

export default function EventClientPage({
  initialEvent,
}: {
  initialEvent: any;
}) {
  const params = useParams();
  const rawLocale = params?.locale as string;
  const locale = rawLocale === "hu" ? "hu" : "en";
  const dict = dictionary[locale];

  const [event, setEvent] = useState<ApiEvent | null>(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

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
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [params?.id, initialEvent]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-primary font-semibold Carena-font text-lg tracking-wide">
            {dict.loading}
          </p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4 Carena-font">
          {dict.notFoundTitle}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          {dict.notFoundDesc}
        </p>
        <Link
          href={`/${locale}/events`}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition shadow-lg"
        >
          {dict.back}
        </Link>
      </div>
    );
  }

  // --- Success State ---
  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;
  const note = locale === "hu" ? event.note_hu : event.note_en;

  const dateFormatted = new Date(event.date).toLocaleDateString(
    locale === "hu" ? "hu-HU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-5 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href={`/${locale}/events`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <span className="p-2 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          <span className="font-medium tracking-wide">{dict.back}</span>
        </Link>

        <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-12 lg:gap-20">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
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
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image
              </div>
            )}
            {/* Mobile Date Badge */}
            <div className="absolute top-4 left-4 lg:hidden">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold shadow-sm text-black">
                {dateFormatted}
              </span>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 sticky top-32"
          >
            <div className="space-y-4 border-b border-border pb-8">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Date */}
                <span className="hidden lg:inline-block px-4 py-1.5 rounded-full bg-green-500 text-white font-bold text-sm uppercase tracking-wider shadow-sm">
                  {dateFormatted}
                </span>

                {/* Time */}
                {event.time && (
                  <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <HiClock className="text-lg" /> {event.time}
                  </span>
                )}

                {/* Recurring */}
                {event.isRecurring && event.recurringDays && (
                  <span className="px-4 py-1.5 rounded-full bg-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <HiRefresh className="text-lg" />{" "}
                    {event.recurringDays.map((d) => d.slice(0, 3)).join(", ")}
                  </span>
                )}

                {/* Note */}
                {note && (
                  <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold text-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <CgDanger className="w-5 h-5" /> {note}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold Carena-font leading-tight text-foreground">
                {title}
              </h1>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{dict.organizer}</span>
                  <span className="text-xs text-muted-foreground">
                    MIT Organization
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {description}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShare}
                className={`flex-1 px-8 py-4 cursor-pointer rounded-xl font-bold text-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                  copied
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {dict.copied}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="share"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                        />
                      </svg>
                      {dict.share}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
