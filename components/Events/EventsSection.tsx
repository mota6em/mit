"use client";
import { useState, useEffect } from "react";
import BlogCard from "../BlogCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

interface ApiEvent {
  _id: string;
  id?: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  date: string;
}

interface EventsSectionProps {
  type: "upcoming" | "past";
  limit?: number;
  showViewAll?: boolean;
}

export default function EventsSection({
  type,
  limit,
  showViewAll = true,
}: EventsSectionProps) {
  const t = useTranslations("latestPrograms");
  const params = useParams();

  const locale = (params.locale as string) || "en";

  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  const filteredPrograms = events.filter((p) => {
    const eventDate = new Date(p.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (type === "upcoming") {
      return eventDate >= today;
    } else {
      return eventDate < today;
    }
  });

  // Apply limit if specified
  const displayedPrograms = limit
    ? filteredPrograms.slice(0, limit)
    : filteredPrograms;

  // Determine title and link based on type
  const titleKey = type === "upcoming" ? "upcomingTitle" : "pastTitle";

  const linkHref =
    type === "upcoming"
      ? `/${locale}/events/upcoming`
      : `/${locale}/events/past`;

  // Split title for styling
  const titleText = t(titleKey);
  const titleWords = titleText.split(" ");
  const firstWord = titleWords[0] || "";
  const secondWord = titleWords.slice(1).join(" ") || "";

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading events...</div>
    );
  }

  return (
    <section
      className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6"
      id={`${type}-events`}
    >
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
        {secondWord && (
          <>
            {" "}
            <span className="text-gray-900">{secondWord}</span>
          </>
        )}
      </motion.h2>

      <div className="flex overflow-x-auto overflow-y-hidden md:grid md:grid-cols-3 gap-6 w-full snap-x snap-mandatory scrollbar-hide pb-4">
        {displayedPrograms.map((p, index) => {
          const title = locale === "hu" ? p.title_hu : p.title_en;
          const desc = locale === "hu" ? p.desc_hu : p.desc_en;

          const eventId = p._id || p.id;

          return (
            <div key={eventId} className="min-w-[75vw] md:min-w-0 snap-start">
              <BlogCard
                bgImg={p.img}
                authorImg="/imgs/icon.jpg"
                authorName={t("authorName")}
                readTime={new Date(p.date).toLocaleDateString(locale)}
                title={title}
                desc={desc}
                eventUrl={`/${locale}/events/${eventId}`}
                index={index}
                isVerified={true}
                isPastEvent={type === "past"}
              />
            </div>
          );
        })}
      </div>

      {limit && showViewAll && displayedPrograms.length > 0 && (
        <div className="mt-1 mb-4">
          <Link
            href={linkHref}
            className="text-yellow-800 rounded-full outline outline-yellow-800 px-3 py-1 font-semibold hover:bg-yellow-600 hover:text-white transition-colors"
          >
            {t("showAll")}
          </Link>
        </div>
      )}

      {displayedPrograms.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {type === "upcoming"
            ? "No upcoming events found."
            : "No past events found."}
        </p>
      )}
    </section>
  );
}
