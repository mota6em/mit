"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CiClock2 } from "react-icons/ci";

const DESCRIPTION_CHAR_LIMIT = 100;

interface BlogCardProps {
  bgImg: string;
  authorImg: string;
  authorName: string;
  readTime: string;
  title: string;
  desc: string;
  note?: string;
  index?: number;
  isVerified?: boolean;
  eventUrl?: string;
  isPastEvent?: boolean;
}

export default function BlogCard({
  bgImg,
  authorImg,
  authorName,
  readTime,
  title,
  desc,
  note,
  index = 0,
  eventUrl = "#",
  isPastEvent = false,
}: BlogCardProps) {
  const isLongText = desc.length > DESCRIPTION_CHAR_LIMIT;
  const displayDesc = isLongText
    ? `${desc.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
    : desc;

  const handleClick = () => {
    window.location.href = eventUrl;
  };

  return (
    <motion.article
      onClick={handleClick}
      className="w-full max-w-md bg-white rounded-xl overflow-hidden shadow-md cursor-pointer relative flex flex-col h-full"
      initial={{ opacity: 0.5, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-2 md:p-3 border-b">
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src={authorImg}
            alt={authorName}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-900">
            {authorName}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Date */}
          <p className="text-sm flex flex-row items-center justify-between gap-x-1 text-green-600 outline outline-green-300 px-2 py-1 rounded-full font-semibold">
            <CiClock2 className="w-5 h-5" /> {readTime}
          </p>
          <span className="text-xs md:text-sm outline outline-blue-700 px-3 py-1 rounded-full font-semibold cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
            View
          </span>
        </div>
      </header>

      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Image
            src={bgImg}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className={`object-contain ${isPastEvent ? "!grayscale" : ""}`}
          />
        </motion.div>

        {/* --- NOTE BADGE --- */}
        {note && (
          <div className="absolute bottom-2 left-2 bg-amber-100/90 backdrop-blur-sm border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            ⚠️ {note}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pb-3 pt-2 space-y-1 ">
        <div className="text-md">
          <span className="text-gray-700 font-bold">{title}</span>
        </div>
        <p className="text-sm text-gray-600">
          {displayDesc}
          {isLongText && (
            <span className="text-gray-600 font-bold ml-1">show more...</span>
          )}
        </p>
      </div>
    </motion.article>
  );
}
