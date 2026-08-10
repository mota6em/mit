import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Highlight from "@/models/Highlight";
import { auth } from "@/auth";
import { getAllHighlights, getHighlightServerSide } from "@/lib/highlightService";
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
      const highlight = await getHighlightServerSide(identifier);

      if (!highlight) {
        return NextResponse.json(
          { error: "Highlight not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(highlight, {
        headers: { "Cache-Control": PUBLIC_CACHE_CONTROL },
      });
    }

    const highlights = await getAllHighlights();

    return NextResponse.json(highlights, {
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
      await Highlight.findByIdAndDelete(body.id);
      revalidateTag(CACHE_TAGS.highlights, PURGE_IMMEDIATELY);
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

    // Drop the cached list/detail entries so the next read reflects the write.
    revalidateTag(CACHE_TAGS.highlights, PURGE_IMMEDIATELY);

    // Return the updated list to refresh UI
    const highlights = await Highlight.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, highlights });
  } catch {
    return NextResponse.json(
      { success: false, message: "Database Error" },
      { status: 500 }
    );
  }
}
