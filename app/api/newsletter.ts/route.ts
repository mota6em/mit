import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if subscriber already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 409 }
      );
    }

    await Newsletter.create({ name, email });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error("Newsletter Error:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
