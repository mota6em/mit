"use client";
import BlogCard from "../BlogCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { programs, Program } from "@/data/programs";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

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
  const locale = params.locale as string;

  // Filter programs by type
  const filteredPrograms = programs.filter((p) => p.status === type);

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
  
  // Split title into words
  const titleText = t(titleKey);
  const titleWords = titleText.split(" ");
  const firstWord = titleWords[0] || "";
  const secondWord = titleWords.slice(1).join(" ") || "";

  return (
    <section className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6">
      <motion.h2
        className="text-4xl md:text-5xl font-bold Carena-font text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className={type === "upcoming" ? "text-green-600" : "text-gray-500"}>
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
        {displayedPrograms.map((p, index) => (
          <div key={p.id} className="min-w-[75vw] md:min-w-0 snap-start">
            <BlogCard
              bgImg={p.img}
              authorImg="/imgs/icon.jpg"
              authorName={t("authorName")}
              readTime={p.date}
              title={t(p.titleKey)}
              desc={t(p.descKey)}
              eventUrl={`/programs/${p.id}`}
              index={index}
              isVerified={true}
              isPastEvent={type === "past"}
            />
          </div>
        ))}
      </div>

      {showViewAll && displayedPrograms.length > 0 && (
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
          {type === "upcoming" ? "No upcoming events" : "No past events"}
        </p>
      )}
    </section>
  );
}
