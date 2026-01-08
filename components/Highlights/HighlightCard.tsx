"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiPhotograph } from "react-icons/hi";

const DESCRIPTION_CHAR_LIMIT = 100;

interface HighlightCardProps {
  images: string[];
  authorImg: string;
  authorName: string;
  readTime: string;
  title: string;
  desc: string;
  index?: number;
  isVerified?: boolean;
  highlightUrl?: string;
  highlight?: any;
}

/** Renders a single image with hover zoom */
function SingleImageView({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="relative w-full h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
      />
    </motion.div>
  );
}

/** Renders 2 images in a stylish split layout */
function DualImageView({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="relative w-full h-full grid grid-cols-2 gap-0.5">
      {images.slice(0, 2).map((img, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={img}
            alt={`${alt} - ${i + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 160px"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Renders 3 images in an asymmetric grid */
function TripleImageView({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
      {/* Main large image */}
      <motion.div
        className="relative row-span-2 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={images[0]}
          alt={`${alt} - 1`}
          fill
          sizes="(max-width: 768px) 50vw, 160px"
          className="object-cover"
        />
      </motion.div>
      {/* Two smaller images */}
      {images.slice(1, 3).map((img, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={img}
            alt={`${alt} - ${i + 2}`}
            fill
            sizes="(max-width: 768px) 25vw, 80px"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Renders 4+ images in a grid with overflow indicator */
function MultiImageView({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const extraCount = images.length - 4;
  const showExtra = extraCount > 0;

  return (
    <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
      {images.slice(0, 4).map((img, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={img}
            alt={`${alt} - ${i + 1}`}
            fill
            sizes="(max-width: 768px) 25vw, 80px"
            className="object-cover"
          />
          {/* Overlay on last visible image showing +N more */}
          {i === 3 && showExtra && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
              <span className="text-white font-bold text-lg">+{extraCount}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** Empty state placeholder */
function EmptyImageView() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <HiPhotograph className="w-12 h-12 text-gray-300" />
    </div>
  );
}

export default function HighlightCard({
  images,
  authorImg,
  authorName,
  readTime,
  title,
  desc,
  index = 0,
  highlightUrl = "#",
  highlight,
}: HighlightCardProps) {
  const isLongText = desc.length > DESCRIPTION_CHAR_LIMIT;
  const displayDesc = isLongText
    ? `${desc.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
    : desc;

  const imageCount = images?.length || 0;

  const handleClick = () => {
    if (highlight) {
      const highlightId = highlight.slug || highlight._id || highlight.id;
      sessionStorage.setItem(
        `highlight-${highlightId}`,
        JSON.stringify(highlight)
      );
    }
  };

  // Choose the appropriate image layout based on count
  const renderImages = () => {
    if (imageCount === 0) return <EmptyImageView />;
    if (imageCount === 1) return <SingleImageView src={images[0]} alt={title} />;
    if (imageCount === 2) return <DualImageView images={images} alt={title} />;
    if (imageCount === 3) return <TripleImageView images={images} alt={title} />;
    return <MultiImageView images={images} alt={title} />;
  };

  return (
    <Link href={highlightUrl} onClick={handleClick}>
      <motion.article
        className="w-full max-w-sm md:max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer relative flex flex-col h-full transition-shadow duration-300"
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
        <header className="flex items-center justify-between p-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src={authorImg}
              alt={authorName}
              width={28}
              height={28}
              className="rounded-full object-cover ring-2 ring-gray-100"
            />
            <span className="text-sm font-semibold text-gray-900">
              {authorName}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            {readTime}
          </p>
        </header>

        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          {renderImages()}
          
          {/* Image count badge - only for 2+ images */}
          {imageCount > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
              <HiPhotograph className="w-3 h-3" />
              <span>{imageCount}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 grow line-clamp-3 leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
