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

  // Allow public users to subscribe without a session
  const isPublicSubscription = !body.action && !body._id;

  if (!isPublicSubscription && !session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    //   DELETE Action (Admin only)
    if (body.action === "delete") {
      await Newsletter.findByIdAndDelete(body.id);
      return NextResponse.json({ success: true });
    }

    // SUBSCRIBE / UPDATE Action
    if (body._id) {
      // Admin Updating existing
      await Newsletter.findByIdAndUpdate(body._id, {
        name: body.name,
        email: body.email,
      });
    } else {
      // Check if email exists for new subscribers (Public or Admin)
      const existing = await Newsletter.findOne({ email: body.email });
      if (existing && isPublicSubscription) {
        return NextResponse.json(
          { message: "Already subscribed" },
          { status: 409 }
        );
      }
      await Newsletter.create({ name: body.name, email: body.email });
    }

    // Return status based on context
    if (isPublicSubscription) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, subscribers });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
