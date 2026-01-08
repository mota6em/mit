"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiZoomIn, HiZoomOut, HiOutlineArrowsExpand } from "react-icons/hi";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

const ZOOM_LEVELS = [1, 1.5, 2, 2.5, 3] as const;

export default function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = "Image",
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const zoom = ZOOM_LEVELS[zoomIndex];
  const canZoomIn = zoomIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = zoomIndex > 0;

  // Navigation functions - declared first so they can be used in effects
  const goToNext = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const handleZoomIn = useCallback(() => {
    if (canZoomIn) {
      setZoomIndex((prev) => prev + 1);
    }
  }, [canZoomIn]);

  const handleZoomOut = useCallback(() => {
    if (canZoomOut) {
      setZoomIndex((prev) => prev - 1);
      // Gradually move back toward center when zooming out
      setPosition((prev) => ({
        x: prev.x * 0.5,
        y: prev.y * 0.5,
      }));
    }
  }, [canZoomOut]);

  const resetZoom = useCallback(() => {
    setZoomIndex(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Reset state when opening or changing images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomIndex(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  // Reset zoom when changing images
  useEffect(() => {
    setZoomIndex(0);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          resetZoom();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    onClose,
    goToNext,
    goToPrevious,
    handleZoomIn,
    handleZoomOut,
    resetZoom,
  ]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle drag for panning when zoomed
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || zoom <= 1) return;
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;
      setPosition({
        x: dragStart.current.posX + deltaX,
        y: dragStart.current.posY + deltaY,
      });
    },
    [isDragging, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (zoom <= 1) return;
      const touch = e.touches[0];
      setIsDragging(true);
      dragStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        posX: position.x,
        posY: position.y,
      };
    },
    [zoom, position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || zoom <= 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.current.x;
      const deltaY = touch.clientY - dragStart.current.y;
      setPosition({
        x: dragStart.current.posX + deltaX,
        y: dragStart.current.posY + deltaY,
      });
    },
    [isDragging, zoom]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Double-click to toggle zoom
  const handleDoubleClick = useCallback(() => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoomIndex(2); // Zoom to 2x
    }
  }, [zoom, resetZoom]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <IoClose className="w-6 h-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
            <button
              onClick={handleZoomOut}
              disabled={!canZoomOut}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <HiZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-medium min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={!canZoomIn}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <HiZoomIn className="w-5 h-5" />
            </button>
            <div className="w-px h-5 bg-white/30 mx-1" />
            <button
              onClick={resetZoom}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Reset zoom"
            >
              <HiOutlineArrowsExpand className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <IoIosArrowBack className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <IoIosArrowForward className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            ref={containerRef}
            className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
              zoom > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: zoom,
                x: position.x,
                y: position.y,
              }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                x: { duration: isDragging ? 0 : 0.2 },
                y: { duration: isDragging ? 0 : 0.2 },
              }}
              className="relative max-w-[90vw] max-h-[85vh]"
            >
              <Image
                src={images[currentIndex]}
                alt={`${alt} - ${currentIndex + 1}`}
                width={1200}
                height={900}
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain select-none"
                sizes="90vw"
                priority
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Image Counter & Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center gap-3">
              {/* Thumbnail Strip */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-10 h-10 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              {/* Counter */}
              <span className="text-white/80 text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-[110] text-white/50 text-xs hidden md:block">
            Double-click to zoom • Drag to pan • Use +/- keys
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Wrapper hook for easy usage
export function useImageLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openLightbox = useCallback((index: number = 0) => {
    setInitialIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    initialIndex,
    openLightbox,
    closeLightbox,
  };
}
