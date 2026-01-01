"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  IoIosArrowRoundBack,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

import { ApiHighlight } from "@/lib/types";

const LoadingUI = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ErrorUI = ({
  title,
  desc,
  backText,
  locale,
}: {
  title: string;
  desc: string;
  backText: string;
  locale: string;
}) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{desc}</p>
      <Link
        href={`/${locale}/highlights`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
      >
        <IoIosArrowRoundBack className="w-5 h-5" />
        {backText}
      </Link>
    </div>
  </div>
);

export default function HighlightClientPage({
  initialHighlight,
}: {
  initialHighlight: ApiHighlight | null;
}) {
  const { locale: rawLocale } = useParams();
  const locale = rawLocale === "hu" ? "hu" : "en";

  const [highlight] = useState(initialHighlight);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile/small screen
  const [isMobile, setIsMobile] = useState(false);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Update visible image index on scroll for blur effects
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const container = galleryRef.current;
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.children[0]?.clientWidth || 320;
      const gap = 16;
      const imageWithGap = imageWidth + gap;

      // Calculate which image is currently in view
      const currentIndex = Math.round(scrollLeft / imageWithGap);
      const clampedIndex = Math.max(
        0,
        Math.min(currentIndex, highlight?.images?.length - 1 || 0)
      );
      setVisibleImageIndex(clampedIndex);
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (galleryElement) {
        galleryElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [highlight?.images?.length]);

  // Initialize gallery to show first image
  useEffect(() => {
    if (
      galleryRef.current &&
      highlight?.images &&
      highlight.images.length > 0
    ) {
      const container = galleryRef.current;
      // Start with first image visible
      container.scrollLeft = 0;
    }
  }, [highlight?.images]);

  // Global mouse event handlers for drag scrolling - only on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (galleryRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 2; // Scroll speed multiplier
      if (galleryRef.current) {
        galleryRef.current.scrollLeft = scrollLeft - walk;
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft, isMobile]);

  // Mouse drag scrolling handlers - only on mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - (galleryRef.current?.offsetLeft || 0));
    setScrollLeft(galleryRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - (galleryRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isMobile) return;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (!isMobile) return;
    setIsDragging(false);
  };

  // Arrow navigation functions - Center images in viewport
  const scrollToImage = (direction: "left" | "right") => {
    if (!galleryRef.current) return;

    const container = galleryRef.current;
    const containerWidth = container.clientWidth;
    const imageWidth = container.children[0]?.clientWidth || 320;
    const gap = 16;

    // Calculate current centered image index
    const currentScroll = container.scrollLeft;
    const imageWithGap = imageWidth + gap;
    const currentIndex = Math.round(currentScroll / imageWithGap);

    // Calculate target index
    const targetIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(highlight?.images?.length - 1 || 0, currentIndex + 1);

    // Calculate scroll position to center the target image
    const targetScroll = targetIndex * imageWithGap;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  if (!highlight)
    return (
      <ErrorUI
        title="Highlight Not Found"
        desc="The highlight you're looking for doesn't exist."
        backText="Back to Highlights"
        locale={locale}
      />
    );

  const isHu = locale === "hu";
  const title = isHu ? highlight.title_hu : highlight.title_en;
  const description = isHu ? highlight.desc_hu : highlight.desc_en;
  const note = isHu ? highlight.note_hu : highlight.note_en;

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 pb-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between md:mb-4 md:px-6">
          <Link
            href={`/${locale}/highlights`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="p-1.5 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
              <IoIosArrowRoundBack className="w-5 h-5" />
            </span>
            <span className="font-medium tracking-wide text-sm">
              Back to Highlights
            </span>
          </Link>
        </div>

        {/* Conditional layout based on number of images */}
        {highlight.images && highlight.images.length > 1 ? (
          /* Multiple images: Title on top, Images in center, text below */
          <div className="flex flex-col items-center space-y-8">
            {/* Title - Above images */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold Carena-font leading-tight mb-4">
                {title}
              </h1>
            </motion.div>

            {/* Images Gallery - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-4xl"
            >
              <div className="relative group">
                {/* Arrow buttons - show only when navigation is possible and more than 2 images */}
                {visibleImageIndex > 0 && highlight.images.length > 2 && (
                  <button
                    onClick={() => scrollToImage("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white backdrop-blur-sm text-gray-800 hover:text-gray-900 p-3 rounded-full shadow-lg hover:shadow-2xl opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-x-0 group-hover:scale-110 -translate-x-2 border border-gray-200/50 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <IoIosArrowBack className="w-5 h-5" />
                  </button>
                )}
                {visibleImageIndex < highlight.images.length - 1 &&
                  highlight.images.length > 2 && (
                    <button
                      onClick={() => scrollToImage("right")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white backdrop-blur-sm text-gray-800 hover:text-gray-900 p-3 rounded-full shadow-lg hover:shadow-2xl opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:-translate-x-0 group-hover:scale-110 translate-x-2 border border-gray-200/50 cursor-pointer"
                      aria-label="Next image"
                    >
                      <IoIosArrowForward className="w-5 h-5" />
                    </button>
                  )}

                {/* Horizontal scrollable gallery - Centered focus */}
                <div
                  ref={galleryRef}
                  className={`flex overflow-x-auto overflow-y-hidden gap-4 pb-4 px-4 snap-x snap-mandatory scrollbar-hide transition-all duration-200 ${
                    isDragging && isMobile
                      ? "cursor-grabbing scale-[0.98]"
                      : isMobile
                      ? "cursor-grab"
                      : ""
                  }`}
                  onMouseDown={isMobile ? handleMouseDown : undefined}
                  onMouseMove={isMobile ? handleMouseMove : undefined}
                  onMouseUp={isMobile ? handleMouseUp : undefined}
                  onMouseLeave={isMobile ? handleMouseLeave : undefined}
                  style={{
                    scrollBehavior: "smooth",
                    scrollPaddingLeft: "50%",
                    scrollPaddingRight: "50%",
                  }}
                >
                  {highlight.images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 w-80 h-auto max-h-96 md:w-96 md:max-h-[500px] rounded-2xl overflow-hidden shadow-lg snap-start bg-gray-100 group/image ${
                        isMobile ? "cursor-grab" : ""
                      }`}
                      style={{
                        filter:
                          index === visibleImageIndex ||
                          index === visibleImageIndex + 1
                            ? "none"
                            : "blur(1px) brightness(0.8)",
                        transition: "filter 0.3s ease-out",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        width={320}
                        height={240}
                        className="object-contain w-full h-full transition-all duration-300 ease-out group-hover/image:brightness-105 group-hover/image:contrast-105 select-none"
                        sizes="(max-width: 768px) 320px, 384px"
                        draggable={false}
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                      {/* Image counter badge */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium border border-white/20 transition-all duration-300 group-hover/image:bg-black/80">
                        {index + 1}/{highlight.images.length}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced scroll indicator - hidden on big screens */}
                <div className="flex justify-center mt-4 space-x-2 md:hidden">
                  {highlight.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                        index === visibleImageIndex
                          ? "bg-gray-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => {
                        if (galleryRef.current) {
                          const container = galleryRef.current;
                          const imageWidth =
                            container.children[index]?.clientWidth || 320;
                          const gap = 16;
                          const imageWithGap = imageWidth + gap;

                          // Scroll to the target image
                          const targetScroll = index * imageWithGap;

                          container.scrollTo({
                            left: targetScroll,
                            behavior: "smooth",
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Text Content - Below images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-3xl text-center"
            >
              {highlight.year && (
                <div className="mb-4 flex justify-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {highlight.year}
                  </span>
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {note && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                  <p className="text-amber-800">{note}</p>
                </div>
              )}

              {highlight.category && (
                <div className="mb-4 flex justify-center">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {highlight.category}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Single image or no images: Original two-column layout */
          <div className="grid grid-cols-1 items-start lg:grid-cols-2 pt-2 gap-4 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-3xl md:text-4xl font-bold Carena-font leading-tight mb-6">
                {title}
              </h1>

              {highlight.year && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {highlight.year}
                  </span>
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {note && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-800">{note}</p>
                </div>
              )}

              {highlight.category && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {highlight.category}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              {highlight.images && highlight.images.length === 1 ? (
                <div className="relative group">
                  <div className="relative flex-shrink-0 w-full h-auto max-h-96 md:max-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100 group/image cursor-pointer">
                    <Image
                      src={highlight.images[0]}
                      alt={`${title} - Image 1`}
                      width={400}
                      height={300}
                      className="object-contain w-full h-full transition-all duration-300 ease-out group-hover/image:brightness-105 group-hover/image:contrast-105 select-none"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      draggable={false}
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
