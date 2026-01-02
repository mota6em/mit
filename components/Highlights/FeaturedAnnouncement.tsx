"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaBell, FaCalendarAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

interface FeaturedAnnouncementProps {
  announcement: {
    slug?: string;
    _id?: string;
    id?: string;
    highlightId: string;
    displayDate: string;
    displayTitle: string;
    displayDesc: string;
    images?: string[];
  };
  locale: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FeaturedAnnouncement({
  announcement,
  locale,
}: FeaturedAnnouncementProps) {
  const handleClick = () => {
    const highlightId =
      announcement.slug || announcement._id || announcement.id;
    if (highlightId) {
      sessionStorage.setItem(
        `highlight-${highlightId}`,
        JSON.stringify(announcement)
      );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-6xl mx-auto"
    >
      <motion.div
        className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200/60"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Content Section */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 z-20"
          >
            {/* Category & Date Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                <FaBell className="w-3 h-3" />
                Announcement
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                <FaCalendarAlt className="w-3 h-3" />
                {announcement.displayDate}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              {announcement.displayTitle}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
              {announcement.displayDesc}
            </p>

            {/* CTA Button */}
            <Link
              href={`/${locale}/highlights/${announcement.highlightId}`}
              onClick={handleClick}
              className="group/btn inline-flex items-center gap-3 w-fit"
            >
              <span className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/25">
                <span className="relative z-10">Read More</span>
                <FaArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />

                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className="relative h-64 md:h-80 lg:h-full lg:min-h-[480px] order-1 lg:order-2 overflow-hidden"
          >
            {/* Image */}
            {announcement.images && announcement.images.length > 0 ? (
              <Image
                src={announcement.images[0]}
                alt={announcement.displayTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <HiSparkles className="w-16 h-16 text-gray-400" />
              </div>
            )}

            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/20 lg:via-transparent lg:to-transparent" />

            {/* Decorative corner accent */}
            <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl" />
            <div className="absolute bottom-4 left-4 lg:hidden w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
