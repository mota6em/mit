"use client";

import Image from "next/image";
import { HiSparkles, HiPhoto } from "react-icons/hi2";
import {
  HighlightImageProps,
  StackedPreviewProps,
  ImageCounterProps,
} from "@/lib/types";

function StackedPreview({ images }: StackedPreviewProps) {
  const previewImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  return (
    <div className="absolute bottom-4 right-4 flex items-end gap-1 z-20">
      {previewImages.map((img, i) => (
        <div
          key={i}
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
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-bold border-2 border-white shadow-lg"
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

function ImageCountBadge({ current }: Omit<ImageCounterProps, "total">) {
  return (
    <div
      className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-20"
    >
      <HiPhoto className="w-4 h-4 text-ink-700" />
      <span className="text-sm font-semibold text-ink-800">
        {current} photos
      </span>
    </div>
  );
}

export default function HighlightImage({
  images,
  title,
}: HighlightImageProps) {
  const hasImages = images && images.length > 0;
  const hasMultipleImages = images && images.length > 1;

  return (
    <div className="relative h-48 md:h-64 lg:h-full lg:min-h-80 order-1 lg:order-2 overflow-hidden">
      {hasImages ? (
        <>
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />

          {/* Multi-image indicators */}
          {hasMultipleImages && (
            <>
              <ImageCountBadge current={images.length} />
              <StackedPreview images={images} />
            </>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-ink-200 to-ink-300 flex items-center justify-center">
          <HiSparkles className="w-16 h-16 text-ink-400" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent lg:bg-linear-to-l lg:from-black/20 lg:via-transparent lg:to-transparent" />

      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 lg:hidden w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-3xl pointer-events-none" />
    </div>
  );
}
