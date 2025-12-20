// app/api/admin/newsletter/route.ts
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
  const session = await auth();
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await dbConnect();
    const body = await req.json();

    if (body.action === "delete") {
      await Newsletter.findByIdAndDelete(body.id);
      return NextResponse.json({ success: true });
    }

    if (body._id) {
      // Update existing
      await Newsletter.findByIdAndUpdate(body._id, {
        name: body.name,
        email: body.email,
      });
    } else {
      // Create new (admin side)
      await Newsletter.create({ name: body.name, email: body.email });
    }

    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, subscribers });
  } catch (error) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
