"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, CalendarX } from "lucide-react";
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

  const {
    type,
    limit,
    showViewAll = true,
    filterMode = "all",
    searchable = false,
  } = props;

  const [query, setQuery] = useState("");

  /**
   * Client-side filter over the already-fetched list. Only offered on the full
   * events page, where the list is unbounded — on the home page the sections
   * are capped at three cards and a search box would be noise.
   */
  const visiblePrograms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return displayedPrograms;
    return displayedPrograms.filter((p) =>
      [p.displayTitle, p.displayDesc, p.displayDate]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [displayedPrograms, query, searchable]);

  const isSearching = searchable && query.trim().length > 0;
  const showEmptyState = !loading && visiblePrograms.length === 0;

  return (
    <section
      id={sectionId}
      /* Deliberately not `defer-paint`: the nav dropdown links straight to
         #upcoming-events / #past-events, and a section whose height is still
         an estimate when the browser resolves the hash lands at the wrong
         scroll offset. */
      className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col items-center gap-y-10 px-5 py-16 sm:px-8 md:py-20"
    >
      <SectionHeader title={titleText} underLine />

      {/** Search — full events page only */}
      {searchable && !loading && displayedPrograms.length > 0 && (
        <div className="flex w-full max-w-md flex-col items-center gap-2">
          <div className="group relative w-full">
            <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 transition-colors group-focus-within:text-brand-green" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("latestPrograms.search")}
              aria-label={t("latestPrograms.search")}
              className="w-full rounded-full border border-ink-200 bg-white py-3 pe-11 ps-11 text-sm text-ink-800 shadow-[0_1px_2px_rgba(16,20,15,0.04)] outline-none transition-all duration-300 placeholder:text-ink-400 focus:border-brand-green focus:shadow-[0_4px_16px_-6px_rgba(45,155,74,0.4)]"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("latestPrograms.clearSearch")}
                className="absolute end-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Live result count keeps the filter's effect legible */}
          {isSearching && (
            <p aria-live="polite" className="text-xs font-medium text-ink-500">
              {visiblePrograms.length} {t("latestPrograms.resultCount")}
            </p>
          )}
        </div>
      )}

      {/** Cards Grid */}
      {!showEmptyState && (
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
            : visiblePrograms.map((p, index) => (
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
          {!loading && limit && showViewAll && visiblePrograms.length > 0 && (
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
      )}

      {/** Desktop "View All" Button */}
      {!loading &&
        limit &&
        showViewAll &&
        visiblePrograms.length > 0 &&
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

      {/** Empty state — an illustrated, localised card rather than a bare line */}
      {showEmptyState && (
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-dashed border-ink-300 bg-white/60 px-8 py-14 text-center">
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
            <CalendarX className="h-6 w-6" />
          </span>
          <p className="text-[0.95rem] font-medium text-ink-600">
            {isSearching
              ? t("latestPrograms.searchEmpty")
              : type === "upcoming"
              ? t("latestPrograms.emptyUpcoming")
              : t("latestPrograms.emptyPast")}
          </p>
          {isSearching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-full border border-ink-300 bg-white px-5 py-2 text-xs font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
            >
              {t("latestPrograms.clearSearch")}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
