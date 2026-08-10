/**
 * Cache tags and durations shared by the server data layer and the API routes.
 *
 * Every read of the events/highlights collections goes through a tagged
 * `unstable_cache` entry, and every write calls `revalidateTag` with the
 * matching tag. That gives us "cache forever until something changes" instead
 * of hitting Mongo on every request, while still showing edits immediately.
 */
export const CACHE_TAGS = {
  events: "events",
  highlights: "highlights",
} as const;

/**
 * Safety net in case a write happens outside the app (straight in the DB).
 * Long enough that normal traffic is served entirely from cache.
 */
export const CACHE_REVALIDATE_SECONDS = 3600;

/**
 * `Cache-Control` for the public JSON endpoints. The CDN keeps a copy for an
 * hour and may serve a stale one for a day while it refreshes in the
 * background, so a cold visitor never waits on Mongo.
 */
export const PUBLIC_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

/**
 * Passed to `revalidateTag` after an admin write. Expiring immediately means
 * the next read recomputes rather than being allowed to serve a stale copy —
 * an editor should see their own change on the very next page load.
 */
export const PURGE_IMMEDIATELY = { expire: 0 } as const;
