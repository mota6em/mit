import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event"; // Import the model

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
   const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const body = await req.json();

    // DELETE Action
    if (body.action === "delete") {
      await Event.findByIdAndDelete(body.id); // 'id' from frontend becomes '_id' in MongoDB
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
