import type React from "react";
import type { Locale } from "@/lib/i18n";

export interface ApiEvent {
  slug?: string;
  _id: string;
  id?: string;
  img: string;
  title_en: string;
  title_hu: string;
  title_ar?: string;
  desc_en: string;
  desc_hu: string;
  desc_ar?: string;
  note_en?: string;
  note_hu?: string;
  note_ar?: string;
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
  displayDay?: string;
  displayMonth?: string;
  eventId: string;
}

export interface EventsSectionProps {
  type: "upcoming" | "past";
  limit?: number;
  showViewAll?: boolean;
  filterMode?: "all" | "recurring_only" | "single_only";
  /** Enables client-side search over the section's events. */
  searchable?: boolean;
}

export const dayMap: Record<string, Record<Locale, string>> = {
  Monday: { en: "Mon", hu: "Hé", ar: "الإثنين" },
  Tuesday: { en: "Tue", hu: "Ke", ar: "الثلاثاء" },
  Wednesday: { en: "Wed", hu: "Sze", ar: "الأربعاء" },
  Thursday: { en: "Thu", hu: "Csü", ar: "الخميس" },
  Friday: { en: "Fri", hu: "Pé", ar: "الجمعة" },
  Saturday: { en: "Sat", hu: "Szo", ar: "السبت" },
  Sunday: { en: "Sun", hu: "Va", ar: "الأحد" },
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
  title_ar?: string;
  desc_en: string;
  desc_hu: string;
  desc_ar?: string;
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

export interface DateFooterProps {
  date: string;
  locale: string;
}

export type FeaturedAnnouncementData = HighlightDisplayData;

export interface FeaturedAnnouncementProps {
  announcement: FeaturedAnnouncementData;
  locale: string;
}

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

export interface HighlightListProps {
  highlights: HighlightData[];
  onEdit: (highlight: HighlightData) => void;
}

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
  showOrganizer?: boolean;
  showDmButton?: boolean;
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
  showDmButton?: boolean;
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
