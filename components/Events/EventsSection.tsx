"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../BlogCard";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import { ApiEvent, dayMap } from "@/lib/types";
import { getEvents } from "@/lib/eventService";

export default function EventsSection({
  type,
  limit,
  showViewAll = true,
  filterMode = "all",
}: EventsSectionProps) {
  const t = useTranslations("latestPrograms");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionId = `${type}-events`;

  /** Synchronization logic for external event data */
  useEffect(() => {
    const loadData = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  /** Logic for categorizing and filtering event lists */
  const filteredPrograms = events.filter((p) => {
    if (filterMode === "recurring_only" && !p.isRecurring) return false;
    if (filterMode === "single_only" && p.isRecurring) return false;
    if (p.isRecurring) return type === "upcoming";
    if (!p.date) return false;

    const eventDate = new Date(p.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return type === "upcoming" ? eventDate >= today : eventDate < today;
  });

  /** Configuration for section titles and navigation links */
  const displayedPrograms = limit
    ? filteredPrograms.slice(0, limit)
    : filteredPrograms;
  const isWeeklySection =
    filterMode === "recurring_only" && type === "upcoming";
  const titleText = isWeeklySection
    ? "Weekly Gatherings"
    : t(type === "upcoming" ? "upcomingTitle" : "pastTitle");
  const [firstWord, ...restWords] = titleText.split(" ");
  const secondWord = restWords.join(" ");
  const linkHref = `/${locale}/events#${sectionId}`;

  return (
    <section
      id={sectionId}
      className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6 scroll-mt-28"
    >
      {/** Animated section header component */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold Carena-font text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span
          className={type === "upcoming" ? "text-green-600" : "text-gray-500"}
        >
          {firstWord}
        </span>
        {secondWord && <span className="text-gray-900"> {secondWord}</span>}
      </motion.h2>
      {/** Responsive grid displaying event cards or skeletons */}
      <div className="flex overflow-x-auto items-center overflow-y-hidden md:grid md:grid-cols-3 gap-6 w-full snap-x snap-mandatory scrollbar-hide pb-4 px-2">
        {loading
          ? Array.from({ length: limit || 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[75vw] md:min-w-0 snap-start h-full"
              >
                <BlogCardSkeleton />
              </div>
            ))
          : displayedPrograms.map((p, index) => {
              const title = locale === "hu" ? p.title_hu : p.title_en;
              const desc = locale === "hu" ? p.desc_hu : p.desc_en;
              const note = locale === "hu" ? p.note_hu : p.note_en;
              const eventId = p._id || p.id;

              let displayDate = "";
              if (p.isRecurring && p.recurringDays?.length) {
                displayDate = p.recurringDays
                  .map(
                    (day) => dayMap[day]?.[locale === "hu" ? "hu" : "en"] || day
                  )
                  .join(", ");
              } else if (p.date) {
                displayDate = new Date(p.date).toLocaleDateString(
                  locale === "hu" ? "hu-HU" : "en-US"
                );
              }

              return (
                <div
                  key={eventId}
                  className="min-w-[75vw] md:min-w-0 snap-start h-full"
                >
                  <BlogCard
                    bgImg={p.img}
                    authorImg="/imgs/icon.jpg"
                    authorName={t("authorName")}
                    readTime={displayDate}
                    title={title}
                    desc={desc}
                    note={note}
                    eventUrl={`/${locale}/events/${eventId}`}
                    index={index}
                    isVerified={true}
                    isPastEvent={type === "past"}
                  />
                </div>
              );
            })}
        {/** Mobile-specific navigation card for viewing all events */}
        {!loading && limit && showViewAll && displayedPrograms.length > 0 && (
          <div className="min-w-[40vw] md:hidden snap-start h-full flex items-center justify-center">
            <Link
              href={linkHref}
              className={`group h-[300px] w-full flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all duration-300 px-4 text-center cursor-pointer ${
                type === "upcoming"
                  ? "bg-green-50 border-green-200 hover:border-green-500 hover:bg-green-100"
                  : "bg-gray-50 border-gray-300 hover:border-gray-500 hover:bg-gray-100"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform ${
                  type === "upcoming" ? "text-green-600" : "text-gray-700"
                }`}
              >
                <FaArrowRight size={20} />
              </div>
              <span
                className={`font-semibold transition-colors ${
                  type === "upcoming"
                    ? "text-green-700 group-hover:text-green-800"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {type === "upcoming" ? t("showAllUpcoming") : t("showAllPast")}
              </span>
            </Link>
          </div>
        )}
      </div>
      {/** Desktop-specific navigation link for viewing all events */}
      {!loading &&
        limit &&
        showViewAll &&
        displayedPrograms.length > 0 &&
        filterMode === "all" && (
          <div className="hidden md:block mt-2 mb-6">
            <Link
              href={linkHref}
              className={`group inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                type === "upcoming"
                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              <span>
                {type === "upcoming" ? t("showAllUpcoming") : t("showAllPast")}
              </span>
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      {/** Fallback UI for empty event states */}
      {!loading && displayedPrograms.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {type === "upcoming"
            ? "No upcoming events found."
            : "No past events found."}
        </p>
      )}
    </section>
  );
}
