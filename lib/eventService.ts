import Event from "@/models/Event";
import dbConnect from "./mongodb";
import { isValidObjectId } from "mongoose";

/** Logic for interacting with the events API */
export async function getEvents() {
  try {
    const res = await fetch("/api/events");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
}

/** Logic for interacting with the events API */
export async function getEvent(identifier: string) {
  await dbConnect();

  let event = await Event.findOne({ slug: identifier }).lean();

  if (!event && isValidObjectId(identifier)) {
    event = await Event.findById(identifier).lean();
  }

  if (!event) return null;

  return {
    ...event,
    _id: event._id.toString(),
    date: event.date?.toISOString ? event.date.toISOString() : event.date,
  };
}
