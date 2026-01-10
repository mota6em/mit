import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

type ContentType = "event" | "highlight";

function getRedisKey(id: string, type: ContentType = "event"): string {
  return `${type}:views:${id}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, type = "event" } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Validate type
    const contentType: ContentType =
      type === "highlight" ? "highlight" : "event";

    // Increment the view count for this ID
    const views = await redis.incr(getRedisKey(id, contentType));

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
    const type = searchParams.get("type") || "event";

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Validate type
    const contentType: ContentType =
      type === "highlight" ? "highlight" : "event";

    // Get current view count (default to 0 if null)
    const views = (await redis.get<number>(getRedisKey(id, contentType))) || 0;

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch views" },
      { status: 500 }
    );
  }
}
