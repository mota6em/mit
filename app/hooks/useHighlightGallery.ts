"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { GALLERY_CONFIG } from "@/lib/types";

export function useGalleryScroll(imagesLength: number) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < GALLERY_CONFIG.mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize gallery to first image on mount - wait for images to be rendered
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || isInitialized) return;

    // Use requestAnimationFrame to ensure DOM is ready
    const initGallery = () => {
      if (gallery.children.length > 0) {
        gallery.scrollLeft = 0;
        setVisibleIndex(0);
        setIsInitialized(true);
      } else {
        // Retry if children not yet rendered
        requestAnimationFrame(initGallery);
      }
    };

    requestAnimationFrame(initGallery);
  }, [imagesLength, isInitialized]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !isInitialized) return;

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
  }, [imagesLength, isInitialized]);

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

export function useDragScroll(
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
