/** interacting with the highlights API on the server side */
import dbConnect from "@/lib/mongodb";
import Highlight from "@/models/Highlight";
import { isValidObjectId } from "mongoose";

// Direct database helper for Server-Side use
export async function getHighlightServerSide(identifier: string) {
  await dbConnect();

  let highlight = await Highlight.findOne({ slug: identifier }).lean();

  if (!highlight && isValidObjectId(identifier)) {
    highlight = await Highlight.findById(identifier).lean();
  }

  if (!highlight) return null;

  return JSON.parse(JSON.stringify(highlight));
}
