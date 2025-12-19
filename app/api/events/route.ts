import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Fetch Single Event
    if (id) {
      if (!isValidObjectId(id)) {
        return NextResponse.json(
          { error: "Invalid ID format" },
          { status: 400 }
        );
      }

      const event = await Event.findById(id);

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }

    // Fetch All Events (Default)
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Database Error:", error);
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

    // DELETE Action
    if (body.action === "delete") {
      await Event.findByIdAndDelete(body.id);
      return NextResponse.json({ success: true });
    }

    // CREATE or UPDATE Action
    if (body._id || body.id) {
      // Handle update
      const idToUpdate = body._id || body.id;
      await Event.findByIdAndUpdate(idToUpdate, body);
    } else {
      // Handle create
      await Event.create(body);
    }

    // Return the updated list to refresh UI
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
