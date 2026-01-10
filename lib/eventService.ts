/** Server-side event service */
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";

const METADATA_PROJECTION = {
  title_en: 1,
  title_hu: 1,
  desc_en: 1,
  desc_hu: 1,
  img: 1,
  slug: 1,
} as const;

const FULL_PROJECTION = { __v: 0 } as const;

export async function getEventServerSide(identifier: string) {
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
  return JSON.parse(JSON.stringify(event));
}

export async function getEventMetadata(identifier: string) {
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

  return JSON.parse(JSON.stringify(event));
}
