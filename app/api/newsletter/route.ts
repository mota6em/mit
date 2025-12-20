import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await dbConnect();
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  // Logic: Public users only send { name, email }. Admins send an 'action' or '_id'.
  const isPublicSubscription = !body.action && !body._id;

  // Protect Admin actions only
  if (!isPublicSubscription && !session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    //  ADMIN DELETE
    if (body.action === "delete") {
      await Newsletter.findByIdAndDelete(body.id);
      return NextResponse.json({ success: true });
    }

    //  ADMIN UPDATE
    if (body._id) {
      await Newsletter.findByIdAndUpdate(body._id, {
        name: body.name,
        email: body.email,
      });
      const updatedList = await Newsletter.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, subscribers: updatedList });
    }

    // NEW SUBSCRIPTION (Public or Admin)
    const existing = await Newsletter.findOne({ email: body.email });
    if (existing) {
      if (isPublicSubscription) {
        return NextResponse.json(
          { message: "Already subscribed" },
          { status: 409 }
        );
      }
      return NextResponse.json({ success: true });
    }

    await Newsletter.create({ name: body.name, email: body.email });

    // Response for Public User
    if (isPublicSubscription) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // Response for Admin (Return full list to update UI)
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, subscribers });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
