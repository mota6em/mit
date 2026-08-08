"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import { EventsSectionProps } from "@/lib/types";
import { useEventsSection } from "@/app/hooks/useEventsSection";
import SectionHeader from "../reusable/SectionHeader";
import ViewMoreButton from "../reusable/ViewMoreButton";

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
      className="mx-auto flex w-full max-w-6xl flex-col items-center gap-y-10 px-4 py-16 md:px-8 md:py-20"
    >
      <SectionHeader
        title={titleText}
        underLine
      />

      {/** Cards Grid */}
      <div className="scrollbar-hide flex w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overflow-y-hidden pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
        {loading
          ? Array.from({ length: limit || 3 }).map((_, i) => (
              <div
                key={i}
                className="w-[78vw] shrink-0 snap-start md:w-auto md:shrink"
              >
                <BlogCardSkeleton />
              </div>
            ))
          : displayedPrograms.map((p, index) => (
              <div
                key={p.eventId}
                className="w-[78vw] shrink-0 snap-start md:w-auto md:shrink"
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
                  isPastEvent={type === "past"}
                  event={p}
                />
              </div>
            ))}

        {/** Mobile "View All" Card */}
        {!loading && limit && showViewAll && displayedPrograms.length > 0 && (
          <div className="flex w-[46vw] shrink-0 snap-start items-center justify-center md:hidden">
            <Link
              href={linkHref}
              className={`group flex h-full min-h-[280px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed px-4 text-center transition-all duration-500 ${
                type === "upcoming"
                  ? "border-brand-green/40 hover:border-brand-green hover:bg-brand-green-soft"
                  : "border-ink-300 bg-ink-50 hover:border-ink-500 hover:bg-ink-100"
              }`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink-800 shadow-md transition-transform duration-500 group-hover:scale-110">
                <FaArrowRight size={20} />
              </div>
              <span className="text-sm font-semibold text-ink-700 transition-colors group-hover:text-ink-900">
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
          <ViewMoreButton
            href={linkHref}
            label={
              type === "upcoming"
                ? t("latestPrograms.showAllUpcoming")
                : t("latestPrograms.showAllPast")
            }
            variant="default"
          />
        )}

      {/** Empty State */}
      {!loading && displayedPrograms.length === 0 && (
        <p className="rounded-2xl border border-dashed border-ink-300 px-8 py-10 text-center text-ink-500">
          {type === "upcoming"
            ? "No upcoming events found."
            : "No past events found."}
        </p>
      )}
    </section>
  );
}
