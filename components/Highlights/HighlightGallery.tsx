"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// ============================================================================
// Types & Constants
// ============================================================================

interface GalleryConfig {
  dragMultiplier: number;
  mobileBreakpoint: number;
}

const GALLERY_CONFIG: GalleryConfig = {
  dragMultiplier: 2,
  mobileBreakpoint: 768,
};

interface GalleryProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

// ============================================================================
// Internal Components
// ============================================================================

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

function NavButton({
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
    <div className="flex justify-center gap-1.5 mt-6 md:hidden">
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

function GalleryImage({
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

  return (
    <div
      className="relative flex-shrink-0 max-w-[90vw] md:max-w-[600px] max-h-[70vh] rounded-2xl overflow-hidden snap-center bg-gray-50 cursor-zoom-in group/img"
      style={{ opacity, transition: "opacity 0.3s ease" }}
      onClick={onClick}
    >
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
      <ImageCounter current={index + 1} total={totalCount} />
    </div>
  );
}

function SingleImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <div
      className="flex justify-center rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group/img relative"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-auto h-auto max-w-full max-h-[75vh] object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 800px"
        priority
      />
      <ExpandHint />
    </div>
  );
}

// ============================================================================
// Hooks
// ============================================================================

function useGalleryScroll(imagesLength: number) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < GALLERY_CONFIG.mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(gallery.children).forEach((child, index) => {
        const element = child as HTMLElement;
        const elementCenter = element.offsetLeft + element.clientWidth / 2;
        const distance = Math.abs(galleryCenter - elementCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setVisibleIndex(closestIndex);
    };

    gallery.addEventListener("scroll", handleScroll, { passive: true });
    return () => gallery.removeEventListener("scroll", handleScroll);
  }, [imagesLength]);

  const scrollToIndex = useCallback((index: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const children = gallery.children;
    if (!children[index]) return;

    const targetElement = children[index] as HTMLElement;
    const galleryWidth = gallery.clientWidth;
    const elementWidth = targetElement.clientWidth;
    const elementLeft = targetElement.offsetLeft;

    const scrollPosition = elementLeft - (galleryWidth - elementWidth) / 2;

    gallery.scrollTo({ left: Math.max(0, scrollPosition), behavior: "smooth" });
  }, []);

  const scrollBy = useCallback(
    (direction: "left" | "right") => {
      const newIndex =
        direction === "left"
          ? Math.max(0, visibleIndex - 1)
          : Math.min(imagesLength - 1, visibleIndex + 1);
      scrollToIndex(newIndex);
    },
    [visibleIndex, imagesLength, scrollToIndex]
  );

  return { galleryRef, visibleIndex, isMobile, scrollBy, scrollToIndex };
}

function useDragScroll(
  galleryRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  const handlers = useMemo(() => {
    if (!enabled) return {};

    return {
      onMouseDown: (e: React.MouseEvent) => {
        setIsDragging(true);
        dragState.current = {
          startX: e.pageX - (galleryRef.current?.offsetLeft || 0),
          scrollLeft: galleryRef.current?.scrollLeft || 0,
        };
      },
      onMouseMove: (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (galleryRef.current?.offsetLeft || 0);
        const walk =
          (x - dragState.current.startX) * GALLERY_CONFIG.dragMultiplier;
        if (galleryRef.current) {
          galleryRef.current.scrollLeft = dragState.current.scrollLeft - walk;
        }
      },
      onMouseUp: () => setIsDragging(false),
      onMouseLeave: () => setIsDragging(false),
    };
  }, [enabled, isDragging, galleryRef]);

  return { isDragging, handlers };
}

// ============================================================================
// Main Component
// ============================================================================

export function HighlightGallery({
  images,
  title,
  onImageClick,
}: GalleryProps) {
  const { galleryRef, visibleIndex, isMobile, scrollBy, scrollToIndex } =
    useGalleryScroll(images.length);
  const { isDragging, handlers } = useDragScroll(galleryRef, isMobile);

  const hasMultipleImages = images.length > 1;

  if (!hasMultipleImages) {
    return (
      <SingleImage
        src={images[0]}
        alt={title}
        onClick={() => onImageClick(0)}
      />
    );
  }

  return (
    <div className="relative group">
      {visibleIndex > 0 && (
        <NavButton direction="left" onClick={() => scrollBy("left")} />
      )}
      {visibleIndex < images.length - 1 && (
        <NavButton direction="right" onClick={() => scrollBy("right")} />
      )}

      <div
        ref={galleryRef}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 items-center
          ${isDragging ? "cursor-grabbing" : isMobile ? "cursor-grab" : ""}`}
        {...handlers}
      >
        {images.map((img, index) => (
          <GalleryImage
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
