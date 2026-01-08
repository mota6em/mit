import type { ReactNode } from "react";

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

export interface EventsSectionProps {
  type: "upcoming" | "past";
  limit?: number;
  showViewAll?: boolean;
  filterMode?: "all" | "recurring_only" | "single_only";
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

/** ===== Highlight Component Props ===== */

export interface FeaturedAnnouncementData {
  slug?: string;
  _id?: string;
  id?: string;
  highlightId: string;
  displayDate: string;
  displayTitle: string;
  displayDesc: string;
  images?: string[];
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
  variants?: MotionVariants;
  children?: ReactNode;
}

export interface HighlightImageProps {
  images?: string[];
  title: string;
  variants?: MotionVariants;
}

/** ===== Animation Variants ===== */

export interface MotionVariants {
  hidden?: Record<string, unknown>;
  visible?: Record<string, unknown>;
}

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
