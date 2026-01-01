"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const DESCRIPTION_CHAR_LIMIT = 100;

interface HighlightCardProps {
  images: string[];
  authorImg: string;
  authorName: string;
  readTime: string;
  title: string;
  desc: string;
  note?: string;
  index?: number;
  isVerified?: boolean;
  highlightUrl?: string;
  highlight?: any; // Full highlight data for caching
}

export default function HighlightCard({
  images,
  authorImg,
  authorName,
  readTime,
  title,
  desc,
  note,
  index = 0,
  highlightUrl = "#",
  highlight,
}: HighlightCardProps) {
  const isLongText = desc.length > DESCRIPTION_CHAR_LIMIT;
  const displayDesc = isLongText
    ? `${desc.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
    : desc;

  const handleClick = () => {
    if (highlight) {
      const highlightId = highlight.slug || highlight._id || highlight.id;
      console.time(`cache-store-${highlightId}`);
      sessionStorage.setItem(
        `highlight-${highlightId}`,
        JSON.stringify(highlight)
      );
      console.timeEnd(`cache-store-${highlightId}`);
      console.log(`Cached highlight data for ${highlightId}`);
    }
  };

  return (
    <Link href={highlightUrl} onClick={handleClick}>
      <motion.article
        className="w-full max-w-sm md:max-w-xs bg-white rounded-xl overflow-hidden shadow-md cursor-pointer relative flex flex-col h-full"
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
        <header className="flex items-center justify-between p-2 border-b">
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
            <p className="text-sm flex flex-row items-center justify-between gap-x-1 text-gray-600 px-2 py-1 font-semibold">
              {readTime}
            </p>
          </div>
        </header>

        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {images && images.length > 0 ? (
              <Image
                src={images[0]}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            {images && images.length > 1 && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {images.length}
              </div>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-3 leading-relaxed">
            {displayDesc}
          </p>
          {note && (
            <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 mb-2">
              {note}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
