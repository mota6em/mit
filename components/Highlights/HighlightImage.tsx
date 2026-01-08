"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiSparkles, HiPhoto } from "react-icons/hi2";
import { HighlightImageProps } from "@/lib/types";

/** Stacked image preview showing layered thumbnails */
function StackedPreview({ images }: { images: string[] }) {
  const previewImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  return (
    <div className="absolute bottom-4 right-4 flex items-end gap-1 z-20">
      {previewImages.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="relative shadow-lg"
          style={{
            width: i === 0 ? 48 : 40,
            height: i === 0 ? 48 : 40,
            marginBottom: i * 4,
            zIndex: previewImages.length - i,
          }}
        >
          <Image
            src={img}
            alt={`Preview ${i + 1}`}
            fill
            sizes="48px"
            className="object-cover rounded-lg border-2 border-white"
          />
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-bold border-2 border-white shadow-lg"
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
}

/** Image count badge */
function ImageCountBadge({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-20"
    >
      <HiPhoto className="w-4 h-4 text-gray-700" />
      <span className="text-sm font-semibold text-gray-800">{count} photos</span>
    </motion.div>
  );
}

export default function HighlightImage({
  images,
  title,
  variants,
}: HighlightImageProps) {
  const hasImages = images && images.length > 0;
  const hasMultipleImages = images && images.length > 1;

  return (
    <motion.div
      variants={variants}
      className="relative h-48 md:h-64 lg:h-full lg:min-h-80 order-1 lg:order-2 overflow-hidden"
    >
      {hasImages ? (
        <>
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          
          {/* Multi-image indicators */}
          {hasMultipleImages && (
            <>
              <ImageCountBadge count={images.length} />
              <StackedPreview images={images} />
            </>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <HiSparkles className="w-16 h-16 text-gray-400" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent lg:bg-linear-to-l lg:from-black/20 lg:via-transparent lg:to-transparent" />

      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 lg:hidden w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl pointer-events-none" />
    </motion.div>
  );
}
