/** Server-side highlight service */
import dbConnect from "@/lib/mongodb";
import Highlight from "@/models/Highlight";
import { isValidObjectId } from "mongoose";

const METADATA_PROJECTION = {
  title_en: 1,
  title_hu: 1,
  desc_en: 1,
  desc_hu: 1,
  images: 1,
  slug: 1,
} as const;

const FULL_PROJECTION = { __v: 0 } as const;

export async function getHighlightServerSide(identifier: string) {
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
  return JSON.parse(JSON.stringify(highlight));
}

export async function getHighlightMetadata(identifier: string) {
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

  return JSON.parse(JSON.stringify(highlight));
}
