/** interacting with the events API on the server side */
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";

// Direct database helper for Server-Side use
export async function getEventServerSide(identifier: string) {
  await dbConnect();

  let event = await Event.findOne({ slug: identifier }).lean();

  if (!event && isValidObjectId(identifier)) {
    event = await Event.findById(identifier).lean();
  }

  if (!event) return null;

  return JSON.parse(JSON.stringify(event));
}
