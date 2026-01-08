"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi2";

import { ApiHighlight } from "@/lib/types";
import ImageLightbox, {
  useImageLightbox,
} from "@/components/reusable/ImageLightbox";

/* ============================================
   Constants & Animation Variants
   ============================================ */

const GALLERY_CONFIG = {
  imageGap: 16,
  defaultImageWidth: 320,
  dragMultiplier: 2,
  mobileBreakpoint: 768,
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

/* ============================================
   Sub-Components
   ============================================ */

const NotFoundState = ({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md"
    >
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl">📭</span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">
        {t("notFoundTitle")}
      </h1>
      <p className="text-gray-500 mb-8">{t("notFoundDesc")}</p>
      <Link
        href={`/${locale}/highlights`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        <HiArrowLeft className="w-4 h-4" />
        {t("backToHighlights")}
      </Link>
    </motion.div>
  </div>
);

const BackButton = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
  >
    <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
      <HiArrowLeft className="w-4 h-4" />
    </span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const GalleryNavButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`absolute ${
      direction === "left" ? "left-4" : "right-4"
    } top-1/2 -translate-y-1/2 z-10 
      bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg 
      opacity-0 group-hover:opacity-100 transition-all duration-300 
      hover:scale-110 border border-gray-100`}
    aria-label={`${direction === "left" ? "Previous" : "Next"} image`}
  >
    {direction === "left" ? (
      <IoIosArrowBack className="w-5 h-5 text-gray-700" />
    ) : (
      <IoIosArrowForward className="w-5 h-5 text-gray-700" />
    )}
  </button>
);

const GalleryDots = ({
  count,
  activeIndex,
  onDotClick,
}: {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) => (
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

const DateFooter = ({ date, locale }: { date: string; locale: string }) => {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale === "hu" ? "hu-HU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date, locale]);

  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.5}
      className="mt-12 pt-8 border-t border-gray-100"
    >
      <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
        <div className="w-8 h-px bg-gray-200" />
        <time dateTime={date}>{formattedDate}</time>
        <div className="w-8 h-px bg-gray-200" />
      </div>
    </motion.footer>
  );
};

/* ============================================
   Custom Hooks
   ============================================ */

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

    // Center the target image in the viewport
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

/* ============================================
   Main Component
   ============================================ */

export default function HighlightClientPage({
  initialHighlight,
}: {
  initialHighlight: ApiHighlight | null;
}) {
  const { locale: rawLocale } = useParams();
  const locale = (rawLocale as string) === "hu" ? "hu" : "en";
  const t = useTranslations("highlights");

  const highlight = initialHighlight;

  // Lightbox state
  const { isOpen, initialIndex, openLightbox, closeLightbox } =
    useImageLightbox();

  // Memoized content
  const content = useMemo(() => {
    if (!highlight) return null;
    return {
      title: locale === "hu" ? highlight.title_hu : highlight.title_en,
      description: locale === "hu" ? highlight.desc_hu : highlight.desc_en,
      date: highlight.date || "",
      images: highlight.images || [],
      hasMultipleImages: (highlight.images?.length || 0) > 1,
    };
  }, [highlight, locale]);

  // Gallery hooks
  const { galleryRef, visibleIndex, isMobile, scrollBy, scrollToIndex } =
    useGalleryScroll(content?.images.length || 0);
  const { isDragging, handlers } = useDragScroll(galleryRef, isMobile);

  if (!highlight || !content) {
    return <NotFoundState locale={locale} t={t} />;
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Image Lightbox */}
      <ImageLightbox
        images={content.images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        alt={content.title}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <BackButton
            href={`/${locale}/highlights`}
            label={t("backToHighlights")}
          />
        </nav>

        {/* Title */}
        <motion.header
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {content.title}
          </h1>
        </motion.header>

        {/* Image Gallery */}
        {content.images.length > 0 && (
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mb-10"
          >
            {content.hasMultipleImages ? (
              <div className="relative group">
                {/* Navigation Arrows */}
                {visibleIndex > 0 && (
                  <GalleryNavButton
                    direction="left"
                    onClick={() => scrollBy("left")}
                  />
                )}
                {visibleIndex < content.images.length - 1 && (
                  <GalleryNavButton
                    direction="right"
                    onClick={() => scrollBy("right")}
                  />
                )}

                {/* Gallery Container */}
                <div
                  ref={galleryRef}
                  className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 items-center
                    ${
                      isDragging
                        ? "cursor-grabbing"
                        : isMobile
                        ? "cursor-grab"
                        : ""
                    }`}
                  {...handlers}
                >
                  {content.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0 max-w-[90vw] md:max-w-[600px] max-h-[70vh] rounded-2xl overflow-hidden snap-center bg-gray-50 cursor-zoom-in group/img"
                      style={{
                        opacity: Math.abs(index - visibleIndex) > 1 ? 0.5 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={img}
                        alt={`${content.title} - ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-auto h-auto max-h-[70vh] object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                        sizes="(max-width: 768px) 90vw, 600px"
                        draggable={false}
                      />
                      {/* Click to expand hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/10">
                        <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
                          Click to expand
                        </span>
                      </div>
                      {/* Image Counter */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                        {index + 1} / {content.images.length}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots Indicator */}
                <GalleryDots
                  count={content.images.length}
                  activeIndex={visibleIndex}
                  onDotClick={scrollToIndex}
                />
              </div>
            ) : (
              /* Single Image - preserves original dimensions */
              <div
                className="flex justify-center rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group/img relative"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={content.images[0]}
                  alt={content.title}
                  width={800}
                  height={600}
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                {/* Click to expand hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/10">
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
                    Click to expand
                  </span>
                </div>
              </div>
            )}
          </motion.section>
        )}

        {/* Description */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg">
              {content.description}
            </p>
          </div>
        </motion.section>

        {/* Date Footer */}
        {content.date && <DateFooter date={content.date} locale={locale} />}
      </div>
    </article>
  );
}
