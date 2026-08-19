/** Server-side event service — every read is cached and tag-invalidated. */
import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import { CACHE_TAGS, CACHE_REVALIDATE_SECONDS } from "@/lib/cache";
import type { ApiEvent } from "@/lib/types";

const METADATA_PROJECTION = {
  title_en: 1,
  title_hu: 1,
  title_ar: 1,
  desc_en: 1,
  desc_hu: 1,
  desc_ar: 1,
  img: 1,
  slug: 1,
  date: 1,
  time: 1,
  location: 1,
  updatedAt: 1,
} as const;

const FULL_PROJECTION = { __v: 0 } as const;

/** Mongo documents carry ObjectId/Date, neither of which survives the cache or
 * the server→client boundary. Flatten once, here, so callers get plain JSON. */
function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

/** Just the fields `generateMetadata` needs — see `METADATA_PROJECTION`. */
export interface EventMetadata {
  slug?: string;
  title_en: string;
  title_hu: string;
  title_ar?: string;
  desc_en: string;
  desc_hu: string;
  desc_ar?: string;
  img?: string;
  date?: string;
  time?: string;
  location?: string;
  updatedAt?: string;
}

const cacheOptions = {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: [CACHE_TAGS.events],
};

/**
 * The whole event list, sorted newest first.
 *
 * Every surface that shows events (home page, events page, both API list
 * responses) reads this single entry, so a page with three event sections
 * costs one query on a cold cache and zero afterwards.
 */
export const getAllEvents = unstable_cache(
  async (): Promise<ApiEvent[]> => {
    await dbConnect();
    const events = await Event.find({})
      .select(FULL_PROJECTION)
      .sort({ date: -1 })
      .lean()
      .exec();
    return serialize<ApiEvent[]>(events);
  },
  ["events:all"],
  cacheOptions
);

/** Look up by slug, falling back to `_id` for links made before slugs existed. */
export const getEventServerSide = unstable_cache(
  async (identifier: string): Promise<ApiEvent | null> => {
    await dbConnect();

    let event = await Event.findOne({ slug: identifier })
      .select(FULL_PROJECTION)
      .lean()
      .exec();

    if (!event && isValidObjectId(identifier)) {
      event = await Event.findById(identifier)
        .select(FULL_PROJECTION)
        .lean()
        .exec();
    }

    if (!event) return null;
    return serialize<ApiEvent>(event);
  },
  ["events:one"],
  cacheOptions
);

export const getEventMetadata = unstable_cache(
  async (identifier: string) => {
    await dbConnect();

    let event = await Event.findOne({ slug: identifier })
      .select(METADATA_PROJECTION)
      .lean()
      .exec();

    if (!event && isValidObjectId(identifier)) {
      event = await Event.findById(identifier)
        .select(METADATA_PROJECTION)
        .lean()
        .exec();
    }

    if (!event) return null;
    return serialize<EventMetadata>(event);
  },
  ["events:metadata"],
  cacheOptions
);
