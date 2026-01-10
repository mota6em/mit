import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import { auth } from "@/auth";

const LIST_PROJECTION = { __v: 0 } as const;

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("id");

    if (identifier) {
      let event = await Event.findOne({ slug: identifier })
        .select(LIST_PROJECTION)
        .lean()
        .exec();

      if (!event && isValidObjectId(identifier)) {
        event = await Event.findById(identifier)
          .select(LIST_PROJECTION)
          .lean()
          .exec();
      }

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }

    const events = await Event.find({})
      .select(LIST_PROJECTION)
      .sort({ date: -1 })
      .lean()
      .exec();

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
      const event = await Event.findById(body._id);
      if (event) {
        Object.assign(event, body);
        await event.save();
      }
    } else {
      await Event.create(body);
    }
    // Return the updated list to refresh UI
    const events = await Event.find({}).sort({ date: -1 }).lean();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
