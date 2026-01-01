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
  note_en?: string;
  note_hu?: string;
  year?: string;
  category?: string;
  status?: string;
  date?: string;
}

export interface HighlightData extends Omit<ApiHighlight, "_id" | "slug"> {
  _id?: string; // Make _id optional for form state
}

export interface HighlightsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  year?: string;
  titleKey?: string;
  sectionId?: string;
}

export interface HighlightDisplayData extends ApiHighlight {
  displayDate: string;
  displayTitle: string;
  displayDesc: string;
  displayNote: string;
  highlightId: string;
}
