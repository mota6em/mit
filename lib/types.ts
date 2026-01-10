import type React from "react";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

/** Interfaces and Data Definitions */
export interface ApiEvent {
  slug?: string;
  _id: string;
  id?: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  note_en?: string;
  note_hu?: string;
  location?: string;
  date?: string;
  time?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
  registrationUrl?: string;
}

export interface EventData extends Omit<ApiEvent, "_id" | "slug"> {
  _id?: string; // Make _id optional for form state
}

export interface EventDisplayData extends ApiEvent {
  displayTitle: string;
  displayDesc: string;
  displayNote?: string;
  displayDate: string;
  eventId: string;
}

export interface EventsSectionProps {
  type: "upcoming" | "past";
  limit?: number;
  showViewAll?: boolean;
  filterMode?: "all" | "recurring_only" | "single_only";
}

/** Static Mapping for Localization */
export const dayMap: Record<string, { en: string; hu: string }> = {
  Monday: { en: "Mon", hu: "Hé" },
  Tuesday: { en: "Tue", hu: "Ke" },
  Wednesday: { en: "Wed", hu: "Sze" },
  Thursday: { en: "Thu", hu: "Csü" },
  Friday: { en: "Fri", hu: "Pé" },
  Saturday: { en: "Sat", hu: "Szo" },
  Sunday: { en: "Sun", hu: "Va" },
};

export interface NewsletterSubscriber {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface ApiHighlight {
  slug?: string;
  _id: string;
  id?: string;
  images: string[];
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  status?: string;
  date?: string;
}

export interface HighlightData extends Omit<ApiHighlight, "_id" | "slug"> {
  _id?: string; // Make _id optional for form state
}

export interface HighlightsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  titleKey?: string;
  sectionId?: string;
}

export interface HighlightDisplayData extends ApiHighlight {
  displayDate: string;
  displayTitle: string;
  displayDesc: string;
  highlightId: string;
}

/** ===== Highlight Detail Page Types ===== */

export interface DateFooterProps {
  date: string;
  locale: string;
}

/** ===== Highlight Component Props ===== */

/**
 * Data passed to FeaturedAnnouncement component
 * Extends HighlightDisplayData to include all API fields for caching
 */
export interface FeaturedAnnouncementData extends HighlightDisplayData {
  // All fields inherited from HighlightDisplayData (which extends ApiHighlight)
}

export interface FeaturedAnnouncementProps {
  announcement: FeaturedAnnouncementData;
  locale: string;
}

export interface HighlightBadgeProps {
  type: "announcement" | "date";
  text: string;
}

export interface HighlightContentProps {
  title: string;
  description: string;
  ctaLabel: string;
  variants?: Variants;
  children?: ReactNode;
}

export interface HighlightImageProps {
  images?: string[];
  title: string;
  variants?: Variants;
}

/** ===== Gallery Types ===== */

export interface GalleryConfig {
  dragMultiplier: number;
  mobileBreakpoint: number;
}

export const GALLERY_CONFIG: GalleryConfig = {
  dragMultiplier: 2,
  mobileBreakpoint: 768,
};

export interface GalleryProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

export interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
  totalCount: number;
  visibleIndex: number;
  onClick: () => void;
}

export interface SingleImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export interface NavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export interface DotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export interface ImageCounterProps {
  current: number;
  total: number;
}

export interface StackedPreviewProps {
  images: string[];
}

/** ===== Highlight List Types ===== */

export interface HighlightListProps {
  highlights: HighlightData[];
  onEdit: (highlight: HighlightData) => void;
}

/** ===== Animation Variants ===== */

export const HIGHLIGHT_ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  image: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
} as const;

/** ===== DetailPage Types ===== */

export type DetailPageType = "event" | "highlight";

export interface DetailPageData {
  id: string;
  title: string;
  description: string;
  images: string[];
  date?: string;
  time?: string;
  note?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
  registrationUrl?: string;
  location?: string;
}

export interface DetailPageConfig {
  type: DetailPageType;
  locale: string;
  backHref: string;
  backLabel: string;
  notFoundTitle: string;
  notFoundDesc: string;
  showViews?: boolean;
  showActions?: boolean;
  showMap?: boolean;
  showDateFooter?: boolean;
  translations?: {
    organizer?: string;
    register?: string;
    dm?: string;
    share?: string;
    copied?: string;
    loading?: string;
  };
}

export interface DetailPageHeaderProps {
  backHref: string;
  backLabel: string;
  views?: number;
  showViews?: boolean;
}

export interface DetailPageGalleryProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

export interface DetailPageDescriptionProps {
  description: string;
}

export interface DetailPageNotFoundProps {
  locale: string;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}

export interface DetailPageActionsProps {
  registrationUrl?: string;
  onShare: () => void;
  isCopied: boolean;
  translations: {
    register?: string;
    dm?: string;
    share?: string;
    copied?: string;
  };
}

export interface BadgeData {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  color: string;
}
