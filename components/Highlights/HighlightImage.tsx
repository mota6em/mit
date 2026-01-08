"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { HighlightImageProps } from "@/lib/types";

export default function HighlightImage({
  images,
  title,
  variants,
}: HighlightImageProps) {
  const hasImages = images && images.length > 0;

  return (
    <motion.div
      variants={variants}
      className="relative h-48 md:h-64 lg:h-full lg:min-h-[320px] order-1 lg:order-2 overflow-hidden"
    >
      {hasImages ? (
        <Image
          src={images[0]}
          alt={title}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/20 lg:via-transparent lg:to-transparent" />

      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl" />
      <div className="absolute bottom-4 left-4 lg:hidden w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl" />
    </motion.div>
  );
}
