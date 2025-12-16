import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import EventClientPage from "@/components/Events/EventClientPage"; // Ensure you create this file next

// Helper to fetch data
async function getEvent(id: string) {
  await dbConnect();
  if (!isValidObjectId(id)) return null;
  const event = await Event.findById(id).lean();
  if (!event) return null;

  // Convert MongoDB Objects to plain strings for Client Component
  return {
    ...event,
    _id: event._id.toString(),
    date: event.date.toISOString ? event.date.toISOString() : event.date,
  };
}

type Props = {
  params: { id: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event: any = await getEvent(params.id);
  const locale = params.locale === "hu" ? "hu" : "en";

  if (!event) {
    return { title: "Event Not Found" };
  }

  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [event.img],
      type: "article",
    },
  };
}

export default async function EventPageServer({ params }: Props) {
  const event = await getEvent(params.id);
  // Pass the event data to the client component
  return <EventClientPage initialEvent={event} />;
}
