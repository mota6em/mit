import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Highlight from "@/models/Highlight";
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

      const highlight = await Highlight.findOne(query);

      if (!highlight && isValidObjectId(identifier)) {
        const highlightById = await Highlight.findById(identifier);
        if (highlightById) return NextResponse.json(highlightById);
      }

      if (!highlight) {
        return NextResponse.json(
          { error: "Highlight not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(highlight);
    }

    const highlights = await Highlight.find({}).sort({ createdAt: -1 });
    return NextResponse.json(highlights);
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
      await Highlight.findByIdAndDelete(body.id);
      return NextResponse.json({ success: true });
    }

    // CREATE or UPDATE Action
    if (body._id) {
      const highlight = await Highlight.findById(body._id);
      if (highlight) {
        Object.assign(highlight, body);
        await highlight.save();
      }
    } else {
      await Highlight.create(body);
    }
    // Return the updated list to refresh UI
    const highlights = await Highlight.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, highlights });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
