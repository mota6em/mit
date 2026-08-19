/**
 * Canonical SWR keys.
 *
 * Both event sections on the home page (and both on the events page) read the
 * *same* list and slice it locally, so they must share one key — otherwise SWR
 * treats them as unrelated resources and fires a duplicate request per section.
 * These keys are also what the server preloads into the SWR cache, so they have
 * to match exactly on both sides.
 */
export const SWR_KEYS = {
  events: "/api/events",
  highlights: "/api/highlights",
} as const;
