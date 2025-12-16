import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data/events.json");

// Helper to read data
const getEvents = () => {
  if (!fs.existsSync(dataFilePath)) return [];
  const file = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(file);
};

// GET: Fetch all events
export async function GET() {
  const events = getEvents();
  // Sort by date (newest first)
  events.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(events);
}

// POST: Add or Update an event
export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const events = getEvents();

  if (body.action === "delete") {
    const newEvents = events.filter((e: any) => e.id !== body.id);
    fs.writeFileSync(dataFilePath, JSON.stringify(newEvents, null, 2));
    return NextResponse.json({ success: true, events: newEvents });
  }

  // Update existing or Add new
  const existingIndex = events.findIndex((e: any) => e.id === body.id);

  if (existingIndex > -1) {
    events[existingIndex] = { ...events[existingIndex], ...body };
  } else {
    events.push({ ...body, id: Date.now().toString() });
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2));
  return NextResponse.json({ success: true, events });
}
