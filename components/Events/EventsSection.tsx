"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../BlogCard";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import { EventsSectionProps } from "@/lib/types";
import { useEventsSection } from "@/app/hooks/useEventsSection";
import { FaArrowRightLong } from "react-icons/fa6";

export default function EventsSection(props: EventsSectionProps) {
  const {
    loading,
    displayedPrograms,
    titleText,
    linkHref,
    sectionId,
    locale,
    t,
  } = useEventsSection(props);

  const { type, limit, showViewAll = true, filterMode = "all" } = props;

  return (
    <section
      id={sectionId}
      className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6 scroll-mt-28"
    >
      {/** Animated Header */}
      <motion.div
        className="text-3xl md:text-4xl text-center tracking-wide mb-2 md:mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-semibold text-gray-800">{titleText}</h2>
      </motion.div>

      {/** Cards Grid */}
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
          : displayedPrograms.map((p, index) => (
              <div
                key={p.eventId}
                className="min-w-[75vw] md:min-w-0 snap-start h-full"
              >
                <BlogCard
                  bgImg={p.img}
                  authorImg="/imgs/icons/icon.jpg"
                  authorName={t("latestPrograms.authorName")}
                  readTime={p.displayDate}
                  title={p.displayTitle}
                  desc={p.displayDesc}
                  note={p.displayNote}
                  eventUrl={`/${locale}/events/${p.eventId}`}
                  index={index}
                  isVerified={true}
                  isPastEvent={type === "past"}
                />
              </div>
            ))}

        {/** Mobile "View All" Card */}
        {!loading && limit && showViewAll && displayedPrograms.length > 0 && (
          <div className="min-w-[40vw] md:hidden snap-start h-full flex items-center justify-center">
            <Link
              href={linkHref}
              className={`group h-[300px] w-full flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all duration-300 px-4 text-center cursor-pointer ${
                type === "upcoming"
                  ? "border-gray-300 hover:bg-green-50"
                  : "bg-gray-50 border-gray-300 hover:border-gray-500 hover:bg-gray-100"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform text-gray-800 group-hover:text-gray-900">
                <FaArrowRight size={20} />
              </div>
              <span className="font-semibold transition-colors text-gray-800 group-hover:text-gray-900">
                {type === "upcoming"
                  ? t("latestPrograms.showAllUpcoming")
                  : t("latestPrograms.showAllPast")}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/** Desktop "View All" Button */}
      {!loading &&
        limit &&
        showViewAll &&
        displayedPrograms.length > 0 &&
        filterMode === "all" && (
          <div className="hidden md:block mb-8">
            <Link
              href={linkHref}
              className="group inline-flex items-center gap-2 text-md rounded-full font-medium transition-all duration-300 text-gray-700 hover:text-gray-900"
            >
              <span>
                {type === "upcoming"
                  ? t("latestPrograms.showAllUpcoming")
                  : t("latestPrograms.showAllPast")}
              </span>
              <FaArrowRightLong className="group-hover:translate-x-1 transition-transform duration-100 ease-in-out" />
            </Link>
          </div>
        )}

      {/** Empty State */}
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
