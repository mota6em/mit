import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Increment the view count for this event ID
    // Key format: "event:views:{id}"
    const views = await redis.incr(`event:views:${id}`);

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Get current view count (default to 0 if null)
    const views = (await redis.get<number>(`event:views:${id}`)) || 0;

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch views" },
      { status: 500 }
    );
  }
}
