/**
 * Highlights Module - Barrel Exports
 * Centralized exports for all Highlight-related components
 */

// Core Components
export { default as HighlightBadge } from "./HighlightBadge";
export { default as HighlightImage } from "./HighlightImage";
export { default as HighlightContent } from "./HighlightContent";

// Feature Components
export { default as FeaturedAnnouncement } from "./FeaturedAnnouncement";
export { default as HighlightCard } from "./HighlightCard";
export { default as HighlightsSection } from "./HighlightsSection";
export { default as HighlightClientPage } from "./HighlightClientPage";

// Page Components
export { default as Hero } from "./Hero";
export { default as ArchiveNote } from "./ArchiveNote";

// Named Exports (using named export pattern)
export { SectionTag } from "./SectionTag";
export { HeroBadges } from "./HeroBadges";
export { HeroButtons } from "./HeroButtons";

// Highlight Detail Components (consolidated)
export {
  BackButton,
  DateFooter,
  GallerySection,
  HighlightDescription,
  NotFoundState,
} from "./HighlightDetail";

// Re-export hook and types from centralized locations
export { useHighlightContent } from "@/app/hooks/useHighlightContent";
export type { HighlightContentData as HighlightContentType } from "@/lib/types";

// Highlight Gallery (consolidated)
export { HighlightGallery } from "./HighlightGallery";
