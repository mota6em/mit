import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";

/** Logic for interacting with the events API */
export async function getEvents(id?: string) {
  try {
    const url = id ? `/api/events?id=${id}` : "/api/events";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (id) {
      return data;
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return id ? null : [];
  }
}

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
