/** Server-side highlight service — every read is cached and tag-invalidated. */
import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Highlight from "@/models/Highlight";
import { isValidObjectId } from "mongoose";
import { CACHE_TAGS, CACHE_REVALIDATE_SECONDS } from "@/lib/cache";
import type { ApiHighlight } from "@/lib/types";

const METADATA_PROJECTION = {
  title_en: 1,
  title_hu: 1,
  title_ar: 1,
  desc_en: 1,
  desc_hu: 1,
  desc_ar: 1,
  images: 1,
  slug: 1,
  date: 1,
  createdAt: 1,
  updatedAt: 1,
} as const;

const FULL_PROJECTION = { __v: 0 } as const;

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

/** Just the fields `generateMetadata` needs — see `METADATA_PROJECTION`. */
export interface HighlightMetadata {
  slug?: string;
  title_en: string;
  title_hu: string;
  title_ar?: string;
  desc_en: string;
  desc_hu: string;
  desc_ar?: string;
  images?: string[];
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

const cacheOptions = {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: [CACHE_TAGS.highlights],
};

/** The whole highlight list, newest first — shared by every consumer. */
export const getAllHighlights = unstable_cache(
  async (): Promise<ApiHighlight[]> => {
    await dbConnect();
    const highlights = await Highlight.find({})
      .select(FULL_PROJECTION)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return serialize<ApiHighlight[]>(highlights);
  },
  ["highlights:all"],
  cacheOptions
);

export const getHighlightServerSide = unstable_cache(
  async (identifier: string): Promise<ApiHighlight | null> => {
    await dbConnect();

    let highlight = await Highlight.findOne({ slug: identifier })
      .select(FULL_PROJECTION)
      .lean()
      .exec();

    if (!highlight && isValidObjectId(identifier)) {
      highlight = await Highlight.findById(identifier)
        .select(FULL_PROJECTION)
        .lean()
        .exec();
    }

    if (!highlight) return null;
    return serialize<ApiHighlight>(highlight);
  },
  ["highlights:one"],
  cacheOptions
);

export const getHighlightMetadata = unstable_cache(
  async (identifier: string) => {
    await dbConnect();

    let highlight = await Highlight.findOne({ slug: identifier })
      .select(METADATA_PROJECTION)
      .lean()
      .exec();

    if (!highlight && isValidObjectId(identifier)) {
      highlight = await Highlight.findById(identifier)
        .select(METADATA_PROJECTION)
        .lean()
        .exec();
    }

    if (!highlight) return null;
    return serialize<HighlightMetadata>(highlight);
  },
  ["highlights:metadata"],
  cacheOptions
);
