"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useGalleryScroll,
  useDragScroll,
} from "@/app/hooks/useHighlightGallery";
import type { DetailPageGalleryProps } from "@/lib/types";

function ExpandHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/10">
      <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
        Click to expand
      </span>
    </div>
  );
}

function ImageCounter({ current, total }: { current: number; total: number }) {
  return (
    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
      {current} / {total}
    </div>
  );
}

function SmallNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  const Icon = isLeft ? IoIosArrowBack : IoIosArrowForward;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute ${
        isLeft ? "left-3" : "right-3"
      } top-1/2 -translate-y-1/2 z-10 
        bg-black/50 hover:bg-black/70 cursor-pointer backdrop-blur-sm p-2 rounded-full shadow-lg 
        opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105`}
      aria-label={`${isLeft ? "Previous" : "Next"} image`}
    >
      <Icon className="w-4 h-4 text-white" />
    </button>
  );
}

function MobileNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  const Icon = isLeft ? IoIosArrowBack : IoIosArrowForward;

  return (
    <button
      onClick={onClick}
      className={`absolute ${
        isLeft ? "-left-14" : "-right-14"
      } top-1/2 -translate-y-1/2 z-10 
        bg-slate-700/60 hover:bg-slate-800/80 cursor-pointer backdrop-blur-sm p-3 rounded-full shadow-lg 
        opacity-0 group-hover:opacity-100 transition-all duration-300 
        hover:scale-110 border border-gray-100`}
      aria-label={`${isLeft ? "Previous" : "Next"} image`}
    >
      <Icon className="w-5 h-5 text-white" />
    </button>
  );
}

function Dots({
  count,
  activeIndex,
  onDotClick,
}: {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-1.5 mt-6 lg:hidden">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            index === activeIndex
              ? "bg-gray-800 w-4"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
}

function SingleImageWithArrows({
  images,
  title,
  onImageClick,
}: {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full aspect-4/5 lg:aspect-4/5 lg:max-h-[80vh] rounded-2xl overflow-hidden shadow-xl bg-gray-100 cursor-zoom-in group"
      onClick={() => onImageClick(currentIndex)}
    >
      <div className="relative w-full h-full group/img">
        <Image
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          fill
          className="object-cover lg:object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <ExpandHint />
      </div>
      {hasMultiple && (
        <>
          {!isFirst && <SmallNavButton direction="left" onClick={goToPrev} />}
          {!isLast && <SmallNavButton direction="right" onClick={goToNext} />}
          <ImageCounter current={currentIndex + 1} total={images.length} />
        </>
      )}
    </motion.div>
  );
}

function MobileGalleryImage({
  src,
  alt,
  index,
  totalCount,
  visibleIndex,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  totalCount: number;
  visibleIndex: number;
  onClick: () => void;
}) {
  const opacity = Math.abs(index - visibleIndex) > 1 ? 0.5 : 1;
  const snapClass = index === 0 ? "snap-start" : "snap-center";

  return (
    <div
      className={`relative flex-shrink-0 max-w-[90vw] md:max-w-[600px] max-h-[70vh] rounded-2xl overflow-hidden ${snapClass} bg-gray-50 cursor-zoom-in`}
      style={{ opacity, transition: "opacity 0.3s ease" }}
      onClick={onClick}
    >
      <div className="relative group/img">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-auto h-auto max-h-[70vh] object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
          sizes="(max-width: 768px) 90vw, 600px"
          draggable={false}
        />
        <ExpandHint />
      </div>
      <ImageCounter current={index + 1} total={totalCount} />
    </div>
  );
}

function MobileMultiImageGallery({
  images,
  title,
  onImageClick,
}: DetailPageGalleryProps) {
  const { galleryRef, visibleIndex, isMobile, scrollBy, scrollToIndex } =
    useGalleryScroll(images.length);
  const { isDragging, handlers } = useDragScroll(galleryRef, isMobile);

  return (
    <div className="relative group">
      {visibleIndex > 0 && (
        <MobileNavButton direction="left" onClick={() => scrollBy("left")} />
      )}
      {visibleIndex < images.length - 1 && (
        <MobileNavButton direction="right" onClick={() => scrollBy("right")} />
      )}

      <div
        ref={galleryRef}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 items-center
          ${isDragging ? "cursor-grabbing" : isMobile ? "cursor-grab" : ""}`}
        {...handlers}
      >
        {images.map((img, index) => (
          <MobileGalleryImage
            key={index}
            src={img}
            alt={`${title} - ${index + 1}`}
            index={index}
            totalCount={images.length}
            visibleIndex={visibleIndex}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>

      <Dots
        count={images.length}
        activeIndex={visibleIndex}
        onDotClick={scrollToIndex}
      />
    </div>
  );
}

export function DetailPageGallery({
  images,
  title,
  onImageClick,
}: DetailPageGalleryProps) {
  if (images.length === 0) return null;

  const hasMultiple = images.length > 1;

  if (!hasMultiple) {
    return (
      <SingleImageWithArrows
        images={images}
        title={title}
        onImageClick={onImageClick}
      />
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <SingleImageWithArrows
          images={images}
          title={title}
          onImageClick={onImageClick}
        />
      </div>
      <div className="lg:hidden">
        <MobileMultiImageGallery
          images={images}
          title={title}
          onImageClick={onImageClick}
        />
      </div>
    </>
  );
}
