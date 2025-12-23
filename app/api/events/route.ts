import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("id"); // This could be _id or slug

    if (identifier) {
      // find by slug first, then fallback to _id if it's a valid ObjectId
      let query = { slug: identifier };

      const event = await Event.findOne(query);

      if (!event && isValidObjectId(identifier)) {
        const eventById = await Event.findById(identifier);
        if (eventById) return NextResponse.json(eventById);
      }

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }

    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error) {
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
      return NextResponse.json({ success: true });
    }

    // CREATE or UPDATE Action
    if (body._id) {
      await Event.findByIdAndUpdate(body._id, body);
    } else {
      await Event.create(body);
    }

    // Return the updated list to refresh UI
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
