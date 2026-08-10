import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { auth } from "@/auth";
import { getAllEvents, getEventServerSide } from "@/lib/eventService";
import {
  CACHE_TAGS,
  PUBLIC_CACHE_CONTROL,
  PURGE_IMMEDIATELY,
} from "@/lib/cache";

/** Reads are served from the tagged cache, so they cost no DB round-trip. */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("id");

    if (identifier) {
      const event = await getEventServerSide(identifier);

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event, {
        headers: { "Cache-Control": PUBLIC_CACHE_CONTROL },
      });
    }

    const events = await getAllEvents();

    return NextResponse.json(events, {
      headers: { "Cache-Control": PUBLIC_CACHE_CONTROL },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();

    if (body.action === "delete") {
      await Event.findByIdAndDelete(body.id);
      revalidateTag(CACHE_TAGS.events, PURGE_IMMEDIATELY);
      return NextResponse.json({ success: true });
    }

    // CREATE or UPDATE Action
    if (body._id) {
      const event = await Event.findById(body._id);
      if (event) {
        Object.assign(event, body);
        await event.save();
      }
    } else {
      await Event.create(body);
    }

    // Drop the cached list/detail entries so the next read reflects the write.
    revalidateTag(CACHE_TAGS.events, PURGE_IMMEDIATELY);

    // Return the updated list to refresh UI
    const events = await Event.find({}).sort({ date: -1 }).lean();
    return NextResponse.json({ success: true, events });
  } catch {
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
